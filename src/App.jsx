import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login/Login';
import Find from './components/FindIdAndPwd/Find';
import Event from './components/Event';
import RegisterMain from './components/Register/RegisterMain';
import AllStories from './components/Story/AllStories';
import MainPage from './components/MainPage';
import MyPage from './components/MyPage/MyPage';
import MainMap from './components/Map/MainMap';
import AlbumBoard from './components/Album/AlbumBoard';
import AdminFeedPage from './components/Admin/AdminFeedPage';
import AdminUserPage from './components/Admin/AdminUserPage';

const AppWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main.attrs(() => ({
  id: 'main-content',
}))`
  flex: 1;
  padding-top: 75px;
`;

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'SUIT-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: GmarketSansMedium;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    &:focus {
      outline: none;
    }
  }

  body.blur #main-content {
    filter: blur(4px);
    pointer-events: none;
    user-select: none;
  }

  body.blur header {
    filter: none !important;
    pointer-events: auto !important;
    user-select: auto !important;
  }

`;

function AppRoutes() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <AppWrapper>
      <GlobalStyle />

      {!isMainPage && (
        <Header
          logoText="WeARE"
          menuItems={[
            { to: '/story/all', label: '전체 스토리' },
            { to: '/map', label: '맵' },
            { to: '/events', label: '이벤트' },
          ]}
          subMenuItems={[
            { to: '/mypage/info', label: '커플 정보' },
            { to: '/mypage/story', label: '나의 스토리' },
            { to: '/mypage/comment', label: '나의 댓글' },
            { to: '/mypage/todo', label: '캘린더' },
            { to: '/mypage/other', label: '그 외' },
          ]}
          loginText="로그인"
          signupText="회원가입"
        />
      )}

      <MainContent>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterMain />} />
          <Route path="/story/all" element={<AlbumBoard />} />
          <Route path="/map" element={<MainMap />} />
          <Route path="/events" element={<Event />} />
          <Route path="/admin/users" element={<AdminUserPage />} />
          <Route path="/admin/feeds" element={<AdminFeedPage />} />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/find-id" element={<Find isFindId={true} />} />
          <Route path="/find-pwd" element={<Find isFindId={false} />} />
        </Routes>
      </MainContent>

      <Footer />
    </AppWrapper>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
