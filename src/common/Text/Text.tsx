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
}): JSX.Element {
  return (
    <Text
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
    fontFamily: 'sailec_regular',
    fontSize: adjust(15),
  },
  bold: {
    fontFamily: 'sailec_bold',
    fontSize: adjust(15),
  },
  medium: {
    fontFamily: 'sailec_medium',
    fontSize: adjust(15),
  },
  black: {
    fontFamily: 'sailec_black',
    fontSize: adjust(15),
  },
  italic: {
    fontFamily: 'sailec_regular_italic',
    fontSize: adjust(15),
  },
  boldItalic: {
    fontFamily: 'sailec_bold_italic',
    fontSize: adjust(15),
  },
});
