import React, { useState } from 'react';
import styled from 'styled-components';
import Addtodo from './Addtodo';
import Addtravel from './Addtravel';

const Wrapper = styled.div`
  font-family: sans-serif;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
`;

const Main = styled.main`
  display: flex;
  padding: 20px;
  gap: 20px;
`;

const CalendarSection = styled.section`
  flex: 2 1 100%;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
`;

const CalendarHeader = styled.h3`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 6px;
  cursor: pointer;
`;

const AddTravelButton = styled.button`
  position: absolute;
  top: 0;
  right: 0px;
  width: 48px;
  height: 48px;
  padding: 0;
  background-color: #ff7f7f;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    font-weight: 700;
    box-shadow: none;
  }
`;

const YearPickerWrap = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const YearButtons = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  gap: 5px;
`;

const YearButton = styled.button`
  background-color: ${({ $active }) => ($active ? '#ffe4e6' : '#fff')};
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const MonthBox = styled.div`
  padding: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 4px; // 셀 사이 간격 부드럽게
  table-layout: fixed;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
`;

const StyledTh = styled.th`
  padding: 8px 0;
  background-color: #fff0f2;
  font-weight: 600;
  color: #444;
  border-radius: 8px;
  text-align: center;
`;

const StyledTd = styled.td`
  background-color: ${({ $isToday }) => ($isToday ? '#ffe4e6' : '#fff')};
  padding: 10px 5px;
  border-radius: 10px;
  vertical-align: top;
  text-align: right;
`;

const DayCell = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 4px;
`;

const EventBox = styled.div`
  background-color: ${({ color }) => color || '#ffc0cb'};
  padding: 4px 6px;
  margin: 2px 0;
  border-radius: 6px;
  font-size: 0.75rem;
  line-height: 1.1;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AnniversarySection = styled.section`
  flex: 1 1 30%;
  background-color: #ffeef0;
  border-radius: 10px;
  padding: 20px;
  position: relative;
`;

const AddButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 48px;
  height: 48px;
  padding: 0;
  font-size: 1.5rem;
  background-color: #ff7f7f;
  color: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    font-weight: 700;
    box-shadow: none;
  }
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
`;

const ListDate = styled.div`
  font-size: 0.75rem;
  color: #999;
