import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { primaryColor, lightColor, silverColor } from '../utils/colors';

class DeckBoard extends Component {
  render() {
    const { deck } = this.props.navigation.state.params;
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
            {deck.name}
          </Text>
          <Text h5>
            {deck.questions.length} cards
          </Text>
        </View>
        <View style={{ flex: 2, alignSelf: 'stretch' }}>
          {deck.questions.length > 0 &&
            <Button
              icon={{
                name: 'question-circle',
                type: 'font-awesome',
                color: primaryColor,
                size: 32,
                reverse: true
              }}
              title="Start Quiz"
              color={primaryColor}
              backgroundColor={lightColor}
              containerViewStyle={[
                styles.btnContainer,
                {
                  borderColor: primaryColor,
                  borderWidth: 2
                }
              ]}
              onPress={() => {}}
            />}

          {deck.questions.length === 0 &&
            <Text style={styles.notification}>
              You don't have cards in this deck! Add questions to be able to
              start Quiz on "{deck.name}" deck.
            </Text>}
          <Button
            icon={{ name: 'plus', type: 'entypo', size: 32 }}
            title="New Question"
            backgroundColor={primaryColor}
            containerViewStyle={styles.btnContainer}
            onPress={() => {}}
          />
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
  notification: {
    color: silverColor,
    textAlign: 'center',
    padding: 10
  },
  btnContainer: {
    marginTop: 15
  }
});

export default DeckBoard;
