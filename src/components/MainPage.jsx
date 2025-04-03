import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const Wrapper = styled.div`
  padding: 120px 24px 40px;
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

// --- 인트로 관련 스타일 ---
const slideUp = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const IntroWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #fff0f0;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ animateSlide }) => animateSlide && css`${slideUp} 1s ease forwards`};
`;

const IntroText = styled.div`
  position: absolute;
  font-size: 2.8rem;
  font-weight: 900;
  color: #222;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  transition: all 1.5s ease;

  ${({ animateToLogo }) =>
    animateToLogo &&
    css`
      top: 20px;
      left: 40px;
      transform: translate(0, 0) scale(0.4);
      opacity: 0;
    `}
`;

const MainContent = styled.div`
  opacity: 0;
  animation: ${({ show }) =>
    show &&
    css`
      ${fadeInUp} 1s ease forwards;
    `};
`;

function MainPage() {
  const [displayText, setDisplayText] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [animateToLogo, setAnimateToLogo] = useState(false);
  const [slideOutIntro, setSlideOutIntro] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const fullTextRef = useRef('WE ARE... 우리의 이야기');

  useEffect(() => {
    let index = 0;
    const typing = () => {
      if (index < fullTextRef.current.length) {
        setDisplayText((prev) => prev + fullTextRef.current[index]);
        index++;
        setTimeout(typing, 100);
      }
    };
    typing();
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimateToLogo(true), 2000); // shrink & move
    const t2 = setTimeout(() => setSlideOutIntro(true), 2800); // slide up
    const t3 = setTimeout(() => {
      setShowIntro(false);
      setShowMain(true);
    }, 3800); // show main

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <>
      {showIntro && (
        <IntroWrapper animateSlide={slideOutIntro}>
          <IntroText animateToLogo={animateToLogo}>{displayText}</IntroText>
        </IntroWrapper>
      )}

      <MainContent show={showMain}>
        <Wrapper>
          <Section>
            <SubText>
              <strong>(WE ARE..)</strong> 우리의 이야기<br />
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
      </MainContent>
    </>
  );
}

export default MainPage;
