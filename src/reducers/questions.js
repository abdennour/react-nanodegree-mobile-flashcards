import * as ActionTypes from '../actions/types';
/**
 * Questions reducer
 * @method
 * @param  {Array}  [state=[]] Array of questions has shape {statement, answer, deck}
 * @param  {Object} action     [description]
 * @return {Array}            [description]
 */
export default function(
  state = [
    { statement: 'How are you?', answer: 'fine!', deck: 'Sport' },
    { statement: 'Wats FB?', answer: 'Football!', deck: 'Sport' },
    { statement: 'Lamba sport is famous?', answer: 'nope!', deck: 'Sport' },
    { statement: 'Where are you?', answer: 'from Handball!', deck: 'Sport' },
    {
      statement: 'X variable used in sport ,, for what ?',
      answer: 'caculate running distance!',
      deck: 'Sport'
    }
  ],
  action
) {
  switch (action.type) {
    case ActionTypes.ADD_QUESTION:
      return [...state, action.question];

    default:
      return state;
  }
}
