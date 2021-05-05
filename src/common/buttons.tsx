import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../styles/colors';
import AppText from './Text/Text';
import { OpacityDotsLoader } from 'react-native-indicator';

export enum ButtonType {
  success = 'success',
  danger = 'danger',
  primary = 'primary',
  pink = 'pink',
}

const getButtonGradient = (type: ButtonType): React.ReactText[] => {
  if (type === ButtonType.success) {
    return ['#94da4c', '#49c265', '#10b179'];
  }

  if (type === ButtonType.danger) {
    return ['#f8dfe2', '#ead6d9', '#dec2c5'];
  }

  if (type === ButtonType.pink) {
    return ['#ee7892', '#e9486e', '#e72855'];
  }

  return ['#96bcff', '#6d9fea', '#518cdd'];
};
type ButtonGradient = {
  text: string;
  type?: ButtonType;
  onPress?: () => void;
  buttonStyle?: Object;
  disabled?: boolean;
  loading?: boolean;
};
export default function ButtonGradient({ text, type = ButtonType.success, buttonStyle = {}, loading = false, onPress, ...props }: ButtonGradient): JSX.Element {
  const onPressFunc = () => {
    if (!loading && onPress) {
      onPress();
    }
  };
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={getButtonGradient(type)} style={{ ...style.linearGradient, ...buttonStyle }}>
      <TouchableOpacity style={style.button} onPress={onPressFunc} {...props}>
        {loading ? (
          <OpacityDotsLoader color="white" speed={300} />
        ) : (
          <AppText color={type === ButtonType.danger ? colors.pink : 'white'} type="bold" fontSize={12}>
            {text}
          </AppText>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  linearGradient: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    width: '90%',
  },
  button: {
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'transparent',
    height: 20,
    justifyContent: 'center',
  },
});
