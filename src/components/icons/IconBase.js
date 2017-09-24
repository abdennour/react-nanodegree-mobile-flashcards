import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg } from 'expo';

function IconBase({ size, color, reverse, data }) {
  const style = { width: size, height: size };
  if (reverse) {
    style.backgroundColor = color;
  }

  return (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size}>
        <Svg.Path fill={reverse ? '#000' : color} scale={1.5} storke d={data} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default IconBase;
