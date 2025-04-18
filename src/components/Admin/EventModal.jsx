import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchAllOffEvents, fetchNoneStaticOffEvents, fetchStaticOffEvents, saveOffEventToUsersForTodos } from '../api2';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 600px;
  max-width: 95%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

  h2 {
    text-align: center;
    margin-bottom: 15px;
  }
`;

const TabBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
`;

const TabButton = styled.button`
  padding: 8px 16px;
  font-weight: bold;
  border: 1px solid #ccc;
  background: ${({ active }) => (active ? '#e5ecff' : '#fff')};
  cursor: pointer;
`;

const CheckboxRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-bottom: 16px;
  input {
    outline:none;
    margin-right: 5px;
  }
  label {
    font-size: 1.1rem;
  }
`;

const ContentBox = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  min-height: 200px;
  background: #f9f9f9;
  display: flex;
  gap: 20px;
`;

const Column = styled.div`
  flex: 1;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

function EventModal({ onClose }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newOffsetDays, setNewOffsetDays] = useState("");
  const [mode, setMode] = useState("관리");
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const toggleEventSelection = (title) => {
    setSelectedEvents((prev) =>
      prev.includes(title) ? prev.filter(e => e !== title) : [...prev, title]
    );
  };

  const handleAdd = async () => {
    if (!newTitle) {
      alert('이벤트 제목을 입력하세요!');
      return;
    }
  
    let dto = {
      eventTitle: newTitle,
      editable: false,
    };
  
    if (selectedFilter === 'static') {
      if (!newDate) {
        alert('날짜를 입력하세요!');
        return;
      }

      const inputDate = new Date(newDate);
      if (isNaN(inputDate.getTime())) {
        alert('유효한 날짜를 입력하세요!');
        return;
      }

      dto.eventDate = newDate;
      dto.offsetDays = 0;
    } else if (selectedFilter === 'none-static') {
      const parsedOffset = parseInt(newOffsetDays, 10);

      if (isNaN(parsedOffset)) {
        alert('며칠 후인지 숫자를 입력하세요!');
        return;
      }

      if (parsedOffset <= 0) {
        alert('유동 기념일의 숫자는 0 이하로 설정할 수 없습니다!');
        return;
      }

      dto.eventDate = new Date().toISOString().split('T')[0]; // 오늘 날짜
      dto.offsetDays = parsedOffset;
    } else {
      alert('고정/유동 이벤트 중 하나를 선택하세요!');
      return;
    }

    try {
      await saveOffEventToUsersForTodos(dto);
      alert('이벤트가 성공적으로 추가되었습니다!');
      setMode('관리');
      setNewTitle('');
      setNewDate('');
      setNewOffsetDays('');
      setSelectedFilter('all');
    } catch (err) {
      console.error('저장 실패:', err);
      alert('이벤트 저장 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        let events = [];
        if (selectedFilter === 'static') {
          events = await fetchStaticOffEvents();
        } else if (selectedFilter === 'none-static') {
          events = await fetchNoneStaticOffEvents();
        } else {
          events = await fetchAllOffEvents();
        }

        const mapped = events.map(e => ({
          ...e,
          title: e.eventTitle,
          type: e.offsetDays > 0 ? 'none-static' : 'static'
        }));

        setAllEvents(mapped);
      } catch (err) {
        console.error('공식 이벤트 로딩 실패', err);
      }
    };

    loadEvents();
  }, [selectedFilter]);

  const filteredEvents = allEvents;

  return (
    <Overlay>
      <ModalBox>
        <h2>{mode === '관리' ? '이벤트 관리' : '이벤트 추가'}</h2>

        <CheckboxRow>
          <label>
            <input
              type="checkbox"
              checked={selectedFilter === 'static'}
              onChange={() =>
                setSelectedFilter(prev => (prev === 'static' ? 'all' : 'static'))
              }
            />
            고정 이벤트
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFilter === 'none-static'}
              onChange={() =>
                setSelectedFilter(prev => (prev === 'none-static' ? 'all' : 'none-static'))
              }
            />
            유동 이벤트
          </label>
        </CheckboxRow>

        <ContentBox>
          {mode === '관리' && (
            <ul>
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <li key={event.id}>{event.title}</li>
                ))
              ) : (
                <li>표시할 이벤트 없음</li>
              )}
            </ul>
          )}

          {mode === '추가' &&
            selectedFilter === 'static' && (
              <>
                <input
                  type="text"
                  placeholder="이벤트 제목"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </>
            )}
          {mode === '추가' &&
            selectedFilter === 'none-static' && (
              <>
                <input
                  type="text"
                  placeholder="이벤트 제목"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="며칠 후인지 입력"
                  value={newOffsetDays}
                  onChange={(e) => setNewOffsetDays(e.target.value)}
                />
              </>
          )}
        </ContentBox>
        {mode === '관리' &&
          <Footer>
            <button onClick={() => {
              setMode('추가'); 
              setSelectedFilter('static');}}>추가</button>
            <button onClick={onClose}>닫기</button>
          </Footer>
        }
        {mode === '추가' &&
          <Footer>
            <button onClick={handleAdd}>추가</button>
            <button onClick={()=> setMode('관리')}>취소</button>
          </Footer>
        }
      </ModalBox>
    </Overlay>
  );
}

export default EventModal;
