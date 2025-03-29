import React, { useState, useMemo } from 'react';

// 커플 시작일(예: 2022-01-01)
const COUPLE_START_DATE = new Date(2022, 0, 1);

function WeArePage() {
  // 오늘 날짜 (00:00 고정)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ───────────── [커플 일수 계산] ─────────────
  const coupleDays = Math.floor((today - COUPLE_START_DATE) / (1000 * 60 * 60 * 24)) + 1;

  // ───────────── [캘린더 & 이벤트 관련 상태] ─────────────
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [events, setEvents] = useState([
    // 예시 일정
    { title: '첫 데이트 기념일', date: '2025-04-02', color: '#ffb6c1' },
    { title: '100일 기념', date: '2025-04-10', color: '#ffc0cb' },
  ]);

  // 새 일정 입력 상태 (기본 색상)
  const [newEvent, setNewEvent] = useState({ title: '', date: '', color: '#ffc0cb' });

  // 팔레트 열림/닫힘 상태
  const [paletteOpen, setPaletteOpen] = useState(false);

  // 8가지 색상 샘플
  const colorSamples = [
    '#ffc0cb', // 핑크
    '#ffb6c1',
    '#ffd700', // 골드
    '#90ee90', // 연두
    '#87cefa', // 라이트블루
    '#dda0dd', // 플럼
    '#ff7f50', // 코랄
    '#b0c4de', // 라이트스틸블루
  ];

  // ───────────── [핵심 함수들] ─────────────
  // 날짜 배열 생성
  const generateCalendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();

    const calendarCells = [
      ...Array.from({ length: startDay }),
      ...Array.from({ length: daysInMonth }, (_, i) => new Date(currentYear, currentMonth, i + 1)),
    ];

    return calendarCells.reduce((weeks, day, i) => {
      if (i % 7 === 0) weeks.push([]);
      weeks[weeks.length - 1].push(day);
      return weeks;
    }, []);
  };

  // 현재 달의 주차별 날짜 배열
  const weeks = useMemo(generateCalendar, [currentYear, currentMonth]);

  // 특정 날짜의 이벤트 가져오기
  const getEventsForDay = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  // D-Day 계산 (과거는 D+N, 미래는 D-N, 오늘은 D-DAY)
  const getDiffInDays = (dateStr) => {
    const eventDate = new Date(dateStr);
    eventDate.setHours(0, 0, 0, 0);
    return Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));
  };

  // 달 이동
  const changeMonth = (offset) => {
    const newDate = new Date(currentYear, currentMonth + offset);
    setCurrentYear(newDate.getFullYear());
    setCurrentMonth(newDate.getMonth());
  };

  // 일정 추가
  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents([...events, newEvent]);
    setNewEvent({ title: '', date: '', color: '#ffc0cb' });
  };

  // 팔레트에서 색상 선택 시
  const handleColorSelect = (color) => {
    setNewEvent({ ...newEvent, color });
    setPaletteOpen(false); // 팔레트 닫기
  };

  // D-Day 문자열 포맷
  const formatDDay = (diff) => {
    if (diff === 0) return 'D-DAY';
    if (diff > 0) {
      return `D-${diff}`;   // 미래
    } else {
      return `D+${Math.abs(diff)}`; // 과거
    }
  };

  // ───────────── [스타일/레이아웃 예시] ─────────────
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', maxWidth: '1200px', margin: '0 auto' }}>
      {/* ───────────── 메인 컨테이너 ───────────── */}
      <main style={{ display: 'flex', flexWrap: 'wrap', padding: '20px', gap: '20px' }}>
        
        {/* 왼쪽 영역: 커플 카드 + 팔레트 버튼 */}
        <section style={{
          flex: '1 1 300px',
          minWidth: '280px',
          backgroundColor: '#ffeef0',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <h2 style={{ marginBottom: '10px' }}>
            {coupleDays}일째
          </h2>
          <p style={{ fontSize: '1.1rem', margin: '5px 0' }}>
            김동인 ♡ 박서진
          </p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            {COUPLE_START_DATE.toISOString().split('T')[0]} 시작
          </p>

          {/* 팔레트 열기 버튼 */}
          

          {/* 팔레트 패널 (팔레트 버튼 클릭 시 토글) */}
          
        </section>

        {/* 오른쪽 영역: 캘린더 + "우리의 기념일" */}
        <section style={{
          flex: '2 1 600px',
          minWidth: '400px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '20px'
        }}>
          {/* 캘린더 헤더 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => changeMonth(-1)} style={{ cursor: 'pointer' }}>⬅ Prev</button>
            <h3 style={{ margin: '0' }}>
              {currentYear}년 {currentMonth + 1}월
            </h3>
            <button onClick={() => changeMonth(1)} style={{ cursor: 'pointer' }}>Next ➡</button>
          </div>

          {/* 캘린더 테이블 */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <th
                    key={day}
                    style={{
                      border: '1px solid #ccc',
                      textAlign: 'center',
                      backgroundColor: '#fff0f2',
                      padding: '5px'
                    }}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, wIdx) => (
                <tr key={wIdx}>
                  {week.map((date, dIdx) => {
                    if (!date) {
                      // 비어있는 셀
                      return (
                        <td key={dIdx} style={{ border: '1px solid #ccc', height: '80px' }}></td>
                      );
                    }
                    const isToday = date.toISOString().split('T')[0] === today.toISOString().split('T')[0];
                    return (
                      <td
                        key={dIdx}
                        style={{
                          border: '1px solid #ccc',
                          height: '80px',
                          verticalAlign: 'top',
                          padding: '5px',
                          backgroundColor: isToday ? '#ffe4e6' : 'transparent'
                        }}
                      >
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                          {date.getDate()}
                        </div>
                        {/* 해당 날짜 이벤트 목록 */}
                        {getEventsForDay(date).map((event, i) => {
                          const diff = getDiffInDays(event.date);
                          return (
                            <div
                              key={i}
                              style={{
                                backgroundColor: event.color || '#ffc0cb',
                                color: '#333',
                                borderRadius: '4px',
                                padding: '2px 4px',
                                marginBottom: '2px',
                                fontSize: '0.8rem'
                              }}
                            >
                              <div>{event.title}</div>
                              <div>{formatDDay(diff)}</div>
                            </div>
                          );
                        })}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {/* '우리의 기념일' 섹션 */}
          <div style={{ marginTop: '20px' }}>
            <h3>우리의 기념일</h3>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {events.map((event, index) => {
                const diff = getDiffInDays(event.date);
                return (
                  <li key={index} style={{ marginBottom: '5px' }}>
                    <strong>{event.title}</strong> - {event.date} / {formatDDay(diff)}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* 일정 추가 / D-DAY 목록 */}
        <section style={{
          flex: '1 1 100%',
          backgroundColor: '#ffeef0',
          borderRadius: '10px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
            {/* 일정 추가 폼 */}
            <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
              <h3>일정 추가</h3>
              <form onSubmit={handleAddEvent} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="D-Day 제목"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                  style={{ padding: '5px' }}
                />
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  required
                  style={{ padding: '5px' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label>
                  {paletteOpen && (
                      <div
                        style={{
                          backgroundColor: '#fff',
                          border: '1px solid #ccc',
                          borderRadius: '8px',
                          padding: '10px',
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '10px',
                          zIndex: 100,
                        }}
                      >
                        {colorSamples.map((color) => (
                          <div
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            style={{
                              width: '30px',
                              height: '30px',
                              backgroundColor: color,
                              borderRadius: '4px',
                              cursor: 'pointer',
                              border: '2px solid #fff'
                            }}
                            title={color}
                          />
                        ))}
                      </div>
                    )}
                    <button
                            onClick={() => setPaletteOpen(!paletteOpen)}
                            style={{
                              margin: '0 5px',
                              padding: '5px 10px',
                              cursor: 'pointer',
                              border: '1px solid #ccc',
                              backgroundColor: '#fff',
                              borderRadius: '4px'
                            }}
                          >
            색상 팔레트
                    </button>색상:
                  </label>
                  {/* 현재 선택된 색상 미리보기 */}
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: newEvent.color,
                      border: '2px solid #fff',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                <button type="submit" style={{ padding: '5px', cursor: 'pointer' }}>
                  추가
                </button>
              </form>
            </div>

            {/* D-Day 목록 */}
            <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
              <h3>D-DAY</h3>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {events.map((event, index) => {
                  const diff = getDiffInDays(event.date);
                  return (
                    <li key={index} style={{ marginBottom: '5px' }}>
                      <strong>{event.title}</strong> ({event.date}) - {formatDDay(diff)}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default WeArePage;
