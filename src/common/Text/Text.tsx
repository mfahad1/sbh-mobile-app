import React from 'react';
import { StyleSheet, Text } from 'react-native';
import adjust from '../adjustPixel';

export default function AppText({
  children,
  fontSize = 15,
  type = 'regular',
  color = 'black',
  textAlign = 'left',
  lineHeight,
  paddingHorizontal = 0,
  paddingVertical = 0,
  marginHorizontal = 0,
  marginVertical = 0,
  numberOfLines = 0,
}: {
  children: React.ReactChild | React.ReactChildren;
  fontSize?: number;
  type?: 'regular' | 'bold' | 'medium' | 'black' | 'italic' | 'boldItalic';
  color?: string;
  textAlign?: 'center' | 'left' | 'right';
  lineHeight?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  numberOfLines?: number;
}): JSX.Element {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{
        ...style[type],
        ...{
          fontSize: adjust(fontSize),
          color,
          textAlign,
          lineHeight,
          paddingHorizontal,
          paddingVertical,
          marginHorizontal,
          marginVertical,
        },
      }}>
      {children}
    </Text>
  );
}

const style = StyleSheet.create({
  regular: {
    fontFamily: 'Sailec',
    fontSize: adjust(15),
  },
  bold: {
    fontFamily: 'Sailec Bold',
    fontSize: adjust(15),
  },
  medium: {
    fontFamily: 'Sailec Medium',
    fontSize: adjust(15),
  },
  black: {
    fontFamily: 'Sailec Black',
    fontSize: adjust(15),
  },
  italic: {
    fontFamily: 'Sailec Italic',
    fontSize: adjust(15),
  },
  boldItalic: {
    fontFamily: 'Sailec Bold Italic',
    fontSize: adjust(15),
  },
});
