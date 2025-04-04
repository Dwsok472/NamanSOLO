import React from 'react';
import styled from 'styled-components';
import BookFlip from './BookFlip';
import couple1 from '../img/couple1.png'; // 경로는 프로젝트 구조에 따라 조정

const BookSectionWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 80px 60px;
  background: #fff8f8;
  border-radius: 0;
  box-shadow: none;
  gap: 40px;
  width: 100vw;
  max-width: 100vw;
  margin: 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 40px 20px;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  max-width: 30%;
  text-align: left;

  h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 16px;
  }

  img {
    width: 100%;
    max-width: 220px;
    margin-bottom: 16px;
  }

  p {
    font-size: 0.95rem;
    color: #555;
    margin: 4px 0;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;

    h2 {
      text-align: center;
    }

    img {
      margin: 0 auto 16px;
    }
  }
`;

const RightPanel = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  padding: 20px;
  border-radius: 24px;
  background: white;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BookSection = ({ flipped, togglePage, bookRef }) => {
  return (
    <BookSectionWrapper ref={bookRef}>
      <LeftPanel>
        <h2>나의 STORY</h2>
        <img src={couple1} alt="커플 일러스트" />
        <p>로그인 전: 인기 story</p>
        <p>로그인 후: 나의 story</p>
      </LeftPanel>
      <RightPanel>
        <BookFlip flipped={flipped} togglePage={togglePage} />
      </RightPanel>
    </BookSectionWrapper>
  );
};

export default BookSection;
