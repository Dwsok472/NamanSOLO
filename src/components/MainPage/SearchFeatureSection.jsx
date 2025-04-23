import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import searchImg from '../img/1.jpg';
import followImg from '../img/2.png';
import storyImg from '../img/3.jpg';

const Section = styled.section`
  background: linear-gradient(to bottom, #f2ebdc, #fff9f9, #f2ebdc);
  padding: 120px 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  gap: 60px;
  padding: 0 80px;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: #8c0d17;
  text-align: center;
  line-height: 1.4;
  white-space: pre-line; 
  animation: floatIn 1.4s ease-in-out both;
  margin-bottom: 50px;
`;

const floatIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;


const Left = styled.div`
  flex: 1;
  min-width: 360px;
  display: flex;
  justify-content: center;
`;

const Right = styled.div`
  flex: 1;
  min-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoopWrapper = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  margin: 0 auto;
  border-radius: 50%;
  border: 2px dashed #d81b60;
  transition: transform 0.9s ease;

  &:hover {
    transform: rotate(8deg);
  }
`;

const Node = styled.div`
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: white;
  border: 4px solid #d81b60;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 14px rgba(0,0,0,0.1);
  padding: 10px;

  img {
    width: 70px;
    height: 70px;
    border-radius: 12px;
    object-fit: cover;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 1rem;
    color: #8c0d17;
  }

  p {
    font-size: 0.9rem;
    color: #555;
    text-align: center;
  }
`;

const Slider = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    transition: opacity 0.5s ease-in-out;
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 20px 30px;
  border-radius: 12px;
  text-align: center;
  width: 80%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);

  h3 {
    font-size: 1.3rem;
    color: #8c0d17;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #555;
  }
`;


function SearchFeatureSection() {
  const slides = [
    {
      img: searchImg,
      title: '유저 검색',
      desc: '연인의 아이디로 직접 검색해보세요.\n찾는 순간, 추억이 시작됩니다.'
    },
    {
      img: followImg,
      title: '팔로우',
      desc: '서로를 팔로우하면,\n우리의 이야기가 하나로 연결돼요.'
    },
    {
      img: storyImg,
      title: '스토리 보기',
      desc: '팔로우한 연인의 페이지를 방문해보세요.\n사랑의 기억이 페이지마다 담겨 있어요.'
    }
  ];
  

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <Section>
      <Title>
        두 사람의 순간들이
        어떻게 하나의 이야기로{'\n'}
        이어졌는지, 들어볼래요?
      </Title>


      <Container>
        <Left>
          <LoopWrapper>
            <Node style={{ top: "-50px", left: "220px" }}>
              <img src={searchImg} alt="검색" />
              <h3>유저 검색</h3>
              {/* <p>처음 너를 찾아본 순간, 무심한 듯 설렘이 왔지.</p> */}
            </Node>
            <Node style={{ top: "330px", left: "-70px" }}>
              <img src={followImg} alt="팔로우" />
              <h3>팔로우</h3>
              {/* <p>서로를 구독하며 기억을 공유하게 되었어.</p> */}
            </Node>
            <Node style={{ top: "330px", left: "500px" }}>
              <img src={storyImg} alt="스토리" />
              <h3>스토리 보기</h3>
              {/* <p>너의 이야기를 들여다보며 내 마음도 기록했지.</p> */}
            </Node>
          </LoopWrapper>
        </Left>
        <Right>
          <Slider>
            <img src={slides[currentImage].img} alt={`slide-${currentImage}`} />
            <TextOverlay>
              <h3>{slides[currentImage].title}</h3>
              <p>{slides[currentImage].desc}</p>
            </TextOverlay>
          </Slider>
        </Right>
      </Container>
    </Section>
  );
}

export default SearchFeatureSection;
