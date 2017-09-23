import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import DecksList from './DecksList';
import AddDeckButton from './AddDeckButton';
import { navOptions } from '../utils/helpers';

class Home extends Component {
  static navigationOptions = () => navOptions({ headerTitle: 'DECKS' });
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <DecksList navigate={navigate} />
        <AddDeckButton navigate={navigate} />
      </View>
    );
  }
}

export default Home;
