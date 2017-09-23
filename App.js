import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Constants } from 'expo';
import store from './src/store';
import Home from './src/components/Home';
import DeckNew from './src/components/DeckNew';
import DeckBoard from './src/components/DeckBoard';
import CardNew from './src/components/CardNew';
import DeckQuiz from './src/components/DeckQuiz';
import DeckScore from './src/components/DeckScore';
import { primaryColor } from './src/utils/colors';
import { SCREENS } from './src/utils/enums';

const MainNavigator = StackNavigator({
  [SCREENS.HOME]: {
    screen: Home
  },
  [SCREENS.DECK_NEW]: {
    screen: DeckNew
  },
  [SCREENS.DECK_BOARD]: {
    screen: DeckBoard
  },
  [SCREENS.CARD_NEW]: {
    screen: CardNew
  },
  [SCREENS.DECK_QUIZ]: {
    screen: DeckQuiz
  },
  [SCREENS.DECK_SCORE]: {
    screen: DeckScore
  }
});

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={primaryColor} {...props} />
    </View>
  );
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppStatusBar
            backgroundColor={primaryColor}
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default App;
