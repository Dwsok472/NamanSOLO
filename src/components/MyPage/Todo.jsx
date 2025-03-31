import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import coupleImg from '../img/lover.png';

// 커플 시작일(예: 2022-01-01)
const COUPLE_START_DATE = new Date(2022, 0, 2, 0, 0, 0, 0);

const CoupleImg = styled.img`
    width: 45%;
    height: 45%;
  `;

function ToDo() {
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

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [yearRangeStart, setYearRangeStart] = useState(currentYear - 2);

  // 일정 추가 모달 열림/닫힘
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ───────────── [핵심 함수들] ─────────────

  // 날짜 배열 생성
  const generateCalendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth+1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();

    const calendarCells = [
      ...Array.from({ length: startDay }),
      ...Array.from({ length: daysInMonth }, (_, i) => new Date(currentYear, currentMonth, i + 1)),
    ];

    return calendarCells.reduce((weeks, day, i) => {
      if (i % 7 === 0) weeks.push([]);
      weeks[weeks.length- 1].push(day);
      return weeks;
    }, []);
  };

  // 현재 달의 주차별 날짜 배열
  const weeks = useMemo(generateCalendar, [currentYear, currentMonth]);

  // 특정 날짜의 이벤트 가져오기
  const getEventsForDay = (date) => {
    if (!date) return [];

    // 📌 자정으로 고정한 셀 날짜
    const cellDate = new Date(date);
    cellDate.setHours(0, 0, 0, 0);
  
    return events.filter(event => {
      const eventDate = new Date(`${event.date}T00:00:00`);
      eventDate.setHours(0, 0, 0, 0);
  
      return cellDate.getTime() === eventDate.getTime();
    });
  };

  // D-Day 계산 (과거는 D+N, 미래는 D-N, 오늘은 D-DAY)
  const getDiffInDays = (dateStr) => {
    // 날짜가 하루 밀리는 문제를 방지하기 위해 "T00:00:00" 붙여서 생성
    const eventDate = new Date(`${dateStr}T00:00:00`);
    eventDate.setHours(0, 0, 0, 0);
    return Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));
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
      <main style={{ display: 'flex', padding: '20px', gap: '20px' }}>

        <section style={{
          flex: '2 1 100%',
          minWidth: '400px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '20px',
          position:'relative'
        }}>
          {/* 오른쪽 영역: 캘린더 + "우리의 기념일" */}
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              padding: '8px 16px',
              backgroundColor: '#ff7f7f',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              zIndex: 10,
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }}
          >
              +
          </button>
          <div
            style={{
              marginBottom: '10px',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            <h3
              onClick={() => setIsPickerOpen(!isPickerOpen)}
              style={{ margin: '0', color: '#333', display: 'inline-block' }}
            >
              {currentYear}년 {currentMonth + 1}월 ⬇
            </h3>
          </div>
          {isPickerOpen && (
            <div
            style={{
              marginBottom: '20px',
              padding: '10px',
              backgroundColor: '#f9f9f9',
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}
          >
            {/* 연도 선택 + 페이지네이션 */}
            <div style={{ marginBottom: '10px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
              <button
                onClick={() => setYearRangeStart(yearRangeStart - 5)}
                style={{
                  padding: '5px 10px',
                  border: '1px solid #ccc',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                ⬅
              </button>
        
              {Array.from({ length: 5 }, (_, i) => yearRangeStart + i).map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  style={{
                    margin: '0 2px',
                    padding: '5px 10px',
                    backgroundColor: year === selectedYear ? '#ffe4e6' : '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {year}
                </button>
              ))}
        
              <button
                onClick={() => setYearRangeStart(yearRangeStart + 5)}
                style={{
                  padding: '5px 10px',
                  border: '1px solid #ccc',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                ➡
              </button>
            </div>
        
            {/* 월 선택 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
                textAlign: 'center'
              }}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setCurrentYear(selectedYear);
                    setCurrentMonth(i);
                    setIsPickerOpen(false);
                  }}
                  style={{
                    padding: '10px 0',
                    backgroundColor:
                      selectedYear === currentYear && i === currentMonth
                        ? '#ffe4e6'
                        : '#fff',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    cursor: 'pointer'
                  }}
                >
                  {i + 1}월
                </div>
              ))}
            </div>
          </div>
        )}
          

          {/* 캘린더 테이블 */}
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
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
                        <td key={dIdx} style={{ border: '1px solid #ccc', height: '100px', verticalAlign: 'top', overflow: 'hidden', padding: '5px',
                          backgroundColor: 'transparent', color: '#333', }}></td>
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
                                fontSize: '0.8rem',
                                whiteSpace: 'nowrap',          // 줄바꿈 방지
                                overflow: 'hidden',            // 넘친 부분 숨김
                                textOverflow: 'ellipsis',      // ... 처리
                                maxWidth: '100%',              // 부모 너비 기준
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

          <div style={{ marginTop: '20px', color: '#333' }}>
            
          </div>
        </section>

        <section style={{
          flex: '1 1 30%',
          backgroundColor: '#ffeef0',
          borderRadius: '10px',
          padding: '20px'
        }}>
          <h3>우리의 기념일</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {events.map((event, index) => {
              const diff = getDiffInDays(event.date);
              return (
                <li
                  key={index}
                  style={{
                    marginBottom: '10px',
                    padding: '10px 0',
                    borderBottom: '1px solid #ccc',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{event.title}</div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                      {diff >= 0 ? `D +${diff}` : `D ${diff}`}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#999' }}>
                      {event.date}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>

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

              <div>
                <label style={{ marginRight: '10px' }}>색상 선택:</label>
                <button
                  type="button"
                  onClick={() => setPaletteOpen(!paletteOpen)}
                  style={{
                    color: '#444', 
                    padding: '5px 10px',
                    cursor: 'pointer',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                    borderRadius: '4px'
                  }}
                >
                  팔레트
                </button>
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
