import React, { useState } from 'react';
import styled from 'styled-components';
import PhotoCard from '../Album/PhotoCard';
import couple1 from '../img/couple1.png';
import couple2 from '../img/couple2.png';
import couple3 from '../img/couple3.png';
import couple4 from '../img/couple4.jpg';
import couple5 from '../img/couple5.png';

const BookWrapper = styled.div`
  position: relative;
  max-width: calc(100% - 40px); 
  width: 100%;
  max-width: 900px; 
  height: 520px;  
  perspective: 1500px;
  margin: 0 auto;
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
  border-radius: 12%;
  border: none;
  display: flex;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.25s ease-in-out;

  &:hover {
    background: #ff6b6b;
    color: white;
  }

  &:active {
    transform: translateY(-50%) scale(0.96);
  }
`;

const BookFlip = () => {
  const [flipped, setFlipped] = useState(false);

  const togglePage = () => setFlipped((prev) => !prev);

  return (
    <BookWrapper>
      <FlipCard $flipped={flipped}>
        <PageSet className="front">
          <BookPage className="left">
            <PhotoCard
              src={[couple1 , couple2]}
              title="첫 나들이"
              $rotate={-3}
              $offsetY={-8}
            />
          </BookPage>
          <BookPage className="right">
            <PhotoCard
              src={[couple3]}
              title="벚꽃 데이트"
              $rotate={2}
              $offsetY={0}
            />
          </BookPage>
        </PageSet>

        <PageSet className="back">
          <BookPage className="left">
            <PhotoCard
              src={[couple4]}
              title="비 오는 날의 카페"
              $rotate={1}
              $offsetY={-6}
            />
          </BookPage>
          <BookPage className="right">
            <PhotoCard
              src={[couple5]}
              title="둘만의 여행"
              $rotate={-2}
              $offsetY={4}
            />
          </BookPage>
        </PageSet>
      </FlipCard>

      <BookSpine />

      <NavButton $left onClick={togglePage}>◀</NavButton>
      <NavButton onClick={togglePage}>▶</NavButton>
    </BookWrapper>
  );
};

export default BookFlip;
