import React, { useEffect, useState } from 'react';
import styled, { keyframes , css } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const moveToTop = keyframes`
  from {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  to {
    top: 20px;
    left: 40px;
    transform: translate(0, 0) scale(0.4);
    opacity: 0;
  }
`;

const IntroWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  background-color: #fff0f0;
  width: 100vw;
  height: 100vh;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
`;

const IntroText = styled.div`
  font-size: 2.8rem;
  font-weight: 900;
  color: #222;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: ${fadeIn} 1s forwards;

  ${({ animateOut }) =>
    animateOut &&
    css`
      animation: ${moveToTop} 1.5s forwards;
    `}
`;

// ㅡㅡㅡㅡㅡㅡㅡㅡ위에는 인트로 스타일

const Wrapper = styled.div`
  padding: 120px 24px 40px; // 👈 헤더 높이 + 넉넉한 상단 여백
  font-family: 'Poppins', sans-serif;
  color: #333;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 50px;
`;

const SubText = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 1.05rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;

  button {
    padding: 12px 24px;
    border-radius: 20px;
    border: 2px solid #ffcccc;
    background: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: #ffeaea;
    }
  }
`;

const GoButton = styled.button`
  background-color: #ff7f7f;
  color: white;
  font-weight: bold;
  padding: 12px 28px;
  font-size: 1rem;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #ff5252;
  }
`;

const SliderSection = styled.section`
  margin: 40px auto;
  width: 90%;
  height: 200px;
  background-color: #f3f3f3;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Banner = styled.div`
  font-size: 2.4rem;
  font-weight: bold;
  margin-top: 80px;
`;

function MainPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimateOut(true);
    }, 2000);

    const timer2 = setTimeout(() => {
      setShowIntro(false);
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <Wrapper>

      <IntroWrapper show={showIntro}>
        <IntroText animateOut={animateOut}>WE ARE... 우리의 이야기</IntroText>
      </IntroWrapper>

      <Section>
        <SubText>
          <span style={{ fontWeight: 'bold' }}>(WE ARE..)</span> 우리의 이야기<br />
          너와 나, 두 사람이 한 권의 책을 써가는 중이에요.<br />
          우리의 이야기는 계속 된다...
        </SubText>
        <GoButton>바로가기</GoButton>
      </Section>

      <SliderSection>
        슬라이드 or 팝업 자리 (여기에 Swiper 연결 가능)
      </SliderSection>

      <Section>
        <Title>나의 STORY</Title>
        <ButtonGroup>
          <button>전체 STORY</button>
          <button>나만의 STORY</button>
          <button>너와의 기념</button>
        </ButtonGroup>
      </Section>

      <Section>
        <Title>데이트 장소 추천</Title>
        <SubText>추천 장소 카드 or 간단한 썸네일 들어올 자리</SubText>
      </Section>

      <Banner>LOVE TOGETHER</Banner>

    </Wrapper>
  );
}

export default MainPage;
