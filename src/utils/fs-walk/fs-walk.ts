import {criteriaToPredicates, toRegExp} from './fs-walk-helpers';
import {Criteria, FsWalkOptions, NullableStrArr, possibleEntryTypes, Predicate, PredicateParams} from './types';
import * as events from 'events';
import * as fs from 'mz/fs';
import * as path from 'path';
import {zipObject, defaults, isRegExp, isFinite, isUndefined} from 'lodash';

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
      const stat = await fs.stat(this.path);
      const dirEntryList = await this.getDirEntryList(this.path, stat, 0);
      await this.walkHelper(this.path, dirEntryList, 1);
      return true;
    }
    return false;
  }

  public on(event: possibleEntryTypes, listener: (name: string, parent: string) => void) {
    return super.on(event, listener);
  }

  private async walkHelper(dir: string, dirEntryList: string[], depth: number): Promise<void> {
    if (this.ignoreList.some(ignorePattern => ignorePattern.test(dir))) {
      return;
    }

    for (let dirEntry of dirEntryList) {
      dirEntry = path.resolve(dir, dirEntry);
      const stat = await fs.stat(dirEntry);
      const childDirEntryList: NullableStrArr =
        await this.getDirEntryList(dirEntry, stat, depth);

      const shouldEmit =
        this.checkCriteria({dirEntry, stat, childDirEntryList});

      if (shouldEmit) {
        this.emitCorrectEvent(dirEntry, stat);
      }

      if (stat.isDirectory()) {
        await this.walkHelper(dirEntry, childDirEntryList, depth + 1);
      }
    }
  }

  private getDirEntryList(dirEntry: string, stat: fs.Stats, depth: number) {
    if (this.options.maxdepth && (depth >= this.options.maxdepth)) {
      return [];
    }
    return stat.isDirectory() ? fs.readdir(dirEntry) : [];
  }

  private emitCorrectEvent(dirEntry: string, stat: fs.Stats) {
    return stat.isDirectory() ? this.emit(possibleEntryTypes.DIR, dirEntry) :
      this.emit(possibleEntryTypes.FILE, dirEntry);
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
