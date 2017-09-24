import { func, number, string } from 'prop-types';
import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import AnimateNumber from 'react-native-animate-number';
import { connect } from 'react-redux';
import { completeQuiz } from '../actions';
import { neutreColor, primaryColor, lightColor } from '../utils/colors';

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

  scoreFormatter = score => {
    return score === this.score && parseInt(score, 10) === parseFloat(score)
      ? this.score
      : parseFloat(score).toFixed(2);
  };

  render() {
    const { corrects, incorrects } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <Text
            style={{
              color: corrects < incorrects ? neutreColor : primaryColor
            }}
            h1
          >
            <AnimateNumber
              value={this.score}
              interval={4}
              formatter={this.scoreFormatter}
            />{' '}
            %
          </Text>
        </View>
        <Icon
          type="ionicon"
          size={50}
          name={Platform.OS === 'ios' ? 'ios-repeat' : 'md-repeat'}
          color={primaryColor}
          containerStyle={{
            padding: 20,
            justifyContent: 'center'
          }}
          onPress={this.props.onRepeat}
          raised
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect(null, { completeQuiz })(QuizResult);
