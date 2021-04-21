import * as React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import CurvedLayout from '../../../common/curvedLayout';

import PlaceholderPNG from '../../../assets/images/placeholder.png';
import { DetailCard } from '../../Coach/components/ChallengeDetail.detail';
import AppText from '../../../common/Text/Text';
import { useAppSelector } from '../../../hooks/redux';
import { OpacityDotsLoader } from 'react-native-indicator';

export default function QuoteDetail(): JSX.Element {
  const { activeQuote } = useAppSelector((state) => state.quotes);

  if (!activeQuote) {
    return <OpacityDotsLoader color="green" speed={300} />;
  }

  return (
    <CurvedLayout>
      <DetailCard ImageSection={() => <Image style={style.imgPng} source={{ uri: activeQuote.image }} />} heading="Sobriety Quote">
        <View style={style.content}>
          <View style={style.quote}>
            <AppText fontSize={10} color="#454f84" textAlign="center" lineHeight={20}>
              {activeQuote.text}
            </AppText>
          </View>
          <AppText fontSize={12} color="rgba(69, 79, 132, 0.6)">
            <>― {activeQuote.author}</>
          </AppText>
        </View>
      </DetailCard>
    </CurvedLayout>
  );
}

const style = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quote: {
    paddingVertical: 25,
  },
  imgPng: {
    borderRadius: 25,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});
