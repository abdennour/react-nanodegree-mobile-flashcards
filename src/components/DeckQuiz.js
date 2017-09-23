import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { neutreLightColor } from '../utils/colors';
import withNavOptions from './hoc/withNavOptions';

class DeckQuiz extends Component {
  render() {
    const { deck, questions } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text h1>
            {deck}
          </Text>
          <Text h5>
            {questions.length} cards
          </Text>
        </View>
        <View style={styles.cardsContainer}>
          <Text>Decks here</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>note how to swipe</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  cardsContainer: {
    flex: 4,
    backgroundColor: neutreLightColor,
    padding: 10
    //alignSelf: 'stretch'
  }
});
export default withNavOptions(({ navigation }) => ({
  headerTitle: `Quiz on ${navigation.state.params.deck}`
}))(DeckQuiz);
