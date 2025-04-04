import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StoryMenuWrapper = styled.section`
  width: 100%;
  padding: 80px 20px;
  background: linear-gradient(to bottom, #fff0f0, #fff9f9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
`;

const BubbleButton = styled.button`
  padding: 16px 28px;
  font-size: 1.05rem;
  font-weight: 600;
  color: #c24040;
  background-color: transparent;
  border: 2px solid #ffc2c2;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

  &:hover {
    background-color: #ffc2c2;
    color: white;
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 12px 20px;
  }
`;

const StoryMenuBubbles = () => {
  const navigate = useNavigate();

  return (
    <StoryMenuWrapper>
      <MenuContainer>
        <BubbleButton onClick={() => navigate('/story/all')}>전체 스토리</BubbleButton>
        <BubbleButton onClick={() => navigate('/mypage/story')}>나만의 스토리</BubbleButton>
        <BubbleButton onClick={() => navigate('/mypage/todo')}>기념 캘린더</BubbleButton>
        <BubbleButton onClick={() => navigate('/map')}>데이트 장소</BubbleButton>
      </MenuContainer>
    </StoryMenuWrapper>
  );
};

export default StoryMenuBubbles;
