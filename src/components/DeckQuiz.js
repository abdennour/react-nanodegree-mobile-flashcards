import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
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
  }
});
export default withNavOptions(({ navigation }) => ({
  headerTitle: `Quiz on ${navigation.state.params.deck}`
}))(DeckQuiz);
