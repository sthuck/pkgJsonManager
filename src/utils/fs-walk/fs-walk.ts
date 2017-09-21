import {criteriaToPredicates, toRegExp} from './fs-walk-helpers';
import {Criteria, FsWalkOptions, NullableStrArr, possibleEntryTypes, Predicate, PredicateParams} from './types';
import * as events from 'events';
import * as fs from 'mz/fs';
import * as path from 'path';
import {zipObject, defaults, isRegExp} from 'lodash';

export class FsWalker extends events.EventEmitter {
  public static entryTypes = possibleEntryTypes;
  private path: string;
  private computedCriteriaList: Array<{
    predicates: Predicate[];
  }>;
  private ignoreList: RegExp[];
  private options: FsWalkOptions = {} as any;

  constructor(tPath: string, options: Partial<FsWalkOptions> = {}) {
    super();
    this.options = defaults(options, {maxdepth: 9999, criteria: [], ignore: []});
    this.path = path.resolve(tPath);
    this.initCriteria(this.options.criteria);
    this.ignoreList = this.options.ignore.map(toRegExp);
  }

  public async walk() {
    if (await fs.exists(this.path)) {
      return this.walkHelper(path.resolve(this.path), 1);
    }
  }

  public on(event: possibleEntryTypes, listener: (name: string, parent: string) => void) {
    return super.on(event, listener);
  }

  private async walkHelper(dir: string, depth: number): Promise<string[]> {
    if (this.options.maxdepth && (depth > this.options.maxdepth)) {
      return [];
    }

    if (this.ignoreList.some(ignorePattern => ignorePattern.test(dir))) {
      return [];
    }

    const dirEntryList = await fs.readdir(dir);

    for (let dirEntry of dirEntryList) {
      dirEntry = path.resolve(dir, dirEntry);
      const stat = await fs.stat(dirEntry);
      let childDirEntryList: NullableStrArr = null;

      if (stat.isDirectory()) {
        childDirEntryList = await this.walkHelper(dirEntry, depth + 1);
      }

      const shouldEmit =
        this.checkCriteria({dirEntry, stat, childDirEntryList});

      if (shouldEmit) {
        this.emitCorrectEvent(dirEntry, stat);
      }
    }
    return dirEntryList;
  }

  private emitCorrectEvent(dirEntry: string, stat: fs.Stats) {
    if (stat.isDirectory()) {
      this.emit(possibleEntryTypes.DIR, dirEntry);
    } else {
      this.emit(possibleEntryTypes.FILE, dirEntry);
    }
  }

  private checkCriteria(params: PredicateParams): boolean {
    if (this.computedCriteriaList.length === 0) {
      return true;
    }

    return this.computedCriteriaList.some(({predicates}) =>
      predicates.every(predicate => predicate(params))
    );
  }

  private initCriteria(criteria: Criteria[]) {
    this.computedCriteriaList = criteria.map(c => ({predicates: criteriaToPredicates(c)}));
  }
}
