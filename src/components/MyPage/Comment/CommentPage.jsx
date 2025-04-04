import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 24px;
`;

const Column = styled.div`
  flex: 1;
  background: #fafafa;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #ccc;
  height: 90vh;
  overflow-y: auto;
`;

const SectionTitle = styled.h3`
  margin-bottom: 16px;
`;

const CountBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;

  span {
    background: #333;
    color: white;
    font-size: 0.9rem;
    padding: 6px 12px;
    border-radius: 8px;
  }
`;

const Card = styled.div`
  display: flex;
  position: relative;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  margin-bottom: 16px;
  padding: 16px;
`;

const Thumbnail = styled.div`
  width: 60px;
  height: 60px;
  background: #ddd;
  border-radius: 12px;
  margin-right: 16px;
  background-image: url('https://placeholderjs.com/60x60');
  background-size: cover;
  background-position: center;
`;

const Content = styled.div`
  flex: 1;
`;

const Date = styled.div`
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 4px;
`;

const TitleRow = styled.div`
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CommentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
`;
const CommentText = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-bottom: 1px solid #aaa;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 6px;
  position: absolute;
  top: 0;
  right: 0;
`;

const Button = styled.button`
  background: ${({ danger }) => (danger ? '#ffe0e0' : '#f0f0f0')};
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 0.8rem;
  cursor: pointer;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`;

const CommentPage = () => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  

  const [comments, setComments] = useState([
    {
      id: 1,
      feedTitle: '첫 여행 ✈️',
      content: '진짜 행복한 순간이었어요!',
      date: '2025-04-01',
    },
    {
      id: 2,
      feedTitle: '우리의 첫 기념일 💖',
      content: '이날은 정말 평생 못 잊을 듯!',
      date: '2025-04-02',
    },
    {
      id: 3,
      feedTitle: '맛집 투어 🍜',
      content: '배터지게 먹은 날 😆',
      date: '2025-04-03',
    },
  ]);

  const [replies, setReplies] = useState ([
    {
      id: 4,
      feedTitle: '서프라이즈 이벤트 🎁',
      content: '저도 깜짝 놀랐어요!',
      date: '2025-04-01',
    },
    {
      id: 5,
      feedTitle: '벚꽃놀이 🌸',
      content: '사진이 진짜 예쁘네요!',
      date: '2025-04-02',
    },
  ]);

  const handleSave = (id, isReply) => {
    const updater = (list, setter) => {
      const updated = list.map((item) =>
        item.id === id ? { ...item, content: editValue } : item
      );
      setter(updated);
    };
  
    if (isReply) {
      updater(replies, setReplies);
    } else {
      updater(comments, setComments);
    }
  
    setEditingId(null);
    setEditValue('');
  };

  const handleDelete = (id, isReply) => {
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (!confirm) return;
  
    if (isReply) {
      setReplies((prev) => prev.filter((item) => item.id !== id));
    } else {
      setComments((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const renderList = (data, isReply = false) =>
    data.map((item) => (
      <Card key={item.id}>
        <Thumbnail />
        <Content>
          <Date>📅 {item.date}</Date>
          <TitleRow>
            <span>{item.feedTitle}</span>
          </TitleRow>
          <CommentRow>
            {editingId === item.id ? (
              <CommentText
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
              />
            ) : (
              <span>{item.content}</span>
            )}
            <ButtonGroup>
              {editingId === item.id ? (
                  <Button onClick={() => handleSave(item.id, isReply)}>저장</Button>
                ) : (
                  <Button onClick={() => {
                  setEditingId(item.id);
                  setEditValue(item.content);
                }}>수정</Button>
              )}
              <Button>{isReply ? '댓글 보기' : '답글'}</Button>
            </ButtonGroup>
          </CommentRow>
        </Content>
        <CloseBtn onClick={() => handleDelete(item.id, isReply)}>×</CloseBtn>
      </Card>
    ));

  return (
    <Wrapper>
      <Column>
        <SectionTitle>내가 단 댓글</SectionTitle>
        <CountBox>
          <span>총 댓글 수 3</span>
        </CountBox>
        {renderList(comments)}
      </Column>

      <Column>
        <SectionTitle>내가 단 대댓글</SectionTitle>
        <CountBox>
          <span>총 답글 수 2</span>
        </CountBox>
        {renderList(replies, true)}
      </Column>
    </Wrapper>
  );
};

export default CommentPage;
