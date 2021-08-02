import { addWeeks, format, getDay, subWeeks } from 'date-fns';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { ApiLoaderWrapper } from '../../../common/apiLoader';
import { DayMapper } from '../../../common/calender';
import AppText from '../../../common/Text/Text';
import { useAppSelector } from '../../../hooks/redux';
import { setSelectedDate } from '../redux/history';
import { AddOrSubDate, MonthSelection } from './MonthStats';

const defaultRodHeight = 150;
const anxiousIndicatorColor = '#0175c8';
const depressedIndicatorColor = '#518cdd';
const cravingIndicatorColor = '#96bcff';

const getRodeStated = (color: string, percent: number, bottom: number, left: number) => {
  return {
    position: 'absolute',
    bottom: defaultRodHeight * (bottom / 100),
    left,
    backgroundColor: color,
    height: defaultRodHeight * (percent / 100),
  };
};

type GetRodeStateInfoType = {
  craving: number;
  depressed: number;
  anxious: number;
  left: number;
};

const GetRodeStateInfo = ({ craving, depressed, anxious, left }: GetRodeStateInfoType) => {
  return (
    <>
      <View style={style.rode} />
      <View style={{ ...style.rode, ...getRodeStated(cravingIndicatorColor, craving, 0, left) }} />
      <View
        style={{
          ...style.rode,
          ...getRodeStated(depressedIndicatorColor, depressed ? depressed + 10 : 0, craving ? craving - 10 : 0, left),
        }}
      />
      <View
        style={{
          ...style.rode,
          ...getRodeStated(anxiousIndicatorColor, anxious ? anxious + 15 : 0, depressed || craving ? depressed + craving - 15 : 0, left),
        }}
      />
    </>
  );
};

export default function WeekStats({ monthSelection = false }: { monthSelection?: boolean }): JSX.Element {
  const { historyDateMapped, historyDates, selectedDate, loading } = useAppSelector((state) => state.history);

  const dispatchAction = useDispatch();

  const dateAddOrSub = (type: AddOrSubDate) => {
    let dt = new Date(selectedDate);

    if (type === AddOrSubDate.add) {
      dt = addWeeks(new Date(selectedDate), 1);
    } else {
      dt = subWeeks(new Date(selectedDate), 1);
    }

    dispatchAction(setSelectedDate({ selectedDate: format(dt, 'yyyy-MM-dd') }));
  };

  return (
    <>
      {monthSelection && <MonthSelection dateAddOrSub={dateAddOrSub} selectedDateCurrent={selectedDate} weekly={true} />}
      <ApiLoaderWrapper loading={loading}>
        <View style={style.fixedWidth}>
          <View style={style.weekStats}>
            {historyDates.map((day, index) => {
              const left = 20 + index * 2 + 45 * index;

              return (
                <GetRodeStateInfo
                  key={index}
                  craving={+historyDateMapped[day].craving * 10}
                  depressed={+historyDateMapped[day].depressed * 10}
                  anxious={+historyDateMapped[day].anxious * 10}
                  left={left}
                />
              );
            })}
          </View>
          <View style={style.daysRow}>
            {historyDates.map((day) => (
              <AppText key={day} fontSize={10}>
                {DayMapper[getDay(new Date(day))]}
              </AppText>
            ))}
          </View>
        </View>
      </ApiLoaderWrapper>
    </>
  );
}

const style = StyleSheet.create({
  weekStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 332,
  },
  rode: {
    backgroundColor: '#dae0ef',
    height: defaultRodHeight,
    width: 10,
    marginVertical: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  fixedWidth: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
});
