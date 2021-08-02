import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import CircleRadiiSVG from '../../assets/icons/circleRadi.svg';
import adjust from '../../common/adjustPixel';
import AppText, { getFontWRTPlatform } from '../../common/Text/Text';

import { colors } from '../../styles/colors';

type recoveryInfo = {
  stats: string | number;
  param: string;
  heading: string;
  text: string;
};

const recoveryTimeline: recoveryInfo[] = [
  {
    stats: 24,
    param: 'HOURS',
    heading: 'Intake',
    text: 'Intake process begins  with BHT’s, clients will sign consents and go over program rules. Within 24 hours medical department will follow with a medical evaluation',
  },
  {
    stats: 48,
    param: 'HOURS',
    heading: 'Nurse Practitioner',
    text:
      'Client will meet Nurse Practitioner to go over substance abuse history, determine Taper, and complete a Physical Evaluation. Client will meet with NP everyday while on detox. Client will also complete labs. ',
  },
  {
    stats: 72,
    param: 'HOURS',
    heading: 'BPS Assesment',
    text: 'Client will meet clinician to go over psychological, biological, and social factors that could be contributing to substance abuse. ',
  },
  {
    stats: '07',
    param: 'DAYS',
    heading: 'Treatment Plan',
    text: 'Client will meet with their counselor to go over their unique treatment plan. Client will meet with counselor twice a week. ',
  },
  {
    stats: '07',
    param: 'DAYS',
    heading: 'Psych Evaluation',
    text: 'Client will meet with the Psych practitioner to identify and treat mental health conditions and provide therapy. Client will meet with Psych NP once a week. ',
  },
  {
    stats: '7-10',
    param: 'DAYS',
    heading: 'Residential',
    text: 'After detox period client will be assigned a color track and will attend groups. Client can then enjoy all the physical amenities Willow Springs has to offer. ',
  },
];

export default function RecoveryTimelineScreen({ navigation, intake = false }: any): JSX.Element {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const _renderItem = ({ item: { stats, param, heading, text } }: { item: recoveryInfo }) => {
    let styleWrapper = {
      ...style.slide,
    };

    if (intake) {
      styleWrapper = { ...styleWrapper, ...style.marginTop };
    }
    return (
      <View style={styleWrapper}>
        <View style={style.info}>
          <View style={style.circleRadii}>
            <CircleRadiiSVG width={adjust(200)} />
          </View>
          <Text style={style.infoStats}>{stats}</Text>
          <Text style={style.infoParam}>{param} </Text>
        </View>
        <View style={style.center}>
          <View style={style.headingInfo}>
            <AppText type="medium" fontSize={20}>
              {heading}
            </AppText>
          </View>
          <AppText textAlign="center" lineHeight={20} fontSize={12} color="#454f84">
            {text}
          </AppText>
        </View>
      </View>
    );
  };

  const onBeforeSnapToItem = (index: number) => {
    setCurrentIndex(index);
    if (index === recoveryTimeline.length - 1 && !intake) {
      setTimeout(() => navigation.navigate('DrawerNavigation', { screen: 'Counter' }), 100);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.topPortion} />
      <View style={style.carousel}>
        <Carousel data={recoveryTimeline} renderItem={_renderItem} sliderWidth={Dimensions.get('screen').width} itemWidth={Dimensions.get('screen').width} onBeforeSnapToItem={onBeforeSnapToItem} />
        <Pagination
          containerStyle={style.paginationConatiner}
          dotsLength={recoveryTimeline.length}
          activeDotIndex={currentIndex}
          dotStyle={style.dot}
          inactiveDotStyle={style.inActiveDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  circleRadii: {
    position: 'absolute',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: '#10b179',
  },
  inActiveDot: {
    width: 30,
    height: 30,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 8,
    backgroundColor: '#fff',
  },

  topPortion: {
    backgroundColor: colors.darkBlue,
    height: Dimensions.get('screen').height * 0.45,
    width: Dimensions.get('screen').width,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,

    position: 'absolute',
    zIndex: 0,
  },

  carousel: {
    flex: 1,
    zIndex: 1,
  },

  info: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 120,
  },
  infoStats: {
    fontFamily: getFontWRTPlatform('Sailec Black'),
    fontSize: 55,
    color: '#ffff',
  },
  infoParam: {
    fontFamily: getFontWRTPlatform('Sailec Bold'),
    fontSize: 15,
    color: '#ffff',
  },

  slide: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
  },
  headingInfo: {
    marginBottom: 30,
  },
  paginationConatiner: {
    paddingHorizontal: 90,
    paddingVertical: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginTop: {
    marginTop: Dimensions.get('screen').height * 0.1,
  },
});
