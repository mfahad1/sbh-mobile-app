import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { colors } from '../styles/colors';

export default function Card({ children }: { children: React.ReactChild | React.ReactChildren }): JSX.Element {
  return (
    <View style={style.cardHolder}>
      <View style={style.card}>{children}</View>
    </View>
  );
}

const style = StyleSheet.create({
  cardHolder: {
    overflow: 'hidden',
    paddingBottom: 20,
    paddingRight: 20,
    borderRadius: 30,
    marginLeft: 20,
  },
  card: {
    borderRadius: 30,
    backgroundColor: '#ffff',
    shadowColor: 'red',
    shadowOffset: { width: 200, height: 100 },
    shadowOpacity: 0.9,
    shadowRadius: 30,
    elevation: 60,
  },
});
