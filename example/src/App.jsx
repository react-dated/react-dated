import React, { useState } from 'react';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday-forked';

import Calendar from 'react-dated';

dayjs.extend(jalaliday);
dayjs.locale('en');

const Wrapper = ({ source, setSource, title, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', margin: '0 10px' }}>
    <h4 style={{ padding: '0 10px' }}>{title}</h4>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 10px',
        marginBottom: 20,
      }}
    >
      <h3 style={{ margin: 0 }}>{`Month: ${source.format('YYYY MMM')}`}</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button
          title="Previous Month"
          onClick={e => {
            e.preventDefault();
            setSource(source.subtract(1, 'month'));
          }}
        >
          {'<'}
        </button>
        <button
          title="Next Month"
          onClick={e => {
            e.preventDefault();
            setSource(source.add(1, 'month'));
          }}
        >
          {'>'}
        </button>
      </div>
    </div>
    {children}
  </div>
);

const renderWeekdays = weekdays => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    {weekdays.map(d => (
      <span
        style={{
          padding: '5px 10px',
        }}
      >
        {d}
      </span>
    ))}
  </div>
);

const normalCalendar = (source, setSource) => (
  <Wrapper source={source} setSource={setSource} title="Normal mode">
    {renderWeekdays(['S', 'M', 'T', 'W', 'T', 'F', 'S'])}
    <Calendar
      source={source}
      weekWrapper={({ children }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {children}
        </div>
      )}
      day={({ day }) => (
        <span
          style={{
            color: day.month() === source.month() ? 'black' : 'gray',
            padding: '5px 10px',
          }}
        >
          {day.format('DD')}
        </span>
      )}
    />
  </Wrapper>
);

const renderPropsCalendar = (source, setSource) => (
  <Wrapper source={source} setSource={setSource} title="Using render prop">
    {renderWeekdays(['S', 'M', 'T', 'W', 'T', 'F', 'S'])}
    <Calendar source={source}>
      {calendar =>
        calendar.map(week => (
          <div
            key={`render-props-week-${week[0].format('DD')}-${Math.random()}`}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {week.map(day => (
              <span
                key={`render-props-day-${day.format('DD')}-${Math.random()}`}
                style={{
                  color: day.month() === source.month() ? 'black' : 'gray',
                  padding: '5px 10px',
                }}
              >
                {day.format('DD')}
              </span>
            ))}
          </div>
        ))
      }
    </Calendar>
  </Wrapper>
);

const jalaliCalendar = (source, setSource) => (
  <Wrapper source={source} setSource={setSource} title="Using Jalali plugin">
    {renderWeekdays(['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'])}
    <Calendar
      jalali
      source={source}
      weekWrapper={({ children }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {children}
        </div>
      )}
      day={({ day }) => {
        return (
          <span
            style={{
              color: day.month() === source.month() ? 'black' : 'gray',
              padding: '5px 10px',
            }}
          >
            {day.format('DD')}
          </span>
        );
      }}
    />
  </Wrapper>
);

const App = () => {
  const [source, setSource] = useState(dayjs().startOf('month'));
  const [source2, setSource2] = useState(dayjs().startOf('month'));
  const [source3, setSource3] = useState(
    dayjs()
      .locale('fa')
      .calendar('jalali')
      .startOf('month'),
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 20,
        width: 900,
        margin: '0 auto',
        flexWrap: 'nowrap',
      }}
    >
      {normalCalendar(source, setSource)}
      {renderPropsCalendar(source2, setSource2)}
      {jalaliCalendar(source3, setSource3)}
    </div>
  );
};

export default App;
