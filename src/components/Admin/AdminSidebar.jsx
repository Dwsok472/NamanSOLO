import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  background-color: #f2f4f8;
  height: 100%;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  margin-left: 16px;
  color: #2277ff;
  margin-bottom: 40px;
`;

const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MenuItem = styled(NavLink)`
  color: #333;
  font-weight: 600;
  padding: 10px 0px;
  margin-left: 4px;
  border-radius: 8px;
  transition: 0.2s;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 0;
    height: 100%;
    width: calc(100% - 8px);
    background-color: transparent;
    border-radius: 8px;
    z-index: -1;
    transition: background-color 0.2s;
  }

  &.active::before {
    background-color: #dbe4ff;
  }

  &.active {
    color: #1d4ed8;
  }

  &:hover::before {
    background-color: #e5ecff;
  }
`;

const MenuButton = styled.button`
  color: #333;
  font-weight: 600;
  padding: 10px 0px;
  margin-left: 4px;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: 0.2s;

  &:hover {
    background-color: #e5ecff;
  }
`;



function AdminSidebar({ setShowModal }) {
  return (
    <Sidebar>
      <Logo>ADMIN</Logo>

      <MenuGroup>
        <MenuItem to="/admin/users">유저 정보 및 통계</MenuItem>
        <MenuItem to="/admin/feeds">피드 정보 및 통계</MenuItem>
        <MenuButton onClick={() => setShowModal(true)}>
          이벤트 관리
        </MenuButton>
      </MenuGroup>
    </Sidebar>
  );
}

export default AdminSidebar;
