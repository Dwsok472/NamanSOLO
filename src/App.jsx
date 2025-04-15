import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login/Login";
import Find from "./components/FindIdAndPwd/Find";
import Event from "./components/Event";
import RegisterMain from "./components/Register/RegisterMain";
import AllStories from "./components/Story/AllStories";
import MainPage from "./components/MainPage/MainPage";
import MyPage from "./components/MyPage/MyPage";
import MyAlbum from "./components/MyPage/MyAlbum/MyAlbum";
import MainMap from "./components/Map/MainMap";
import AlbumBoard from "./components/Album/AlbumBoard";
import AdminFeedPage from "./components/Admin/AdminFeedPage";
import AdminUserPage from "./components/Admin/AdminUserPage";
import ChatBotButton from "./components/ChatBot/ChatBotButton";
import ScrollToTop from "./components/MainPage/ScrollToTop";
import UserAlbum from "./components/UserAlbumDummy";
import AlbumBoardWithKey from "./components/Album/AlbumBoardWIthKey";
import WebSocketManager from "./components/WebSocket/WebSocketManager";

const AppWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 75px;
`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Poppins;
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
      <WebSocketManager />
      <Header
        logoText="WeARE"
        menuItems={[
          { to: "/story/all", label: "전체 스토리" },
          { to: "/map", label: "맵" },
          { to: "/events", label: "이벤트" },
        ]}
        subMenuItems={[
          { to: "/mypage/other", label: "즐겨찾기" },
          { to: "/mypage/comment", label: "나의 댓글" },
          { to: "/mypage/todo", label: "캘린더" },
          { to: "/mypage/story", label: "My Story" },
        ]}
        loginText="로그인"
        signupText="회원가입"
      />

      <MainContent>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterMain />} />
          <Route path="/story/all" element={<AlbumBoard key="all" />} />
          <Route path="/user/story/:username" element={<AlbumBoardWithKey />} />
          <Route path="/map" element={<MainMap />} />
          <Route path="/events" element={<Event />} />
          <Route path="/admin/users" element={<AdminUserPage />} />
          <Route path="/admin/feeds" element={<AdminFeedPage />} />
          <Route path="/mypage/story" element={<MyAlbum />} />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/find-id" element={<Find isFindId={true} />} />
          <Route path="/find-pwd" element={<Find isFindId={false} />} />
        </Routes>
      </MainContent>
      <Footer />
      <ScrollToTop />
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
