import * as React from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Image } from 'react-native';
import CurvedLayout from '../../../common/curvedLayout';
import { GreenDarkLinearGradient } from '../../../common/linerGradients';

import RewardPNG from '../../../assets/images/rewards.png';
import PersonSVG from '../../../assets/icons/person-small.svg';
import CalenderSVG from '../../../assets/icons/calendar.svg';
import ButtonGradient from '../../../common/buttons';
import AppText from '../../../common/Text/Text';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { OpacityDotsLoader } from 'react-native-indicator';

type DetailCard = {
  ImageSection: React.ElementType;
  heading: string;
  children: React.ReactChild | React.ReactChildren;
};

export function DetailCard({ ImageSection, heading, children }: DetailCard): JSX.Element {
  return (
    <ScrollView>
      <View style={{ ...style.container }}>
        <ImageSection />
        <View style={style.content}>
          <AppText type="bold" fontSize={20} textAlign="center">
            {heading}
          </AppText>

          {children}
        </View>
      </View>
    </ScrollView>
  );
}

export default function ChallengeDetail(): JSX.Element {
  const { activeChallenge } = useAppSelector((state) => state.coach);
  console.log({ activeChallenge });

  if (!activeChallenge) {
    return <OpacityDotsLoader color="white" speed={300} />;
  }

  return (
    <CurvedLayout>
      <DetailCard
        ImageSection={() => (
          <GreenDarkLinearGradient gradientStyle={style.headerCard}>
            <Image style={style.imagePng} source={RewardPNG} />
          </GreenDarkLinearGradient>
        )}
        heading="3 Months Sobriety Check-in Streak">
        <>
          <View style={style.contentStats}>
            <View style={style.alignRow}>
              <PersonSVG />
              <AppText fontSize={10} type="medium" color="#626b9f">
                <>{activeChallenge.participant} Participants</>
              </AppText>
            </View>
            <View style={style.alignRow}>
              <CalenderSVG />
              <AppText fontSize={10} type="medium" color="#626b9f">
                <>{activeChallenge.participant || 0} Months</>
              </AppText>
            </View>
          </View>
          <View style={style.infoChallenge}>
            <AppText fontSize={10} color="#454f84" textAlign="center">
              {activeChallenge.text}
            </AppText>
          </View>
          <ButtonGradient text="Join Challenge" />
        </>
      </DetailCard>
    </CurvedLayout>
  );
}

const style = StyleSheet.create({
  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  headerCard: {
    borderRadius: 30,
    height: Dimensions.get('screen').height * 0.3,
    padding: 30,
    paddingHorizontal: 50,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  content: {
    borderRadius: 50,
    elevation: 20,
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'white',
    marginBottom: 20,
  },

  imagePng: {
    width: Dimensions.get('screen').width * 0.35,
    resizeMode: 'contain',
  },
  contentStats: {
    flexDirection: 'row',
    paddingVertical: 20,
    width: '80%',
    justifyContent: 'space-around',
  },
  infoChallenge: {
    marginBottom: 20,
  },
});
