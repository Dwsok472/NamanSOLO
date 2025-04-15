import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const CommentPage = () => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);

  async function getAllComment() {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) {
      return;
    }
    try {
      const response = await axios.get('/api/comment/username', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response || response.length === 0) {
        console.log('댓글 데이터를 가져오지 못했습니다.');
        return;
      }
      setComments(response.data);
    } catch (error) {
      alert('정보를 불러오는 과장에서 에러가 발생하였습니다! ');
      throw error; // 에러 처리
    }
  }

  async function getAllReComment() {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) {
      return;
    }
    try {
      const response = await axios.get('/api/recomment/username', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response || response.length === 0) {
        console.log('대댓글 데이터를 가져오지 못했습니다.');
        return;
      }
      setReplies(response.data);
    } catch (error) {
      alert('정보를 불러오는 과장에서 에러가 발생하였습니다! ');
      throw error; // 에러 처리
    }
  }

  useEffect(() => {
    getAllReComment();
    getAllComment();
  }, []);



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
    setEditValue("");
  };

  const handleDelete = (id, isReply) => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
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
          <Date>📅 {item.addDate}</Date>
          <TitleRow>
            {/* <span>{item.feedTitle}</span> */}
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
                <Button onClick={() => handleSave(item.id, isReply)}>
                  저장
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setEditingId(item.id);
                    setEditValue(item.content);
                  }}
                >
                  수정
                </Button>
              )}
              <Button>{isReply ? "댓글 보기" : "답글"}</Button>
            </ButtonGroup>
          </CommentRow>
        </Content>
        <CloseBtn onClick={() => handleDelete(item.id, isReply)}>×</CloseBtn>
      </Card>
    ));

  return (
    <Wrapper>
      <Column>
        <TopFixed>
          <SectionTitle>내가 단 댓글</SectionTitle>
          <CountBox>
            <span>총 댓글 수 {comments.length}</span>
          </CountBox>
        </TopFixed>
        <ScrollSection>{renderList(comments)}</ScrollSection>
      </Column>

      <Column>
        <TopFixed>
          <SectionTitle>내가 단 대댓글</SectionTitle>
          <CountBox>
            <span>총 답글 수 {replies.length}</span>
          </CountBox>
        </TopFixed>
        <ScrollSection>{renderList(replies, true)}</ScrollSection>
      </Column>
    </Wrapper>
  );
};

export default CommentPage;


const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 24px;
  overflow: hidden;
`;

const Column = styled.div`
  flex: 1;
  background: #c0c0c09e;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #c0c0c09e;
  display: flex;
  flex-direction: column;
  height: 100%;
  height: 605px;
`;

const TopFixed = styled.div`
  flex: 0 0 auto;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 24px;
  margin-bottom: 8px;
`;

const CountBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 0 0 12px;

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
  background-image: url("https://placeholderjs.com/60x60");
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
  background: ${({ danger }) => (danger ? "#ffe0e0" : "#f0f0f0")};
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

const ScrollSection = styled.div`
  flex: 1;
  max-height: 475px;
  min-height: 0;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 4px;
  }
`;
