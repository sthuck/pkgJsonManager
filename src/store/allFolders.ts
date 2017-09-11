import {Action, Reducer} from 'redux';

interface AllFoldersSet extends Action {
  type: 'FoldersSet';
  folders: string[];
}

type AllFoldersActions = AllFoldersSet;

interface AllFoldersState {
  folders: string[];
}

export const allFolders: Reducer<AllFoldersState> =
  (state = {folders: []}, action: AllFoldersActions) => {
    switch (action.type) {
      case 'FoldersSet':
        return {...state, folders: action.folders};
      default:
        return state;
    }
  };
