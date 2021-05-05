import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import CurvedLayout from '../../../common/curvedLayout';
import AppText from '../../../common/Text/Text';
import { colors } from '../../../styles/colors';
import HappySVG from '../../../assets/icons/happyActive.svg';
import SadSVG from '../../../assets/icons/sadActive.svg';
import MehSVG from '../../../assets/icons/mehActive.svg';
import CalenderSVG from '../../../assets/icons/calendar.svg';

import { BlueLinearGradient, GreenLinearGradient, OrangeLinearGradient } from '../../../common/linerGradients';

import { DetailCard } from '../../Coach/components/ChallengeDetail.detail';
import { format } from 'date-fns';
import { useAppSelector } from '../../../hooks/redux';
import { OpacityDotsLoader } from 'react-native-indicator';

export default function AnxietyDetail({ route }: any): JSX.Element {
  let ImageSection = (
    <GreenLinearGradient gradientStyle={style.headerCard}>
      <HappySVG style={style.icon} />
    </GreenLinearGradient>
  );

  const history = useAppSelector((state) => state.history.activeHistory);

  if (!history) {
    return <OpacityDotsLoader color="green" speed={300} />;
  }

  let heading = 'Feeling Happy!';

  const { feeling: faceType, record_date, anxious, depressed: depression, craving, notes } = history;

  const date = new Date(record_date);

  if (faceType === 'Sad') {
    ImageSection = (
      <OrangeLinearGradient gradientStyle={style.headerCard}>
        <SadSVG style={style.icon} />
      </OrangeLinearGradient>
    );

    heading = "Don't Worry";
  }

  if (faceType === 'Neutral') {
    ImageSection = (
      <BlueLinearGradient gradientStyle={style.headerCard}>
        <MehSVG style={style.icon} />
      </BlueLinearGradient>
    );

    heading = "Don't Worry";
  }

  return (
    <CurvedLayout>
      <DetailCard ImageSection={() => ImageSection} heading={heading}>
        <>
          <View style={style.dateView}>
            <CalenderSVG />
            <AppText paddingHorizontal={10} type="medium" color="#626b9f" fontSize={10}>
              {format(date, 'dd MMM yyyy')}
            </AppText>
          </View>
          <View style={style.statsView}>
            <View style={style.statView}>
              <AppText color="#454f84" fontSize={10}>
                Anxious
              </AppText>
              <AppText type="bold" fontSize={28}>
                {anxious}
              </AppText>
            </View>
            <View style={style.verticleLine} />
            <View style={style.statView}>
              <AppText color="#454f84" fontSize={10}>
                Depression
              </AppText>
              <AppText type="bold" fontSize={28}>
                {depression}
              </AppText>
            </View>
            <View style={style.verticleLine} />
            <View style={style.statView}>
              <AppText color="#454f84" fontSize={10}>
                Craving
              </AppText>
              <AppText type="bold" fontSize={28}>
                {craving}
              </AppText>
            </View>
          </View>
          <View style={style.textView}>
            <AppText color="#454f84" fontSize={12} textAlign="center" lineHeight={20}>
              {notes ?? 'Thank you for letting us now, our representative will soon contact you'}
            </AppText>
          </View>
        </>
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
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 90,
  },
  textView: {
    paddingVertical: 20,
  },
  icon: {
    width: 100,
    height: 100,
  },
  dateView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  statsView: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  statView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  verticleLine: {
    height: '60%',
    width: 2,
    backgroundColor: '#96bcff',
    marginHorizontal: 20,
    alignSelf: 'center',
  },
});
