import React, { Component } from 'react';
import { View } from 'react-native';
import DecksList from './DecksList';
import AddDeckButton from './AddDeckButton';
import withNavOptions from './hoc/withNavOptions';

class Home extends Component {
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

export default withNavOptions({ headerTitle: 'DECKS' })(Home);
