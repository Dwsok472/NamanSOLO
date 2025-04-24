import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Addtodo from "./Addtodo";
import Addtravel from "./Addtravel";
import { IconEdit, IconClose } from "../../Icons";
import DetailTodo from "./Detailtodo";
import leftThought from "../../img/leftThought.png";
import Plus from "../../img/add.png";
import LeftKey from "../../img/top11.png";
import RightKey from "../../img/down11.png";
import Edittodo from "./Edittodo";
import Edittravel from "./Edittravel";
import DetailTravel from "./Detailtravel";
import Rotate from "../../img/rotate.png";
import {
  createAnniversary,
  deleteAnniversary,
  deleteTravelMedia,
  fetchAllTodos,
  fetchAnniversaries,
  fetchTravels,
  handleCreateTravelMedia,
  handleUpdateTravelMedia,
  updateAnniversary,
  uploadTravelMedia,
} from "../../api2";

const Wrapper = styled.div`
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
`;

const Main = styled.main`
  display: flex;
  padding: 20px;
  gap: 20px;
  filter: ${({ $blur }) => ($blur ? "blur(3px)" : "none")};
  pointer-events: ${({ $blur }) => ($blur ? "none" : "auto")};
`;

const LeftPanel = styled.div`
  max-height: 620px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-right: 5px;
  &::-webkit-scrollbar {
    width: 7px; /* 세로 스크롤바의 너비를 8px로 설정 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #727272; /* 핸들의 색상 */
    border-radius: 10px;
  }

`;

const CalendarSection = styled.section`
  flex: 2 1 100%;
  background-color: #fff;
  max-height: 650px;
  border-radius: 10px;
  position: relative;
  background-color: #c01e3c; /*#fff0f2*/
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  /* animation: floatUpDown 2.5s ease-in-out infinite; */
`;

const CalendarHeader = styled.h3`
  margin-top:5px ;
  margin-bottom:5px ;
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 6px;
  cursor: pointer;
  font-size: 22px;
  transition: 0.2s ease;
  font-size: 1.5rem;
  color: white;
  &:hover {
    transform: scale(1);
  }
`;

const YearPickerWrap = styled.div`
  margin-bottom: 20px;
  background-color: #eeeeee;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 25%;
  left:45%;
  padding: 20px;
  height: 270px;
`;

