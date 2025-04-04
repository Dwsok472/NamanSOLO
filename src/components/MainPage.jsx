import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';

const PageContainer = styled.div`
  position: relative;
  overflow: visible;
`;

const IntroWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #8c0d17;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transform: ${({ $slideOut }) => ($slideOut ? 'translateY(-100%)' : 'translateY(0)')};
  transition: transform 1.2s ease-in-out;
`;

const IntroText = styled.div`
  position: fixed;
  z-index: 10001;
  font-weight: bold;
  font-family: 'inherit';
  color: white;
  font-size: ${({ $animateToLogo }) => ($animateToLogo ? '2.5rem' : '10rem')};
  top: ${({ $top }) => ($top !== undefined ? `${$top}px` : '50%')};
  left: ${({ $left }) => ($left !== undefined ? `${$left}px` : '50%')};
  transform: translate(-50%, -50%);
  transition: all 1.5s ease-in-out;
`;

const MainContent = styled.div.attrs(() => ({
  id: 'main-content',
}))`
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: ${({ $show }) => ($show ? 'translateY(0)' : 'translateY(20px)')};
  transition: all 0.8s ease-in-out;
  padding-top: 20px;
`;

const Wrapper = styled.div`
  padding: 120px 24px 40px;
  font-family: 'Poppins', sans-serif;
  color: #333;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 50px;
`;

const HeroSection = styled.section`
  background: linear-gradient(to bottom, #fff0f0, #ffeaea);
  padding: 100px 20px 80px;
  text-align: center;
`;

const HeroText = styled.h1`
  font-family: 'GmarketSansMedium', sans-serif;
  font-size: 2.2rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;

  strong {
    font-family: 'GmarketSansBold';
    font-weight: 700;
    color: #222;
  }
`;

const HeroSubText = styled.p`
  font-size: 1.1rem;
  color: #777;
  line-height: 1.8;
`;

const CTAButton = styled.button`
  margin-top: 24px;
  padding: 14px 28px;
  font-size: 1rem;
  background-color: #ff8a8a;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4d4d;
  }
`;


const SubText = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 2.5rem;
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
  const [displayText, setDisplayText] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [animateToLogo, setAnimateToLogo] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const fullTextRef = useRef('WeARE');
  const logoRef = useRef(null);
  const [logoPosition, setLogoPosition] = useState({ top: 0, left: 0 });
  const [showLogo, setShowLogo] = useState(false);
  const didSetRef = useRef(false);

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

  useLayoutEffect(() => {
    const getLogoPos = () => {
      if (logoRef.current && !didSetRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        const top = rect.top + rect.height / 2;
        const left = rect.left + rect.width / 2;
        setLogoPosition({ top, left });
        didSetRef.current = true;
      } else if (!logoRef.current) {
        setTimeout(getLogoPos, 50);
      }
    };
    setTimeout(getLogoPos, 0);
    setTimeout(getLogoPos, 100);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimateToLogo(true), 2000);
    const t2 = setTimeout(() => setShowLogo(true), 3200);
    const t3 = setTimeout(() => setSlideOut(true), 3600);
    const t4 = setTimeout(() => {
      setShowIntro(false); 
      setShowMain(true);
      document.body.classList.remove("blur");
    }, 4800); 
  
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);
  
  const scrollToStory = () => {
    const element = document.getElementById('main-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header
        logoRef={logoRef}
        showLogo={showLogo}
        logoText="WeARE"
        menuItems={[
          { to: '/story/all', label: '전체 스토리' },
          { to: '/map', label: '맵' },
          { to: '/events', label: '이벤트' },
        ]}
        subMenuItems={[
          { to: '/mypage/info', label: '커플 정보' },
          { to: '/mypage/story', label: '나의 스토리' },
          { to: '/mypage/comment', label: '나의 댓글' },
          { to: '/mypage/todo', label: '커플 캘린더' },
          { to: '/mypage/other', label: '그 외' },
        ]}
        loginText="로그인"
        signupText="회원가입"
      />

      <PageContainer>
        {showIntro && (
          <>
            <IntroText
              $animateToLogo={animateToLogo}
              $top={animateToLogo ? logoPosition.top : undefined}
              $left={animateToLogo ? logoPosition.left : undefined}
            >
              {displayText}
            </IntroText>
            <IntroWrapper $slideOut={slideOut} />
          </>
        )}

        <MainContent $slideOut={slideOut} $show={showMain}>
          <HeroSection>
            <HeroText>
              <strong>(WE ARE..)</strong> 우리의 이야기<br />
              너와 나, 두 사람이 한 권의 책을 써가는 중이에요.<br />
              우리의 이야기는 계속 된다...
            </HeroText>
            <CTAButton onClick={scrollToStory}>바로가기</CTAButton>
          </HeroSection>

          <Wrapper>
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
      </PageContainer>
    </>
  );
}

export default MainPage;
