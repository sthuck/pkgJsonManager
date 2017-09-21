import * as fs from 'fs';

export enum possibleEntryTypes {
  FILE = 'file',
  DIR = 'dir'
}

export interface Criteria {
  type?: possibleEntryTypes;
  name?: string | RegExp;
  containsFilename?: string | RegExp;
  size?: number;
}

export interface FsWalkOptions {
  maxdepth: number;
  criteria: Criteria[];
  ignore: Array<string | RegExp>;
}

export type NullableStrArr = string[] | null;

export interface PredicateParams {
  dirEntry: string; stat: fs.Stats; childDirEntryList: string[] | null;
}

export interface Predicate {
  (p: PredicateParams): boolean;
}
