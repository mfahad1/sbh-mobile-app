import * as React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import { GreenDarkLinearGradient } from '../../../common/linerGradients';
import AppText from '../../../common/Text/Text';
import WeekStats from './WeekStats';
import MonthStats from './MonthStats';
import { SessionContext } from '../../../contexts/session';
import { useAppSelector } from '../../../hooks/redux';
import { IntervalShort, setInterval } from '../redux/history';
import { useDispatch } from 'react-redux';

export const anxiousIndicatorColor = '#2cd0ef';
export const depressedIndicatorColor = '#4381ff';
export const cravingIndicatorColor = '#a091ff';

enum IntervalValue {
  Week = 'Week',
  Month = 'Month',
}

const IntervalShortToLong = {
  [IntervalShort.Week]: IntervalValue.Week,
  [IntervalShort.Month]: IntervalValue.Month,
};

function showGradientOrNormal(value: IntervalValue, selected = false, setInterval: (val: IntervalValue) => void): JSX.Element {
  if (selected) {
    return (
      <GreenDarkLinearGradient gradientStyle={style.interval}>
        <AppText type="bold" color="white" fontSize={10}>
          {value}
        </AppText>
      </GreenDarkLinearGradient>
    );
  }

  return (
    <TouchableOpacity style={style.intervalUnselected} onPress={() => setInterval(value)}>
      <AppText type="bold" color="#454f84" fontSize={10}>
        {value}
      </AppText>
    </TouchableOpacity>
  );
}

export default function AnxietyScore({ navigate }: any): JSX.Element {
  const [, dispatch] = React.useContext(SessionContext);
  const { interval } = useAppSelector((state) => state.history);
  const dispatchAction = useDispatch();

  const navigateToAnxiety = () => {
    dispatch({ type: 'SET_HEADER_TEXT', headerText: 'Anxiety & Depression' });

    navigate('AnxietyHistory');
  };
  const selectedInterval = IntervalValue[IntervalShortToLong[interval]];

  const setSelectedInterval = (val: IntervalValue) => {
    dispatchAction(setInterval({ interval: IntervalShort[val] }));
  };

  return (
    <View>
      <AppText paddingVertical={20} type="bold" fontSize={14}>
        Anxiety Score
      </AppText>
      <View style={style.card}>
        <View style={style.intervalSelector}>
          {showGradientOrNormal(IntervalValue.Week, selectedInterval === IntervalValue.Week, setSelectedInterval)}
          {showGradientOrNormal(IntervalValue.Month, selectedInterval === IntervalValue.Month, setSelectedInterval)}
        </View>

        {selectedInterval === IntervalValue.Week && <WeekStats />}
        {selectedInterval === IntervalValue.Month && <MonthStats />}

        <View style={style.statsAnxiety}>
          <View style={style.row}>
            <View style={{ ...style.statsIndicatorView, ...style.anxiousIndicator }} />
            <AppText type="medium" fontSize={10}>
              Anxious
            </AppText>
          </View>
          <View style={style.row}>
            <View style={{ ...style.statsIndicatorView, ...style.depressedIndicator }} />

            <AppText type="medium" fontSize={10}>
              Depressed
            </AppText>
          </View>

          <View style={style.row}>
            <View style={{ ...style.statsIndicatorView, ...style.cravingIndicator }} />

            <AppText type="medium" fontSize={10}>
              Craving
            </AppText>
          </View>
        </View>

        <TouchableOpacity style={style.viewMore} onPress={navigateToAnxiety}>
          <AppText fontSize={10}>{'View More >>'}</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  card: {
    elevation: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    width: Dimensions.get('screen').width * 0.9,
    padding: 20,
  },

  intervalSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  interval: {
    padding: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  intervalUnselected: {
    padding: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  statsAnxiety: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  statsIndicatorView: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginRight: 5,
  },
  anxiousIndicator: {
    backgroundColor: anxiousIndicatorColor,
  },

  depressedIndicator: {
    backgroundColor: depressedIndicatorColor,
  },

  cravingIndicator: {
    backgroundColor: cravingIndicatorColor,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMore: {
    alignSelf: 'flex-end',
  },
});
