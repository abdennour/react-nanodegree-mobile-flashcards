import { Dimensions } from 'react-native';

export function getWidth() {
  return Dimensions.get('window').width;
}

export function getHeight() {
  return Dimensions.get('window').height;
}

export function getDateString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split('T')[0];
}

export function isToday(date) {
  return getDateString(date) === getDateString();
}

export function filterByDeck(deck) {
  return object =>
    object.deck && object.deck.toLowerCase() === deck.toLowerCase();
}
