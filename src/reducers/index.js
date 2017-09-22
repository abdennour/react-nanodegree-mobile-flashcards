import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import decks from './decks';
import questions from './questions';

export default combineReducers({
  decks,
  questions,
  form
});
