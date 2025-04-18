import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Addtodo from './Addtodo';
import Addtravel from './Addtravel';
import { IconEdit, IconClose } from '../../Icons';
import DetailTodo from './Detailtodo';
import leftThought from '../../img/leftThought.png';
import Plus from '../../img/add.png';
import LeftKey from '../../img/leftkey.png';
import RightKey from '../../img/rightkey.png';
import Edittodo from './Edittodo';
import Edittravel from './Edittravel'
import DetailTravel from './Detailtravel';
import Rotate from '../../img/rotate.png';
import { createAnniversary, deleteAnniversary, deleteTravelMedia, fetchAnniversaries, fetchTravels, handleCreateTravelMedia, handleUpdateTravelMedia, updateAnniversary } from '../../api2';

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

  filter: ${({ $blur }) => ($blur ? 'blur(3px)' : 'none')};
  pointer-events: ${({ $blur }) => ($blur ? 'none' : 'auto')};
`;

const LeftPanel = styled.div`
  max-height: 610px; 
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CalendarSection = styled.section`
  flex: 2 1 100%;
  background-color: #fff;
  max-height: 650px;
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
  font-size: 22px;
  transform: scale(0.9);
  transition: 0.2s ease;

  &:hover {
    transform: scale(1.0);
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
    font-weight: 600;
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
  justify-content: center;       
  align-items: center;
  display: flex;  
  padding: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #ffedf0;
    font-weight: 600;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  border: 0.5px solid #6b5c5c;

  thead tr:first-child th:first-child {
    border-top-left-radius: 6px;
  }

  thead tr:first-child th:last-child {
    border-top-right-radius: 6px;
  }

  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 6px;
  }

  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 6px;
  }
`;

const StyledTh = styled.th`
  border: 0.5px solid #6b5c5c;
  padding: 8px;
  background-color: #fff0f2;
  color: #333;
  text-align: center;
`;

const StyledTd = styled.td`
  border: 0.5px solid #6b5c5c;
  padding: 4px;
  height: 100px;
  vertical-align: top;
  text-align: center;
  background-color: ${({ $isToday }) => ($isToday ? '#ffe4e6' : '#fff')};
`;

const DayCell = styled.div`
  text-align: right;
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
  
  div {
    ${({ $isHovered }) =>
      $isHovered &&
      `
        color: #c900c9;
        font-size: 0.8rem;
        font-weight: 700;
        text-decoration: underline;
      `}
  }
`;

const TopArea = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e0cfcf;
  background-color: #ffeef0;
  flex-shrink: 0;
