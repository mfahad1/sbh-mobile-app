import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import CurvedLayout from '../../common/curvedLayout';
import rewardL1RewardPNG from '../../assets/images/rewardsL1.png';
import rewardL2RewardPNG from '../../assets/images/rewardsL2.png';
import rewardL3RewardPNG from '../../assets/images/rewardsL3.png';
import rewardLRewardPNG from '../../assets/images/rewards.png';
import HappySVG from '../../assets/icons/happyActive.svg';
import SadSVG from '../../assets/icons/sadActive.svg';
import { GreenLinearGradient, OrangeLinearGradient, BlueLinearGradient } from '../../common/linerGradients';
import AnxietyScore from './components/AnxietyScore';
import AppText from '../../common/Text/Text';
import adjust from '../../common/adjustPixel';
import { format, isToday, startOfWeek } from 'date-fns';
import { SessionContext } from '../../contexts/session';
import { useDispatch } from 'react-redux';
import { getHistoryAction, getHistoryByIntervalAction, setActiveHistory, IntervalShort } from './redux/history';
import { useAppSelector } from '../../hooks/redux';
import { startOfMonth } from 'date-fns/esm';

type SobrietyCardType = {
  faceType: 'Sad' | 'Happy' | 'Neutral';
  date: Date;
  anxiety: number;
  depression: number;
  craving: number;
  marginVertical?: number;
  navigate: () => void;
};

