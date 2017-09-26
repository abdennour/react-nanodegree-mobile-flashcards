import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';

import { Icon, Text } from 'react-native-elements';
import { SCREENS } from '../utils/enums';
import { primaryColor } from '../utils/colors';

function StartQuizButton({ deck, questions, navigate, containerStyle, title }) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.text}>
        {title}
      </Text>
      <TouchableOpacity>
        <Icon
          type="ionicon"
          size={50}
          name={Platform.OS === 'ios' ? 'ios-play' : 'md-play'}
          color={primaryColor}
          containerStyle={styles.iconContainer}
          onPress={() => navigate(SCREENS.QUIZ, { deck, questions })}
          raised
        />
      </TouchableOpacity>
    </View>
  );
}

StartQuizButton.defaultProps = {
  title: 'Start quiz'
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    padding: 20,
    justifyContent: 'center'
  },
  text: {
    color: primaryColor,
    textAlign: 'center'
  }
});

function mapStateToProps({ questions }, ownProps) {
  return { questions: questions.filter(q => q.deck === ownProps.deck) };
}
export default connect(mapStateToProps)(StartQuizButton);
