import {combineReducers, createStore} from 'redux';
import {allFolders} from './allFolders';
import {menu} from './menu';

export const store = createStore(combineReducers({menu, allFolders}));
