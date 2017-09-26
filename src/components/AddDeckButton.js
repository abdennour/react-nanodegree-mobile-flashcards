import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { getWidth, getHeight } from '../utils/helpers';
import { primaryColor } from '../utils/colors';
import { SCREENS } from '../utils/enums';

function AddDeckButton() {
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
        onPress={() => this.props.navigate(SCREENS.DECK_NEW)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addDeckBtnContainer: {
    position: 'absolute'
  }
});

export default AddDeckButton;
