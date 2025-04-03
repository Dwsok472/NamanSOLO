import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login/Login';
import { createGlobalStyle } from 'styled-components';
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



const DummyPage = ({ title }) => <div style={{ padding: '40px' }}>{title}</div>;

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
  button{
    &:focus{
      outline: none;
    }
  }

`;
function App() {
  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <AppWrapper>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
