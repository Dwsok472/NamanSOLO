import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../Header';
import Intro from './Intro';
import BookSection from './BookSection';
import Hero from './Hero';
import StoryMenuBubbles from './StoryMenuBubbles';
import MainPopup from './MainPopup';
import SearchFeatureSection from './SearchFeatureSection';

const PageContainer = styled.div`
  position: relative;
  overflow: visible;
`;

const MainContent = styled.div`
  filter: ${({ $blur }) => ($blur ? 'blur(4px)' : 'none')};
  transition: filter 0.3s ease;
  pointer-events: ${({ $blur }) => ($blur ? 'none' : 'auto')};
  user-select: ${({ $blur }) => ($blur ? 'none' : 'auto')};

  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: none;
  transition: all 0.8s ease-in-out;
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

const floatUpDown = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const LovePhrase = styled.h2`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-family: 'Caveat', cursive;
  font-weight: 800;
  color: #000;
  letter-spacing: 4px;
  animation: ${floatUpDown} 3s ease-in-out infinite;
`;

function MainPage({logoRef}) {
  const [displayText, setDisplayText] = useState('');
  const [showIntro, setShowIntro] = useState(() => {
    const played = sessionStorage.getItem('introPlayed');
    return !played; // 아직 본 적 없다면 보여주기
  });
  const [animateToLogo, setAnimateToLogo] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const fullTextRef = useRef('WeARE');
  const [logoPosition, setLogoPosition] = useState(null);
  const [showLogo, setShowLogo] = useState(false);
  const didSetRef = useRef(false);
  const bookRef = useRef(null);
  const [blurred, setBlurred] = useState(false);
  const [showHeader, setShowHeader] = useState(false); // 추가

useEffect(() => {
  if (!showIntro) {
    setShowHeader(true); // showIntro가 끝난 뒤 Header 보이게
  }
}, [showIntro]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  
    // 0.1초 후 강제로 스크롤 초기화 (Hero 로딩 후)
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);
  

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullTextRef.current.length) {
        setDisplayText(fullTextRef.current.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDisplayText('');
        }, 3000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const getLogoPos = () => {
      if (logoRef.current && !didSetRef.current) {
        const $rect = logoRef.current.getBoundingClientRect();
        const top = $rect.top + $rect.height / 2;
        const left = $rect.left + $rect.width / 2;
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
    if (!showIntro) {
      setShowMain(true);
      setShowLogo(true);

      return;
    }

    const t1 = setTimeout(() => setAnimateToLogo(true), 2000);
    const t2 = setTimeout(() => setShowLogo(true), 3200);
    const t3 = setTimeout(() => setSlideOut(true), 3600);
    const t4 = setTimeout(() => {
      setShowMain(true);
      sessionStorage.setItem('introPlayed', 'true');
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

  const togglePage = () => setFlipped((prev) => !prev);

  return (
    <>
      {/* <Header
        logoRef={logoRef}
        showLogo={showLogo}
        logoText="WeARE"
        onSubMenuToggle={(v) => setBlurred(v)}
        menuItems={[
          { to: '/album/all', label: '전체 앨범' },
          { to: '/map', label: '맵' },
          { to: '/events', label: '이벤트' },
        ]}
        subMenuItems={[
          { to: '/mypage/todo', label: '캘린더' },
          { to: '/mypage/follow', label: '팔로우' },
          { to: '/mypage/comment', label: '나의 댓글' },
          { to: '/mypage/bookmark', label: '즐겨찾기' },
          { to: '/mypage/album', label: 'MY ALBUM' },
        ]}
        loginText="로그인"
        signupText="회원가입"
      /> */}
      <PageContainer>
        {showIntro && (
          <Intro
            showIntro={showIntro}
            animateToLogo={animateToLogo}
            logoPosition={logoPosition}
            displayText={displayText}
            slideOut={slideOut}
          />
        )}
        {showMain && <MainPopup />}

        <MainContent
          id="main-content"
          $slideOut={slideOut}
          $show={showMain}
          $blur={blurred}
        >
          <Hero />
          <BookSection
            flipped={flipped}
            togglePage={togglePage}
            bookRef={bookRef}
          />
          <SearchFeatureSection />
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
