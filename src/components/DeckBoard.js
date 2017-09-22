import React, { Component } from 'react';
import { View, Text } from 'react-native';

class DeckBoard extends Component {
  render() {
    return (
      <View>
        <Text>
          I am DeckBoard screen :{' '}
          {JSON.stringify(this.props.navigation.state.params)}
        </Text>
      </View>
    );
  }
}
export default DeckBoard;
