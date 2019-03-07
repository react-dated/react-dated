# react-dated

> Fully customizable React calendar/date-picker

[![NPM](https://img.shields.io/npm/v/react-dated.svg)](https://www.npmjs.com/package/react-dated) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-dated
```

## Usage

You can use `react-dated` with render props or by providing JSX elements that
would receive `children` and `day` object, customizing them however you want.

```jsx
import React from 'react';
import dayjs from 'dayjs';
import ReactDated from 'react-dated';

class Example extends React.Component {
  state = {
    source: dayjs(),
  };

  render() {
    return (
      <ReactDated source={this.state.source}>
        {calendar =>
          calendar.map(week => (
            <div className="week">
              {week.map(day => (
                <span className="day">{day.format('DD')}</span>
              ))}
            </div>
          ))
        }
      </ReactDated>
    );
  }
}
```

```jsx
import React from 'react';
import dayjs from 'dayjs';
import ReactDated from 'react-dated';

class Example extends React.Component {
  state = {
    source: dayjs(),
  };

  render() {
    return (
      <ReactDated
        source={this.state.source}
        weekWrapper={({ children }) => <div className="week">{children}</div>}
        day={({ day }) => <span>{day.format('DD')}</span>}
      />
    );
  }
}
```

## Documentation

ReactDated is a very simple calendar that is only responsible for generating the
base calendar. That is to say it just generates the days in the month, prepends
and appens the generated array with days from previous and next month until it
can show weeks filled with dates. In order to do so the component requires a
`source`.

The `source` is a [Day.js](https://github.com/iamkun/dayjs) instance, although
it's not necessary to use that library. As long as the given source instance has
a shape like [DateLibrary](./src/types/index.ts#L1), everything should work just
fine.

Along with the `source`, `weekWrapper` and `day` are required for rendering the
actual calendar. These are React components that are supplied by `children` (JSX
element) and `day` (instances deriven from `source` representing the date)
respectively. You can also use render props directly inside the `ReactDated`
component as shown in the first example.

Also you can provide `startOfWeek` (integer) to change the start of week, and
causing the first item in array of days have the day value of that number. For
example to have Saturday (which has a dayIndex number of 6) as start of your
week, set this variable to `6`. There is a shortcut for the Saturday example,
just set `jalali` prop (boolean, default to true if provided).

Please refer to our example application for usage ideas.

## License

MIT © [mpourismaiel](https://github.com/mpourismaiel)
