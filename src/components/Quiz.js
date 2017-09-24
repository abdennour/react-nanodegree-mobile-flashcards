import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import Swiper from './Swiper'; // from 'react-native-xswiper';
import Card from './Card';
import QuizResult from './QuizResult';
import SwipeRightIcon from './icons/SwipeRightIcon';
import SwipeLeftIcon from './icons/SwipeLeftIcon';
import { neutreLightColor, neutreColor, lightColor } from '../utils/colors';
import withNavOptions from './hoc/withNavOptions';

class Quiz extends Component {
  state = {
    remainingCounter: this.questions.length,
    corrects: 0,
    incorrects: 0
  };

  onSwipeLeft = () => {
    this.setState(({ incorrects }) => ({
      incorrects: incorrects + 1
    }));
  };

  onSwipeRight = () => {
    this.setState(({ corrects }) => ({
      corrects: corrects + 1
    }));
  };

  onSwipe = currentIndex => {
    this.setState({
      remainingCounter: this.questions.length - currentIndex
    });
  };

  get questions() {
    return this.props.navigation.state.params.questions;
  }

  get deck() {
    return this.props.navigation.state.params.deck;
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
            onSwipe={this.onSwipe}
            onSwipeLeft={this.onSwipeLeft}
            onSwipeRight={this.onSwipeRight}
            renderCard={(question, index) =>
              <Card question={question} order={index + 1} />}
            renderNoCards={() =>
              <QuizResult {...this.state} deck={this.deck} />}
          />
        </View>
        <Notes />
      </View>
    );
  }
}

function Notes() {
  return (
    <View style={styles.notes}>
      <View style={[styles.container, { backgroundColor: neutreLightColor }]}>
        <Text style={styles.notesText}>If incorrect, swipe left</Text>
        <SwipeLeftIcon size={40} color={lightColor} />
      </View>
      <View style={[styles.container, { backgroundColor: neutreLightColor }]}>
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
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    padding: 20
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
