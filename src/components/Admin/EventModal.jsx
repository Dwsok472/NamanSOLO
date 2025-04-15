import React, { useState } from 'react';
import styled from 'styled-components';

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
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
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
  const [mode, setMode] = useState('관리');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedAddType, setSelectedAddType] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const allEvents = [
    { id: 1, title: '크리스마스', type: 'official' },
    { id: 2, title: '100일', type: 'unofficial' },
    { id: 3, title: '발렌타인데이', type: 'official' },
    { id: 4, title: '1주년년', type: 'unofficial' },
  ];

  const allAddableEvents = [
    { title: '2주년 이벤트', type: 'official' },
    { title: '3주년 이벤트', type: 'official' },
    { title: '200일 기념', type: 'unofficial' },
    { title: '300일 기념', type: 'unofficial' },
  ];

  const filteredEvents = selectedType
    ? allEvents.filter(event => event.type === selectedType)
    : [];

  const filteredAddable = selectedAddType
    ? allAddableEvents.filter(event => event.type === selectedAddType)
    : [];

  const toggleEventSelection = (title) => {
    setSelectedEvents((prev) =>
      prev.includes(title) ? prev.filter(e => e !== title) : [...prev, title]
    );
  };

  const handleAdd = () => {
    if (selectedEvents.length === 0) {
      alert('추가할 이벤트를 선택하세요!');
    } else {
      alert('이벤트가 추가되었습니다');
      console.log('추가된 이벤트:', selectedEvents);
      setSelectedEvents([]);
    }
  };

  return (
    <Overlay>
      <ModalBox>
        <h2>{mode === '관리' ? '이벤트 관리' : '이벤트 추가'}</h2>

        <TabBar>
          <TabButton active={mode === '관리'} onClick={() => setMode('관리')}>
            이벤트 관리
          </TabButton>
          <TabButton active={mode === '추가'} onClick={() => setMode('추가')}>
            이벤트 추가
          </TabButton>
        </TabBar>

        {(mode === '관리' || mode === '추가') && (
          <CheckboxRow>
            <label>
              <input
                type="checkbox"
                checked={
                  (mode === '관리' && selectedType === 'official') ||
                  (mode === '추가' && selectedAddType === 'official')
                }
                onChange={() => {
                  if (mode === '관리') {
                    setSelectedType(prev => (prev === 'official' ? null : 'official'));
                  } else {
                    setSelectedAddType(prev => (prev === 'official' ? null : 'official'));
                  }
                }}
              />
              공식
            </label>
            <label>
              <input
                type="checkbox"
                checked={
                  (mode === '관리' && selectedType === 'unofficial') ||
                  (mode === '추가' && selectedAddType === 'unofficial')
                }
                onChange={() => {
                  if (mode === '관리') {
                    setSelectedType(prev => (prev === 'unofficial' ? null : 'unofficial'));
                  } else {
                    setSelectedAddType(prev => (prev === 'unofficial' ? null : 'unofficial'));
                  }
                }}
              />
              비공식
            </label>
          </CheckboxRow>
        )}

        {mode === '관리' && (
          <ContentBox>
            <ul>
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <li key={event.id}> {event.title}</li>
                ))
              ) : (
                <li>표시할 이벤트 없음</li>
              )}
            </ul>
          </ContentBox>
        )}

        {mode === '추가' && (
          <ContentBox>
            <Column>
              <strong> 이벤트 목록</strong>
              <ul>
                {filteredAddable.map(event => (
                  <li key={event.title}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event.title)}
                        onChange={() => toggleEventSelection(event.title)}
                      />
                      {event.title}
                    </label>
                  </li>
                ))}
              </ul>
            </Column>
            <Column>
              <strong> 선택된 이벤트</strong>
              <ul>
                {selectedEvents.length > 0 ? (
                  selectedEvents.map((title) => <li key={title}> {title}</li>)
                ) : (
                  <li>선택된 항목 없음</li>
                )}
              </ul>
            </Column>
          </ContentBox>
        )}

        <Footer>
          {mode === '추가' && (
            <button onClick={handleAdd}>추가</button>
          )}
          <button onClick={onClose}>닫기</button>
        </Footer>
      </ModalBox>
    </Overlay>
  );
}

export default EventModal;
