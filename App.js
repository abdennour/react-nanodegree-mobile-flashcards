import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DecksList from './src/components/DecksList';
import DeckBoard from './src/components/DeckBoard';
import QuestionNew from './src/components/QuestionNew';
import DeckQuiz from './src/components/DeckQuiz';
import DeckScore from './src/components/DeckScore';

const MainNavigator = StackNavigator({
  DecksList: {
    screen: DecksList
  },
  DeckBoard: {
    screen: DeckBoard
  },
  QuestionNew: {
    screen: QuestionNew
  },
  DeckQuiz: {
    screen: DeckQuiz
  },
  DeckScore: {
    screen: DeckScore
  }
});
class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default App;
