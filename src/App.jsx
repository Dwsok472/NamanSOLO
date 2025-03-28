import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header2';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const DummyPage = ({ title }) => <div style={{ padding: '40px' }}>{title}</div>;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main.attrs(() => ({
  id: 'main-content',
}))`
  flex: 1;
  padding-top: 100px;
`;

function App() {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Header
          logoText="WeARE"
          menuItems={[
            { to: '/story/all', label: '전체 스토리' },
            { to: '/map', label: '맵' },
            { to: '/events', label: '이벤트' },
          ]}
          subMenuItems={[
            { to: '/mypage/info', label: '커플 정보' },
            { to: '/mypage/diary', label: '나의 다이어리' },
            { to: '/mypage/letter', label: '나의 편지' },
            { to: '/mypage/calendar', label: '캘린더' },
            { to: '/mypage/painting', label: '그림' },
          ]}
          loginText="로그인"
          signupText="회원가입"
        />

        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<DummyPage title="회원가입 페이지" />} />
            <Route path="/story/all" element={<DummyPage title="전체 스토리" />} />
            <Route path="/map" element={<DummyPage title="맵" />} />
            <Route path="/events" element={<DummyPage title="이벤트" />} />
            <Route path="/mypage/info" element={<DummyPage title="커플 정보" />} />
            <Route path="/mypage/diary" element={<DummyPage title="나의 다이어리" />} />
            <Route path="/mypage/letter" element={<DummyPage title="나의 편지" />} />
            <Route path="/mypage/calendar" element={<DummyPage title="캘린더" />} />
            <Route path="/mypage/painting" element={<DummyPage title="그림" />} />
          </Routes>
        </MainContent>

        <Footer />
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
