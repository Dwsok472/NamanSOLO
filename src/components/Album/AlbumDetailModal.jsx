import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import leftkey from '../img/leftkey.png';
import rightkey from '../img/rightkey.png';
import StarButton from './StarButton';
import HeartButton from './HeartButton';
import CommentButton from './CommentButton';
import comment from '../img/comment.png';
import Comment from './Comment';
import locationpicker from '../img/location.png';
import ImageSlider from '../MyPage/MyAlbum/ImageSlider';
import Top from './Top';
import axios from 'axios';
import { useUserStore } from '../Login/Login';
import { useLocation } from 'react-router-dom';

function AlbumDetailModal({ albumData, onClose, onEdit }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [$isCommentVisible, setIsCommentVisible] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [likeCount, setLikeCount] = useState(albumData.greats.length); // 앨범의 초기 좋아요 수 설정
  const [userLikes, setUserLikes] = useState({}); // 유저별 좋아요 상태 관리
  const [commentCount, setCommentCount] = useState(albumData.comments.length);
  const currentUser = useUserStore((state) => state.user?.username);
  const isAdmin = useUserStore((state) => state.user?.authority);
  const location = useLocation();
  console.log(albumData);
  console.log(userLikes);
  const isMyPage = location.pathname.startsWith('/mypage/album');

  // 해당 앨범에 전체 좋아요를 한 username을 가지고 오기
  const getAllComments = async () => {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;
    try {
      const response = await axios.get(
        `/api/comment/album-id/${albumData.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setCommentCount(response.data.length);
    } catch (error) {
      console.error('코멘트 개수 불러오기 실패:', error);
    }
  };
  useEffect(() => {
    getAllComments();
  }, [albumData.id]); // albumData.id를 부를 때마다 좋아요 목록 가지고 오기

  // 댓글 모음 토글 함수
  const toggleCommentVisibility = (albumId) => {
    if (selectedAlbumId !== albumId) {
      setIsCommentVisible(false);
      setSelectedAlbumId(albumId);
    }
    setIsCommentVisible((prevVisibility) => !prevVisibility);
  };

  // 댓글 수 업데이트
  const handleNewComment = (newCount) => {
    console.log('실시간 댓글 수:', commentCount);
    setCommentCount(newCount);
  };

  // 좋아요 토글 관리 함수
  async function toggleLike(albumId, username) {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;

    try {
      const response = await axios.post(
        '/api/great/save',
        {
          albumId,
          username, // DTO에 맞춰서 함께 전송
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data; // { albumId, liked, username }
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
      return null;
    }
  }

  async function deleteByAdmin(albumId) {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;
    try {
      const response = await axios.delete(
        `/api/album/delete/${albumId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return alert(response.data);
    } catch (error) {
      console.error('앨범 삭제 실패:', error);
      return null;
    }
  }

  //해당 ID를 가진 앨범을 삭제하기
  async function handleDeleteAlbum(id) {
    const confirmDelete = window.confirm(`앨범을 정말 삭제하시겠어요?`);
    if (!confirmDelete) return;
    await deleteByAdmin(id);
    setSelectedAlbumId(null);
    window.location.reload();
  }


  // 해당 앨범에 전체 좋아요를 한 username을 가지고 오기
  const getAllGreats = async () => {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;
    try {
      const response = await axios.get(`/api/great/albumId/${albumData.id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });
      const usernames = response.data; //현재 앨범에 좋아요를 누른 유저네임들

      const updateLikes = {};
      usernames.forEach((username) => {
        updateLikes[username] = true; // [couple001] = true 로 만들기!!
      });

      setUserLikes(updateLikes); // 전체 좋아요를 누른 username 담기
      setLikeCount(usernames.length); // 좋아요 개수
    } catch (error) {
      console.error('좋아요 목록 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    getAllGreats();
  }, [albumData.id]); // albumData.id를 부를 때마다 좋아요 목록 가지고 오기

  const handleLike = async () => {
    const result = await toggleLike(albumData.id, currentUser);
    if (!result) return;

    // 좋아요 상태 갱신
    setUserLikes((prev) => {
      const updated = { ...prev };
      if (result.liked) {
        updated[result.username] = true;
      } else {
        delete updated[result.username];
      }
      setLikeCount(Object.keys(updated).length);
      return updated;
    });
  };

  // 이미지 변경 함수 (왼쪽 화살표 클릭 시)
  const prevImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : albumData.url.length - 1
    );
  };

  // 이미지 변경 함수 (오른쪽 화살표 클릭 시)
  const nextImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex < albumData.url.length - 1 ? prevIndex + 1 : 0
    );
  };

  const currentMedia = albumData.url?.[imageIndex];
  const multipleImages = albumData.url?.length > 1;
  return (
    <>
      <Backdrop onClick={onClose} />
      <Container>
        <BottomBox $isCommentVisible={$isCommentVisible}>
          <Box id={albumData.id}>
            <TopBar>
              <div className="date">{albumData.addDate}</div>
              {currentUser != albumData.username && (
                <StarButtonWrapper>
                  <StarButton albumId={albumData.id} />
                </StarButtonWrapper>
              )}
            </TopBar>
            {multipleImages && (
              <img
                src={leftkey}
                alt="leftkey"
                className="leftkey"
                onClick={prevImage}
              />
            )}
            <div style={{ position: 'relative' }}>
              {isMyPage ? (
                <EditButton onClick={() => onEdit(albumData)}>수정</EditButton>
              ) : isAdmin === "ROLE_ADMIN" && <Admin onClick={() => handleDeleteAlbum(albumData.id)}>삭제</Admin>}
              {currentMedia.mediaType === 'PICTURE' ? (
                <img
                  src={currentMedia.mediaUrl}
                  alt="image"
                  className="image"
                />
              ) : (
                <video
                  muted
                  autoPlay
                  controls
                  loop
                  className="video"
                  src={currentMedia.mediaUrl}
                />
              )}
            </div>
            {multipleImages && (
              <img
                src={rightkey}
                alt="rightkey"
                className="rightkey"
                onClick={nextImage}
              />
            )}
            <div className="boxwrap">
              <div className="box">
                <div className="username">{albumData.username}</div>
                <div className="title">{albumData.title}</div>
              </div>
              <div className="button">
                <HeartButton
                  albumId={albumData.id}
                  onLike={() => handleLike(currentUser)}
                  currentUser={currentUser}
                  likes={Object.keys(userLikes)}
                />
                <span className="like">{likeCount}</span>
                <img
                  src={comment}
                  alt="comment"
                  className="comment"
                  onClick={() => toggleCommentVisibility(albumData.id)}
                />
                <span className="commentCount">{commentCount}</span>
              </div>
            </div>

            <div className="tags">
              {albumData.albumTags.length > 0 ? (
                albumData.albumTags.map((tag, i) => <span key={i}>{tag} </span>)
              ) : (
                <span> </span>
              )}
            </div>

            <div className="map">
              <img src={locationpicker} className="locationimg" />
              <div className="location">{albumData.location}</div>
            </div>
          </Box>

          {$isCommentVisible && selectedAlbumId === albumData.id && (
            <CommentBox>
              <Comment albumData={albumData} onCommentAdd={handleNewComment} />
            </CommentBox>
          )}
        </BottomBox>
      </Container>
    </>
  );
}

export default AlbumDetailModal;

// 스타일 정의
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 30px;
  position: absolute;
  height: 100%;
`;
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1003;
`;

const BottomBox = styled.div`
  width: ${(props) => (props.$isCommentVisible ? '60%' : '30%')};
  border-radius: 16px;
  transition: margin-top 0.3s ease-out;
  background-color: #000000;
  padding-bottom: 10px;
  padding-top: 20px;
  z-index: 1004;
  display: flex;
  position: fixed;
  top: 150px;
  left: 320px;
`;
const CommentBox = styled.div`
  width: 100%;
  /* background-color: white; */
`;
const Box = styled.div`
  width: 100%;
  position: relative;
  .date {
    color: #a3a3a3;
    font-size: 0.7rem;
    padding-left: 10px;
  }
  .image {
    width: 100%;
    height: 550px;
    object-fit: contain;
    background-color: white;
  }
  .video {
    width: 100%;
    height: 550px;
    object-fit: contain;
  }
  .leftkey {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 5px;
    top: 40%;
    z-index: 10;
  }
  .rightkey {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 5px;
    top: 40%;
  }
  .boxwrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .box {
    font-size: 0.8rem;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    width: 100%;
  }
  .username {
    padding-left: 10px;
    font-weight: 700;
  }
  .title{
    width: auto;
  }
  .button {
    display: flex;
    justify-content: end;
    padding-right: 5px;
    .like,
    .commentCount {
      color: white;
      font-size: 0.6rem;
    }
  }
  .comment {
    width: 25px;
    height: 25px;
    object-fit: cover;
    margin-left: 3px;
    cursor: pointer;
  }
  .tags {
    font-size: 0.8rem;
    color: #ffffff;
    padding-top: 10px;
    padding-bottom: 7px;
    border-bottom: 1px solid white;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .map {
    width: 100%;
    display: flex;
    padding-left: 10px;
    .locationimg {
      width: 20px;
      height: 20px;
      object-fit: cover;
    }
    .location {
      font-size: 0.8rem;
      color: #ffffff;
    }
  }
`;

const EditButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #000;
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #444;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  z-index: 100;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const Admin = styled.button`
position: absolute;
top: 10px;
right: 10px;
background-color: #000;
color: #fff;
padding: 6px 12px;
border-radius: 6px;
border: 1px solid #444;
font-size: 0.9rem;
font-weight: bold;
cursor: pointer;
transition: background-color 0.2s ease, color 0.2s ease;
z-index: 100;
&:hover {
  background-color: #fff;
  color: #000;
}
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 4px 10px;
  background-color: #000;
  color: white;
  align-items: center;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const StarButtonWrapper = styled.div`
  z-index: 2;
`;
