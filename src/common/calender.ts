import { lastDayOfMonth } from 'date-fns';

export enum DayMapper {
  SU,
  MO,
  TU,
  WE,
  TH,
  FR,
  ST,
}

function getCalender(date = new Date()) {
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const lastDayOnMonth = lastDayOfMonth(date).getDate();

  const Calender: { [x: string]: number[] } = {
    [DayMapper[0]]: [],
    [DayMapper[1]]: [],
    [DayMapper[2]]: [],
    [DayMapper[3]]: [],
    [DayMapper[4]]: [],
    [DayMapper[5]]: [],
    [DayMapper[6]]: [],
  };

  const monthStartDay = new Date(currentYear, currentMonth).getDay(); // 2

  new Array(monthStartDay).fill(0).map((val, i) => Calender[DayMapper[i]].push(val));

  let dayIncremental = monthStartDay;
  for (; dayIncremental < lastDayOnMonth + monthStartDay; dayIncremental++) {
    Calender[DayMapper[dayIncremental % 7]].push(dayIncremental - (monthStartDay - 1));
  }
  new Array(dayIncremental % 7).fill(0).map((val, i) => Calender[DayMapper[(dayIncremental % 7) + i]]?.push(val));
  return Calender;
}

export default getCalender;
