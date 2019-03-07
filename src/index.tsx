import * as React from 'react';

import { getSourceInfo, createCalendar } from './utils/calendar';
import { slice } from './utils/array';
import { CalendarProps } from './types';

const SimpleContainer: React.SFC = ({ children }) => <>{children}</>;

const Calendar: React.SFC<CalendarProps> = ({
  source,
  calendarWrapper: CalendarWrapper = SimpleContainer,
  weekWrapper: WeekWrapper = SimpleContainer,
  day: Day,
  startOfWeek = 0,
  jalali,
  children,
}) => {
  (window as any).a = source;
  console.log({ source, $C: source.$C });
  const { daysInMonth, firstDay } = getSourceInfo(source);
  const groupedDays = slice(
    createCalendar({
      source,
      daysInMonth,
      firstDay,
      startOfWeek: jalali ? 6 : startOfWeek,
    }),
    7,
  );

  if (children) {
    return children(groupedDays);
  }

  return (
    <CalendarWrapper>
      {groupedDays.map((week: CalendarProps['source'][]) => (
        <WeekWrapper
          key={`calendar-week-${week[0].format('YYYY-MM-DD')}-${Math.random()}`}
        >
          {week.map((day: CalendarProps['source']) => (
            <Day
              key={`calendar-day-${day.format('YYYY-MM-DD')}-${Math.random()}`}
              day={day}
            />
          ))}
        </WeekWrapper>
      ))}
    </CalendarWrapper>
  );
};

export default Calendar;
