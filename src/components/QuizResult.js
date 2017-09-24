import { func, number, string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Platform } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import AnimateNumber from 'react-native-animate-number';
import Button from './Button';
import StartQuizButton from './StartQuizButton';
import { completeQuiz } from '../actions';
import {
  neutreLightColor,
  lightColor,
  primaryColor,
  negativeColor
} from '../utils/colors';
import { SCREENS } from '../utils/enums';
import withNavOptions from './hoc/withNavOptions';

class QuizResult extends Component {
  static propTypes = {
    deck: string.isRequired,
    corrects: number.isRequired,
    incorrects: number.isRequired,
    completeQuiz: func.isRequired
  };

  componentDidMount() {
    this.props.completeQuiz({ deck: this.props.deck, score: this.score });
  }

  get score() {
    const ratio =
      this.props.corrects / (this.props.corrects + this.props.incorrects);
    return ratio * 100;
  }

  scoreFormatter = score =>
    score === this.score && parseInt(score, 10) === parseFloat(score)
      ? this.score
      : parseFloat(score).toFixed(2);

  renderBody() {
    const { corrects, incorrects } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <Text
            style={{
              color: corrects < incorrects ? negativeColor : primaryColor
            }}
            h1
          >
            <AnimateNumber
              value={this.score}
              formatter={this.scoreFormatter}
            />{' '}
            %
          </Text>
        </View>
        <StartQuizButton
          title="Restart quiz"
          deck={this.props.deck}
          navigate={this.props.navigation.navigate}
        />
      </View>
    );
  }

  render() {
    const { corrects, incorrects } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText} h2>
            Quiz Results on {this.props.deck}
          </Text>
        </View>
        <View style={styles.cardsContainer}>
          {this.renderBody()}
        </View>
        <Notes corrects={corrects} incorrects={incorrects} />
      </View>
    );
  }
}

function Notes({ corrects, incorrects }) {
  return (
    <View style={styles.notes}>
      <View
        style={[
          styles.container,
          styles.note,
          { backgroundColor: negativeColor }
        ]}
      >
        <Text style={styles.notesText}>Incorrects</Text>
        <Text style={styles.notesText} h1>
          {incorrects}
        </Text>
      </View>
      <View
        style={[
          styles.container,
          styles.note,
          { backgroundColor: primaryColor }
        ]}
      >
        <Text style={styles.notesText}>Corrects</Text>
        <Text style={styles.notesText} h1>
          {corrects}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    textAlign: 'center',
    padding: 20
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  cardsContainer: {
    flex: 4,
    backgroundColor: neutreLightColor,
    padding: 10,
    alignSelf: 'stretch'
  },
  notes: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    padding: 2
  },
  note: {
    backgroundColor: neutreLightColor,
    margin: 10
  },
  notesText: {
    color: lightColor
  },
  notesImageContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,.6)'
  },
  notesImage: {
    flex: 1,
    width: null,
    height: null
  }
});

function mapStateToProps(state, ownProps) {
  return ownProps.navigation.state.params;
}

function mapNavOptions({ navigation: { navigate, state: { params } } }) {
  return {
    headerTitle: params.deck,
    headerLeft: null,
    headerRight: (
      <Button
        onPress={() => navigate(SCREENS.DECK_BOARD, { deck: params.deck })}
        backgroundColor={lightColor}
        color={primaryColor}
        containerViewStyle={{ marginBottom: Platform.OS === 'ios' ? 20 : 0 }}
        title={params.deck.toUpperCase()}
        icon={{
          type: 'ionicon',
          name: Platform.OS === 'ios' ? 'ios-home' : 'md-home',
          color: primaryColor
        }}
      />
    )
  };
}

export default withNavOptions(mapNavOptions)(
  connect(mapStateToProps, { completeQuiz })(QuizResult)
);
