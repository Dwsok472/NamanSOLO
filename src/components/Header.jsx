import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body.blur #main-content {
    filter: blur(4px);
    transition: filter 0.3s ease;
    pointer-events: none;
    user-select: none;
  }
`;

const Container = styled.header`
  width: 100%;
  height: 100px;
  background-color: #ffcbc2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-left: 3rem;

  a, div {
    font-size: 1.3rem;
    color: white;
    font-weight: 500;
    text-decoration: none;
    padding: 0.4rem 0.6rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    transform-origin: center;
    display: inline-block;

    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
      border-radius: 12px;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuWrapper = styled.div`
  position: relative;
`;

const SubMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background-color: #ffc1b4;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07);
  padding: 1rem 1.5rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 999;
  min-width: 160px;

  li a {
    color: white;
    text-decoration: none;
    padding: 0.4rem 0.6rem;
    border-radius: 8px;
    white-space: nowrap;
    transition: all 0.25s ease-in-out;
    transform-origin: center;
    display: inline-block;

    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
      border-radius: 12px;
    }
  }
`;

const ButtonGroup = styled.div`
  margin-left: auto;
  display: flex;
  gap: 1.5rem;

  a {
    font-size: 1.05rem;
    color: white;
    font-weight: 500;
    text-decoration: none;
    padding: 0.3rem 0.5rem;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: #ffe9e5;
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Hamburger = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    background: none;
    border: 2px solid white;
    padding: 0.4rem 0.8rem;
    border-radius: 10px;
    font-size: 1.6rem;
    color: white;
    cursor: pointer;
    z-index: 1001;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ $open }) => ($open ? '0' : '-300px')};
  width: 280px;
  height: 100%;
  background-color: #fff0eb;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 1000;

  ul {
    list-style: none;
    padding: 100px 20px 0;
    margin: 0;

    li {
      padding: 12px 0;

      a {
        color: #6a2b1b;
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: bold;
      }

      span {
        font-size: 1.2rem;
        font-weight: bold;
        color: #6a2b1b;
        cursor: pointer;
      }
    }
  }
`;

const Overlay = styled.div`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 998;
`;

function Header2() {
  const [isSubOpen, setSubOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSubMenu = () => setSubOpen(!isSubOpen);
  const closeSidebar = () => {
    setSidebarOpen(false);
    setSubOpen(false);
    document.body.classList.remove('blur');
  };

  useEffect(() => {
    if (isSubOpen) {
      document.body.classList.add('blur');
    } else {
      document.body.classList.remove('blur');
    }
  }, [isSubOpen]);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Logo>WeARE</Logo>

        <Nav>
          <Link to="/story/all">전체 스토리</Link>
          <Link to="/map">맵</Link>
          <Link to="/events">이벤트</Link>

          <MenuWrapper>
            <div onClick={toggleSubMenu}>
              마이페이지 <span style={{ transform: isSubOpen ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: '0.2s' }}>▼</span>
            </div>
            {isSubOpen && (
              <SubMenu>
                <li><Link to="/mypage/info">커플 정보</Link></li>
                <li><Link to="/mypage/diary">나의 다이어리</Link></li>
                <li><Link to="/mypage/letter">나의 편지</Link></li>
                <li><Link to="/mypage/calendar">캘린더</Link></li>
                <li><Link to="/mypage/painting">그림</Link></li>
              </SubMenu>
            )}
          </MenuWrapper>
        </Nav>

        <ButtonGroup>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </ButtonGroup>

        <Hamburger onClick={() => setSidebarOpen(true)}>☰</Hamburger>
      </Container>

      <Overlay $open={isSidebarOpen} onClick={closeSidebar} />
      <Sidebar $open={isSidebarOpen}>
        <ul>
          <li><Link to="/story/all" onClick={closeSidebar}>전체 스토리</Link></li>
          <li><Link to="/map" onClick={closeSidebar}>맵</Link></li>
          <li><Link to="/events" onClick={closeSidebar}>이벤트</Link></li>
          <li onClick={toggleSubMenu}>
            <span>
              마이페이지 {isSubOpen ? '▲' : '▼'}
            </span>
          </li>
          {isSubOpen && (
            <>
              <li><Link to="/mypage/info" onClick={closeSidebar}>커플 정보</Link></li>
              <li><Link to="/mypage/diary" onClick={closeSidebar}>나의 다이어리</Link></li>
              <li><Link to="/mypage/letter" onClick={closeSidebar}>나의 편지</Link></li>
              <li><Link to="/mypage/calendar" onClick={closeSidebar}>캘린더</Link></li>
              <li><Link to="/mypage/painting" onClick={closeSidebar}>그림</Link></li>
            </>
          )}
          <li><Link to="/login" onClick={closeSidebar}>로그인</Link></li>
          <li><Link to="/signup" onClick={closeSidebar}>회원가입</Link></li>
        </ul>
      </Sidebar>
    </>
  );
}

export default Header2;
