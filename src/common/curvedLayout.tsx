import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { colors } from '../styles/colors';

export default function CurvedLayout({ children }: { children: React.ReactChild | React.ReactChildren }): JSX.Element {
  return (
    <View style={style.curvedLayout}>
      <View style={style.curve} />
      <View style={style.container}>{children}</View>
    </View>
  );
}

const style = StyleSheet.create({
  curvedLayout: {
    backgroundColor: '#f9f9fd',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },

  curve: {
    width: Dimensions.get('screen').width,
    height: 200,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: colors.darkBlue,
    zIndex: 0,
    position: 'absolute',
  },

  container: {
    zIndex: 1,
  },
});
