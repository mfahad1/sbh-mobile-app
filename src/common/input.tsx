import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../styles/colors';

export default function Input({ inputProps, isInvalid }: { isInvalid: boolean; inputProps: any }): JSX.Element {
  return (
    <View style={{ ...style.inputIconContainer, ...(isInvalid && style.borderError) }}>
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
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.inputColor,
    fontSize: 13,
    paddingHorizontal: 10,
  },

  borderError: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
  },
});
