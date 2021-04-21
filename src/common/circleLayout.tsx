import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { colors } from '../styles/colors';

export default function CircleLayout({
  children,
}: {
  children: React.ReactChild | React.ReactChildren;
}): JSX.Element {
  return (
    <View style={style.circleLayout}>
      <View style={style.circle} />
      <View style={style.container}>{children}</View>
    </View>
  );
}

const style = StyleSheet.create({
  circleLayout: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },

  circle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 1.2,
    height: Dimensions.get('window').width * 1.2,
    right: 150,
    bottom: 300,
    backgroundColor: colors.lightBlue,
    zIndex: 0,
    position: 'absolute',
  },

  container: {
    zIndex: 1,
  },
});
