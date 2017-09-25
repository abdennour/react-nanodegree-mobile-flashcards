import React from 'react';
import { View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Constants } from 'expo';
import store from './src/store';
import Home from './src/components/Home';
import DeckNew from './src/components/DeckNew';
import DeckBoard from './src/components/DeckBoard';
import CardNew from './src/components/CardNew';
import Quiz from './src/components/Quiz';
import QuizResult from './src/components/QuizResult';
import DeckScore from './src/components/DeckScore';
import { primaryColor } from './src/utils/colors';
import { SCREENS } from './src/utils/enums';
import { setLocalNotification } from './src/utils/helpers';

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
  [SCREENS.QUIZ]: {
    screen: Quiz
  },
  [SCREENS.QUIZ_RESULT]: {
    screen: QuizResult
  },
  [SCREENS.DECK_SCORE]: {
    screen: DeckScore
  }
});

class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
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

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
export default App;
