import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchAllOffEvents, fetchNoneStaticOffEvents, fetchStaticOffEvents, saveOffEvent, updateOffEvent, deleteOffEvent } from '../api2';

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

const Title = styled.h2`
  text-align: center;
  margin-bottom: 15px;
`;

const ModalBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 600px;
  max-width: 95%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

const CheckboxRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-bottom: 16px;

  input {
    margin-right: 10px;
  }
`;

const ContentBox = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  min-height: 200px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  border-radius: 6px;
  margin-bottom: 6px;
  max-height: 30px;
  background-color: ${({ selected }) => (selected ? '#eef6ff' : '#fff')};
  cursor: pointer;
`;

const DeleteButton = styled.button`
  border: none;
  background: transparent;
  color: #ff4d4f;
  font-weight: bold;
  cursor: pointer;
`;


function EventModal({ onClose }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newOffsetDays, setNewOffsetDays] = useState("");
  const [mode, setMode] = useState("관리"); // '관리' | '추가' | '수정'
  const [editTarget, setEditTarget] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

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

  useEffect(() => {
    loadEvents();
  }, [selectedFilter]);

  const resetForm = () => {
    setNewTitle('');
    setNewDate('');
    setNewOffsetDays('');
    setSelectedFilter('all');
    setEditTarget(null);
    setSelectedItemId(null);
  };

  const handleAdd = async () => {
    if (!newTitle) {
      alert('이벤트 제목을 입력하세요!');
      return;
    }

    let dto = {
      eventTitle: newTitle,
      editable: false
    };

    if (selectedFilter === 'static') {
      if (!newDate || isNaN(new Date(newDate).getTime())) {
        alert('유효한 날짜를 입력하세요!');
        return;
      }
      dto.eventDate = newDate;
      dto.offsetDays = 0;
    } else if (selectedFilter === 'none-static') {
      const parsedOffset = parseInt(newOffsetDays, 10);
      if (!newOffsetDays || isNaN(parsedOffset) || parsedOffset <= 0) {
        alert('올바른 일수를 입력하세요!');
        return;
      }
      dto.eventDate = new Date().toISOString().split('T')[0];
      dto.offsetDays = parsedOffset;
    } else {
      alert('고정/유동 이벤트를 선택하세요!');
      return;
    }

    try {
      await saveOffEvent(dto);
      alert('이벤트가 추가되었습니다!');
      setMode('관리');
      resetForm();
      await loadEvents();
    } catch (err) {
      console.error('추가 실패:', err);
    }
  };

  const handleUpdate = async () => {
    if (!editTarget) return;

    let dto = {
      eventTitle: newTitle,
      editable: editTarget.editable
    };

    if (selectedFilter === 'static') {
      if (!newDate || isNaN(new Date(newDate).getTime())) {
        alert('유효한 날짜를 입력하세요!');
        return;
      }
      dto.eventDate = newDate;
      dto.offsetDays = 0;
    } else {
      const parsedOffset = parseInt(newOffsetDays, 10);
      if (!newOffsetDays || isNaN(parsedOffset) || parsedOffset <= 0) {
        alert('올바른 일수를 입력하세요!');
        return;
      }
      dto.eventDate = new Date().toISOString().split('T')[0];
      dto.offsetDays = parsedOffset;
    }

    try {
      await updateOffEvent(editTarget.id, dto);
      alert('이벤트 수정 완료!');
      setMode('관리');
      resetForm();
      await loadEvents();
    } catch (err) {
      console.error('수정 실패:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠어요?")) {
      try {
        await deleteOffEvent(id);
        alert("삭제 완료!");
        await loadEvents();
      } catch (err) {
        console.error("삭제 실패", err);
      }
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>
          {mode === '관리' ? '이벤트 관리' : mode === '수정' ? '이벤트 수정' : '이벤트 추가'}
        </Title>

        {mode !== '수정' && (
          <CheckboxRow>
            <label>
              <input
                type="checkbox"
                checked={selectedFilter === 'static'}
                onChange={() => setSelectedFilter(prev => (prev === 'static' ? 'all' : 'static'))}
              />
              고정 이벤트
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedFilter === 'none-static'}
                onChange={() => setSelectedFilter(prev => (prev === 'none-static' ? 'all' : 'none-static'))}
              />
              유동 이벤트
            </label>
          </CheckboxRow>
        )}

        <ContentBox>
          {mode === '관리' && (
            <ul>
              {allEvents.map(event => (
                <ListItem
                  key={event.id}
                  onClick={() => setSelectedItemId(prev => (prev === event.id ? null : event.id))}
                  onMouseEnter={() => setHoveredId(event.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  selected={selectedItemId === event.id}
                >
                  <span>{event.title}</span>
                  {hoveredId === event.id && (
                    <DeleteButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(event.id);
                      }}
                    >
                      삭제
                    </DeleteButton>
                  )}
                </ListItem>
              ))}
            </ul>
          )}

          {(mode === '추가' || mode === '수정') && (
            <>
              <input
                type="text"
                placeholder="이벤트 제목"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              {selectedFilter === 'static' && (
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              )}
              {selectedFilter === 'none-static' && (
                <input
                  type="number"
                  placeholder="며칠 후인지 입력"
                  value={newOffsetDays}
                  onChange={(e) => setNewOffsetDays(e.target.value)}
                />
              )}
            </>
          )}
        </ContentBox>

        <Footer style={{ justifyContent: 'flex-end' }}>
          {selectedItemId && mode === '관리' && (
            <button
              onClick={() => {
                const target = allEvents.find(e => e.id === selectedItemId);
                if (!target) return;
                setEditTarget(target);
                setNewTitle(target.eventTitle);
                setNewDate(target.eventDate);
                setNewOffsetDays(target.offsetDays);
                setSelectedFilter(target.offsetDays > 0 ? 'none-static' : 'static');
                setMode('수정');
              }}
            >
              수정
            </button>
          )}

          {mode === '관리' && (
            <>
              <button
                onClick={() => {
                  setMode('추가');
                  setSelectedFilter('static');
                  resetForm();
                }}
              >
                추가
              </button>
              <button onClick={onClose}>닫기</button>
            </>
          )}

          {mode === '추가' && (
            <>
              <button onClick={handleAdd}>추가</button>
              <button onClick={() => {
                setMode('관리');
                resetForm();
              }}>취소</button>
            </>
          )}

          {mode === '수정' && (
            <>
              <button onClick={handleUpdate}>수정 완료</button>
              <button onClick={() => {
                setMode('관리');
                resetForm();
              }}>취소</button>
            </>
          )}
        </Footer>
      </ModalBox>
    </Overlay>
  );
}

export default EventModal;
