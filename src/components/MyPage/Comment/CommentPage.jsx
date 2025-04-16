import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { IconClose } from '../../Icons';
import leftkey from '../../img/leftkey.png';
import AlbumDetailModal from '../../Album/AlbumDetailModal';

const CommentPage = () => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  async function handleSelectedAlbum(albumId) {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;

    try {
      const response = await axios.get(`/api/album/id/${albumId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      setSelectedAlbum(response.data); // 전체 앨범 정보 저장
      setShowDetail(true); // 모달 열기
    } catch (error) {
      console.error('앨범 정보 불러오기 실패:', error);
      alert('앨범 정보를 불러오지 못했습니다.');
    }
  }

  const toggleBack = () => {
    setShowDetail(false); // 모달을 닫는 함수
  };

  useEffect(() => {
    getAllComment();
    getAllReComment();
  }, []);

  async function getAllComment() {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;

    try {
      const response = await axios.get('/api/comment/username', {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      const commentsWithAlbum = await Promise.all(
        response.data.map(async (item) => {
          const album = await findAlbum(item.albumId);
          return {
            ...item,
            albumTitle: album?.title || '제목 없음',
            albumThumbnail:
              album?.url?.[0]?.mediaUrl || '/default-thumbnail.png',
          };
        })
      );
      setComments(commentsWithAlbum);
    } catch (error) {
      alert('댓글 불러오기 중 오류 발생!');
    }
  }

  console.log(comments);
  async function getAllReComment() {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;

    try {
      const response = await axios.get('/api/recomment/username', {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      const repliesWithAlbum = await Promise.all(
        response.data.map(async (item) => {
          const album = await findAlbum(item.albumId);
          return {
            ...item,
            albumTitle: album?.title || '제목 없음',
            albumThumbnail:
              album?.url?.[0]?.mediaUrl || '/default-thumbnail.png',
          };
        })
      );
      setReplies(repliesWithAlbum);
    } catch (error) {
      alert('답글 불러오기 중 오류 발생!');
    }
  }

  async function findAlbum(albumId) {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return null;

    try {
      const response = await axios.get(`/api/album/id/${albumId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('앨범 정보 불러오기 실패', error);
      return null;
    }
  }

  const Update = async (id, isReply) => {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (editValue.trim() === '') {
      alert('공란으로는 저장할 수 없습니다.');
      return;
    }

    const contentValue = {
      id: id,
      content: editValue,
    };

    if (!isReply) {
      contentValue.albumId = comments.find((item) => item.id === id)?.albumId;
    } else {
      contentValue.commentId = replies.find(
        (item) => item.id === id
      )?.commentId;
    }

    try {
      const url = isReply ? '/api/recomment/update' : '/api/comment/update';
      const response = await axios.put(url, contentValue, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        const updater = (list) =>
          list.map((item) =>
            item.id === id ? { ...item, content: editValue } : item
          );
        isReply ? setReplies(updater) : setComments(updater);
        alert('정상적으로 수정되었습니다.');
      } else {
        alert('수정에 실패했습니다.');
      }
    } catch (error) {
      alert('서버 통신 중 오류가 발생했습니다.');
    }
  };

  const handleSave = (id, isReply) => {
    Update(id, isReply);
    setEditingId(null);
    setEditValue('');
  };

  async function deleteTarget(id, isReply) {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;

    try {
      const url = isReply ? '/api/recomment/id/' : '/api/comment/id/';
      await axios.delete(`${url}${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (isReply) {
        setReplies((prev) => prev.filter((item) => item.id !== id));
      }
      setComments((prev) => prev.filter((item) => item.id !== id));
      window.location.reload();
    } catch (error) {
      throw error;
    }
  }

  const handleDelete = (id, isReply) => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;
    deleteTarget(id, isReply);
  };

  const renderList = (data, isReply = false) =>
    data.map((item) => (
      <Card key={item.id}>
        <Thumbnail onClick={() => handleSelectedAlbum(item.albumId)}>
          <img
            src={item.albumThumbnail}
            alt="앨범 썸네일"
            className="albumimg"
          />
        </Thumbnail>
        <Content>
          <Date>작성일자 : {item.addDate}</Date>
          <TitleRow>제목 : {item.albumTitle}</TitleRow>
          <CommentRow>
            {editingId === item.id ? (
              <CommentText
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
              />
            ) : (
              <span className="comment">내용 : {item.content}</span>
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
            </ButtonGroup>
          </CommentRow>
        </Content>
        <CloseBtn onClick={() => handleDelete(item.id, isReply)}>
          <IconClose />
        </CloseBtn>
        {showDetail && (
          <AlbumDetailModal onClose={toggleBack} albumData={selectedAlbum} />
        )}
      </Card>
    ));

  return (
    <Wrapper>
      <Column>
        <TopFixed>
          <CountBox>
            <span>
              총 댓글 수 <hr />
              {comments.length}
            </span>
          </CountBox>
        </TopFixed>
        <ScrollSection>{renderList(comments)}</ScrollSection>
      </Column>

      <Column>
        <TopFixed>
          <CountBox>
            <span>
              총 답글 수 <hr />
              {replies.length}
            </span>
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
  background-color: #c0c0c09e;
  padding: 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  height: 605px;
`;

const TopFixed = styled.div`
  flex: 0 0 auto;
`;

const CountBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 0 0 12px;
  span {
    text-align: center;
    background: #000000;
    color: white;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 8px;
  }
`;

const Card = styled.div`
  display: flex;
  position: relative;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 16px;
  /* padding: 12px; */
  padding-top: 10px;
  padding-left: 10px;
  height: 80px;
`;

const Thumbnail = styled.div`
  width: 60px;
  height: 60px;
  background: #ffffff;
  border-radius: 15px;
  border: 1px solid #3333;
  margin-right: 16px;
  img {
    border-radius: 15px;
    object-fit: cover;
    width: 100%;
    height: 100%;
    font-size: 0.7rem;
    border: none;
  }
`;

const TitleRow = styled.div`
  font-size: 0.65rem;
  color: #636262;
  cursor: pointer;
  margin-bottom: 4px;
`;

const Content = styled.div`
  flex: 1;
  margin-right: 10px;
  margin-top: 3px;
`;

const Date = styled.div`
  font-size: 0.65rem;
  color: #888;
  margin-bottom: 4px;
`;

const CommentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  span {
    font-size: 0.8rem;
    font-weight: 700;
  }
`;
const CommentText = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.8rem;
  font-weight: 700;
  &:focus {
    outline: none;
    /* border-bottom: 1px solid #aaa; */
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
  background-color: #fffffffa;
  border: 1px solid #b3b3b3;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 0.6rem;
  font-weight: 700;
  color: #333333;
  cursor: pointer;
  &:hover {
    background-color: #0f0f0ff9;
    color: #ffffff;
    border: none;
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
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
