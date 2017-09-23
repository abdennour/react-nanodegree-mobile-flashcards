import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text, Button } from 'react-native-elements';
import {
  primaryColor,
  lightColor,
  silverColor,
  blackColor
} from '../utils/colors';
import { SCREENS } from '../utils/enums';

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
            {deck}
          </Text>
          <Text h5>
            {this.props.questions.length} cards
          </Text>
        </View>
        <View style={{ flex: 2, alignSelf: 'stretch' }}>
          {this.props.questions.length > 0 &&
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

          {this.props.questions.length === 0 &&
            <Text style={styles.notification}>
              You don't have cards in this deck! Add questions to be able to
              start Quiz on "{deck}" deck.
            </Text>}
          <Button
            icon={{ name: 'plus', type: 'entypo', size: 32 }}
            title="New Question"
            backgroundColor={primaryColor}
            containerViewStyle={styles.btnContainer}
            onPress={() =>
              this.props.navigation.navigate(SCREENS.QUESTION_NEW, { deck })}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            icon={{ name: 'exchange', type: 'font-awesome', size: 32 }}
            title="Switch Deck"
            backgroundColor={blackColor}
            containerViewStyle={styles.btnContainer}
            onPress={() => this.props.navigation.navigate(SCREENS.HOME)}
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

function mapStateToProps({ questions }, ownProps) {
  const { deck } = ownProps.navigation.state.params;
  return { questions: questions.filter(q => q.deck === deck) };
}

export default connect(mapStateToProps)(DeckBoard);
