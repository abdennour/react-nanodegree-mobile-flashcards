import { Dimensions, Platform } from 'react-native';
import { primaryColor, darkColor } from './colors';

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

export function navOptions(otherOptions) {
  const options = {
    headerTitle: 'DECKS',
    headerTintColor: primaryColor,
    headerStyle: {
      backgroundColor: darkColor,
      borderWidth: 3,
      borderBottomColor: primaryColor
    },
    ...otherOptions
  };
  if (Platform.OS === 'ios') {
    options.headerTitleStyle = { marginBottom: 20 };
  }

  return options;
}
