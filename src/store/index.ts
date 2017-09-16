import {combineReducers, createStore} from 'redux';
import {allFolders, AllFoldersState} from './allFolders';
import {menu, MenuState} from './menu';

export interface IState {
  allFolders: AllFoldersState;
  menu: MenuState;
}

export const store = createStore(combineReducers<IState>({menu, allFolders}));
