// 지금은 시각화만 하기 위한 코드입니다. 통계랑은 별개입니다 그래프만 따옴
import React from 'react';
import styled from 'styled-components';
import AdminSidebar from './AdminSidebar';
import UserJoinChart from './UserJoinChart';
import UserDonutChart from './UserDonutChart';
import UserTable from './UserTable';

const dummyUsers = [
  { id: 1, username: 'USER1', date: '2025.01.01 12:00:01' },
  { id: 2, username: 'USER2', date: '2025.01.02 13:20:15' },
  { id: 3, username: 'USER3', date: '2025.01.03 14:11:33' },
  { id: 4, username: 'USER4', date: '2025.01.04 16:42:00' },
  { id: 5, username: 'USER5', date: '2025.01.05 18:30:20' },
  { id: 6, username: 'USER1', date: '2025.01.01 12:00:01' },
  { id: 7, username: 'USER2', date: '2025.01.02 13:20:15' },
  { id: 8, username: 'USER3', date: '2025.01.03 14:11:33' },
  { id: 9, username: 'USER4', date: '2025.01.04 16:42:00' },
  { id: 10, username: 'USER5', date: '2025.01.05 18:30:20' },
  { id: 11, username: 'USER1', date: '2025.01.01 12:00:01' },
  { id: 12, username: 'USER2', date: '2025.01.02 13:20:15' },
  { id: 13, username: 'USER3', date: '2025.01.03 14:11:33' },
  { id: 14, username: 'USER4', date: '2025.01.04 16:42:00' },
  { id: 15, username: 'USER5', date: '2025.01.05 18:30:20' },
];

const Layout = styled.div`
  display: flex;
`;

const SidebarWrapper = styled.div`
  width: 220px;
  min-height: 100vh;
  background-color: #f2f4f8;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #f9faff;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const TopRow = styled.div`
  display: flex;
  gap: 20px;
`;

const BottomRow = styled.div`
  display: flex;
  gap: 20px;
`;

function AdminUserPage() {
  return (
    <Layout>
      <SidebarWrapper>
        <AdminSidebar />
      </SidebarWrapper>
      <ContentWrapper>
        <TopRow>
          <UserJoinChart />
          <UserDonutChart total={85} />
        </TopRow>
        <BottomRow>
          <UserTable users={dummyUsers} />
        </BottomRow>
      </ContentWrapper>
    </Layout>
  );
}

export default AdminUserPage;
