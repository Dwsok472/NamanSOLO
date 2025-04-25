import React from 'react';
import styled from 'styled-components';
import BookFlip from './BookFlip';
import { useNavigate } from 'react-router-dom';

const BookSectionWrapper = styled.section`
  display: flex;
  /* justify-content: center; */
  align-items: flex-start;
  padding: 100px 60px;
  /* background: linear-gradient(to bottom, #ececec, #f5e4c3); */
  background: linear-gradient(to bottom, #fff, #ffe2e2, #f2ebdc);
  border-radius: 0;
  width: 100%;
  height: 900px;
  min-height: 640px;
  gap: 60px;
  flex-wrap: wrap;
  position: relative;

  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 60px 20px;
  }
`;

const BookSectionContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: nowrap;
  width: 100%;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const BookIntroBox = styled.div`
  width: 100%;
  padding: 60px 30px;
  font-size: 1.15rem;
  line-height: 2;
  color: #1d1d1d;
  text-align: left;
  margin-left: 50px;
  h3 {
    font-size: 3.5rem;
    font-weight: 700;
    color: #0f0f0f;
    margin-bottom: 1.5rem;
  }
  .other {
    color: #bf1f3c;
    font-size: 4rem;
    font-weight: 700;
    /* background: linear-gradient(to right, #a10000, #2c2c2c, #bf1f3c);
    -webkit-background-clip: text;
    color: transparent; */
    color: white;
    text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
  }
  p {
    margin-bottom: 2rem;
    font-weight: 700;
  }

  .highlight {
    display: inline-block;
    font-weight: 600;
    color: #ffffff;
    background: #ffbebe;
    padding: 3px 8px;
    border-radius: 10px;
    margin: 0 2px;
  }

  .cta-link {
    display: inline-block;
    margin-top: 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      font-weight: 700;
    }
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
    font-size: 1rem;

    h3 {
      font-size: 1.4rem;
    }
  }
`;

const BookSection = ({ flipped, togglePage, bookRef }) => {
  const navigate = useNavigate();

  return (
    <BookSectionWrapper ref={bookRef}>
      <BookSectionContent>
        <BookIntroBox>
          <h3>
            우리의 이야기, <br />
            <span className="other">오늘도 한 페이지</span>
          </h3>
          <p>
            하루의 소소한 기쁨부터 가슴 깊이 남은 순간까지, 당신의 사랑 이야기를{' '}
            <br /> <span className="highlight">책처럼 남기고</span>,{' '}
            <span className="highlight">함께 공감하는 공간</span>에
            기록해보세요.
          </p>
          <div className="cta-link" onClick={() => navigate('/album/all')}>
            전체 앨범 둘러보기 →
          </div>
        </BookIntroBox>

        <BookFlip flipped={flipped} togglePage={togglePage} />
      </BookSectionContent>
    </BookSectionWrapper>
  );
};

export default BookSection;
