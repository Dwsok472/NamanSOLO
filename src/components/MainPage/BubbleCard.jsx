import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 240px;
  height: 260px;
  background: transparent;
  border-radius: 16px;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.1);
  }

  &:hover .front {
    opacity: 0;
    transform: translateY(-10px);
  }

  &:hover .back {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Front = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ $bgColor }) => $bgColor || '#ff798d'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  border-radius: 16px;
  transition: all 0.3s ease;
  z-index: 2;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 800;
  color: white;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const CardImage = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
`;

const CardMeta = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: white;
  opacity: 0.9;
`;

const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ $backColor }) => $backColor || '#d54056'};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  border-radius: 16px;
  z-index: 1;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
  padding: 20px;
`;

const BubbleCard = ({ icon, title, meta, $bgColor, $backColor }) => {
  return (
    <Card>
      <Front className="front" $bgColor={$bgColor}>
        <CardTitle dangerouslySetInnerHTML={{ __html: title }} />
        <CardImage src={icon} alt="icon" />
        <CardMeta>{meta}</CardMeta>
      </Front>
      <Back className="back" $backColor={$backColor}>
        {meta}
      </Back>
    </Card>
  );
};

export default BubbleCard;
