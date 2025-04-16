import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminSidebar from './AdminSidebar';
import FeedUploadRank from './FeedUploadRank';
import FeedLineChart from './FeedLineChart';
import FeedActivityTable from './FeedActivityTable';
import FeedAvgBox from './FeedAvgBox';
import EventModal from './EventModal';

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


function AdminFeedPage() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <Layout>
      <SidebarWrapper>
        <AdminSidebar setShowModal={setShowModal} />
      </SidebarWrapper>

      <ContentWrapper>
      {showModal && <EventModal onClose={() => setShowModal(false)} />}

        <TopSection>
          <FeedUploadRank />
          <FeedLineChart />
        </TopSection>

        <BottomSection>
          <FeedActivityTable />
          <FeedAvgBox averageDays={12.8} />
        </BottomSection>

      </ContentWrapper>
    </Layout>
  );
}

export default AdminFeedPage;
