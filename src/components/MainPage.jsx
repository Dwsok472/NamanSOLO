import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Header from './Header';

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

// 애니메이션
const IntroWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  background-color: #fff0f0;
  width: 100vw;
  height: 100vh;
  display: ${({ $show }) => ($show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  transition: transform 1.5s ease-in-out, opacity 1s ease-in-out;

  ${({ $slideOut }) =>
    $slideOut &&
    css`
      transform: translateY(-100%);
      opacity: 0;
    `}
`;

const IntroText = styled.div`
  position: absolute;
  font-size: 10rem;
  font-weight: 900;
  color: #222;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  transition: all 1.5s ease-in-out;

  ${({ $animateToLogo, $top, $left }) =>
    $animateToLogo &&
    css`
      top: ${$top + 22}px;
      left: ${$left + 68}px;
      transform: translate(-50%, -50%) scale(0.4);
      font-size: 2.4rem;
    `}
`;

const MainContent = styled.div`
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: ${({ $show }) => ($show ? "translateY(0)" : "translateY(20px)")};
  transition: all 0.8s ease-in-out;
`;

function MainPage() {
  const [displayText, setDisplayText] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [animateToLogo, setAnimateToLogo] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const fullTextRef = useRef('WE ARE...');
  const logoRef = useRef(null);
  const [logoPosition, setLogoPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullTextRef.current.length) {
        setDisplayText(fullTextRef.current.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getLogoPos = () => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        setLogoPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
        });
      } else {
        setTimeout(getLogoPos, 100);
      }
    };
    getLogoPos();
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimateToLogo(true), 2200);
    const t2 = setTimeout(() => setSlideOut(true), 4000);
    const t3 = setTimeout(() => {
      setShowIntro(false);
      setShowMain(true);
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <>
      <Header
        logoRef={logoRef}
        menuItems={[
          { to: '/story/all', label: '전체 스토리' },
          { to: '/map', label: '맵' },
          { to: '/events', label: '이벤트' },
        ]}
        subMenuItems={[
          { to: '/mypage/info', label: '커플 정보' },
          { to: '/mypage/story', label: '나의 스토리' },
          { to: '/mypage/comment', label: '나의 댓글' },
          { to: '/mypage/todo', label: '캘린더' },
          { to: '/mypage/other', label: '그 외' },
        ]}
        loginText="로그인"
        signupText="회원가입"
      />

      {showIntro && (
        <IntroWrapper $show={showIntro} $slideOut={slideOut}>
          <IntroText
            $animateToLogo={animateToLogo}
            $top={logoPosition.top}
            $left={logoPosition.left}
          >
            {displayText}
          </IntroText>
        </IntroWrapper>
      )}

      <MainContent $show={showMain}>
        <Wrapper>
          <Section>
            <SubText>
              <strong>(WE ARE..)</strong> 우리의 이야기<br />
              너와 나, 두 사람이 한 권의 책을 써가는 중이에요.<br />
              우리의 이야기는 계속 된다...
            </SubText>
            <GoButton>바로가기</GoButton>
          </Section>

          <SliderSection>슬라이드 or 팝업 자리</SliderSection>

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
