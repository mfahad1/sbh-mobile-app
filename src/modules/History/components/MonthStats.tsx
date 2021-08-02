import { addDays, addMonths, format, getDaysInMonth, getWeekOfMonth, startOfMonth, subMonths } from 'date-fns';
import * as React from 'react';
import { Dimensions, StyleSheet, View, Pressable, TouchableOpacity } from 'react-native';

import ArrowRightSVG from '../../../assets/icons/arrow-right.svg';
import ArrowLeftSVG from '../../../assets/icons/arrow-left.svg';

import AppText from '../../../common/Text/Text';
import { enUS } from 'date-fns/locale';
import getCalender, { DayMapper } from '../../../common/calender';
import { useAppSelector } from '../../../hooks/redux';
import { useDispatch } from 'react-redux';
import { setSelectedDate } from '../redux/history';
import { DailySobriety } from '../../../services/history';
import { anxiousIndicatorColor, cravingIndicatorColor, depressedIndicatorColor } from './AnxietyScore';
import { ApiLoaderWrapper } from '../../../common/apiLoader';
export enum AddOrSubDate {
  add = 'add',
  sub = 'sub',
}

export const MonthSelection = ({ dateAddOrSub, selectedDateCurrent, weekly = false }: { dateAddOrSub: (val: AddOrSubDate) => void; selectedDateCurrent: string; weekly?: boolean }) => {
  const selectedMonth = new Date(selectedDateCurrent);
  let monthDate = '';
  if (enUS && enUS.localize) {
    monthDate = `${enUS.localize.month(selectedMonth.getUTCMonth(), {
      width: 'abbreviated',
    })} ${selectedMonth.getFullYear()} `;
  }
  return (
    <View style={style.monthSelection}>
      <Pressable style={style.calenderMove} onPressIn={() => dateAddOrSub(AddOrSubDate.sub)}>
        <ArrowLeftSVG />
      </Pressable>

      <AppText type="bold" fontSize={14} marginHorizontal={30}>
        {weekly ? `Week ${getWeekOfMonth(new Date(selectedMonth)) - 1}, ${monthDate}` : monthDate}
      </AppText>

      <Pressable style={style.calenderMove} onPressIn={() => dateAddOrSub(AddOrSubDate.add)}>
        <ArrowRightSVG />
      </Pressable>
    </View>
  );
};

function getGreatest(anxious: string, craving: string, depressed: string): 'anxious' | 'craving' | 'depressed' | '' {
  console.log("🚀 ~ file: MonthStats.tsx ~ line 48 ~ getGreatest ~ depressed", depressed)
  console.log("🚀 ~ file: MonthStats.tsx ~ line 48 ~ getGreatest ~ craving", craving)
  console.log("🚀 ~ file: MonthStats.tsx ~ line 48 ~ getGreatest ~ anxious", anxious)
  if (+anxious > 0 && +anxious >= +craving && +anxious >= +depressed) {
    return 'anxious';
  } else if (+craving > 0 && +craving > +anxious && +craving >= +depressed) {
    return 'craving';
  } else if (+depressed > 0 && +depressed > +anxious && +depressed > +craving) {
    return 'depressed';
  }

  return '';
}

export default function MonthStats({ monthSelection = false, onDateSelectInMonth }: { monthSelection?: boolean; onDateSelectInMonth?: (str: number) => void }): JSX.Element {
  const [calender, setCalender] = React.useState(getCalender());
  const [historyDateMapped, setHistoryDateMapped] = React.useState<{ [key: string]: DailySobriety }>();
  const { historyByInterval, selectedDate, loading } = useAppSelector((state) => state.history);

  React.useEffect(() => {
    const dates = [...Array(getDaysInMonth(new Date(selectedDate))).keys()].map((num) => format(addDays(new Date(selectedDate), num), 'yyyy-MM-dd'));

    const _historyDateMapped = dates.reduce<{ [key: string]: DailySobriety }>((acc, curr) => {
      const found = historyByInterval.find((history) => history.record_date === curr);

      acc[curr] = found || { record_date: curr, anxious: '0', craving: '0', depressed: '0', feeling: 'Neutral' };

      return acc;
    }, {});
    setHistoryDateMapped({ ..._historyDateMapped });
  }, [historyByInterval, selectedDate]);

  React.useEffect(() => {
    setCalender(getCalender(new Date(selectedDate)));
  }, [selectedDate]);



  const dispatchAction = useDispatch();

  const dateAddOrSub = (type: AddOrSubDate) => {
    let newDt = startOfMonth(new Date(selectedDate));
    let dt = newDt;

    if (type === AddOrSubDate.add) {
      dt = addMonths(newDt, 1);
    } else {
      dt = subMonths(newDt, 1);
    }

    dispatchAction(setSelectedDate({ selectedDate: format(dt, 'yyyy-MM-dd') }));
  };

  const selectedJsDate = new Date(selectedDate);

  return (
    <>
      {monthSelection && <MonthSelection dateAddOrSub={dateAddOrSub} selectedDateCurrent={selectedDate} />}
      <ApiLoaderWrapper loading={loading}>
        <View style={style.container}>
          {Object.values(DayMapper).map((day, dayIndex) => {
            if (!calender[day]) {
              return null;
            }

            return (
              <View>
                <AppText color="rgba(66, 93, 173, 0.5)" type="medium" fontSize={12} textAlign="center">
                  {day}
                </AppText>
                {calender[day]?.map((date, dateIndex) => {
                  const wholeDate = format(new Date(selectedJsDate.getUTCFullYear(), selectedJsDate.getUTCMonth(), date), 'yyy-MM-dd');



                  let greatest = '';

                  if (historyDateMapped && historyDateMapped[wholeDate]) {
                    greatest = getGreatest(historyDateMapped[wholeDate].anxious, historyDateMapped[wholeDate].craving, historyDateMapped[wholeDate].depressed) as 'anxious' | 'craving' | 'depressed';
                  }



                  return (
                    <TouchableOpacity key={dayIndex + dateIndex} style={style.dateValue} onPress={() => onDateSelectInMonth && onDateSelectInMonth(date)}>
                      <AppText color="#454f84" textAlign="center" type="medium" fontSize={10}>
                        {date || ' '}
                      </AppText>
                      {date ? getIndicator(greatest) : null}
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ApiLoaderWrapper>
    </>
  );
}

const getIndicator = (indicator: 'anxious' | 'depressed' | 'craving') => {
  return <View style={{ ...style.statsIndicatorView, ...style[indicator] }} />;
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  dateValue: {
    backgroundColor: 'rgba(235, 238, 247, 0.4)',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height * 0.055,
  },
  anxious: {
    backgroundColor: anxiousIndicatorColor,
  },
  depressed: {
    backgroundColor: depressedIndicatorColor,
  },
  craving: {
    backgroundColor: cravingIndicatorColor,
  },
  statsIndicatorView: {
    width: 8,
    height: 6,
    borderRadius: 75,
  },
  monthSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },

  calenderMove: {
    backgroundColor: '#e0f7ec',
    borderRadius: 5,
    padding: 10,
  },
});
