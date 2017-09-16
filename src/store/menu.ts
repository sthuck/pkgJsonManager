import {Action} from 'redux';

interface MenuActionSet extends Action {
  type: 'MenuSet';
  id: string;
}

type MenuActions = MenuActionSet;
export interface MenuState {
  current: 'string';
}

export const menu = (state = {current: 'default'}, action: MenuActions) => {
  switch (action.type) {
    case 'MenuSet':
      return {...state, current: action.id};
    default:
      return state;
  }
};
