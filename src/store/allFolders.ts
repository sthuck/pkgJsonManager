import {CheckboxListItems} from '../componenets/checkbox-list';
import {Action, AnyAction, Reducer} from 'redux';
import {findIndex} from 'lodash';
/* Types */
export enum FoldersActionKeys {
  SetFolders = 'SetFolders',
  CheckFolder = 'CheckFolder',
  UncheckFolder = 'UncheckFolder'
}

interface SetAllFolders {
  type: FoldersActionKeys.SetFolders;
  folders: CheckboxListItems;
}

interface CheckFolder {
  type: FoldersActionKeys.CheckFolder;
  id: string | number;
}
interface UncheckFolder {
  type: FoldersActionKeys.UncheckFolder;
  id: string | number;
}

type AllFoldersActions = SetAllFolders | CheckFolder | UncheckFolder;

export interface AllFoldersState {
  folders: CheckboxListItems;
}

/* Actions */
export const actionCheckFolder = (id: string | number): CheckFolder => ({
  type: FoldersActionKeys.CheckFolder,
  id
});

export const actionUncheckFolder = (id: string | number): UncheckFolder => ({
  type: FoldersActionKeys.UncheckFolder,
  id
});

/* Reducer */

export const allFolders: Reducer<AllFoldersState> =
  (state = {folders: []}, action: AllFoldersActions) => {
    switch (action.type) {
      case FoldersActionKeys.SetFolders:
        return {...state, folders: action.folders};
      case FoldersActionKeys.CheckFolder:
      case FoldersActionKeys.UncheckFolder:
        const index = findIndex(state.folders, {id: action.id});
        const begin = state.folders.slice(0, index);
        const item = state.folders[index];
        item.checked = action.type === FoldersActionKeys.CheckFolder ? true : false;
        const end = state.folders.slice(index + 1);
        return {folders: [...begin, item, ...end]};
      default:
        return state;
    }
  };
