import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Swiper from './Swiper'; // from 'react-native-xswiper';
import Card from './Card';
import QuizNotes from './QuizNotes';
import { neutreLightColor } from '../utils/colors';
import { SCREENS } from '../utils/enums';
import { score as calculateScore } from '../utils/helpers';
import { swipeLeft, swipeRight, finishSwipe, completeQuiz } from '../actions';
import withNavOptions from './hoc/withNavOptions';

class Quiz extends Component {
  state = {
    remainingCounter: this.props.navigation.state.params.questions.length,
    corrects: 0,
    incorrects: 0
  };

  onCompleteSwipe = direction => {
    this.setState(
      ({ corrects, incorrects, remainingCounter }) => ({
        corrects: direction === 'right' ? corrects + 1 : corrects,
        incorrects: direction === 'left' ? incorrects + 1 : incorrects,
        remainingCounter: remainingCounter - 1
      }),
      () => {
        if (this.completed) {
          this.onCompleteLastSwipe();
        }
      }
    );
  };

  onCompleteLastSwipe() {
    const { deck, questions } = this.props.navigation.state.params;
    const { corrects, incorrects } = this.state;

    // 👇🏻 A middleware will intervent here to reset the push notification
    this.props.completeQuiz({
      deck,
      score: calculateScore(corrects, incorrects)
    });
    this.props.navigation.navigate(SCREENS.QUIZ_RESULT, {
      corrects,
      incorrects,
      deck,
      questions
    });
  }

  get completed() {
    return this.state.remainingCounter === 0;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text h1>
            {this.props.navigation.state.params.deck}
          </Text>
          {this.state.remainingCounter > 0 &&
            <Text h5>
              {this.state.remainingCounter} more to complete
            </Text>}
        </View>
        <View style={styles.cardsContainer}>
          <Swiper
            data={this.props.navigation.state.params.questions}
            onReleaseSwipe={() => this.props.finishSwipe()}
            onSwipeLeft={() => this.props.swipeLeft()}
            onSwipeRight={() => this.props.swipeRight()}
            onCompleteSwipeLeft={() => this.onCompleteSwipe('left')}
            onCompleteSwipeRight={() => this.onCompleteSwipe('right')}
            renderCard={(question, index) =>
              <Card question={question} order={index + 1} />}
          />
        </View>
        <QuizNotes />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  }
});

export default withNavOptions({ headerTitle: 'Quiz' })(
  connect(null, { swipeLeft, swipeRight, finishSwipe, completeQuiz })(Quiz)
);
