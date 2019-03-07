export interface DateLibrary {
  add: (amount: number, scope: 'day' | 'month' | any) => DateLibrary;
  subtract: (amount: number, scope: 'day' | 'month' | any) => DateLibrary;
  startOf: (scope: 'month' | any) => DateLibrary;
  endOf: (scope: 'month' | any) => DateLibrary;
  format: (format: string) => string;
  daysInMonth: () => number;
  day: () => number;
  [key: string]: any;
}

export interface DayProps {
  day: DateLibrary;
}

export interface CalendarProps {
  source: DateLibrary;
  children?: (groupedDays: DateLibrary[][]) => React.ReactElement;
  calendarWrapper?: React.ComponentType;
  weekWrapper?: React.ComponentType;
  day?: React.ComponentType<DayProps>;
  startOfWeek?: number;
  jalali?: boolean;
}
