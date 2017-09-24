import * as ActionTypes from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case ActionTypes.COMPLETE_QUIZ: {
      const today = action.quiz.day;
      return {
        ...state,
        [today]: state[today] ? [...state[today], action.quiz] : [action.quiz]
      };
    }

    default:
      return state;
  }
}
