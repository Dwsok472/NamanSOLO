import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import left from '../img/leftkey.png';
import right from '../img/rightkey.png';
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

const ModalBox = styled.div`
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  padding: 40px;
  border-radius: 16px;
  width: 640px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  color: #1d4ed8;
  margin-bottom: 24px;
`;

const CheckboxRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-bottom: 8px;

  input {
    margin-right: 5px;
  }
`;

const FormInput = styled.input`
  width: 100%;
  height: 42px;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9fafb;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }

  margin-bottom: 18px;
`;

const ContentBox = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  height: ${({ compact }) => (compact ? '150px' : '450px')};
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const PageButton = styled.button`
  font-size: 0.9rem;
  padding: 4px 8px;
  background-color: ${({ active }) => (active ? '#007bff' : '#fefefe')};
  color: ${({ active }) => (active ? '#fefefe' : '#222')};
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const IconButton = styled.button`
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: transparent;
  color: #000;
  cursor: pointer;

  &.active {
    background-color: #007bff;
    color: #fff;
  }

  img {
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  background-color: #1d4ed8;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1e40af;
  }
`;

const ListItem = styled.li`
  padding: 12px 16px;
  border-radius: 10px;
  background-color: ${({ selected }) => (selected ? '#e0f2fe' : '#f9fafb')};
  border: 1px solid #e5e7eb;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.04); /* 기본값 유지 */
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#e0f2fe' : '#f3f4f6')};
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0.04); /* hover에서도 동일하게 유지 */
  }
`;


const DeleteButton = styled.button`
  background: transparent;
  color: #ef4444;
  font-weight: 700;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  opacity: 0;
  transition: opacity 0.2s;

  ${ListItem}:hover & {
    opacity: 1;
  }

  &:hover {
    text-decoration: underline;
  }
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pagesPerGroup = 5;

  const paginatedEvents = allEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(allEvents.length / itemsPerPage);

  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
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

        <ContentBox compact={mode === '추가'|| mode === '수정'}>
          {mode === '관리' && (
            <ul>
              {paginatedEvents.map(event => (
                <ListItem
                key={event.id}
                onClick={() => setSelectedItemId(prev => (prev === event.id ? null : event.id))}
                selected={selectedItemId === event.id}
              >
                <span>{event.title}</span>
                <DeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(event.id);
                  }}
                >
                  삭제
                </DeleteButton>
              </ListItem>
              ))}
            </ul>
          )}

          {(mode === '추가' || mode === '수정') && (
            <div>
              <FormInput
                type="text"
                placeholder="이벤트 제목"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              {selectedFilter === 'static' && (
                <FormInput
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              )}
              {selectedFilter === 'none-static' && (
                <FormInput
                  type="number"
                  placeholder="며칠 후"
                  value={newOffsetDays}
                  onChange={(e) => setNewOffsetDays(e.target.value)}
                />
              )}
            </div>
          )}

          {mode === '관리' && totalPages > 1 && (
            <PaginationWrapper>
            {currentGroup > 1 && (
              <IconButton onClick={() => setCurrentPage(startPage - 1)}>
                <img src={left} alt="이전" />
              </IconButton>
            )}
        
            {pageNumbers.map((page) => (
              <PageButton
                key={page}
                onClick={() => setCurrentPage(page)}
                active={currentPage === page}
              >
                {page}
              </PageButton>
            ))}
        
            {endPage < totalPages && (
              <IconButton onClick={() => setCurrentPage(endPage + 1)}>
                <img src={right} alt="다음" />
              </IconButton>
            )}
          </PaginationWrapper>
          )}
        </ContentBox>

        <Footer style={{ justifyContent: 'flex-end' }}>
          {selectedItemId && mode === '관리' && (
            <StyledButton
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
            </StyledButton>
          )}

          {mode === '관리' && (
            <>
              <StyledButton
                onClick={() => {
                  setMode('추가');
                  setSelectedFilter('static');
                }}
              >
                추가
              </StyledButton>
              <StyledButton onClick={onClose}>닫기</StyledButton>
            </>
          )}

          {mode === '추가' && (
            <>
              <StyledButton onClick={handleAdd}>추가</StyledButton>
              <StyledButton onClick={() => {
                setMode('관리');
                resetForm();
              }}>취소</StyledButton>
            </>
          )}

          {mode === '수정' && (
            <>
              <StyledButton onClick={handleUpdate}>수정 완료</StyledButton>
              <StyledButton onClick={() => {
                setMode('관리');
                resetForm();
              }}>취소</StyledButton>
            </>
          )}
        </Footer>
      </ModalBox>
    </Overlay>
  );
}

export default EventModal;
