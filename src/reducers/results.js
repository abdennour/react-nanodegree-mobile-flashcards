import * as ActionTypes from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case ActionTypes.COMPLETE_QUIZ:
      return [...state, action.quiz];

    default:
      return state;
  }
}
