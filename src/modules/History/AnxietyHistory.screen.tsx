import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { GreyLinearGradient } from '../../common/linerGradients';
import CurvedLayout from '../../common/curvedLayout';
import { colors } from '../../styles/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import AppText from '../../common/Text/Text';
import WeekStats from './components/WeekStats';
import MonthStats from './components/MonthStats';
import { SobrietyCard } from './History.screen';
import { useDispatch } from 'react-redux';
import { IntervalShort, setActiveHistory, setInterval } from './redux/history';
import { useAppSelector } from '../../hooks/redux';
import { DailySobriety } from '../../services/history';
import { getDate } from 'date-fns';
import { useFocusEffect } from '@react-navigation/core';

function showGradientOrNormal(value: IntervalValue, selected = false, setRating: (val: IntervalValue) => void): JSX.Element {
  if (selected) {
    return (
      <TouchableOpacity onPress={() => setRating(value)}>
        <GreyLinearGradient gradientStyle={style.tabButton}>
          <AppText type="bold" color={colors.textActive} fontSize={12}>
            {value}
          </AppText>
        </GreyLinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={style.tabButton} onPress={() => setRating(value)}>
      <AppText type="bold" fontSize={12} color={colors.white}>
        {value}
      </AppText>
    </TouchableOpacity>
  );
}
enum IntervalValue {
  Week = 'Week',
  Month = 'Month',
}
const IntervalShortToLong = {
  [IntervalShort.Week]: IntervalValue.Week,
  [IntervalShort.Month]: IntervalValue.Month,
};

export default function AnxietyHistory({ navigation }: any): JSX.Element {
  const dispatchAction = useDispatch();
  const [selectedDateToDisplayCard, setSelectedDateToDisplayCard] = React.useState<number>();
  const { interval, historyByInterval, selectedDate } = useAppSelector((state) => state.history);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      return () => {
        setSelectedDateToDisplayCard(undefined);
      };
    }, []),
  );

  React.useEffect(() => {
    setSelectedDateToDisplayCard(undefined);
  }, [selectedDate]);

  const selectedInterval = IntervalValue[IntervalShortToLong[interval]];

  const setSelectedInterval = (val: IntervalValue) => {
    setSelectedDateToDisplayCard(undefined);
    dispatchAction(setInterval({ interval: IntervalShort[val] }));
  };

  const onDateSelectInMonth = (date: number) => {
    setSelectedDateToDisplayCard(date);
  };

  const filterBySelectedDate = (daily: DailySobriety) => {
    if (!selectedDateToDisplayCard) {
      return daily;
    }

    const dailyDate = getDate(new Date(daily.record_date));

    if (dailyDate === selectedDateToDisplayCard) {
      return daily;
    }
  };

  return (
    <CurvedLayout>
      <View style={style.container}>
        <View style={style.tabbar}>
          {showGradientOrNormal(IntervalValue.Week, selectedInterval === IntervalValue.Week, setSelectedInterval)}
          {showGradientOrNormal(IntervalValue.Month, selectedInterval === IntervalValue.Month, setSelectedInterval)}
        </View>

        <ScrollView style={style.width} contentContainerStyle={style.containerContent}>
          <View style={style.statsDisplay}>
            {selectedInterval === IntervalValue.Week && <WeekStats monthSelection={true} />}
            {selectedInterval === IntervalValue.Month && <MonthStats monthSelection={true} onDateSelectInMonth={onDateSelectInMonth} />}
          </View>
          {historyByInterval.length > 0 &&
            historyByInterval.filter(filterBySelectedDate).map((daily, key) => (
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
                key={key}
              />
            ))}
        </ScrollView>
      </View>
    </CurvedLayout>
  );
}

const style = StyleSheet.create({
  width: {
    width: Dimensions.get('screen').width,
  },
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  containerContent: {
    alignItems: 'center',
  },

  tabbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Dimensions.get('screen').height * 0.05,
    paddingTop: Dimensions.get('screen').height * 0.18,
  },
  tabButton: {
    paddingHorizontal: '10%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 50,
    marginHorizontal: 10,
  },

  statsDisplay: {
    elevation: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    width: Dimensions.get('screen').width * 0.9,
    padding: 20,
    marginBottom: 20,
  },
});
