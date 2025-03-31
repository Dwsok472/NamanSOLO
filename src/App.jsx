import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Login from "./components/Login/Login";
import RegisterStep1 from "./components/Register/RegisterStep1";
import RegisterStep2 from "./components/Register/RegisterStep2";
import ToDo from "./pages/Todo";
import ImageMap from "./components/ImageMap";
import { createGlobalStyle } from "styled-components";
import Find from "./components/FindIdAndPwd/Find";
import Event from "./components/Event";
import Follow from "./components/MyPage/Follow";
import MyProfile from "./components/MyPage/MyProfile";

const DummyPage = ({ title }) => <div style={{ padding: "40px" }}>{title}</div>;

const AppWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main.attrs(() => ({
  id: "main-content",
}))`
  flex: 1;
  padding-top: 100px;
`;

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0 ;
    padding: 0;
    box-sizing: border-box;
    font-family: Poppins;
  }
  a{
    text-decoration: none;
    color : inherit;
  }

`;
function App() {
  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <AppWrapper>
          <Header
            logoText="WeARE"
            menuItems={[
              { to: "/story/all", label: "전체 스토리" },
              { to: "/map", label: "맵" },
              { to: "/events", label: "이벤트" },
            ]}
            subMenuItems={[
              { to: "/mypage/info", label: "커플 정보" },
              { to: "/mypage/diary", label: "나의 다이어리" },
              { to: "/mypage/letter", label: "나의 편지" },
              { to: "/mypage/todo", label: "캘린더" },
              { to: "/mypage/painting", label: "그림" },
            ]}
            loginText="로그인"
            signupText="회원가입"
          />
          <MainContent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterStep1 />} />
              <Route
                path="/story/all"
                element={<DummyPage title="전체 스토리" />}
              />
              <Route path="/map" element={<ImageMap />} />
              <Route path="/events" element={<Event />} />
              <Route path="/mypage/info" element={<MyProfile />} />
              <Route
                path="/mypage/diary"
                element={<DummyPage title="나의 다이어리" />}
              />
              <Route
                path="/mypage/letter"
                element={<DummyPage title="나의 편지" />}
              />
              <Route path="/mypage/todo" element={<ToDo />} />
              <Route
                path="/mypage/painting"
                element={<DummyPage title="그림" />}
              />
              <Route path="/find-id" element={<Find isFindId={true} />} />
              <Route path="/find-pwd" element={<Find isFindId={false} />} />
              <Route path="/follower" element={<Follow type="follower" />} />
              <Route path="/following" element={<Follow type="following" />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