export function SobrietyCard({ faceType, date, anxiety, depression, craving, marginVertical = 0, navigate }: SobrietyCardType) {
  const [, dispatch] = React.useContext(SessionContext);

  let FaceIcon = (
    <GreenLinearGradient gradientStyle={style.dailyScoreBoxSmiley}>
      <HappySVG style={style.icon} />
    </GreenLinearGradient>
  );

  if (faceType === 'Sad') {
    FaceIcon = (
      <OrangeLinearGradient gradientStyle={style.dailyScoreBoxSmiley}>
        <SadSVG style={style.icon} />
      </OrangeLinearGradient>
    );
  }

  if (faceType === 'Neutral') {
    FaceIcon = (
      <BlueLinearGradient gradientStyle={style.dailyScoreBoxSmiley}>
        <SadSVG style={style.icon} />
      </BlueLinearGradient>
    );
  }

  const dateFormatted = `${format(date, 'EEEE')} , ${format(date, 'dd MMM yyyy')}`;

  const goto = () => {
    dispatch({ type: 'SET_HEADER_TEXT', headerText: 'Sobriety Score' });
    navigate();
  };

  return (
    <TouchableOpacity onPress={goto} style={{ ...style.dailyScoreBox, marginVertical }}>
      <View style={style.dailyScoreBoxHorizontal}>
        {FaceIcon}
        <View>
          <View style={style.horizontal}>
            <AppText fontSize={12} color="#28364f" type="bold">
              {dateFormatted}
            </AppText>
            {isToday(date) && (
              <AppText textAlign="center" paddingVertical={2} paddingHorizontal={5} fontSize={10} color="rgba(40, 54, 79, 0.65)" type="medium">
                (Today)
              </AppText>
            )}
          </View>
          <AppText type="medium" fontSize={10} color="#454f84">
            {faceType}
          </AppText>
        </View>
      </View>
      <View style={style.dailyScoreStatGroup}>
        <View style={style.dailyScoreStat}>
          <AppText paddingHorizontal={10} fontSize={10} color="#454f84" textAlign="center">
            <>Anxiety: {anxiety}</>
          </AppText>
        </View>
        <View style={style.dailyScoreStat}>
          <AppText paddingHorizontal={10} fontSize={10} color="#454f84" textAlign="center">
            <>Depression: {depression}</>
          </AppText>
        </View>
        <View>
          <AppText paddingHorizontal={10} fontSize={10} color="#454f84" textAlign="center">
            <>Carving: {craving}</>
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HistoryScreen({ navigation }: any): JSX.Element {
  const dispatchAction = useDispatch();
  const { history, selectedDate, interval } = useAppSelector((state) => state.history);

  React.useEffect(() => {
    dispatchAction(getHistoryAction());
  }, [dispatchAction]);

  React.useEffect(() => {
    let localDate = selectedDate;
    if (interval === IntervalShort.Month) {
      localDate = format(startOfMonth(new Date(selectedDate)), 'yyyy-MM-dd');
    } else {
      localDate = format(startOfWeek(new Date(selectedDate)), 'yyyy-MM-dd');
    }

    dispatchAction(getHistoryByIntervalAction({ startDate: localDate, interval }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatchAction, interval]);

  React.useEffect(() => {
    dispatchAction(getHistoryByIntervalAction({ startDate: selectedDate, interval }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatchAction, selectedDate]);

  return (
    <CurvedLayout>
      <ScrollView>
        <View style={style.container}>
          <View style={style.currentStats}>
            <View style={{ ...style.currentStatsBox, ...style.boxRightBorder }}>
              <Text style={style.currentStatsText}>Current Checkin Steak</Text>
              <View style={style.currentStatsScoreBox}>
                <View style={{ ...style.oval, ...style.ovalColorBlue }} />
                <Text style={style.currentStatsScore}>{history.streak.current_checkin || 0}</Text>
              </View>
            </View>
            <View style={style.currentStatsBox}>
              <Text style={style.currentStatsText}>Longest Checkin Streak</Text>
              <View style={style.currentStatsScoreBox}>
                <View style={{ ...style.oval, ...style.ovalColorGreen }} />
                <Text style={style.currentStatsScore}>{history.streak.longest_checkin || 0}</Text>
              </View>
            </View>
          </View>

          <AnxietyScore navigate={navigation.navigate} />

          <ScrollView>
            <View style={style.badgeImageBox}>
              <AppText paddingVertical={20} type="bold" fontSize={14}>
                Recent Badges
              </AppText>
              <ScrollView horizontal={true} contentContainerStyle={style.recentBadges}>
                <Image style={style.badgeImage} source={rewardL1RewardPNG} />
                <Image style={style.badgeImage} source={rewardL2RewardPNG} />
                <Image style={style.badgeImage} source={rewardL3RewardPNG} />
                <Image style={style.badgeImage} source={rewardLRewardPNG} />
                <Image style={style.badgeImage} source={rewardLRewardPNG} />
                <Image style={style.badgeImage} source={rewardLRewardPNG} />
                <Image style={style.badgeImage} source={rewardLRewardPNG} />
                <Image style={style.badgeImage} source={rewardLRewardPNG} />
                <Image style={style.badgeImage} source={rewardLRewardPNG} />
              </ScrollView>
            </View>

            <View style={style.paddingHorizontal}>
              <AppText paddingVertical={20} fontSize={14} type="bold">
                Daily Sobriety Score
              </AppText>

              {history.daily_sobriety.length > 0 &&
                history.daily_sobriety.map((daily) => (
                  <SobrietyCard
                    navigate={() => {
                      dispatchAction(setActiveHistory({ data: daily }));
                      navigation.navigate('AnxietyDetail', { daily });
                    }}
                    faceType={daily.feeling}
                    date={new Date(daily.record_date)}
                    anxiety={+daily.anxious}
                    depression={+daily.depressed}
                    craving={+daily.craving}
                    marginVertical={10}
                  />
                ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </CurvedLayout>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('screen').height * 0.12,
  },
  currentStats: {
    borderRadius: 25,
    elevation: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width * 0.75,
    padding: 30,
  },
  currentStatsBox: {
    paddingHorizontal: 20,
  },
  boxRightBorder: {
    borderRightColor: '#96bcff',
    borderRightWidth: 1,
  },
  currentStatsText: {
    fontSize: 10,
    width: Dimensions.get('screen').width * 0.25,
    textAlign: 'center',
    marginBottom: 10,
  },
  currentStatsScoreBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  currentStatsScore: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ovalColorBlue: {
    backgroundColor: '#518cdd',
  },
  ovalColorGreen: {
    backgroundColor: '#39be6b',
  },
  oval: {
    width: 8,
    height: 8,
    borderRadius: 25,
    marginRight: 5,
  },
  recentBadges: {
    flexDirection: 'row',
    marginTop: 10,
  },
  badgeImageBox: {
    paddingTop: 20,
    height: Dimensions.get('screen').height * 0.25,
    paddingHorizontal: 20,
  },
  badgeImage: {
    width: adjust(70),
    height: adjust(70),
    marginHorizontal: 10,
  },
  dailyScoreBox: {
    width: Dimensions.get('screen').width * 0.9,
    elevation: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
    paddingTop: 30,
  },
  horizontal: {
    flexDirection: 'row',
  },
  dailyScoreBoxHorizontal: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  dailyScoreStatGroup: {
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dailyScoreStat: {
    borderRightWidth: 1,
    borderRightColor: '#96bcff',
  },
  dailyScoreBoxSmiley: {
    padding: 15,
    marginRight: 10,
    justifyContent: 'center',
    borderRadius: 15,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  icon: {
    width: 25,
    height: 25,
  },
});
