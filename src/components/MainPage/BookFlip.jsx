import React from 'react';
import styled from 'styled-components';

const BookWrapper = styled.div`
  position: relative;
  width: 280px;
  height: 380px;
  perspective: 1500px;
`;

const BookPageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const PageFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff0f0;
  border-radius: 16px;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  transition: transform 0.8s ease;
  transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const PageBack = styled(PageFront)`
  background: #ffeaea;
  transform: ${({ $flipped }) => ($flipped ? 'rotateY(0deg)' : 'rotateY(180deg)')};
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
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.25s ease-in-out;

  &:hover {
    background: #ff6b6b;
    svg {
      stroke: #fff;
    }
  }

  &:active {
    transform: translateY(-50%) scale(0.96);
  }
  `;



const BookFlip = ({ flipped, togglePage }) => {
  return (
    <BookWrapper>
      <BookPageContainer>
        <PageFront $flipped={flipped}>📖 나의 이야기</PageFront>
        <PageBack $flipped={flipped}>📘 우리의 추억들</PageBack>
      </BookPageContainer>
      <NavButton $left onClick={togglePage}>◀</NavButton>
      <NavButton onClick={togglePage}>▶</NavButton>
    </BookWrapper>
  );
};

export default BookFlip;
