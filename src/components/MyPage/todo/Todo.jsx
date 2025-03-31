import React, { useState } from 'react';
import styled from 'styled-components';
import AddAnniversaryPopup from './addtodo';
import AddTravelPopup from './addtravel';

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
  padding: 20px;
  position: relative;
`;

const CalendarHeader = styled.div`
  margin-bottom: 10px;
  text-align: center;
  cursor: pointer;
  position: relative;
`;

const AddTravelButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 6px 14px;
  background-color: #6fa8dc;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
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
  border-collapse: collapse;
  table-layout: fixed;
`;

const StyledTh = styled.th`
  border: 1px solid #ccc;
  background-color: #fff0f2;
  padding: 5px;
`;

const StyledTd = styled.td`
  border: 1px solid #ccc;
  padding: 5px;
  background-color: ${({ $isToday }) => ($isToday ? '#ffe4e6' : 'transparent')};
`;

const DayCell = styled.div`
  font-weight: bold;
`;

const EventBox = styled.div`
  background-color: ${({ color }) => color};
  padding: 2px 4px;
  margin-bottom: 2px;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
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
  top: 10px;
  right: 10px;
  padding: 8px 16px;
  background-color: #ff7f7f;
  color: #fff;
  border: none;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
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

function ToDo() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const coupleDays = Math.floor((today - new Date(2022, 0, 1)) / (1000 * 60 * 60 * 24));

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [events, setEvents] = useState([
    { title: '첫 데이트 기념일', date: '2025-04-02', color: '#ffb6c1' },
    { title: '100일 기념', date: '2025-04-10', color: '#ffc0cb' },
  ]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', color: '#ffc0cb' });
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
    return diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
  };

  return (
    <Wrapper>
      <Main>
        <CalendarSection>
          <CalendarHeader onClick={() => setIsPickerOpen(!isPickerOpen)}>
            <h3>{currentYear}년 {currentMonth + 1}월 ⬇</h3>
            <AddTravelButton onClick={(e) => { e.stopPropagation(); setIsTravelModalOpen(true); }}>+</AddTravelButton>
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
            {events.map((event, idx) => (
              <ListItem key={idx}>
                <div>{event.title}</div>
                <div>
                  <div>{getDiffInDays(event.date) >= 0 ? `D-${getDiffInDays(event.date)}` : `D+${getDiffInDays(event.date)}`}</div>
                  <ListDate>{event.date}</ListDate>
                </div>
              </ListItem>
            ))}
          </List>
        </AnniversarySection>
      </Main>

      
      <AddAnniversaryPopup
        name="기념일 추가"
        onClose={() => {
          setIsModalOpen(false);
          setAnniversaryPaletteOpen(false);
        }}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        paletteOpen={anniversaryPaletteOpen}
        setPaletteOpen={setAnniversaryPaletteOpen}
        colorSamples={colorSamples}
        onSubmit={(e) => {
          e.preventDefault();
          setEvents([...events, newEvent]);
          setNewEvent({ title: '', date: '', color: '#ffc0cb' });
          setIsModalOpen(false);
          setAnniversaryPaletteOpen(false);
        }}
      />

        <AddTravelPopup
          name="여행 추가"
          onClose={() => { setIsTravelModalOpen(false);     setTravelPaletteOpen(false);
          }}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          paletteOpen={travelPaletteOpen}
          setPaletteOpen={setTravelPaletteOpen}
          colorSamples={colorSamples}
          onSubmit={(e) => {
            e.preventDefault();
            setEvents([...events, newEvent]);
            setNewEvent({ title: '', date: '', color: '#ffc0cb' });
            setIsModalOpen(false);
            setTravelPaletteOpen(false);
          }}
        />
    </Wrapper>
  );
}

export default ToDo;
