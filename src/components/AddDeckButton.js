import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { getWidth, getHeight } from '../utils/helpers';
import { primaryColor, lightColor } from '../utils/colors';

class AddDeckButton extends Component {
  render() {
    return (
      <View
        style={[
          styles.addDeckBtnContainer,
          { top: getHeight() - 150, left: getWidth() - 90 }
        ]}
      >
        <Icon
          reverse
          name="plus"
          type="entypo"
          color={primaryColor}
          containerStyle={{ borderRadius: Platform.OS === 'ios' ? 4 : 26 }}
          onPress={() => console.log('AddDeckButton clicked')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addDeckBtnContainer: {
    position: 'absolute'
  }
});

export default AddDeckButton;
