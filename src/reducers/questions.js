import * as ActionTypes from '../actions/types';
import fixtures from '../fixtures/questions';
/**
 * Questions reducer
 * @method
 * @param  {Array}  [state=[]] Array of questions has shape {statement, answer, deck}
 * @param  {Object} action     [description]
 * @return {Array}            [description]
 */
export default function(state = fixtures, action) {
  switch (action.type) {
    case ActionTypes.ADD_QUESTION:
      return [...state, action.question];

    default:
      return state;
  }
}
