import React from 'react';
import styled from 'styled-components';
import BookFlip from './BookFlip';
import { useNavigate } from 'react-router-dom';

const BookSectionWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 100px 60px;
  background: linear-gradient(to bottom, #ececec, #fff0f0);
  border-radius: 0;
  width: 100vw;
  min-height: 680px;
  gap: 60px;
  flex-wrap: wrap;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 60px 20px;
  }
`;

const BookSectionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: nowrap;
  width: 100%;
  max-width: 1200px;
  gap: 40px;

  @media (max-width: 1024px) {
    flex-wrap: wrap; 
    justify-content: center;
  }
`;

const BookIntroBox = styled.div`
  max-width: 500px;
  padding: 60px 40px;
  font-size: 1.2rem;
  line-height: 1.8;
  background: transparent;
  color: #333;
  flex-shrink: 0;

  strong {
    display: block;
    font-size: 1.3rem;
    font-weight: 700;
    margin-top: 1rem;
  }

  .cta-link {
    display: inline-block;
    margin-top: 2rem;
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #ff6b6b;
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;

    strong {
      font-size: 1.1rem;
    }
  }
`;

const BookSection = ({ flipped, togglePage, bookRef }) => {
  const navigate = useNavigate();

  return (
    <BookSectionWrapper ref={bookRef}>
      <BookSectionContent>
        <BookIntroBox>
          <p>
            우리의 이야기를 함께 나누고,<br />
            다른 커플들과 따뜻한 추억을 공유해보세요.
          </p>
          <p>
            사랑의 순간들을 <strong>책처럼 남기고</strong><br />
            <strong>함께 공감하는 공간</strong>이 여기에 있어요.
          </p>
          <div className="cta-link" onClick={() => navigate('/story/all')}>
            전체 스토리 둘러보기 →
          </div>
        </BookIntroBox>

        <BookFlip flipped={flipped} togglePage={togglePage} />
      </BookSectionContent>
    </BookSectionWrapper>
  );
};

export default BookSection;
