import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PhotoCard from '../Album/PhotoCard';
// import couple1 from '../img/couple1.png';
// import couple2 from '../img/couple2.png';
// import couple3 from '../img/couple3.png';
// import couple4 from '../img/couple4.jpg';
// import couple5 from '../img/couple5.png';
import leftkey from '../img/leftkey.png';
import rightkey from '../img/rightkey.png';
import { useUserStore } from '../Login/Login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookWrapper = styled.div`
  position: relative;
  max-width: calc(100% - 40px);
  width: 100%;
  max-width: 900px;
  height: 520px;
  perspective: 1500px;
  margin: 0 auto;
  margin-right: 50px;
`;

const FlipCard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1s ease-in-out;
  transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const PageSet = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  overflow: hidden;
  backface-visibility: hidden;

  &.back {
    transform: rotateY(180deg);
  }
`;

const BookPage = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  background: #fffcfc;
  color: #333;
  &.left {
    border-right: 1px solid #f3caca;
  }

  &.right {
    border-left: 1px solid #f3caca;
  }
`;

const BookSpine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: #f5e4c3;
  z-index: 2;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $left }) => ($left ? 'left: -48px;' : 'right: -48px;')}
  width: 42px;
  height: 42px;
  background: white;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.25s ease-in-out;
  &:hover {
    background: #dddddd;
    color: white;
  }
  &:active {
    transform: translateY(-50%) scale(0.96);
  }
`;

const BookFlip = () => {
  const [flipped, setFlipped] = useState(false);
  const [albums, setAlbums] = useState([]);
  const { isLoggedIn, user } = useUserStore();
  const navigate = useNavigate();
  const username = user?.username;

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const jwt = sessionStorage.getItem("jwt-token");
        const headers = jwt ? { Authorization: `Bearer ${jwt}` } : {};

        const url = isLoggedIn && username
          ? `/api/album/username/${username}`
          : `/api/album/all`;

        const res = await axios.get(url, { headers });
        if (res && res.data) {
          const sorted = isLoggedIn
            ? res.data.slice(0, 4)
            : res.data.sort((a, b) => b.greats.length - a.greats.length).slice(0, 4);
          setAlbums(sorted);
        }
      } catch (err) {
        console.error("앨범 불러오기 실패", err);
      }
    };

    fetchAlbums();
  }, [isLoggedIn, username]);

  const togglePage = () => setFlipped((prev) => !prev);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/mypage/album");
    } else {
      navigate("/story/all");
    }
  };

  return (
    <BookWrapper>
      <FlipCard $flipped={flipped}>
        <PageSet className="front">
          <BookPage className="left">
            {albums[0] && (
              <PhotoCard
                src={albums[0].url.map((m) => m.mediaUrl)}
                title={albums[0].title}
                onClick={handleClick}
              />
            )}
          </BookPage>
          <BookPage className="right">
            {albums[1] && (
              <PhotoCard
                src={albums[1].url.map((m) => m.mediaUrl)}
                title={albums[1].title}
                onClick={handleClick}
              />
            )}
          </BookPage>
        </PageSet>
        <PageSet className="back">
          <BookPage className="left">
            {albums[2] && (
              <PhotoCard
                src={albums[2].url.map((m) => m.mediaUrl)}
                title={albums[2].title}
                onClick={handleClick}
              />
            )}
          </BookPage>
          <BookPage className="right">
            {albums[3] && (
              <PhotoCard
                src={albums[3].url.map((m) => m.mediaUrl)}
                title={albums[3].title}
                onClick={handleClick}
              />
            )}
          </BookPage>
        </PageSet>
      </FlipCard>

      <BookSpine />
      <NavButton $left onClick={togglePage}>
        <img src={leftkey} className="leftkey" />
      </NavButton>
      <NavButton onClick={togglePage}>
        <img src={rightkey} className="rightkey" />
      </NavButton>
    </BookWrapper>
  );
};

export default BookFlip;
