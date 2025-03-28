import React, { useState } from 'react';

function ToDo({ ddayEvents = [] }) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0부터 시작

  // 현재 월의 첫날과 마지막 날 계산
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay(); // 0:일 ~ 6:토

  // 캘린더 셀을 채우기 위해 앞쪽 빈 칸 채우기
  const calendarCells = [];
  for (let i = 0; i < startDay; i++) {
    calendarCells.push(null);
  }
  // 현재 월 날짜 채우기
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(new Date(currentYear, currentMonth, day));
  }

  // 7일씩 그룹화하여 주 단위 배열 생성
  const weeks = [];
  for (let i = 0; i < calendarCells.length; i += 7) {
    weeks.push(calendarCells.slice(i, i + 7));
  }

  // 해당 날짜에 맞는 이벤트 필터링 (날짜 형식: yyyy-mm-dd)
  const getEventsForDay = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return ddayEvents.filter(event => event.date === dateStr);
  };

  // native Date로 D-Day 차이 계산
  const getDiffInDays = (dateStr) => {
    const eventDate = new Date(dateStr);
    // 두 날짜를 자정으로 맞추기
    const utcToday = Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const utcEvent = Date.UTC(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate()
    );
    return Math.floor((utcEvent - utcToday) / (1000 * 60 * 60 * 24));
  };

  // 월 이동 기능
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={goToPrevMonth}>Prev</button>
        <span>{currentYear} - {currentMonth + 1}</span>
        <button onClick={goToNextMonth}>Next</button>
      </div>
      <table className="calendar-table">
        <thead>
          <tr>
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, idx) => (
            <tr key={idx}>
              {week.map((date, i) => (
                <td key={i} className="calendar-cell" style={{
                  background: date && date.toISOString().split('T')[0] === today.toISOString().split('T')[0]
                    ? '#5b8fbd' : 'transparent'
                }}>
                  {date && (
                    <div>
                      <div className="date-number">{date.getDate()}</div>
                      {getEventsForDay(date).map((event, index) => {
                        const diff = getDiffInDays(event.date);
                        return (
                          <div key={index} className="event-item" style={{
                            background: event.color || '#eee'
                          }}>
                            <div>{event.title}</div>
                            <div style={{ fontSize: '0.8em' }}>
                              {diff === 0 ? 'D-DAY' : `D${diff > 0 ? '-' : '+'}${Math.abs(diff)}`}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ToDo;
