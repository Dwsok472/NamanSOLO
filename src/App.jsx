import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login/Login";
import Event from "./components/Event";
import RegisterMain from "./components/Register/RegisterMain";
import MainPage from "./components/MainPage/MainPage";
import MyPage from "./components/MyPage/MyPage";
import MyAlbum from "./components/MyPage/MyAlbum/MyAlbum";
import MainMap from "./components/Map/MainMap";
import AlbumBoard from "./components/Album/AlbumBoard";
import AdminFeedPage from "./components/Admin/AdminFeedPage";
import AdminUserPage from "./components/Admin/AdminUserPage";
import ScrollToTop from "./components/MainPage/ScrollToTop";
import AlbumBoardWithKey from "./components/Album/AlbumBoardWIthKey";
import WebSocketManager from "./components/WebSocket/WebSocketManager";
import FindIdOrPwd from "./components/FindIdAndPwd/FindIdOrPwd";

const AppWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f6f2ea;
`;

const MainContent = styled.main`
  flex: 1;
  /* padding-top: 75px; */
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
  const [showLogo, setShowLogo] = useState(false);
  const introPlayed = sessionStorage.getItem("introPlayed");
  const logoRef = useRef(null);

  const hide =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");

  useEffect(() => {
    if (isMainPage && !introPlayed) {
      const timer = setTimeout(() => {
        setShowLogo(true);
        return () => clearTimeout(timer);
      }, 3500);
    } else {
      setShowLogo(true);
    }
  }, [introPlayed]);

  return (
    <AppWrapper>
      <GlobalStyle />
      <WebSocketManager />
      {!hide && (
        <Header
          logoRef={logoRef}
          logoText="WeARE"
          showLogo={showLogo}
          menuItems={[
            { to: "/album/all", label: "전체 앨범" },
            { to: "/map", label: "맵" },
            { to: "/events", label: "이벤트" },
          ]}
          subMenuItems={[
            { to: "/mypage/todo", label: "캘린더" },
            { to: "/mypage/follow", label: "팔로우" },
            { to: "/mypage/comment", label: "나의 댓글" },
            { to: "/mypage/bookmark", label: "즐겨찾기" },
            { to: "/mypage/album", label: "MY ALBUM" },
          ]}
          loginText="로그인"
          signupText="회원가입"
        />
      )}

      <MainContent>
        <Routes>
          <Route path="/" element={<MainPage logoRef={logoRef} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterMain />} />
          <Route path="/album/all" element={<AlbumBoard key="all" />} />
          <Route path="/user/album/:username" element={<AlbumBoardWithKey />} />
          <Route path="/map" element={<MainMap />} />
          <Route path="/events" element={<Event />} />
          <Route path="/admin/users" element={<AdminUserPage />} />
          <Route path="/admin/feeds" element={<AdminFeedPage />} />
          <Route path="/mypage/album" element={<MyAlbum />} />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/find-id" element={<FindIdOrPwd isFindId={true} />} />
          <Route path="/find-pwd" element={<FindIdOrPwd isFindId={false} />} />
        </Routes>
      </MainContent>
      {!hide && <Footer />}
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
