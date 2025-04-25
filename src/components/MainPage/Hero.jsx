import React from 'react';
import styled, { keyframes } from 'styled-components';
import couple2 from '../img/11111.png';
import couple3 from '../img/55555.png';
import couple4 from '../img/22222.png';
import couple5 from '../img/33333.png';
import star from '../img/star.png';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import BookSection from './BookSection';
import { useUserStore } from '../Login/Login';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const HeroWrapper = styled.section`
  background: linear-gradient(to bottom, #940e19, #ffe3e3, #fff);
  /* background: linear-gradient(to bottom, #7b1e3c, #ffe3e3); */
  /* background: linear-gradient(to bottom, #b85c79, #fdecec); */
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
  font-size: 4.5rem;
  font-weight: 800;
  /* margin-bottom: 24px; */
  margin-top: 30px;
  color: #ffffff;

  span {
    display: block;
    font-size: 3.6rem;
    color: #000;
    font-weight: 900;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;

    span {
      font-size: 2.5rem;
    }
  }
`;

const HeroDesc = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: #bd0000;
  max-width: 640px;
  margin: 0 auto 30px;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const CTAButton = styled.button`
  // 나중에 login 안된유저는 로그인창 , login 된 유저는 앨범 작성화면 으로 이동동
  background: #940e19;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 1rem;
  margin-top: 16px;
  cursor: pointer;
  transition: 0.3s;
  font-size: 0.8rem;

  &:hover {
    background-color: #f2ebdc;
    color: #3b3b3b;
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
  .couple2 {
    position: absolute;
    left: 10%;
    bottom: 5%;
    opacity: 0.8;
    width: 250px;
  }
  .couple3 {
    position: absolute;
    right: 15%;
    bottom: 13%;
    opacity: 0.8;
  }
  .couple4 {
    position: absolute;
    top: 0;
    right: 5%;
    opacity: 0.8;
    width: 250px;
  }
`;

const FloatImage = styled.img`
  width: 300px;
  animation: ${float} 4s ease-in-out infinite;

  @media (max-width: 768px) {
    width: 160px;
  }
`;

const FloatingTopLeft = styled.img`
  position: absolute;
  top: 0px;
  left: 250px;
  width: 300px;
  animation: ${float} 5s ease-in-out infinite;
  opacity: 0.8;

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

  ${({ $top, $left }) => `
    top: ${$top};
    left: ${$left};
  `}
`;

function Hero({ scrollToStory }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useUserStore();

  const handleSaveClick = () => {
    if (isLoggedIn) {
      navigate("/mypage/album");
    } else {
      navigate("/login");
    }
  };
  
  return (
    <HeroWrapper>
      <FloatingTopLeft src={couple3} alt="커플풍선" />
      <Star src={star} alt="star" $top="30%" $left="80%" />
      <Star src={star} alt="star" $top="70%" $left="20%" />
      <Star src={star} alt="star" $top="85%" $left="75%" />
      <Star src={star} alt="star" $top="15%" $left="35%" />
      <Star src={star} alt="star" $top="35%" $left="5%" />
      <Star src={star} alt="star" $top="50%" $left="50%" />
      <HeroText>
        연인과 함께하는 오늘을,
        <span>잘 담아두고 있나요?</span>
      </HeroText>
      <HeroDesc>
        잊지못할 그날을 기억하고 기념해요,
        <br />
        <strong>WeARE가 함께할게요.</strong>
      </HeroDesc>
      <CTAButton onClick={handleSaveClick}>
      지금 바로 담아두기
    </CTAButton>

      <VisualRow>
        <FloatImage src={couple2} alt="커플 이미지 1" className="couple2" />
        <FloatImage src={couple4} alt="커플 이미지 2" className="couple3" />
        <FloatImage src={couple5} alt="커플 이미지 3" className="couple4" />
      </VisualRow>
    </HeroWrapper>
  );
}

export default Hero;
