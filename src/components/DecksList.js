import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class DecksList extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>
          Decks are : {this.props.decks.join(', ')}
        </Text>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('DeckBoard', { deck: 'maths' })}
        >
          <Text>Go to Deck X</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default connect(({ decks }) => ({ decks }))(DecksList);
