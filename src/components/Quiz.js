import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Swiper from './Swiper'; // from 'react-native-xswiper';
import Card from './Card';
import { neutreLightColor } from '../utils/colors';
import withNavOptions from './hoc/withNavOptions';

class Quiz extends Component {
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
        <View style={{ flex: 1 }}>
          <Text>note how to swipe</Text>
        </View>
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
export default withNavOptions(({ navigation }) => ({
  headerTitle: `Quiz on ${navigation.state.params.deck}`
}))(Quiz);
