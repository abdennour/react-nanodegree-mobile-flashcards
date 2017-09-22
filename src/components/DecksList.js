import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
class DecksList extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>I am DecksList screen</Text>
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
export default DecksList;