const YearButtons = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-right: 15px;
`;

const YearArrow = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const YearButton = styled.button`
  background-color: ${({ $active }) => ($active ? "#000000" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#000000")};
  /* border: ${({ $active }) => ($active ? "none" : "1px solid #ddd;")}; */
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #000000;
    font-weight: 600;
    color: white;
    border: none;
  }
  &:focus {
    outline: none;
  }
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-bottom: 10px;
`;

const MonthBox = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 10px 0;
  background-color: ${({ $active }) => ($active ? "#000000" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#000000")};
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 700;
  width: 50px;
  cursor: pointer;
  &:hover {
    background-color: #000000;
    font-weight: 600;
    color: white;
    border: none;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: #fff;
  overflow: hidden;
  

`;

const StyledTh = styled.th`
  border:0.5px solid #838383 ;
  padding: 8px;
  color: #181818;
  text-align: center;
  font-size: 1.2rem;
`;

const StyledTd = styled.td`
  border: 0.1px solid #838383;
  padding: 4px;
  /* height: ${({ $rowCount }) => ($rowCount > 5 ? "86px" : "100px")}; */
  height: 86px;
  vertical-align: top;
  text-align: center;

`;

const DayCell = styled.div`
  text-align: right;
  font-weight: bold;
  font-size: 1.2rem;
  color: ${({ $isToday }) => ($isToday ? "#eb0202" : "black")};
`;

const EventBox = styled.div`
  background-color: ${({ color }) => color || "#ffc0cb"};
  padding: 4px 6px;
  margin: 0 auto;
  border-radius: 2px;
  font-size: 0.7rem;
  line-height: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  div {
    ${({ $isHovered }) =>
    $isHovered &&
    `
       font-weight: 700;
      `}
  }
`;

const AnniversarySection = styled.section`
  flex: 1 1 30%;
  min-width: 221px;
  background-color: #fff;
  border: 1px solid #8c0d17;
  border-radius: 30px;
  padding: 20px;
  position: relative;
  overflow: auto;
  max-height: 610px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);

  img {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

`;


const SectionH3 = styled.h3`
  cursor: ${({ activeSection }) =>
    activeSection != "anniversary" || "travel" ? "default" : "pointer"};
  text-align: center;
  font-weight: 700;
  font-size: 1.2rem;
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
  left: -2px;
`;

const AddButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  background-color: #c50000;
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
  height: 440px;
  overflow-y: auto;
  padding-right: 3px;
  &::-webkit-scrollbar {
    width: 7px; /* 세로 스크롤바의 너비를 8px로 설정 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #727272; /* 핸들의 색상 */
    border-radius: 10px;
  }
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
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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

function Todo({ originalMeetingDate }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!events || events.length === 0) {
      const fetchFallbackEvents = async () => {
        try {
          const annivs = await fetchAnniversaries();
          const travels = await fetchTravels();

          setEvents([...annivs, ...travels]);
        } catch (err) {
          console.error("🛑 Todo 컴포넌트에서 이벤트 직접 로딩 실패:", err);
        }
      };
      fetchFallbackEvents();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const annivs = await fetchAnniversaries();
        const travels = await fetchTravels();
        setEvents([...annivs, ...travels]);
      } catch (err) {
        console.error("❌ 이벤트 새로 불러오기 실패", err);
      }
    };

    fetchData();
  }, [originalMeetingDate]);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [hoveredItem, setHoveredItem] = useState(null);
  const [editingTodoEvent, setEditingTodoEvent] = useState(null);
  const [editingTravelEvent, setEditingTravelEvent] = useState(null);
  const [newAnniversaryEvent, setNewAnniversaryEvent] = useState({
    title: "",
    start_date: "",
    end_date: "",
    color: "#ffc0cb",
    type: "ANNIVERSARY",
    editable: true,
  });
  const [newTravelEvent, setNewTravelEvent] = useState({
    title: "",
    start_date: "",
    end_date: "",
    color: "#87cefa",
    type: "TRAVEL",
    images: [],
    editable: true,
  });
  const [viewTodoEvent, setViewTodoEvent] = useState(null);
  const [viewTravelEvent, setViewTravelEvent] = useState(null);
  const [anniversaryPaletteOpen, setAnniversaryPaletteOpen] = useState(false);
  const [travelPaletteOpen, setTravelPaletteOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [yearRangeStart, setYearRangeStart] = useState(currentYear - 2);

  useEffect(() => {
    const loadAllEvents = async () => {
      if (showAllEvents) {
        try {
          const sortedTodos = await fetchAllTodos();
          setEvents(sortedTodos);
        } catch (e) {
          console.error("전체 일정 불러오기 실패", e);
        }
      }
    };

    loadAllEvents();
  }, [showAllEvents]);

  const handleUpdate = async (updatedEvent) => {
    try {
      let updated;
      if (updatedEvent.type.toUpperCase() === "ANNIVERSARY") {
        updated = await updateAnniversary(updatedEvent.id, updatedEvent);
      } else {
        updated = await handleUpdateTravelMedia(updatedEvent.id, updatedEvent);
      }
      setEvents(
        events.map((event) => (event.id === updated.id ? updated : event))
      );
      setEditingTodoEvent(null);
      setEditingTravelEvent(null);
    } catch (e) {
      console.error("수정 실패:", e);
    }
  };

  const handleDelete = async (eventToDelete) => {
    console.log("삭제할 이벤트", eventToDelete);
    console.log("삭제할 이벤트의 id 값" + eventToDelete.id);
    const confirmDelete = window.confirm(
      `${eventToDelete.title} ${eventToDelete.type.toUpperCase() === "ANNIVERSARY" ? "기념일" : "여행"
      } 일정을 정말 삭제하시겠어요?`
    );
    if (!confirmDelete) return;
    console.log("삭제할 ID 타입:", typeof eventToDelete.id, eventToDelete.id);

    try {
      if (eventToDelete.type.toUpperCase() === "ANNIVERSARY") {
        await deleteAnniversary(eventToDelete.id);
      } else {
        await deleteTravelMedia(eventToDelete.id);
      }
      setEvents((prev) => prev.filter((ev) => ev.id !== eventToDelete.id));
    } catch (e) {
      console.error("삭제 실패:", e);
    }
  };

  const colorSamples = [
    "#ffc0cb", "#ffb6c1", "#ffd700", "#90ee90", "#87cefa", "#dda0dd", "#ff7f50", "#b0c4de",
  ];

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const calendarCells = [
      ...Array.from({ length: startDay }),
      ...Array.from(
        { length: daysInMonth },
        (_, i) => new Date(currentYear, currentMonth, i + 1)
      ),
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
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const getEventsForDay = (date) => {
    if (!date) return [];

    const cellDateStr = formatDate(date); // 🧠 요거!

    const matching = events.filter((localEvent) => {
      if (!showAllEvents && localEvent.type.toUpperCase() !== activeSection)
        return false;

      const eventStart = localEvent.start_date;
      const eventEnd = localEvent.end_date;

      const isMatch = eventStart <= cellDateStr && cellDateStr <= eventEnd;

      return isMatch;
    });

    return matching;
  };

  const getDiffInDays = (dateStr) => {
    const event_date = new Date(`${dateStr}T00:00:00`);
    event_date.setHours(0, 0, 0, 0);
    return Math.floor((event_date - today) / (1000 * 60 * 60 * 24));
  };

  const [activeSection, setActiveSection] = useState("ANNIVERSARY");

  return (
    <>
      <Wrapper
        onClick={() => {
          if (isModalOpen) {
            setIsModalOpen(false);
          }
          if (isTravelModalOpen) {
            setIsTravelModalOpen(false);
          }
          if (viewTravelEvent) {
            setViewTravelEvent(false);
          }
          if (editingTodoEvent) {
            setEditingTodoEvent(false);
          }
          if (viewTodoEvent) {
            setViewTodoEvent(false);
          }
          if (editingTravelEvent) {
            setEditingTravelEvent(false);
          }
          if (isPickerOpen) {
            setIsPickerOpen(false);
          }
        }}
      >
        <Main
          $blur={
            isModalOpen ||
            isTravelModalOpen ||
            editingTodoEvent ||
            editingTravelEvent ||
            viewTodoEvent ||
            viewTravelEvent ||
            isPickerOpen
          }
        >
          <LeftPanel>
            <CalendarSection>
              <CalendarHeader onClick={() => setIsPickerOpen(!isPickerOpen)}>
                {currentYear}년 {currentMonth + 1}월 {isPickerOpen ? "▲" : "▼"}
              </CalendarHeader>

              <StyledTable>
                <thead>
                  <tr>
                    {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                      <StyledTh key={day}>{day}</StyledTh>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {generateCalendar().map((week, wIdx) => (
                    <tr key={wIdx}>
                      {week.map((date, dIdx) => {
                        if (!date) {
                          return <StyledTd key={dIdx} />;
                        }
                        const dateStr = date.toISOString().split("T")[0];
                        const isToday =
                          dateStr === today.toISOString().split("T")[0];
                        return (
                          <StyledTd key={dIdx} $isToday={isToday} >
                            <DayCell>{date.getDate()}</DayCell>
                            {getEventsForDay(date).map((localEvent, i) => (
                              <EventBox
                                key={i}
                                color={localEvent.color}
                                className={`${localEvent.type.toUpperCase()}${localEvent.id
                                  }`}
                                onMouseEnter={() =>
                                  setHoveringEventId(localEvent.id)
                                }
                                onMouseLeave={() => setHoveringEventId(null)}
                                $isHovered={hoveringEventId === localEvent.id}
                                onClick={() =>
                                  localEvent.type.toUpperCase() ===
                                    "ANNIVERSARY"
                                    ? localEvent.editable
                                      ? setViewTodoEvent(localEvent)
                                      : null
                                    : setViewTravelEvent(localEvent)
                                }
                              >
                                <div
                                  title={
                                    localEvent.type.toUpperCase() === "TRAVEL"
                                      ? `${localEvent.title} ${localEvent.start_date} ~ ${localEvent.end_date}`
                                      : !localEvent.editable
                                        ? `첫 만남일을 기준으로 계산된 날짜는 변경할 수 없습니다.`
                                        : `${localEvent.title} ${localEvent.start_date}`
                                  }
                                >
                                  {localEvent.title}
                                </div>
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
              {showAllEvents
                ? "전체 일정"
                : activeSection === "ANNIVERSARY"
                  ? "기념일"
                  : "데이트"}{" "}
              {showAllEvents ? (
                <></>
              ) : (
                <img
                  src={Rotate}
                  onClick={() => {
                    if (!showAllEvents) {
                      setActiveSection(
                        activeSection === "ANNIVERSARY"
                          ? "TRAVEL"
                          : "ANNIVERSARY"
                      );
                    }
                  }}
                />
              )}
            </SectionH3>

            <List>
              {(showAllEvents
                ? events
                : events.filter((e) => e.type.toUpperCase() === activeSection)
              ).map((localEvent, idx) => {
                const diffDays = getDiffInDays(
                  localEvent.type.toUpperCase() === "ANNIVERSARY"
                    ? localEvent.start_date
                    : localEvent.start_date
                );

                return (
                  <ListItem
                    title={`${localEvent.type.toUpperCase() === "ANNIVERSARY"
                      ? !localEvent.editable
                        ? "첫 만남일을 기준으로 계산된 날짜는 변경할 수 없습니다."
                        : localEvent.title + " " + localEvent.start_date
                      : localEvent.title +
                      " " +
                      localEvent.start_date +
                      " ~ " +
                      localEvent.end_date
                      }`}
                    key={idx}
                    onMouseEnter={() => setHoveredItem(idx)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="eventTitle">{localEvent.title}</div>
                    <div className="day">
                      <div className="diff">
                        {diffDays >= 0
                          ? diffDays === 0
                            ? "Today"
                            : `D -${diffDays}`
                          : `D +${Math.abs(diffDays)}`}
                      </div>
                      <ListDate>
                        {localEvent.type.toUpperCase() === "ANNIVERSARY" ? (
                          localEvent.start_date
                        ) : (
                          <>
                            {" "}
                            {localEvent.start_date} <br />~{" "}
                            {localEvent.end_date}{" "}
                          </>
                        )}
                      </ListDate>
                    </div>

                    {hoveredItem === idx && localEvent.editable && (
                      <>
                        <IconButton onClick={() => handleDelete(localEvent)}>
                          <IconClose />
                        </IconButton>
                        <EditButton
                          onClick={() =>
                            localEvent.type.toUpperCase() === "ANNIVERSARY"
                              ? setEditingTodoEvent({ ...localEvent })
                              : setEditingTravelEvent({ ...localEvent })
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
              <AddButton
                onClick={() => {
                  activeSection === "ANNIVERSARY"
                    ? setIsModalOpen(true)
                    : setIsTravelModalOpen(true);
                }}
              >
                <AddButtonImage src={Plus} />
              </AddButton>
            )}
            <ViewAllButton onClick={() => setShowAllEvents((prev) => !prev)}>
              {showAllEvents
                ? `${activeSection === "ANNIVERSARY" ? "기념일" : "데이트"
                } 보기`
                : "전체보기"}
            </ViewAllButton>
          </AnniversarySection>
        </Main>

        {viewTodoEvent && (
          <DetailTodo
            localEvent={viewTodoEvent}
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
                endDate: newAnniversaryEvent.end_date,
                color: newAnniversaryEvent.color,
                type: newAnniversaryEvent.type,
              };

              try {
                const created = await createAnniversary(eventToAdd);
                setEvents((prev) => [...prev, created]);
                setNewAnniversaryEvent({
                  title: "",
                  start_date: "",
                  end_date: "",
                  color: "#ffc0cb",
                  type: "ANNIVERSARY",
                });
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
            localEvent={editingTodoEvent}
            setEvent={setEditingTodoEvent}
            onClose={() => setEditingTodoEvent(null)}
            onSubmit={(e) => {
              e.preventDefault();

              const updatedEvent = {
                ...editingTodoEvent,
                type: editingTodoEvent.type.toUpperCase() || "ANNIVERSARY",
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
            localEvent={editingTravelEvent}
            setEvent={setEditingTravelEvent}
            onClose={() => setEditingTravelEvent(null)}
            onSubmit={async (e) => {
              e.preventDefault();

              const start = new Date(editingTravelEvent.start_date);
              const end = new Date(editingTravelEvent.end_date);

              if (start > end) {
                alert("종료일은 시작일보다 빠를 수 없습니다!");
                return;
              }

              try {
                const existingMedia = (
                  editingTravelEvent.mediaUrl || []
                ).filter((item) => !(item instanceof File));
                const newFiles = (editingTravelEvent.mediaUrl || []).filter(
                  (item) => item instanceof File
                );

                let uploadedMedia = [];
                if (newFiles.length > 0) {
                  uploadedMedia = await uploadTravelMedia(
                    editingTravelEvent.title,
                    newFiles
                  );
                }

                const payloadToUpdate = {
                  ...editingTravelEvent,
                  mediaUrl: [...existingMedia, ...uploadedMedia],
                };

                const updated = await handleUpdateTravelMedia(
                  editingTravelEvent.id,
                  payloadToUpdate
                );

                setEvents((prev) =>
                  prev.map((event) =>
                    event.id === updated.id ? updated : event
                  )
                );

                setEditingTravelEvent(null);
              } catch (err) {
                console.error("🚨 여행 일정 수정 실패:", err);
                alert("수정 중 오류 발생!");
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
            onClose={() => {
              setIsTravelModalOpen(false);
              setTravelPaletteOpen(false);
            }}
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
                alert("종료일은 시작일보다 빠를 수 없습니다!");
                return;
              }

              try {
                const created = await handleCreateTravelMedia(newTravelEvent);
                setEvents([...events, created]);

                setNewTravelEvent({
                  title: "",
                  start_date: "",
                  end_date: "",
                  color: "#ffc0cb",
                  images: [],
                  editable: true,
                  type: "TRAVEL",
                });

                setIsTravelModalOpen(false);
                setTravelPaletteOpen(false);
              } catch (err) {
                console.error("🚨 여행 일정 추가 실패:", err);
                alert("서버 오류로 여행 일정을 등록하지 못했습니다.");
              }
            }}
          />
        )}

        {isPickerOpen && (
          <YearPickerWrap onClick={(e) => e.stopPropagation()}>
            <YearButtons>
              <YearArrow
                src={LeftKey}
                onClick={() => setYearRangeStart(yearRangeStart - 5)}
              />
              {Array.from(
                { length: 5 },
                (_, i) => yearRangeStart + i
              ).map((year) => (
                <YearButton
                  key={year}
                  $active={year === selectedYear}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </YearButton>
              ))}
              <YearArrow
                src={RightKey}
                onClick={() => setYearRangeStart(yearRangeStart + 5)}
              />
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
      </Wrapper>
    </>
  );
}

export default Todo;
