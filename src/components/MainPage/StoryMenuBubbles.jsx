import React from 'react';
import styled from 'styled-components';
import BubbleCard from './BubbleCard';
import mainmap from '../img/mainmap.png';
import mystory from '../img/mystory.png';
import storyall from '../img/storyall.png';
import maincallender from '../img/maincallender.png';
import { Link } from 'react-router-dom';

const BubbleSectionWrapper = styled.section`
  width: 100%;
  padding: 120px 40px;
  background: linear-gradient(to bottom, #f2ebdc, #fff, #f2bdbd);
  /* background: linear-gradient(to bottom, #fff, #ffe2e2, #f2ebdc); */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  height: 900px;
`;

const TextGroup = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Subtitle = styled.p`
  font-size: 2rem;
  color: #222;
  font-weight: 600;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  color: #8c0d17;
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
        <Link to="/story/all">
          <BubbleCard
            icon={storyall}
            title="다른 연인들의<br />이야기가 궁금하다면?"
            meta="전체 스토리"
            $bgColor="#7235ff"
            $backColor="#744ed3"
          />
        </Link>
        <Link to="/mypage/story">
          <BubbleCard
            icon={mystory}
            title="우리의 추억,<br />하나 하나 놓치지 마세요!"
            meta="나의 스토리"
            bgColor="#67d3c4"
            backColor="#5dbfaf"
          />
        </Link>
        <Link to="/mypage/todo">
          <BubbleCard
            icon={maincallender}
            title="너와 나의 기념일,<br />꼭 기억해요 💌"
            meta="캘린더"
            $bgColor="#ffa51d"
            $backColor="#fa9427"
          />
        </Link>
        <Link to="/map">
          <BubbleCard
            icon={mainmap}
            title="저희의 추천 명소를<br />구경해보실래요?"
            meta="데이트 장소 추천"
            $bgColor="#26a0fd"
            $backColor="#43a4e6"
          />
        </Link>
      </CardGrid>
    </BubbleSectionWrapper>
  );
};

export default StoryMenuBubbles;
