import {CheckboxListItems} from '../componenets/checkbox-list';
import {Action, Reducer} from 'redux';
import {findIndex} from 'lodash';
/* Types */
interface SetAllFolders extends Action {
  type: 'SetFolders';
  folders: CheckboxListItems;
}

interface CheckFolder extends Action {
  type: 'CheckFolder';
  id: string | number;
}
interface UncheckFolder extends Action {
  type: 'UncheckFolder';
  id: string | number;
}

type AllFoldersActions = SetAllFolders | CheckFolder | UncheckFolder;

export interface AllFoldersState {
  folders: CheckboxListItems;
}

/* Actions */
export const actionCheckFolder = (id: string | number): CheckFolder => ({
  type: 'CheckFolder',
  id
});

export const actionUncheckFolder = (id: string | number): UncheckFolder => ({
  type: 'UncheckFolder',
  id
});

/* Reducer */

export const allFolders: Reducer<AllFoldersState> =
  (state = {folders: []}, action: AllFoldersActions) => {
    switch (action.type) {
      case 'SetFolders':
        return {...state, folders: action.folders};
      case 'CheckFolder':
      case 'UncheckFolder':
        const index = findIndex(state.folders, {id: action.id});
        const begin = state.folders.slice(0, index);
        const item = state.folders[index];
        item.checked = action.type === 'CheckFolder' ? true : false;
        const end = state.folders.slice(index + 1);
        return {folders: [...begin, item, ...end]};
      default:
        return state;
    }
  };
