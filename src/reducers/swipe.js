import * as ActionTypes from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SWIPE_LEFT:
      return {
        ...state,
        [action.component]: { right: false, left: true }
      };

    case ActionTypes.SWIPE_RIGHT:
      return {
        ...state,
        [action.component]: { right: true, left: false }
      };
    case ActionTypes.FINISH_SWIPE:
      return {
        ...state,
        [action.component]: { right: false, left: false }
      };
    default:
      return state;
  }
}
