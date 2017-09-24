import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import decks from './decks';
import questions from './questions';
import results from './results';
import swipe from './swipe';

export default combineReducers({
  decks,
  questions,
  results,
  swipe,
  form
});
