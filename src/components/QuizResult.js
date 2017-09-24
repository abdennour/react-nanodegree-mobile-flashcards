import { func, number, string } from 'prop-types';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import AnimateNumber from 'react-native-animate-number';
import { connect } from 'react-redux';
import { completeQuiz } from '../actions';
import { neutreColor, primaryColor } from '../utils/colors';

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

  render() {
    const { corrects, incorrects } = this.props;
    return (
      <View style={styles.container}>
        <Text
          style={{ color: corrects < incorrects ? neutreColor : primaryColor }}
          h1
        >
          <AnimateNumber
            value={this.score}
            formatter={score => parseFloat(score).toFixed(2)}
          />{' '}
          %
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  }
});

export default connect(null, { completeQuiz })(QuizResult);
