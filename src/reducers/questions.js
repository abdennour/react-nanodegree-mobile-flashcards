import * as ActionTypes from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case ActionTypes.ADD_QUESTION:
      return [...state, action.question];

    default:
      return state;
  }
}
