import * as ActionTypes from '../actions/types';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

export default function() {
  return next => action => {
    if (action.type === ActionTypes.COMPLETE_QUIZ) {
      clearLocalNotification().then(setLocalNotification);
    }
    next(action);
  };
}
