import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Button as ButtonElement } from 'react-native-elements';

function Button(props) {
  return (
    <ButtonElement
      Component={TouchableOpacity}
      borderRadius={Platform.OS === 'ios' ? 13 : 3}
      {...props}
    />
  );
}
export default Button;
