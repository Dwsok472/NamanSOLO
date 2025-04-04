import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 240px;
  height: 260px;
  background: #ff8a9b;
  border-radius: 16px;
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  margin-left: 60px;

  &:hover div:nth-child(1) {
    opacity: 0;
    transform: translateY(-10px);
  }

  &:hover div:nth-child(2) {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Front = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ff798d;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 16px;
  z-index: 2;
`;

const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #d54056;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  border-radius: 16px;
  z-index: 1;
`;


const BubbleCard = ({ frontText, backText }) => {
  return (
    <Card>
      <Front>{frontText}</Front>
      <Back>{backText}</Back>
    </Card>
  );
};

export default BubbleCard;
