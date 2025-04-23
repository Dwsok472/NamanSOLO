// SlideMenu.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// ▼ 핵심: '$isOpen' 사용
const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-300px')};
  width: 300px;
  height: 100%;
  background-color: #ffefd5;
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? '5px 0 15px rgba(0,0,0,0.3)' : 'none'};
  transition: left 0.3s ease;
  z-index: 1000;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 20px;
  margin: 0;
`;

const MenuItem = styled.li`
  margin: 20px 0;
  font-size: 1.5rem;
  font-family: 'Comic Sans MS', cursive;
  color: #333;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const MenuToggle = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: #ffefd5;
  border: none;
  padding: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1100;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
`;

function SlideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MenuToggle onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '닫기' : '메뉴'}
      </MenuToggle>

      {/* 핵심: '$isOpen' prop으로 전달 */}
      <MenuContainer $isOpen={isOpen}>
        <MenuList>
          <MenuItem>
            <Link to="/album/all">전체 앨범</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/map">맵</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/events">이벤트</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/mypage">마이페이지</Link>
          </MenuItem>
        </MenuList>
      </MenuContainer>
    </>
  );
}

export default SlideMenu;
