import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import leftkey from '../img/leftkey.png';
import rightkey from '../img/rightkey.png';
import StarButton from './StarButton';
import HeartButton from './HeartButton';
import CommentButton from './CommentButton';
import comment from '../img/comment.png';
import Comment from './Comment';
import location from '../img/location.png';
import ImageSlider from '../MyPage/MyAlbum/ImageSlider';
import Top from './Top';


function AlbumDetailModal({ albumData, onClose, onEdit }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [likeCount, setLikeCount] = useState(albumData.greats.length); // 앨범의 초기 좋아요 수 설정
  const [userLikes, setUserLikes] = useState({}); // 유저별 좋아요 상태 관리
  const currentUser = 'user2'; // 현재 로그인한 사용자 예시
  const [commentCount, setCommentCount] = useState(albumData.comments.length);


  useEffect(() => {
    // 초기 좋아요 상태 설정 (기존 좋아요 배열에 포함된 사용자 확인)
    const initialLikes = albumData.greats.reduce((acc, user) => {
      acc[user] = 1; // 좋아요를 누른 유저는 1로 설정
      return acc;
    }, {});
    setUserLikes(initialLikes);
  }, [albumData.greats]);

  useEffect(() => {
    // 댓글 개수 업데이트
    const fetchCommentCount = albumData.comments.length; // albumData에 댓글 수가 들어있다고 가정
    setCommentCount(fetchCommentCount);
  }, [albumData]);

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

  // 좋아요 클릭 시 처리 함수
  const handleLike = (userId) => {
    setUserLikes((prevLikes) => {
      // 만약 현재 유저가 이미 좋아요를 눌렀다면, 해당 유저를 배열에서 제거
      const updatedLikes = { ...prevLikes };
      if (updatedLikes[userId]) {
        delete updatedLikes[userId]; // 이미 좋아요를 눌렀으면 좋아요 해제
      } else {
        updatedLikes[userId] = true; // 좋아요를 누르지 않았다면 좋아요 추가
      }

      const totalLikes = Object.keys(updatedLikes).length; // 새로운 좋아요 개수
      setLikeCount(totalLikes); // 총 좋아요 수 업데이트
      return updatedLikes; // 새로운 좋아요 상태 반환
    });
  };

  const currentMedia = albumData.url?.[imageIndex];
  const multipleImages = albumData.url?.length > 1;
  return (
    <>
      <Backdrop onClick={onClose} />
      <Container>
        <BottomBox isCommentVisible={isCommentVisible}>
          <Box id={albumData.id}>
            <TopBar>
              <div className="date">{albumData.date}</div>
              <StarButtonWrapper>
                <StarButton />
              </StarButtonWrapper>
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
              <EditButton onClick={() => onEdit(albumData)}>수정</EditButton>
              <img
                src={currentMedia.mediaUrl}
                alt="image"
                className="image"
              />
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
              {albumData.tag && albumData.albumTags.length > 0 ? (
                albumData.albumTags.map((tag, i) => <span key={i}>#{tag} </span>)
              ) : (
                <span> </span>
              )}
            </div>

            <div className="map">
              <img src={location} className="locationimg" />
              <div className="location">{albumData.location}</div>
            </div>
          </Box>

          {isCommentVisible && selectedAlbumId === albumData.id && (
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
  /* display: flex; */
  /* justify-content: center; */
  margin-top: 30px;
  /* align-items: center; */
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
  z-index: 150;
`;

const BottomBox = styled.div`
  width: ${(props) => (props.isCommentVisible ? '70%' : '35%')};
  border-radius: 16px;
  transition: margin-top 0.3s ease-out;
  background-color: #000000;
  padding-bottom: 10px;
  padding-top: 20px;
  z-index: 210;
  display: flex;
  position: fixed;
  top: 150px;
  left: 280px;
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
    object-fit: cover;
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

