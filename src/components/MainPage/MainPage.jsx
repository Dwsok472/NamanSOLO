import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import Intro from './Intro';
import BookSection from './BookSection';
import Hero from './Hero';
import StoryMenuBubbles from './StoryMenuBubbles';

const PageContainer = styled.div`
  position: relative;
  overflow: visible;
`;

const MainContent = styled.div`
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: ${({ $show }) => ($show ? 'translateY(0)' : 'translateY(20px)')};
  transition: all 0.8s ease-in-out;
  padding-top: 0;
`;

const CallToLoveSection = styled.section`
  background: #fff;
  padding: 80px 20px 60px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LovePhrase = styled.h2`
  font-size: clamp(2.5rem, 6vw, 4.5rem); 
  font-family: 'Caveat', cursive;
  font-weight: 800;
  color: #000;
  letter-spacing: 4px;
  white-space: nowrap;
`;

function MainPage() {
  const [displayText, setDisplayText] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [animateToLogo, setAnimateToLogo] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const fullTextRef = useRef('WeARE');
  const logoRef = useRef(null);
  const [logoPosition, setLogoPosition] = useState({ top: 0, left: 0 });
  const [showLogo, setShowLogo] = useState(false);
  const didSetRef = useRef(false);
  const bookRef = useRef(null);

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
      setShowMain(true);
      document.body.classList.remove('blur');
      window.scrollTo({ top: 0 });
    }, 4400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const scrollToStory = () => {
    bookRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const togglePage = () => setFlipped((prev) => !prev);

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
        <Intro
          showIntro={showIntro}
          animateToLogo={animateToLogo}
          logoPosition={logoPosition}
          displayText={displayText}
          slideOut={slideOut}
        />

        <MainContent $slideOut={slideOut} $show={showMain}>
          <Hero />

          <BookSection
            flipped={flipped}
            togglePage={togglePage}
            bookRef={bookRef}
          />
          <StoryMenuBubbles />
        </MainContent>
        <CallToLoveSection>
    <LovePhrase>LOVE TOGETHER</LovePhrase>
  </CallToLoveSection>
      </PageContainer>
    </>
  );
}

export default MainPage;
