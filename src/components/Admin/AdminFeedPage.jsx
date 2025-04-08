import React from 'react';
import styled from 'styled-components';
import AdminSidebar from './AdminSidebar';
import FeedUploadRank from './FeedUploadRank';
import FeedDonutChart from './FeedDonutChart';
import FeedLineChart from './FeedLineChart';
import FeedActivityTable from './FeedActivityTable';
import FeedAvgBox from './FeedAvgBox';

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

const TopSection = styled.div`
  display: flex;
  gap: 20px;
`;

const BottomSection = styled.div`
  display: flex;
  gap: 20px;
`;

const dummyLineData = [
  { date: '04-01', count: 4 },
  { date: '04-02', count: 7 },
  { date: '04-03', count: 5 },
  { date: '04-04', count: 6 },
  { date: '04-05', count: 3 },
  { date: '04-06', count: 2 },
  { date: '04-07', count: 8 },
  { date: '04-08', count: 4 },
  { date: '04-09', count: 6 },
  { date: '04-10', count: 7 },
];

const dummyUsers = [
  { id: 1, username: 'USER1', lastActive: '2025-03-01' },
  { id: 2, username: 'USER2', lastActive: '2025-03-02' },
  { id: 3, username: 'USER3', lastActive: '2025-03-03' },
  { id: 4, username: 'USER4', lastActive: '2025-03-04' },
  { id: 5, username: 'USER5', lastActive: '2025-03-05' },
  { id: 6, username: 'USER6', lastActive: '2025-03-06' },
  { id: 7, username: 'USER7', lastActive: '2025-03-07' },
  { id: 8, username: 'USER8', lastActive: '2025-03-08' },
  { id: 9, username: 'USER9', lastActive: '2025-03-09' },
  { id: 10, username: 'USER10', lastActive: '2025-03-10' },
];

function AdminFeedPage() {
  return (
    <Layout>
      <SidebarWrapper>
        <AdminSidebar />
      </SidebarWrapper>

      <ContentWrapper>

        <TopSection>
          <FeedUploadRank />
          <FeedDonutChart total={35} />
        </TopSection>

        <FeedLineChart data={dummyLineData} />

        <BottomSection>
          <FeedActivityTable users={dummyUsers} />
          <FeedAvgBox averageDays={12.8} />
        </BottomSection>

      </ContentWrapper>
    </Layout>
  );
}

export default AdminFeedPage;
