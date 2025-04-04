import React from 'react';
import styled from 'styled-components';
import BubbleCard from './BubbleCard';

const BubbleSectionWrapper = styled.section`
  width: 100%;
  padding: 120px 40px;
  background: linear-gradient(to bottom, #fff0f0, #ffffff);
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
        <BubbleCard frontText="전체 Story" backText="모든 커플의 이야기" />
        <BubbleCard frontText="나만의 Story" backText="나의 인기글 정리" />
        <BubbleCard frontText="너와의 기념" backText="함께한 날들을 저장" />
        <BubbleCard frontText="데이트 장소 추천" backText="우리가 갔던 그곳" />
      </CardGrid>
    </BubbleSectionWrapper>
  );
};

export default StoryMenuBubbles;
