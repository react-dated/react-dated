import { CalendarProps } from '../types';

export const getSourceInfo = (source: CalendarProps['source']) => {
  return {
    daysInMonth: source.daysInMonth(),
    firstDay: source.startOf('month').day(),
  };
};

export const createCalendar = ({
  source,
  daysInMonth,
  firstDay,
  startOfWeek,
}: {
  source: CalendarProps['source'];
  daysInMonth: number;
  firstDay: number;
  startOfWeek: number;
}) => {
  const days: CalendarProps['source'][] = [];
  const shift =
    firstDay === startOfWeek
      ? 0
      : firstDay + (startOfWeek === 0 ? 0 : 7 - startOfWeek);
  let tmpDay = source.startOf('month').subtract(shift, 'day');
  const totalDays = daysInMonth + shift;
  const remaining = totalDays % 7;
  for (let i = 0; i < totalDays + (remaining > 0 ? 7 - remaining : 0); i++) {
    days.push(tmpDay);
    tmpDay = tmpDay.add(1, 'day');
  }
  return days;
};
