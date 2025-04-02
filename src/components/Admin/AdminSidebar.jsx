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
  padding: 10px 14px;
  border-radius: 8px;
  transition: 0.2s;
  text-decoration: none;

  &.active {
    background-color: #dbe4ff;
    color: #1d4ed8;
  }

  &:hover {
    background-color: #e5ecff;
  }
`;

function AdminSidebar() {
  return (
    <Sidebar>
      <Logo>ADMIN</Logo>

      <MenuGroup>
        <MenuItem to="/admin/users">🧑 유저 정보 및 통계</MenuItem>
        <MenuItem to="/admin/feeds">📄 피드 정보 및 통계</MenuItem>
      </MenuGroup>
    </Sidebar>
  );
}

export default AdminSidebar;
