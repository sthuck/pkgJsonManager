import {createStore, combineReducers} from 'redux';
import {menu} from './menu';
import {allFolders} from './allFolders';

export const store = createStore(combineReducers({menu, allFolders}));
