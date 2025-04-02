import React, { useState } from 'react';
import styled from 'styled-components';
import Addtodo from './Addtodo';
import Addtravel from './Addtravel';
import { IconEdit, IconClose } from '../../Icons';
import leftThought from '../../img/leftThought.png';
import LeftKey from '../../img/leftkey.png';
import RightKey from '../../img/rightkey.png';
import Edittodo from './Edittodo';
import Edittravel from './Edittravel'
import DetailTravel from './Detailtravel';

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

  &:focus {
    outline: none;
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
  align-items: center;
  gap: 12px;
`;

const YearArrow = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const YearButton = styled.button`
  background-color: ${({ $active }) => ($active ? '#ffe4e6' : '#fff')};
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #ffedf0;
  }

  &:focus {
    outline: none;
  }
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
  table-layout: fixed;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  tr{
    border: 0.5px solid black;
  }
`;

const StyledTh = styled.th`
  border: 0.5px solid black;
  padding: 8px 0;
  background-color: #fff0f2;
  font-weight: 600;
  color: #444;
  text-align: center;
  height: 20px;
  &:first-child {
    border: 0.5 solid black;
  }
`;

const StyledTd = styled.td`
  background-color: ${({ $isToday }) => ($isToday ? '#ffe4e6' : '#fff')};
  padding: 2px;
  vertical-align: top;
  text-align: right;
  height: 105px;
  border: 0.5px solid black;
`;

const DayCell = styled.div`
  font-weight: bold;
  font-size: 1rem;
`;

const EventBox = styled.div`
  background-color: ${({ color }) => color || '#ffc0cb'};
  padding: 4px 6px;
  margin: 0 auto;
  border-radius: 2px;
  font-size: 0.7rem;
  line-height: 0.8;
  
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

const EditButton = styled.button`
  position: absolute;
  top: 0px;
  left: 8px;
  background-color: #ffeef0;
  border: none;
  width: 10px;
  height: 10px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0; // 텍스트 크기 제거
  cursor: pointer;

  svg {
    width: 10px;
    height: 10px;
  }

  &:focus {
    outline: none;
  }
`;

const IconButton = styled(EditButton)`
  left : -2px;
`;

const AddButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 48px;
  height: 48px;
  padding: 0;
  font-size: 1.2rem;
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

  &:focus {
    outline: none;
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
  position: relative;
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
    { id:1, title: '첫 데이트', date: '2025-04-02', color: '#ffb6c1', type:'anniversary' },
    { id:2, title: '100일', date: '2025-04-10', color: '#ffc0cb', type:'anniversary' },
  ]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [editingTodoEvent, setEditingTodoEvent] = useState(null);
  const [editingTravelEvent, setEditingTravelEvent] = useState(null);
  const [newAnniversaryEvent, setNewAnniversaryEvent] = useState({ id:events.length+1, title: '', date: '', color: '#ffc0cb', type:'anniversary' });
  const [newTravelEvent, setNewTravelEvent] = useState({ id: events.length+1, title: '', date: '', color: '#87cefa', type:'travel', images: [] });
  const [viewingTravelEvent, setViewingTravelEvent] = useState(null);
  const [anniversaryPaletteOpen, setAnniversaryPaletteOpen] = useState(false);
  const [travelPaletteOpen, setTravelPaletteOpen] = useState(false);  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [yearRangeStart, setYearRangeStart] = useState(currentYear - 2);

  const handleUpdate = (updatedEvent) => {
    setEvents(events.map(event =>
      event.id === updatedEvent.id
      ? updatedEvent
      : event
    ));
    setEditingTodoEvent(null);
  };

  const handleDelete = (eventToDelete) => {
    const confirmDelete = window.confirm(`${eventToDelete.title}, 이 일정을 정말 삭제하시겠어요?`);
    if (!confirmDelete) return;

    setEvents(events.filter(event => event !== eventToDelete));
  };

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
      if (event.type === 'anniversary') {
      const eventDate = new Date(`${event.date}T00:00:00`);
      return eventDate.getTime() === cellDate.getTime();
    }

      if (event.type === 'travel') {
        const start = new Date(`${event.startDate}T00:00:00`);
        const end = new Date(`${event.endDate}T00:00:00`);
        return start <= cellDate && cellDate <= end;
      }

      return false;
    });
  };

  const getDiffInDays = (dateStr) => {
    const eventDate = new Date(`${dateStr}T00:00:00`);
    eventDate.setHours(0, 0, 0, 0);
    return Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));
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
                <YearArrow src={LeftKey} onClick={() => setYearRangeStart(yearRangeStart - 5)}/>
                {Array.from({ length: 5 }, (_, i) => yearRangeStart + i).map(year => (
                  <YearButton
                    key={year}
                    $active={year === selectedYear}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </YearButton>
                ))}
                <YearArrow src={RightKey} onClick={() => setYearRangeStart(yearRangeStart + 5)}/>
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
                            onClick={() => event.type === 'anniversary' ? setEditingTodoEvent(event) : setViewingTravelEvent(event) }
                          >
                            <div>{event.title}</div>
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
            {events.filter(e => e.type === 'anniversary').map((event, idx) => {
              let isHovered = false;
              if (hoveredItem === idx) {
                isHovered = true;
              }
              
              let isEditing = false;
              if (editingTodoEvent === idx) {
                isEditing = true;
              }

              return (
              <ListItem
                key={idx}
                onMouseEnter={() => setHoveredItem(idx)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div>{event.title}</div>
                <div>
                  <div>{getDiffInDays(event.date) >= 0 ? getDiffInDays(event.date) == 0 ? `D - Day` :`D - ${getDiffInDays(event.date)}` : `D + ${Math.abs(getDiffInDays(event.date))}`}</div>
                  <ListDate>{event.date}</ListDate>
                </div>
      
                {isHovered && (
                  <>
                    <IconButton onClick={() => handleDelete(event)}>
                      <IconClose />
                    </IconButton>
                    <EditButton onClick={() => setEditingTodoEvent({...event})}>
                      <IconEdit />
                    </EditButton>
                  </>
                )}
              </ListItem>
            )})}
          </List>
        </AnniversarySection>
      </Main>

      {isModalOpen && (
        <Addtodo
          name="기념일 일정 추가"
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
              id: events.length + 1,
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

      {editingTodoEvent && (
        <Edittodo
          event={editingTodoEvent}
          setEvent={setEditingTodoEvent}
          onClose={() => setEditingTodoEvent(null)}
          onSubmit={(e) => {
            e.preventDefault();

            handleUpdate(editingTodoEvent);
          }}
          paletteOpen={anniversaryPaletteOpen}
          setPaletteOpen={setAnniversaryPaletteOpen}
          colorSamples={colorSamples}
        />
      )}

      {viewingTravelEvent && (
        <DetailTravel
          event={viewingTravelEvent}
          onClose={() => setViewingTravelEvent(null)}
          onEdit={() => {
            setEditingTravelEvent(viewingTravelEvent);
            setViewingTravelEvent(null); // detail view는 닫기
          }}
        />
      )}

      {editingTravelEvent && (
        <Edittravel
          event={editingTravelEvent}
          setEvent={setEditingTravelEvent}
          onClose={() => setEditingTravelEvent(null)}
          onSubmit={(e) => {
            e.preventDefault();

            const start = new Date(editingTravelEvent.startDate);
            const end = new Date(editingTravelEvent.endDate);
          
            if (start > end) {
              alert('종료일은 시작일보다 빠를 수 없습니다!');
              return;
            }
          
            setEvents(events.map(ev => (
              ev.id === editingTravelEvent.id ? editingTravelEvent : ev
            )));
          
            setEditingTravelEvent(null);
          }}
          paletteOpen={travelPaletteOpen}
          setPaletteOpen={setTravelPaletteOpen}
          colorSamples={colorSamples}
        />
      )}  

      {isTravelModalOpen && (
        <Addtravel
          name="여행 일정 추가"
          onClose={() => { setIsTravelModalOpen(false); setTravelPaletteOpen(false); }}
          newEvent={newTravelEvent}
          setNewEvent={setNewTravelEvent}
          paletteOpen={travelPaletteOpen}
          setPaletteOpen={setTravelPaletteOpen}
          colorSamples={colorSamples}
          
          onSubmit={(e) => {
            e.preventDefault();
          
            const start = new Date(newTravelEvent.startDate);
            const end = new Date(newTravelEvent.endDate);

            if (start > end) {
              alert('종료일은 시작일보다 빠를 수 없습니다!');
              return;
            }
          
            const travelEvent = {
              id: events.length + 1,
              title: newTravelEvent.title,
              startDate: newTravelEvent.startDate,
              endDate: newTravelEvent.endDate,
              color: newTravelEvent.color,
              images: newTravelEvent.images || [],
              type: 'travel'
            };

            setEvents([...events, travelEvent]);
            setNewTravelEvent({ title: '', startDate: '', endDate: '', color: '#ffc0cb', images: [], type: 'travel' });
            setIsTravelModalOpen(false);
            setTravelPaletteOpen(false);
          }}
        />
      )}
    </Wrapper>
  );
}

export default Todo;
