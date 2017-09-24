import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import Swiper from './Swiper'; // from 'react-native-xswiper';
import Card from './Card';
import SwipeRightIcon from './icons/SwipeRightIcon';
import SwipeLeftIcon from './icons/SwipeLeftIcon';
import {
  neutreLightColor,
  lightColor,
  primaryColor,
  negativeColor
} from '../utils/colors';
import { SCREENS } from '../utils/enums';
import withNavOptions from './hoc/withNavOptions';

class Quiz extends Component {
  state = {
    remainingCounter: this.questions.length,
    corrects: 0,
    incorrects: 0,
    correctColor: neutreLightColor,
    incorrectColor: neutreLightColor
  };
  componentDidMount() {
    setTimeout(() => this.highlightNotes(), 1000);
  }

  onSwipeLeft = () => {
    this.highlightLeftNote();
  };

  onSwipeRight = () => {
    this.highlightRightNote();
  };

  onCompleteSwipeLeft = () => {
    this.setState(
      ({ incorrects }) => ({
        incorrects: incorrects + 1,
        incorrectColor: neutreLightColor
      }),
      () => {
        if (this.completed) {
          this.onNoCards();
        }
      }
    );
  };

  onCompleteSwipeRight = () => {
    this.setState(
      ({ corrects }) => ({
        corrects: corrects + 1,
        correctColor: neutreLightColor
      }),
      () => {
        if (this.completed) {
          this.onNoCards();
        }
      }
    );
  };

  onCompleteSwipe = currentIndex => {
    this.setState({
      remainingCounter: this.questions.length - currentIndex
    });
    this.unhighlightNotes();
  };

  onCompleteFlipCard = isFront => {
    if (!isFront && Platform.OS === 'ios') {
      this.highlightNotes(40);
    }
  };

  onNoCards() {
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

  highlightLeftNote() {
    return new Promise(resolve => {
      this.setState(
        {
          incorrectColor: negativeColor,
          correctColor: neutreLightColor
        },
        resolve
      );
    });
  }

  highlightRightNote() {
    return new Promise(resolve => {
      this.setState(
        {
          correctColor: primaryColor,
          incorrectColor: neutreLightColor
        },
        resolve
      );
    });
  }

  highlightNotes(timeout = 400) {
    const toggle = (t = timeout) =>
      new Promise(resolve => {
        this.highlightLeftNote().then(() =>
          setTimeout(() => {
            this.highlightRightNote();
            setTimeout(() => resolve(), t);
          }, t)
        );
      });

    toggle().then(() =>
      toggle().then(() =>
        toggle().then(() => toggle().then(() => this.unhighlightNotes()))
      )
    );
  }
  unhighlightNotes() {
    this.setState({
      incorrectColor: neutreLightColor,
      correctColor: neutreLightColor
    });
  }

  reset = () => {
    this.swiper.reset().then(() => {
      this.setState({
        remainingCounter: this.questions.length,
        corrects: 0,
        incorrects: 0,
        correctColor: neutreLightColor,
        incorrectColor: neutreLightColor
      });
    });
  };

  render() {
    const { corrects, incorrects, correctColor, incorrectColor } = this.state;
    const notesProps = { correctColor, incorrectColor }; // needed to lint
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
            ref={component => (this.swiper = component)}
            data={this.questions}
            onSwipeLeft={this.onSwipeLeft}
            onSwipeRight={this.onSwipeRight}
            onCompleteSwipe={this.onCompleteSwipe}
            onCompleteSwipeLeft={this.onCompleteSwipeLeft}
            onCompleteSwipeRight={this.onCompleteSwipeRight}
            renderCard={(question, index) =>
              <Card
                question={question}
                order={index + 1}
                onCompleteFlip={this.onCompleteFlipCard}
              />}
          />
        </View>

        <Notes {...notesProps} />
      </View>
    );
  }
}

function Notes({ correctColor, incorrectColor }) {
  return (
    <View style={styles.notes}>
      <View
        style={[
          styles.container,
          styles.note,
          { backgroundColor: incorrectColor }
        ]}
      >
        <Text style={styles.notesText}>If incorrect, swipe left</Text>
        <SwipeLeftIcon size={40} color={lightColor} />
      </View>
      <View
        style={[
          styles.container,
          styles.note,
          { backgroundColor: correctColor }
        ]}
      >
        <Text style={styles.notesText}>If correct, swipe right</Text>
        <SwipeRightIcon size={40} color={lightColor} />
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
export default withNavOptions(({ navigation }) => ({
  headerTitle: `Quiz on ${navigation.state.params.deck}`
}))(Quiz);
