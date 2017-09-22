import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import DecksList from './DecksList';
import AddDeckButton from './AddDeckButton';

class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <DecksList />
        <AddDeckButton />
      </View>
    );
  }
}

export default Home;
