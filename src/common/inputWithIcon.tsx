import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../styles/colors';
import { getFontWRTPlatform } from './Text/Text';

export default function InputWithIcon({ svg: SVG, isInvalid, inputProps }: { isInvalid: boolean; svg: React.ElementType; inputProps: any }): JSX.Element {
  return (
    <View style={{ ...style.inputIconContainer, ...(isInvalid && style.borderError) }}>
      <View style={style.inputIcon}>
        <SVG />
      </View>
      <TextInput {...inputProps} style={style.input} />
    </View>
  );
}

const style = StyleSheet.create({
  inputIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    width: '75%',
    height: 50,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: colors.inputColor,
    fontFamily: getFontWRTPlatform('Sailec'),
    fontSize: 13,
  },

  inputIcon: {
    backgroundColor: colors.inputColor,
    height: 50,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: colors.inputColor,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  borderError: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
  },
});
