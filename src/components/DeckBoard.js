import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import Button from './Button';
import StartQuizButton from './StartQuizButton';
import {
  primaryColor,
  lightColor,
  silverColor,
  neutreColor
} from '../utils/colors';
import { SCREENS } from '../utils/enums';
import withNavOptions from './hoc/withNavOptions';

function DeckBoard(props) {
  const { deck } = props.navigation.state.params;
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
          {props.questions.length} cards
        </Text>
      </View>
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <Button
          icon={{
            name: 'credit-card-plus',
            type: 'material-community',
            size: 32
          }}
          title="New Card"
          backgroundColor={primaryColor}
          containerViewStyle={styles.btnContainer}
          onPress={() => props.navigation.navigate(SCREENS.CARD_NEW, { deck })}
        />
      </View>
      {props.questions.length === 0 &&
        <View style={{ flex: 1 }}>
          <Text style={styles.notification}>
            You don't have cards in this deck! Add cards (questions) to be able
            to start Quiz on "{deck}" deck.
          </Text>
        </View>}
      {props.questions.length > 0 &&
        <View style={{ flex: 2 }}>
          <StartQuizButton deck={deck} navigate={props.navigation.navigate} />
        </View>}
      <View style={{ flex: 1 }}>
        <Button
          icon={{ name: 'exchange', type: 'font-awesome', size: 32 }}
          title="Switch Deck"
          backgroundColor={neutreColor}
          containerViewStyle={styles.btnContainer}
          onPress={() => props.navigation.navigate(SCREENS.HOME)}
        />
      </View>
    </View>
  );
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

export default withNavOptions(({ navigation }) => ({
  headerTitle: navigation.state.params.deck
}))(connect(mapStateToProps)(DeckBoard));
