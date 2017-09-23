import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Swiper from './Swiper'; // from 'react-native-xswiper';
import Card from './Card';
import swipeCorrectImg from '../assets/images/swipe-correct.png';
import swipeIncorrectImg from '../assets/images/swipe-incorrect.png';
import { neutreLightColor, neutreColor } from '../utils/colors';
import withNavOptions from './hoc/withNavOptions';

class Quiz extends Component {
  onSwipeLeft() {}

  onSwipeRight() {}
  render() {
    const { deck, questions } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text h1>
            {deck}
          </Text>
          <Text h5>
            {questions.length} more to complete
          </Text>
        </View>
        <View style={styles.cardsContainer}>
          <Swiper
            data={questions}
            renderCard={(question, index) =>
              <Card question={question} order={index + 1} />}
            renderNoCards={() =>
              <View>
                <Text>Complete!</Text>
              </View>}
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
      <View>
        <Text style={styles.notesText}>If incorrect, swipe left</Text>
        <View style={styles.notesImageContainer}>
          <Image
            source={swipeIncorrectImg}
            resizeMode="contain"
            style={styles.notesImage}
          />
        </View>
      </View>
      <View>
        <Text style={styles.notesText}>If correct, swipe right</Text>
        <View style={styles.notesImageContainer}>
          <Image
            source={swipeCorrectImg}
            resizeMode="contain"
            style={styles.notesImage}
          />
        </View>
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
    color: neutreColor
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
