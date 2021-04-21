import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import CurvedLayout from '../../../common/curvedLayout';
import AppText from '../../../common/Text/Text';
import { colors } from '../../../styles/colors';
import RelapsedSVG from '../../../assets/icons/relapsed.svg';
import { PinkLinearGradient } from '../../../common/linerGradients';

import { DetailCard } from '../../Coach/components/ChallengeDetail.detail';

export default function Relapsed(): JSX.Element {
  return (
    <CurvedLayout>
      <DetailCard
        ImageSection={() => (
          <PinkLinearGradient gradientStyle={style.headerCard}>
            <RelapsedSVG />
          </PinkLinearGradient>
        )}
        heading="Don't Worry">
        <View style={style.textView}>
          <AppText color="#454f84" fontSize={12} textAlign="center" lineHeight={20}>
            Thank you for letting us now, our representative will soon contact you
          </AppText>
        </View>
      </DetailCard>
    </CurvedLayout>
  );
}

const style = StyleSheet.create({
  headerCard: {
    backgroundColor: colors.cardGrey,
    borderRadius: 30,
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').height * 0.3,
    padding: 30,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    paddingVertical: 20,
  },
});
