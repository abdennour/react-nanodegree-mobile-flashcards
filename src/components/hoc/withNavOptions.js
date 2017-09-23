import React, { Component } from 'react';
import { Platform } from 'react-native';
import { primaryColor, darkColor } from '../../utils/colors';

function commonNavOptions(otherOptions) {
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

/**
 * This HOC was needed because of this issue :
 * https://github.com/react-community/react-navigation/issues/332
 *
 * For consistency among all screens , this HOC should be used whenever
 * custom navigationOptions are needed.
 */
export default function(navigationOptions) {
  return function withNavOptions(Composed) {
    class Composer extends Component {
      static navigationOptions = (...args) =>
        commonNavOptions(
          typeof navigationOptions === 'function'
            ? navigationOptions(...args)
            : navigationOptions
        );

      render() {
        return <Composed {...this.props} />;
      }
    }
    return Composer;
  };
}
