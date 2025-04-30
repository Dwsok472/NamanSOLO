import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useUserStore } from './Login/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { getCurrentUser } from './api2';

function Header(props) {
  const {
    logoText = 'WeARE',
    loginText = '로그인',
    signupText = '회원가입',
    logoRef,
    showLogo,
    subMenuItems,
  } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout, user } = useUserStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarSubOpen, setSidebarSubOpen] = useState(false);
  const sidebarRef = useRef(null);
  const isLoginPage =
    location.pathname === '/login' || location.pathname === '/register';

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSidebarSubOpen(false);
  };
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!isLoggedIn) return;
  
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        useUserStore.setState({ user: userData }); // Zustand에 직접 업데이트
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
      }
    };
  
    fetchUser();
  }, [isLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setShowHeader(false); // 아래로 스크롤하면 숨김
      } else {
        setShowHeader(true); // 위로 스크롤하면 보이기
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        closeSidebar();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {(!isSidebarOpen&& 
      <Container $show={showHeader}>
        <Left>
          <Hamburger onClick={() => setSidebarOpen(true)}>
            <FontAwesomeIcon icon={faBars} />
          </Hamburger>
          <Link to="/">
            <Logo ref={logoRef} $visible={showLogo !== false}>
              {logoText}
            </Logo>
          </Link>
        </Left>
        {isLoggedIn && user && (
          <UserProfile onClick={()=>navigate("/mypage/todo")}>
            {user.mediaDTO?.id === 1 || 2 || 3 || 4 ?
              (<img className='userImage' src={user.mediaDTO?.mediaUrl} />)
              :(<img className='userImage' src={`${user.mediaDTO?.mediaUrl}?v=${new Date().getTime()}`}/>)
            }
            <div className='user'>
              <span className='username'>{user.username}님</span>
              <span className='welcome'>환영합니다!</span>
            </div>
          </UserProfile>
        )}
      </Container>
      )}

      <Overlay $open={isSidebarOpen} onClick={closeSidebar} />
      <Sidebar ref={sidebarRef} $open={isSidebarOpen}>
        <ul>
          <li>
            <Link to="/" onClick={closeSidebar}>
              홈
            </Link>
          </li>
          <li>
            <Link to="/album/all" onClick={closeSidebar}>
              전체 앨범
            </Link>
          </li>
          <li>
            <Link to="/map" onClick={closeSidebar}>
              맵
            </Link>
          </li>
          <li>
            <span onClick={() => {
              closeSidebar();
              if (!isLoggedIn) {
                alert("로그인 후 이용이 가능합니다");
                navigate('/login');
              }
              else {
                navigate('/events');
              }
            }} className='other'>
              선물 랭킹
            </span>
          </li>

          {user?.authority === 'ROLE_ADMIN' ? (
            <li>
              <Link to="/admin/users" onClick={closeSidebar}>
                관리자 페이지
              </Link>
            </li>
          ) : (
            <>
              <li onClick={() => setSidebarSubOpen(!isSidebarSubOpen)}>
                <span>마이페이지 {isSidebarSubOpen ? '▲' : '▼'}</span>
              </li>
              {isSidebarSubOpen &&
                subMenuItems.map(({ to, label }) => (
                <li key={to} className='sub'>
                  <ul>
                    <li to={to} onClick={() => {
                      closeSidebar();
                      if (!isLoggedIn) {
                        alert("로그인 후 이용이 가능합니다");
                        navigate('/login');
                      }
                      else {
                        navigate(to);
                      }
                    }} className='others'>
                      {label}
                    </li>
                  </ul>
                </li>
              ))}          
            </>
          )}

            {isLoggedIn ? <li
              onClick={() => {
                navigate("/");
                logout();
                closeSidebar();
              }}
            >
              <span>로그아웃</span>
            </li> : <></>}


          {!isLoggedIn && !isLoginPage && (
            <>
              <li>
                <Link to="/login" onClick={closeSidebar}>
                  {loginText}
                </Link>
              </li>
              <li>
                <Link to="/login?view=register" onClick={closeSidebar}>
                  {signupText}
                </Link>
              </li>
            </>
          )}
        </ul>
      </Sidebar>
    </>
  );
}

const Container = styled.header`
  width: 100%;
  height: 78px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  /* background-color: white; */
  transition: transform 0.3s ease-in-out;
  transform: ${({ $show }) => ($show ? 'translateY(0)' : 'translateY(-100%)')};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  .userImage {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  .user {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .username {
    font-weight: bold;
    font-size: 1rem;
    color: #333;      
  }
  .welcome {
    font-size:0.6rem;
    color: #777;
  }
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  color: #bb1616;
  margin: 0;
  opacity: ${({ $visible }) => ($visible === false ? 0 : 1)};
  transition: opacity 0.8s ease-in-out;
  z-index: 2;
  position: relative;
`;

const Hamburger = styled.div`
  cursor: pointer;
  z-index: 1001;

  svg {
    font-size: 2.5rem;
    color: #dd7676;

  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ $open }) => ($open ? '0' : '-300px')};
  width: 250px;
  height: 100%;
  background-color: #8c0d17;
  transition: left 0.3s ease;
  z-index: 1000;
  padding: 100px 20px 0;
  padding-left: 33px;

  ul {
    list-style: none;
    padding: 0;
    li {
      padding: 12px 0;

      a,
      span {
        color: #fff;
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: 700;
        cursor: pointer;
      }
      .other{
        color: #fff;
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: 700;
        cursor: pointer;
      }
      .others{
        color: #fff;
        text-decoration: none;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
      }
    }
    .sub{
      padding: 1px;
    }
  }
`;

const Overlay = styled.div`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index:999;
`;

export default Header;
