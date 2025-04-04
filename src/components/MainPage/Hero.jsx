import React from 'react';
import styled, { keyframes } from 'styled-components';
import couple1 from '../img/couple10.png';
import couple2 from '../img/couple11.png';
import couple3 from '../img/couple12.png';
import star from '../img/star.png'; 

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const HeroWrapper = styled.section`
  background-color: #ececec;
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 60px 20px;
  overflow: hidden;
`;

const HeroText = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: #111;

  span {
    display: block;
    font-size: 2.6rem;
    color: #000;
    font-weight: 900;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;

    span {
      font-size: 2rem;
    }
  }
`;

const HeroDesc = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: #444;
  max-width: 640px;
  margin: 0 auto 30px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const CTAButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 30px;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #ff4d4d;
  }
`;

const VisualRow = styled.div`
  margin-top: 60px;
  display: flex;
  gap: 60px;
  align-items: flex-end;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 32px;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const FloatImage = styled.img`
  width: 320px;
  animation: ${float} 4s ease-in-out infinite;

  @media (max-width: 768px) {
    width: 160px;
  }
`;

const FloatingTopLeft = styled.img`
  position: absolute;
  top: 100px;
  left: 200px;
  width: 440px;
  animation: ${float} 5s ease-in-out infinite;
  opacity: 0.9;

  @media (max-width: 768px) {
    width: 100px;
    top: 20px;
    left: 20px;
  }
`;

const Star = styled.img`
  position: absolute;
  width: 40px;
  animation: ${float} 3s ease-in-out infinite;
  opacity: 0.6;

  ${({ top, left }) => `
    top: ${top};
    left: ${left};
  `}
`;

const Hero = () => {
  return (
    <HeroWrapper>
      <FloatingTopLeft src={couple3} alt="커플풍선" />
      <Star src={star} alt="star" top="30%" left="80%" />
      <Star src={star} alt="star" top="70%" left="20%" />
      <Star src={star} alt="star" top="85%" left="75%" />

      <HeroText>
        연인과 함께하는 오늘을, 
        <span>잘 담아두고 있나요?</span>
      </HeroText>
      <HeroDesc>
        잊지못할 그날을 기억하고 기념해요,<br />
        <strong>WeARE가 함께할게요.</strong>
      </HeroDesc>
      <CTAButton>지금 바로 담아두기</CTAButton>

      <VisualRow>
        <FloatImage src={couple1} alt="커플 이미지 1" />
        <FloatImage src={couple2} alt="커플 이미지 2" />
      </VisualRow>
    </HeroWrapper>
  );
};

export default Hero;
