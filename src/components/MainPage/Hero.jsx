import React from 'react';
import styled, { keyframes } from 'styled-components';
import couple2 from '../img/11111.png';
import couple3 from '../img/55555.png';
import couple4 from '../img/22222.png';
import couple5 from '../img/33333.png';
import star from '../img/star.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BookSection from './BookSection';
import { useUserStore } from '../Login/Login';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const HeroWrapper = styled.section`
  background: linear-gradient(to bottom, #f6f2ea, #dd7676, #f6f2ea );
  /* background-color: #f6f2ea; */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 60px 20px;
  overflow: hidden;
  .a1{
    position: absolute;
    min-height: 600px;
    width: 900px;
    background-color: #f6f2ea;
    top: 22.4%;
    right: 25.8%;
    z-index: 2;
    border: 1px solid #afafaf;
  }
.a2{
    position: absolute;
    min-height: 600px;
    width: 900px;
    background-color: #f6f2ea;
    border: 1px solid #afafaf;
    top: 21%;
    right: 24.9%;
    z-index: 1;
  }
`;

const Wrap = styled.div`
margin-top: 100px;
  background-color: #ffffff;
  height: 600px;
  width: 900px;
  position: relative;
  z-index: 1000000;
  border: 1px solid #afafaf;
.box{
width: 100%;
height: 150px;
background-color: #f6f2ea;
position: relative;
.box1{
  width: 100%;
position: absolute;
top: 0;
height: 30px;
border-bottom: 1px solid #b6b6b6;
z-index: 10;
text-align: start;
span{
  padding-left: 10px;
  color: #bb6f6f;
  font-weight: 500;
}
}
  }

`
const HeroText = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  margin-top: 30px;
  color: #fdfdfd;

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
      navigate('/mypage/album');
    } else {
      navigate('/login');
    }
  };

  return (
    <HeroWrapper>
      {/* <FloatingTopLeft src={couple3} alt="커플풍선" /> */}
      <Star src={star} alt="star" $top="30%" $left="80%" />
      <Star src={star} alt="star" $top="70%" $left="20%" />
      <Star src={star} alt="star" $top="85%" $left="75%" />
      <Star src={star} alt="star" $top="15%" $left="35%" />
      <Star src={star} alt="star" $top="35%" $left="5%" />
      <Star src={star} alt="star" $top="50%" $left="50%" />
      {/* <div className='a1'></div>
      <div className='a2'></div> */}
      {/* <Wrap> */}
      {/* <div className='box'>
        <div className='box1'>
          <span>We ARE</span>
        </div>
      </div> */}
      <HeroText>
        연인과 함께하는 오늘을,
        <span>잘 담아두고 있나요?</span>
      </HeroText>
      <HeroDesc>
        잊지못할 그날을 기억하고 기념해요,
        <br />
        <strong>WeARE가 함께할게요.</strong>
      </HeroDesc>
      <CTAButton onClick={handleSaveClick}>지금 바로 담아두기</CTAButton>

      {/* </Wrap> */}
      {/* <VisualRow>
        <FloatImage src={couple2} alt="커플 이미지 1" className="couple2" />
        <FloatImage src={couple4} alt="커플 이미지 2" className="couple3" />
        <FloatImage src={couple5} alt="커플 이미지 3" className="couple4" />
      </VisualRow> */}
    </HeroWrapper>
  );
}

export default Hero;
