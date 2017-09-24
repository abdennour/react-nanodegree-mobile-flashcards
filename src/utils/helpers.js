import { Dimensions } from 'react-native';

export function getWidth() {
  return Dimensions.get('window').width;
}

export function getHeight() {
  return Dimensions.get('window').height;
}

/**
 * Format date to YYYY-MM-DD , default : YYYY-MM-DD of today
 * @method getDateString
 * @param  {Array}      [args]  Date arguments with the samve overload.
 * @return {String}             YYYY-MM-DD
 */
export function getDateString(...args) {
  const date = new Date(...args);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split('T')[0];
}

export function isToday(yyyyMmDd) {
  return yyyyMmDd === getDateString();
}
