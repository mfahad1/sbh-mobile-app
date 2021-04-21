import { useField } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Input from '../input';
import InputWithIcon from '../inputWithIcon';
import AppText from '../Text/Text';

export function InputField<T>(props: any): JSX.Element {
  const [field, meta] = useField<T>(props);

  const value = (field.value ?? props.value ?? (props.type === 'number' ? '0' : '')) as string;

  const onChangeText = field.onChange(field.name);
  const onBlur = field.onBlur(field.name);

  return (
    <>
      {props.svg && <InputWithIcon svg={props.svg} inputProps={{ ...props.inputProps, value, onChangeText, onBlur }} isInvalid={!!(meta.touched && meta.error)} />}
      {!props.svg && <Input inputProps={{ ...props.inputProps, value, onChangeText, onBlur }} isInvalid={!!(meta.touched && meta.error)} />}
      {meta.touched && meta.error ? (
        <View style={style.error}>
          <AppText color="red" fontSize={10} textAlign="right">
            {meta.error}
          </AppText>
        </View>
      ) : null}
    </>
  );
}

const style = StyleSheet.create({
  error: {
    width: '85%',
  },
});
