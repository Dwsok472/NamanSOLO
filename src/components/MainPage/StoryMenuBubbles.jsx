import React from 'react';
import styled from 'styled-components';
import BubbleCard from './BubbleCard';
import mainmap from '../img/mainmap.png';
import mystory from '../img/mystory.png';
import storyall from '../img/storyall.png';
import maincallender from '../img/maincallender.png';

const BubbleSectionWrapper = styled.section`
  width: 100%;
  padding: 120px 40px;
  background: linear-gradient(to bottom, #f5e4c3, #ffffff);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextGroup = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #d54056;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  font-size: 1.9rem;
  font-weight: 800;
  color: #222;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
`;

const StoryMenuBubbles = () => {
  return (
    <BubbleSectionWrapper>
      <TextGroup>
        <Subtitle>우리와의 페이지를 채워줄</Subtitle>
        <Title>어떤 이야기들이 필요할까요?</Title>
      </TextGroup>

      <CardGrid>
        <BubbleCard
          icon={storyall}
          title="다른 연인들의<br />사랑이야기가 궁금하다면?"
          meta="전체 스토리"
          bgColor="#bfa8f3"
          backColor="#8c71d3"
        />
        <BubbleCard
          icon={mystory}
          title="우리의 추억,<br />하나하나 놓치지 마세요 !"
          meta="나의 스토리"
          bgColor="#90e0d5"
          backColor="#5dbfaf"
        />
        <BubbleCard
            icon={maincallender}
            title="너와 나의 기념일,<br />꼭 기억해요 💌"
            meta="캘린더"
            bgColor="#ffd89e"
            backColor="#faaa57"
          />
        <BubbleCard
          icon={mainmap}
          title="저희의 추천 명소를<br />구경해보실래요?"
          meta="데이트 장소 추천"
          bgColor="#7fc8ff"
          backColor="#4d99cc"
        />
      </CardGrid>
    </BubbleSectionWrapper>
  );
};

export default StoryMenuBubbles;
