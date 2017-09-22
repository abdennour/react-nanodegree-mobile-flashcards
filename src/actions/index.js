import * as ActionTypes from './types';
import { getDateString } from '../utils/helpers';

export function addDeck(deck) {
  return { type: ActionTypes.ADD_DECK, deck };
}

export function addQuestion(question) {
  return { type: ActionTypes.ADD_QUESTION, question };
}

export function completeQuiz({ deck, score }) {
  return {
    type: ActionTypes.COMPLETE_QUIZ,
    quiz: {
      deck,
      score,
      timestamp: Date.now(),
      day: getDateString()
    }
  };
}
