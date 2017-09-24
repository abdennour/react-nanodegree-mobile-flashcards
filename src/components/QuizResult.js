import { func, number, string } from 'prop-types';
import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import AnimateNumber from 'react-native-animate-number';
import { connect } from 'react-redux';
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
        <Icon
          type="ionicon"
          size={50}
          name={Platform.OS === 'ios' ? 'ios-repeat' : 'md-repeat'}
          color={primaryColor}
          containerStyle={{
            padding: 20,
            justifyContent: 'center'
          }}
          onPress={() =>
            this.props.navigation.navigate(SCREENS.QUIZ, {
              deck: this.props.deck,
              questions: this.props.questions
            })}
          raised
        />
      </View>
    );
  }

  render() {
    const { corrects, incorrects } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text h1>
            {this.props.deck}
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

export default withNavOptions(({ navigation }) => ({
  headerTitle: `Quiz Results on ${navigation.state.params.deck}`
}))(connect(mapStateToProps, { completeQuiz })(QuizResult));
