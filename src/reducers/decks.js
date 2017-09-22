import * as ActionTypes from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case ActionTypes.ADD_DECK:
      return [...state, action.deck];

    default:
      return state;
  }
}
