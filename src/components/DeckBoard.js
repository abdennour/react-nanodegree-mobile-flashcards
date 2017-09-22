import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';

class DeckBoard extends Component {
  render() {
    const { deck } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View>
          <Text h1>
            {deck.name}
          </Text>
          <Text h5>
            {deck.questions.length} cards
          </Text>
        </View>
        <View>
          <Text>Second part</Text>
        </View>
        <View>
          <Text>3rd part</Text>
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

export default DeckBoard;
