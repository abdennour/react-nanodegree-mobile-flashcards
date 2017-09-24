import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Swiper from './Swiper'; // from 'react-native-xswiper';
import Card from './Card';
import QuizNotes from './QuizNotes';
import { neutreLightColor } from '../utils/colors';
import { SCREENS } from '../utils/enums';
import { swipeLeft, swipeRight, finishSwipe } from '../actions';
import withNavOptions from './hoc/withNavOptions';

class Quiz extends Component {
  state = {
    remainingCounter: this.questions.length,
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
    const { corrects, incorrects } = this.state;
    this.props.navigation.navigate(SCREENS.QUIZ_RESULT, {
      corrects,
      incorrects,
      deck: this.deck,
      questions: this.questions
    });
  }

  get questions() {
    return this.props.navigation.state.params.questions;
  }

  get deck() {
    return this.props.navigation.state.params.deck;
  }

  get completed() {
    return this.state.remainingCounter === 0;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text h1>
            {this.deck}
          </Text>
          {this.state.remainingCounter > 0 &&
            <Text h5>
              {this.state.remainingCounter} more to complete
            </Text>}
        </View>
        <View style={styles.cardsContainer}>
          <Swiper
            data={this.questions}
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

function mapStateToProps(state, ownProps) {
  const { deck, questions } = ownProps.navigation.state.params;
  return {
    deck,
    questions
  };
}
export default withNavOptions(({ navigation }) => ({
  headerTitle: `Quiz on ${navigation.state.params.deck}`
}))(connect(mapStateToProps, { swipeLeft, swipeRight, finishSwipe })(Quiz));
