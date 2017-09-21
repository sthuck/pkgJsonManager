import {Criteria, possibleEntryTypes, Predicate} from './types';
import globToRegexp = require('glob-to-regexp');
import {isRegExp} from 'lodash';

interface PredicateCreator<T> {
  (param: T): Predicate;
}

export const toRegExp = (item: string | RegExp): RegExp =>
  isRegExp(item) ? item : globToRegexp(item);

const createBySizePredicate = (minimumSize: number): Predicate =>
  ({stat}) => {
    return stat.size >= minimumSize;
  };

const createByTypePredicate = (type: possibleEntryTypes): Predicate =>
  ({stat}) => {
    switch (type) {
      case possibleEntryTypes.DIR:
        return stat.isDirectory();
      case possibleEntryTypes.FILE:
        return !stat.isDirectory();
    }
  };

const createByNamePredicate = (name: string | RegExp): Predicate => {
  const regExp = toRegExp(name);
  return ({dirEntry}) => {
    return regExp.test(dirEntry);
  };
};

const createByContainsPredicate = (name: string | RegExp): Predicate => {
  const regExp = toRegExp(name);
  return ({childDirEntryList}) =>
    childDirEntryList ? childDirEntryList.some(dirEntry => regExp.test(dirEntry)) : false;
};

const criteriaToFunctionsMapping: {[K in keyof Criteria]: PredicateCreator<Criteria[K]>} = {
  type: createByTypePredicate,
  name: createByNamePredicate,
  containsFilename: createByContainsPredicate,
  size: createBySizePredicate
};

export const criteriaToPredicates = (criteria: Criteria): Predicate[] => {
  const keys = Object.keys(criteria) as Array<keyof Criteria>;
  return keys.map(key => (criteriaToFunctionsMapping[key] as any)(criteria[key]));
};
