import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import SwipeRightIcon from './icons/SwipeRightIcon';
import SwipeLeftIcon from './icons/SwipeLeftIcon';
import {
  neutreLightColor,
  lightColor,
  primaryColor,
  negativeColor
} from '../utils/colors';

function QuizNotes({ rightNote, leftNote }) {
  return (
    <View style={styles.notes}>
      <View
        style={[
          styles.container,
          styles.note,
          { backgroundColor: leftNote.color }
        ]}
      >
        <Text style={styles.notesText}>If incorrect, swipe left</Text>
        <SwipeLeftIcon size={40} color={lightColor} />
      </View>
      <View
        style={[
          styles.container,
          styles.note,
          { backgroundColor: rightNote.color }
        ]}
      >
        <Text style={styles.notesText}>If correct, swipe right</Text>
        <SwipeRightIcon size={40} color={lightColor} />
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
  }
});

function mapStateToProps({ swipe }) {
  return {
    rightNote: {
      color: swipe.quiz && swipe.quiz.right ? primaryColor : neutreLightColor
    },
    leftNote: {
      color: swipe.quiz && swipe.quiz.left ? negativeColor : neutreLightColor
    }
  };
}
export default connect(mapStateToProps)(QuizNotes);
