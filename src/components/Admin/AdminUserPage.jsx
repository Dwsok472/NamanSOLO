// 지금은 시각화만 하기 위한 코드입니다. 통계랑은 별개입니다 그래프만 따옴
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminSidebar from './AdminSidebar';
import UserJoinChart from './UserJoinChart';
import UserDonutChart from './UserDonutChart';
import UserTable from './UserTable';
import EventModal from './EventModal';

const Layout = styled.div`
margin-top: 80px;
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
  const [showModal, setShowModal] = useState(false);
  return (
    <Layout>
      {showModal && <EventModal onClose={() => setShowModal(false)} />}
      <SidebarWrapper>
      <AdminSidebar setShowModal={setShowModal} />
      </SidebarWrapper>
      <ContentWrapper>
        <TopRow>
          <UserJoinChart />
          <UserDonutChart total={85} />
        </TopRow>
        <BottomRow>
          <UserTable />
        </BottomRow>
      </ContentWrapper>
    </Layout>
  );
}

export default AdminUserPage;
