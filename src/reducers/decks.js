import * as ActionTypes from '../actions/types';
import fixtures from '../fixtures/decks';

export default function(state = fixtures, action) {
  switch (action.type) {
    case ActionTypes.ADD_DECK:
      return [...state, action.deck];

    default:
      return state;
  }
}