`;

const AnniversarySection = styled.section`
  flex: 1 1 30%;
  min-width: 221px;
  background-color: #ffeef0;
  border-radius: 10px;
  padding: 20px;
  position: relative;
  overflow: auto;
  max-height: 610px;

  img {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

const BottomArea = styled.div`
  padding: 10px 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffeef0;
  flex-shrink: 0;
`;

const SectionH3 = styled.h3`
  cursor: ${({ activeSection }) => (activeSection != 'anniversary'||'travel' ? 'default' : 'pointer')};
  text-align: center;
  font-weight: bold;
  font-size: 1.0rem;
  margin-bottom: 10px;
  user-select: none;
  transition: 0.2s;
  img {
    &:hover {
      filter: brightness(0.1) invert(0.5);
      cursor: pointer;
    }
  }
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
  font-size: 0; 
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
  width: 32px;
  height: 32px;
  padding: 0;
  background-color: #ff7f7f;
  color: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;

  &:hover {
    box-shadow: none;
  }

  &:focus {
    outline: none;
  }
`;

const AddButtonImage = styled.img`
  filter: brightness(0) invert(1);
  width: 18px;
  height: 18px;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ViewAllButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  color: #c41c1c;
  border: 1px solid #c41c1c;
  border-radius: 8px;
  padding: 6px 12px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background-color: #c41c1c;
    color: #fff;
  }
`;

const ListItem = styled.li`
  font-weight: 700;
  padding: 4px 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  position: relative;

  div.eventTitle {
    font-size: 0.9rem;
    white-space: nowrap;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
  }

  div.day {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: -1%;
    line-height: 1.2;
    div.diff {
      color: #333;
      font-size: 0.85rem;
    }
  }
`;

const ListDate = styled.div`
  text-align: right;
  font-size: 0.65rem;
  color: #999;
`;

function Todo({ meetingDate }) {
  // const { user, setEvents } = useUserStore();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const annivs = await api2.fetchAnniversaries();
  //       const travels = await api2.fetchTravels();
  //       setEvents([...annivs, ...travels]);
  //     } catch (e) {
  //       console.error('초기 데이터 로딩 실패:', e);
  //     }
  //   };
  //   fetchData();
  // }, []); // 빈 배열이면 최초 로드 시 한 번 실행됨

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [showAllEvents, setShowAllEvents] = useState(false);

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const [annivs, travels] = await Promise.all([
          fetchAnniversaries(),
          fetchTravels(),
        ]);
    
        setEvents([...annivs, ...travels]);
      } catch (e) {
        console.error('초기 데이터 로딩 실패', e);
      }
    };
  
    loadEvents();
  }, []);
  
  useEffect(() => {
    const loadEvents = async () => {
      const annivs = await fetchAnniversaries();
      const travels = await fetchTravels();
      setEvents([...annivs, ...travels]);
    }
    if (meetingDate) {
      loadEvents();
    }
  }, [meetingDate]);

  // const [events, setEvents] = useState([
  //   { id:1, title: '첫 데이트', start_date: '2025-04-02', color: '#ffb6c1', type:'anniversary', editable:true },
  //   { id:2, title: '100일', start_date: '2025-07-07', color: '#ffc0cb', type:'anniversary', editable:false },
  // ]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [editingTodoEvent, setEditingTodoEvent] = useState(null);
  const [editingTravelEvent, setEditingTravelEvent] = useState(null);
  const [newAnniversaryEvent, setNewAnniversaryEvent] = useState({ id: events.length+1, title: '', start_date: '', end_date: '', color: '#ffc0cb', type:'anniversary', editable:true });
  const [newTravelEvent, setNewTravelEvent] = useState({ id: events.length+1, title: '', start_date: '', end_date: '', color: '#87cefa', type:'travel', images: [], editable:true });
  const [viewTodoEvent, setViewTodoEvent] = useState(null);
  const [viewTravelEvent, setViewTravelEvent] = useState(null);
  const [anniversaryPaletteOpen, setAnniversaryPaletteOpen] = useState(false);
  const [travelPaletteOpen, setTravelPaletteOpen] = useState(false);  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [yearRangeStart, setYearRangeStart] = useState(currentYear - 2);

  const handleUpdate = async (updatedEvent) => {
    try {
      let updated;
      if (updatedEvent.type.toLowerCase() === "anniversary") {
        updated = await updateAnniversary(updatedEvent.id, updatedEvent);
      } else {
        updated = await handleUpdateTravelMedia(updatedEvent.id, updatedEvent);
      }
      setEvents(events.map(event => event.id === updated.id ? updated : event));
      setEditingTodoEvent(null);
      setEditingTravelEvent(null);
    } catch (e) {
      console.error('수정 실패:', e);
    }
  };

  const handleDelete = async (eventToDelete) => {
    const confirmDelete = window.confirm(`${eventToDelete.title} ${eventToDelete.type.toLowerCase() === 'anniversary' ? '기념일' : '여행'} 일정을 정말 삭제하시겠어요?`);
    if (!confirmDelete) return;

    try {
      if (eventToDelete.type.toLowerCase() === 'anniversary') {
        await deleteAnniversary(eventToDelete.id);
      } else {
        await deleteTravelMedia(eventToDelete.id);
      }
      setEvents(events.filter(event => event !== eventToDelete));
    } catch (e) {
      console.error('삭제 실패:', e);
    }
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
  
    while (calendarCells.length % 7 !== 0) {
      calendarCells.push(null);
    }
  
    return calendarCells.reduce((weeks, day, i) => {
      if (i % 7 === 0) weeks.push([]);
      weeks[weeks.length - 1].push(day);
      return weeks;
    }, []);
  };

  const [hoveringEventId, setHoveringEventId] = useState(null);

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const getEventsForDay = (date) => {
      if (!date) return [];

    const cellDateStr = formatDate(date); // 🧠 요거!

    const matching = events.filter((event) => {
      if (!showAllEvents && event.type.toLowerCase() !== activeSection) return false;

      const eventStart = event.start_date;
      const eventEnd = event.end_date;

      const isMatch = (
        eventStart <= cellDateStr &&
        cellDateStr <= eventEnd
      );

      return isMatch;
    });

    return matching;
  };

  const getDiffInDays = (dateStr) => {
    const event_date = new Date(`${dateStr}T00:00:00`);
    event_date.setHours(0, 0, 0, 0);
    return Math.floor((event_date - today) / (1000 * 60 * 60 * 24));
  };

  const [activeSection, setActiveSection] = useState('anniversary');

  return (
    <>
      <Wrapper onClick={() => {
          if (isModalOpen) {setIsModalOpen(false);} if (isTravelModalOpen) {setIsTravelModalOpen(false);} if (viewTravelEvent) {setViewTravelEvent(false);}
          if (editingTodoEvent) {setEditingTodoEvent(false);} if (viewTodoEvent) {setViewTodoEvent(false);} if (editingTravelEvent) {setEditingTravelEvent(false);}}}>
        <Main $blur={ isModalOpen || isTravelModalOpen || editingTodoEvent || editingTravelEvent || viewTodoEvent || viewTravelEvent } >
          <LeftPanel>
            <CalendarSection>
              <CalendarHeader onClick={() => setIsPickerOpen(!isPickerOpen)}>
                {currentYear}년 {currentMonth + 1}월 {isPickerOpen? '▲' : '▼'}
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
                        if (!date) {return <StyledTd key={dIdx} />};
                        const dateStr = date.toISOString().split('T')[0];
                        const isToday = dateStr === today.toISOString().split('T')[0];
                        return (
                          <StyledTd key={dIdx} $isToday={isToday}>
                            <DayCell>{date.getDate()}</DayCell>
                            {getEventsForDay(date).map((event, i) => (
                              <EventBox
                                key={i}
                                color={event.color}
                                className={`${event.type.toLowerCase()}${event.id}`}
                                onMouseEnter={() => setHoveringEventId(event.id)}
                                onMouseLeave={() => setHoveringEventId(null)}
                                $isHovered={hoveringEventId === event.id}
                                onClick={() => event.type.toLowerCase() === 'anniversary' ? (event.editable ? setViewTodoEvent(event) : null) : setViewTravelEvent(event) }
                              >
                                <div title={event.type.toLowerCase() === 'travel' ? `${event.title} ${event.start_date} ~ ${event.end_date}` : (!event.editable?`첫 만남일을 기준으로 계산된 날짜는 변경할 수 없습니다.`:`${event.title} ${event.start_date}`)}>{event.title}</div>
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
          </LeftPanel>

          <AnniversarySection>
            

            <SectionH3>
              {showAllEvents ? '전체 일정' : (activeSection === 'anniversary' ? '기념일' : '데이트')} {showAllEvents? <></> :<img src={Rotate} 
                onClick={() => {
                  if (!showAllEvents) {
                    setActiveSection(activeSection === 'anniversary' ? 'travel' : 'anniversary');
                  }
                }}/>}
            </SectionH3>

            <List>
              {(showAllEvents ? events : events.filter(e => e.type.toLowerCase() === activeSection)).map((event, idx) => {

                const diffDays = getDiffInDays(
                  event.type.toLowerCase() === 'anniversary' ? event.start_date : event.start_date
                );

                return (
                  <ListItem
                    title={`${ event.type.toLowerCase() === 'anniversary'?
                    (!event.editable ? '첫 만남일을 기준으로 계산된 날짜는 변경할 수 없습니다.' : event.title + ' ' + event.start_date) 
                    : event.title + ' ' + event.start_date+' ~ '+event.end_date }`}
                    key={idx}
                    onMouseEnter={() => setHoveredItem(idx)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className='eventTitle'>{event.title}</div>
                    <div className='day'>
                      <div className='diff'>
                        {diffDays >= 0
                          ? diffDays === 0
                            ? 'Today'
                            : `D -${diffDays}`
                          : `D +${Math.abs(diffDays)}`}
                      </div>
                      <ListDate>
                        {event.type.toLowerCase() === 'anniversary'
                          ? event.start_date
                          : <> {event.start_date} <br />~ {event.end_date} </> }
                      </ListDate>
                    </div>

                    {hoveredItem === idx && event.editable && (
                      <>
                        <IconButton onClick={() => handleDelete(event)}>
                          <IconClose />
                        </IconButton>
                        <EditButton
                          onClick={() =>
                            event.type.toLowerCase() === 'anniversary'
                              ? setEditingTodoEvent({ ...event })
                              : setEditingTravelEvent({ ...event })
                          }
                        >
                          <IconEdit />
                        </EditButton>
                      </>
                    )}
                  </ListItem>
                );
              })}
                
            </List>
            {!showAllEvents && (
              <AddButton onClick={() => {
                activeSection === 'anniversary'
                  ? setIsModalOpen(true)
                  : setIsTravelModalOpen(true)
              }}>
                <AddButtonImage src={Plus} />
              </AddButton>
            )}
            <ViewAllButton onClick={() => setShowAllEvents(prev => !prev)}>
              {showAllEvents
                ? `${activeSection === 'anniversary' ? '기념일' : '데이트'} 보기`
                : '전체보기'}
            </ViewAllButton>
          </AnniversarySection>
        </Main>

        {viewTodoEvent && (
          <DetailTodo
            event={viewTodoEvent}
            onClose={() => setViewTodoEvent(null)}
            onEdit={() => {
              setEditingTodoEvent(viewTodoEvent);
              setViewTodoEvent(null);
            }}
          />
        )}

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
            onSubmit={async (e) => {
              e.preventDefault();

              const eventToAdd = {
                title: newAnniversaryEvent.title,
                startDate: newAnniversaryEvent.start_date,
                endDate:newAnniversaryEvent.end_date,
                color: newAnniversaryEvent.color,
                type: newAnniversaryEvent.type,
              };
            
              try {
                const created = await createAnniversary(eventToAdd);
                setEvents([...events, created]);
                setNewAnniversaryEvent({ title: '', start_date: '', end_date:'', color: '#ffc0cb', type: 'ANNIVERSARY' });
                setIsModalOpen(false);
                setAnniversaryPaletteOpen(false);
              } catch (err) {
                console.error("❌ 기념일 추가 실패:", err);
                alert("서버에서 기념일 등록 중 문제가 발생했습니다!");
              }
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
        
              const updatedEvent = {
                ...editingTodoEvent,
                type: editingTodoEvent.type.toUpperCase() || 'ANNIVERSARY',
              };
        
              handleUpdate(updatedEvent);
            }}
            paletteOpen={anniversaryPaletteOpen}
            setPaletteOpen={setAnniversaryPaletteOpen}
            colorSamples={colorSamples}
          />
        )}

        {viewTravelEvent && (
          <DetailTravel
            event={viewTravelEvent}
            onClose={() => setViewTravelEvent(null)}
            onEdit={() => {
              setEditingTravelEvent(viewTravelEvent);
              setViewTravelEvent(null);
            }}
          />
        )}

        {editingTravelEvent && (
          <Edittravel
            event={editingTravelEvent}
            setEvent={setEditingTravelEvent}
            onClose={() => setEditingTravelEvent(null)}
            onSubmit={
              async (e) => {
                e.preventDefault();
              
                const start = new Date(editingTravelEvent.start_date);
                const end = new Date(editingTravelEvent.end_date);
              
                if (start > end) {
                  alert('종료일은 시작일보다 빠를 수 없습니다!');
                  return;
                }
              
                try {
                  const updated = await handleUpdateTravelMedia(editingTravelEvent.id, editingTravelEvent);
                  setEvents(events.map(ev => ev.id === updated.id ? updated : ev));
                  setEditingTravelEvent(null);
                } catch (err) {
                  console.error('🚨 여행 일정 수정 실패:', err);
                  alert('수정 중 오류 발생!');
                }
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
            
            onSubmit={async (e) => {
              e.preventDefault();
            
              const start = new Date(newTravelEvent.start_date);
              const end = new Date(newTravelEvent.end_date);

              if (start > end) {
                alert('종료일은 시작일보다 빠를 수 없습니다!');
                return;
              }

              try {
                const created = await handleCreateTravelMedia(newTravelEvent);
                setEvents([...events, created]);

                setNewTravelEvent({
                  title: '',
                  start_date: '',
                  end_date: '',
                  color: '#ffc0cb',
                  images: [],
                  editable: true,
                  type: 'TRAVEL',
                });

                setIsTravelModalOpen(false);
                setTravelPaletteOpen(false);
              } catch (err) {
                console.error('🚨 여행 일정 추가 실패:', err);
                alert('서버 오류로 여행 일정을 등록하지 못했습니다.');
              }
            }}
          />
        )}
      </Wrapper>
    </>
  );
}

export default Todo;
