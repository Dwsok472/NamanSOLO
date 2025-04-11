import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import leftkey from './img/leftkey.png';
import rightkey from './img/rightkey.png';
import HeartButton from './HeartButton';
import comment from './img/comment.png';
import Comment from './Comment';
import location from './img/location.png';
import ImageSlider from './ImageSlider';



function MyAlbumModal({ album, onClose }) {
  const [imageIndex, setImageIndex] = useState(0); // ✅ 이미지 넘기기
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(album?.likes?.length || 0);
  const [userLikes, setUserLikes] = useState({});
  const [commentCount, setCommentCount] = useState(album?.comments?.length || 0);
  const currentUser = 'user1';

  useEffect(() => {
    if (album?.likes) {
      const initialLikes = album.likes.reduce((acc, user) => {
        acc[user] = true;
        return acc;
      }, {});
      setUserLikes(initialLikes);
    }
  }, [album?.likes]);

  const toggleCommentVisibility = () => {
    setIsCommentVisible((prev) => !prev);
  };

  const handleLike = () => {
    setUserLikes((prevLikes) => {
      const updated = { ...prevLikes };
      if (updated[currentUser]) {
        delete updated[currentUser];
      } else {
        updated[currentUser] = true;
      }
      setLikeCount(Object.keys(updated).length);
      return updated;
    });
  };

  const handleNewComment = (newCount) => {
    setCommentCount(newCount);
  };

  return (
    <>
      <Backdrop onClick={onClose} />
      <Container>
        <BottomBox $isCommentVisible={isCommentVisible}>
          <Box>
            <div className="date">{album?.date}</div>
            <ImageSlider imgurl={album?.imgurl} />
            <div className="boxwrap">
              <div>
                <div className="username">{album?.username}</div>
                <div className="title">{album?.title}</div>
              </div>
              <div className="button">
                <HeartButton
                  albumId={album?.id}
                  onLike={handleLike}
                  currentUser={currentUser}
                  likes={Object.keys(userLikes)}
                />
                <span className="like">{likeCount}</span>
                <img
                  src={comment}
                  alt="comment"
                  className="comment"
                  onClick={toggleCommentVisibility}
                />
                <span className="commentCount">{commentCount}</span>
              </div>
            </div>

            <div className="tags">
              {album?.tag?.map((tag, i) => (
                <span key={i}>#{tag} </span>
              ))}
            </div>
            <div className="map">
              <img src={location} alt="location" className="locationimg" />
              <span>{album?.location}</span>
            </div>
          </Box>

          {isCommentVisible && (
            <CommentBox>
              <Comment albumData={album} onCommentAdd={handleNewComment} />
            </CommentBox>
          )}
        </BottomBox>
      </Container>
    </>
  );
}

export default MyAlbumModal;


const Container = styled.div`
  width: 100%;
  margin: 0 auto;
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
  width: ${(props) => (props.$isCommentVisible ? '1000px' : '600px')};
  border-radius: 16px;
  transition: width 0.3s ease-out;
  background-color: #000000;
  padding: 20px;
  z-index: 210;
  display: flex;
  position: fixed;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
`;

const CommentBox = styled.div`
  width: 400px;
  background-color: #111;
  padding: 20px;
`;
const Box = styled.div`
  width: 600px;
  position: relative;

  .date {
    color: #a3a3a3;
    font-size: 0.7rem;
    padding-left: 10px;
  }

  .image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 10px;
  }

  .leftkey, .rightkey {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 200px;
    cursor: pointer;
  }

  .leftkey {
    left: 5px;
  }

  .rightkey {
    right: 5px;
  }

  .boxwrap {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .username {
    font-weight: 700;
    padding-left: 10px;
    color: white;
  }

  .title {
    color: white;
    font-size: 1rem;
  }

  .button {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .like, .commentCount {
    color: white;
    font-size: 0.8rem;
  }

  .comment {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .tags {
    padding: 10px;
    color: white;
    font-size: 0.8rem;
  }

  .map {
    padding: 10px;
    display: flex;
    align-items: center;
    color: white;
    font-size: 0.8rem;
    gap: 8px;
  }

  .locationimg {
    width: 20px;
    height: 20px;
  }
`;
