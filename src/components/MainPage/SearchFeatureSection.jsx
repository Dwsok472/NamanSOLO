import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Lottie from 'lottie-react';
import userSearch from '../img/userSearch.json';
import followAnimation from '../img/follow.json';
import feed from '../img/feed.json';

const Section = styled.section`
  background: linear-gradient(to bottom, #f6f2ea, #fce8f0, #f2ebdc);
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

// 애니메이션 정의
const floatUpDown = keyframes`
  0% {
    transform: translateY(-5px); /* 위로 살짝 이동 */
  }
  50% {
    transform: translateY(5px); /* 아래로 살짝 이동 */
  }
  100% {
    transform: translateY(-5px); /* 다시 위로 이동 */
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000000;
  text-align: center;
  line-height: 1.4;
  white-space: pre-line;
  animation: ${floatUpDown} 2s ease-in-out infinite;
  margin-bottom: 50px;
  text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white,
    1px 1px 0 white;
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
  width: 550px;
  height: 550px;
  margin: 0 auto;
  border-radius: 50%;
  border: 2px dashed #ffffff;

  box-shadow: 0 0 20px rgba(192, 11, 78, 0.6),
    inset 0 0 15px rgba(192, 11, 78, 0.3);

  animation: pulseRotate 30s ease-in-out infinite; // 회전 애니메이션 적용
  @keyframes pulseRotate {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.02);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
`;

const Node = styled.div`
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: white;
  border: 1.5px solid #7c2a2a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  padding: 10px;
  animation: spinNode 30s linear infinite;
  ${(props) =>
    props.className === 'active' &&
    `
  box-shadow: 0 0 25px 5px rgba(255, 126, 126, 0.7);
  transform: scale(1.05);
  transition: all 0.3s ease;
`}

  @keyframes spinNode {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    } // 반대 방향으로 살짝 회전해줌
  }

  h3 {
    font-size: 1.2rem;
    color: #000000;
    position: absolute;
    bottom: -30px;
  }
`;

const Slider = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  position: relative;
  background-color: #ffffff;

  img,
  canvas {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    display: block;
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  padding: 20px 30px;
  border-radius: 12px;
  text-align: center;
  width: 80%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  h3 {
    font-size: 1.3rem;
    color: #ffffff;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #c9c9c9;
    white-space: pre-line;
  }
`;

function SearchFeatureSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const slides = [
    {
      type: 'lottie',
      lottie: userSearch,
      title: '유저 검색',
      desc: '처음 너를 찾아본 순간,\n무심한 듯 설렘이 왔지.',
    },
    {
      type: 'lottie',
      lottie: followAnimation,
      title: '팔로우',
      desc: '서로를 팔로우하면,\n우리의 이야기가 하나로 연결돼요.',
    },
    {
      type: 'lottie',
      lottie: feed,
      title: '스토리 보기',
      desc: '팔로우한 연인의 페이지를 방문해보세요.\n사랑의 기억이 페이지마다 담겨 있어요.',
    },
  ];

  const currentSlide = slides[currentImage];

  useEffect(() => {
    if (slides[currentImage].type !== 'lottie') {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % slides.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentImage, slides]);

  return (
    <Section>
      <Title>
        두 사람의 순간들이 어떻게 하나의 이야기로{'\n'}
        이어졌는지, 들어볼래요?
      </Title>

      <Container>
        <Left>
          <LoopWrapper>
            <Node
              style={{ top: '-60px', left: '220px' }}
              className={currentImage === 0 ? 'active' : ''}
            >
              <Lottie
                animationData={userSearch}
                style={{ width: 100, height: 100 }}
              />
              <h3>유저 검색</h3>
            </Node>
            <Node
              style={{ top: '330px', left: '-30px' }}
              className={currentImage === 1 ? 'active' : ''}
            >
              <Lottie
                animationData={followAnimation}
                style={{ width: 100, height: 100 }}
              />
              <h3>팔로우</h3>
            </Node>
            <Node
              style={{ top: '350px', left: '400px' }}
              className={currentImage === 2 ? 'active' : ''}
            >
              <Lottie
                animationData={feed}
                style={{ width: 100, height: 100 }}
              />
              <h3>스토리 보기</h3>
            </Node>
          </LoopWrapper>
        </Left>

        <Right>
          <Slider>
            {currentSlide.type === 'image' ? (
              <img
                src={slides[currentImage].img}
                alt={`slide-${currentImage}`}
              />
            ) : (
              <Lottie
                key={currentSlide.title}
                animationData={currentSlide.lottie}
                loop={false}
                onComplete={() =>
                  setCurrentImage((prev) => (prev + 1) % slides.length)
                }
              />
            )}
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
