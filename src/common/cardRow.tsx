import * as React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ImageSourcePropType, Dimensions } from 'react-native';
import { colors } from '../styles/colors';
import AppText from './Text/Text';

type CardRowProps = {
  navigate: () => void;
  ImageSource: ImageSourcePropType;
  heading?: string;
  content?: string;
  children?: React.ReactChild | React.ReactChildren;
};
export function CardRow({ navigate, ImageSource, heading, content, children }: CardRowProps): JSX.Element {
  return (
    <TouchableOpacity style={style.rowCard} onPress={navigate}>
      <Image style={style.imagePng} source={ImageSource} />
      <View style={style.rowCardMainContent}>
        {heading && (
          <AppText type="medium" fontSize={12} numberOfLines={5}>
            {heading}
          </AppText>
        )}
        {content && (
          <AppText fontSize={10} numberOfLines={3} color="#454f84">
            {content}
          </AppText>
        )}
        {children && children}
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  rowCardMainContent: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    paddingRight: Dimensions.get('screen').width * 0.3,
  },
  rowCard: {
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 20,
    elevation: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    alignItems: 'center',
  },
  imagePng: {
    aspectRatio: 1,
    borderRadius: 15,
    height: Dimensions.get('screen').height * 0.1,
  },
})