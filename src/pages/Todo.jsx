import React, { useState, useMemo } from 'react';

// 커플 시작일(예: 2022-01-01)
const COUPLE_START_DATE = new Date(2022, 0, 0);

function ToDo() {
  // 오늘 날짜 (00:00 고정)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ───────────── [커플 일수 계산] ─────────────
  const coupleDays = Math.floor((today - COUPLE_START_DATE) / (1000 * 60 * 60 * 24));

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

  // 일정 추가 모달 열림/닫힘
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    // 날짜가 하루 밀리는 문제를 방지하기 위해 "T00:00:00" 붙여서 생성
    const eventDate = new Date(`${dateStr}T00:00:00`);
    eventDate.setHours(0, 0, 0, 0);
    return Math.floor((eventDate - today) / (1000 * 60 * 60 * 24)) + 1;
  };

  // D-Day 문자열 포맷
  const formatDDay = (diff) => {
    if (diff === 0) return '오늘';
    if (diff > 0) {
      return `${diff}일 후`;   // 미래
    } else {
      return `${Math.abs(diff)}일 전`; // 과거
    }
  };

  // 달 이동
  const changeMonth = (offset) => {
    const newDate = new Date(currentYear, currentMonth + offset);
    setCurrentYear(newDate.getFullYear());
    setCurrentMonth(newDate.getMonth());
  };

  // 팔레트에서 색상 선택 시
  const handleColorSelect = (color) => {
    setNewEvent({ ...newEvent, color });
    setPaletteOpen(false); // 팔레트 닫기
  };

  // 일정 추가 (모달 내부 폼 전송)
  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents([...events, newEvent]);
    setNewEvent({ title: '', date: '', color: '#ffc0cb' });
    setIsModalOpen(false); // 일정 추가 후 모달 닫기
  };

  // ───────────── [스타일/레이아웃 예시] ─────────────
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', maxWidth: '1200px', margin: '0 auto' }}>
      {/* ───────────── 메인 컨테이너 ───────────── */}
      <main style={{ display: 'flex', flexWrap: 'wrap', padding: '20px', gap: '20px' }}>
        
        {/* 왼쪽 영역: 커플 카드 */}
        <section style={{
          flex: '1 1 300px',
          minWidth: '280px',
          backgroundColor: '#ffeef0',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <h2 style={{ marginBottom: '10px', color: '#333' }}>
            {coupleDays}일째
          </h2>
          <p style={{ fontSize: '1.1rem', margin: '5px 0', color: '#555' }}>
            김동인 ♡ 박서진
          </p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            {COUPLE_START_DATE.toISOString().split('T')[0]} 시작
          </p>

          {/* 사람 아이콘 (예시) */}
          <div style={{ marginTop: '10px' }}>
            <img
              src="./components/img/lover.png" // 실제 아이콘 경로로 교체
              alt="Couple Icon"
              style={{ width: '60px', height: '60px' }}
            />
          </div>

          {/* 일정 추가 모달 열기 버튼 */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            일정 추가
          </button>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <button onClick={() => changeMonth(-1)} style={{ cursor: 'pointer', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', padding: '5px' }}>
              ⬅ Prev
            </button>
            <h3 style={{ margin: '0', color: '#333' }}>
              {currentYear}년 {currentMonth + 1}월
            </h3>
            <button onClick={() => changeMonth(1)} style={{ cursor: 'pointer', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', padding: '5px' }}>
              Next ➡
            </button>
          </div>

          {/* 캘린더 테이블 */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                  <th
                    key={day}
                    style={{
                      border: '1px solid #ccc',
                      textAlign: 'center',
                      backgroundColor: '#fff0f2',
                      padding: '5px',
                      color: '#333'
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
                    const dateStr = date.toISOString().split('T')[0];
                    const isToday = dateStr === today.toISOString().split('T')[0];
                    return (
                      <td
                        key={dIdx}
                        style={{
                          border: '1px solid #ccc',
                          height: '80px',
                          verticalAlign: 'top',
                          padding: '5px',
                          backgroundColor: isToday ? '#ffe4e6' : 'transparent',
                          color: '#333'
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
          <div style={{ marginTop: '20px', color: '#333' }}>
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

        {/* D-DAY 목록 (하단) */}
        <section style={{
          flex: '1 1 100%',
          backgroundColor: '#ffeef0',
          borderRadius: '10px',
          padding: '20px'
        }}>
          <h3 style={{ color: '#333' }}>D-DAY 목록</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0, color: '#333' }}>
            {events.map((event, index) => {
              const diff = getDiffInDays(event.date);
              return (
                <li key={index} style={{ marginBottom: '5px' }}>
                  <strong>{event.title}</strong> ({event.date}) - {formatDDay(diff)}
                </li>
              );
            })}
          </ul>
        </section>
      </main>

      {/* ───────────── [일정 추가 모달] ───────────── */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          {/* 모달 내부 */}
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              width: '300px',
              maxWidth: '80%',
              color: '#333'
            }}
          >
            <h2>일정 추가</h2>
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

              {/* 색상 선택 영역 */}
              <div>
                <label style={{ marginRight: '10px' }}>색상 선택:</label>
                <button
                  type="button"
                  onClick={() => setPaletteOpen(!paletteOpen)}
                  style={{
                    padding: '5px 10px',
                    cursor: 'pointer',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                    borderRadius: '4px'
                  }}
                >
                  팔레트
                </button>
                {/* 현재 선택된 색상 미리보기 */}
                <div
                  style={{
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    marginLeft: '10px',
                    backgroundColor: newEvent.color,
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    verticalAlign: 'middle'
                  }}
                />
              </div>

              {/* 팔레트 패널 */}
              {paletteOpen && (
                <div
                  style={{
                    position: 'absolute',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '10px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginTop: '10px',
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '5px 10px',
                    cursor: 'pointer',
                    backgroundColor: '#ccc',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  취소
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '5px 10px',
                    cursor: 'pointer',
                    backgroundColor: '#ffb6c1',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToDo;
