import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './src/store';
import Home from './src/components/Home';
import DeckNew from './src/components/DeckNew';
import DeckBoard from './src/components/DeckBoard';
import QuestionNew from './src/components/QuestionNew';
import DeckQuiz from './src/components/DeckQuiz';
import DeckScore from './src/components/DeckScore';
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
  [SCREENS.QUESTION_NEW]: {
    screen: QuestionNew
  },
  [SCREENS.DECK_QUIZ]: {
    screen: DeckQuiz
  },
  [SCREENS.DECK_SCORE]: {
    screen: DeckScore
  }
});
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
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