`;

function Todo() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [events, setEvents] = useState([
    { title: '첫 데이트', date: '2025-04-02', color: '#ffb6c1', type:'anniversary' },
    { title: '100일', date: '2025-04-10', color: '#ffc0cb', type:'anniversary' },
  ]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newAnniversaryEvent, setNewAnniversaryEvent] = useState({ title: '', date: '', color: '#ffc0cb', type:'anniversary' });
  const [newTravelEvent, setNewTravelEvent] = useState({ title: '', date: '', color: '#87cefa', type:'travel' });
  const [anniversaryPaletteOpen, setAnniversaryPaletteOpen] = useState(false);
  const [travelPaletteOpen, setTravelPaletteOpen] = useState(false);  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [yearRangeStart, setYearRangeStart] = useState(currentYear - 2);

  const colorSamples = ['#ffc0cb', '#ffb6c1', '#ffd700', '#90ee90', '#87cefa', '#dda0dd', '#ff7f50', '#b0c4de'];

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

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

  const getEventsForDay = (date) => {
    if (!date) return [];
    const cellDate = new Date(date);
    cellDate.setHours(0, 0, 0, 0);
    return events.filter((event) => {
      const eventDate = new Date(`${event.date}T00:00:00`);
      eventDate.setHours(0, 0, 0, 0);
      return cellDate.getTime() === eventDate.getTime();
    });
  };

  const getDiffInDays = (dateStr) => {
    const eventDate = new Date(`${dateStr}T00:00:00`);
    eventDate.setHours(0, 0, 0, 0);
    return Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));
  };

  const formatDDay = (diff) => {
    if (diff === 0) return '오늘';
    return diff > 0 ? `D - ${diff}` : `D + ${Math.abs(diff)}`;
  };

  return (
    <Wrapper>
      <Main>
        <CalendarSection>
          <CalendarHeader onClick={() => setIsPickerOpen(!isPickerOpen)}>
            {currentYear}년 {currentMonth + 1}월 ⬇
            <AddTravelButton
              onClick={(e) => { e.stopPropagation(); setIsTravelModalOpen(true); }}
            >
              +
            </AddTravelButton>
          </CalendarHeader>

          {isPickerOpen && (
            <YearPickerWrap>
              <YearButtons>
                <button onClick={() => setYearRangeStart(yearRangeStart - 5)}>⬅</button>
                {Array.from({ length: 5 }, (_, i) => yearRangeStart + i).map(year => (
                  <YearButton
                    key={year}
                    $active={year === selectedYear}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </YearButton>
                ))}
                <button onClick={() => setYearRangeStart(yearRangeStart + 5)}>➡</button>
              </YearButtons>
              <MonthGrid>
                {Array.from({ length: 12 }, (_, i) => (
                  <MonthBox
                    key={i}
                    onClick={() => {
                      setCurrentYear(selectedYear);
                      setCurrentMonth(i);
                      setIsPickerOpen(false);
                    }}
                  >
                    {i + 1}월
                  </MonthBox>
                ))}
              </MonthGrid>
            </YearPickerWrap>
          )}

          <StyledTable>
            <thead>
              <tr>
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                  <StyledTh key={day}>{day}</StyledTh>
                ))}
              </tr>
            </thead>
            <tbody>
              {generateCalendar().map((week, wIdx) => (
                <tr key={wIdx}>
                  {week.map((date, dIdx) => {
                    if (!date) return <StyledTd key={dIdx} />;
                    const dateStr = date.toISOString().split('T')[0];
                    const isToday = dateStr === today.toISOString().split('T')[0];
                    return (
                      <StyledTd key={dIdx} $isToday={isToday}>
                        <DayCell>{date.getDate()}</DayCell>
                        {getEventsForDay(date).map((event, i) => (
                          <EventBox
                            key={i}
                            color={event.color}
                            onClick={() => setEditingEvent(event)}
                          >
                            <div>{event.title}</div>
                            <div>{formatDDay(getDiffInDays(event.date))}</div>
                          </EventBox>
                        ))}
                      </StyledTd>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </CalendarSection>

        <AnniversarySection>
          <AddButton onClick={() => setIsModalOpen(true)}>+</AddButton>
          <h3>우리의 기념일</h3>
          <List>
            {events.filter(event => event.type === 'anniversary').map((event, idx) => (
              <ListItem key={idx}>
                <div>{event.title}</div>
                <div>
                  <div>{getDiffInDays(event.date) >= 0 ? `D - ${getDiffInDays(event.date)}` : `D + ${getDiffInDays(event.date)}`}</div>
                  <ListDate>{event.date}</ListDate>
                </div>
              </ListItem>
            ))}
          </List>
        </AnniversarySection>
      </Main>

      {isModalOpen && (
        <Addtodo
          name="기념일 추가"
          onClose={() => {
            setIsModalOpen(false);
            setAnniversaryPaletteOpen(false);
          }}
          newEvent={newAnniversaryEvent}
          setNewEvent={setNewAnniversaryEvent}
          paletteOpen={anniversaryPaletteOpen}
          setPaletteOpen={setAnniversaryPaletteOpen}
          colorSamples={colorSamples}
          onSubmit={(e) => {
            e.preventDefault();
            
            const eventToAdd = {
              title: newAnniversaryEvent.title,
              date: newAnniversaryEvent.date,
              color: newAnniversaryEvent.color,
              type: 'anniversary',
            };
          
            setEvents([...events, eventToAdd]);
            setNewAnniversaryEvent({ title: '', date: '', color: '#ffc0cb', type: 'anniversary' });
            setIsModalOpen(false);
            setAnniversaryPaletteOpen(false);
          }}
        />
      )}

      {isTravelModalOpen && (
        <Addtravel
          name="여행 추가"
          onClose={() => { setIsTravelModalOpen(false);     setTravelPaletteOpen(false);
          }}
          newEvent={newTravelEvent}
          setNewEvent={setNewTravelEvent}
          paletteOpen={travelPaletteOpen}
          setPaletteOpen={setTravelPaletteOpen}
          colorSamples={colorSamples}
          onSubmit={(e) => {
            e.preventDefault();

            const eventToAdd = {
              title: newTravelEvent.title,
              date: newTravelEvent.startDate, // 📌 캘린더 렌더링용
              startDate: newTravelEvent.startDate,
              endDate: newTravelEvent.endDate,
              color: newTravelEvent.color,
              type: 'travel'
            };

            setEvents([...events, eventToAdd ]);
            setNewTravelEvent({ title: '', startDate: '', endDate: '', color: '#ffc0cb', type: 'travel' });
            setIsTravelModalOpen(false);
            setTravelPaletteOpen(false);
          }}
        />
      )}
    </Wrapper>
  );
}

export default Todo;
