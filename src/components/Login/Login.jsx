import React, { useEffect } from "react";
import { IconPassword, IconUser } from "../Icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "../Button/LoginButton";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import home from ".././img/home.png";
import { useRef, useState } from "react";
import Find from "../FindIdAndPwd/Find";
import { UserLogin } from "../api";
import WeARE from "../img/weare.png";
import WeARE1 from "../img/weare1.png";
import { IconBehind } from "../Icons";
import RegisterStep1 from "../Register/RegisterStep1";
import axios from "axios";
import { getCurrentUser } from "../api1";
import FindIdOrPwd from "../FindIdAndPwd/FindIdOrPwd";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (user) => set({ user, isLoggedIn: true }), // 로그인 처리
      logout: () => {
        sessionStorage.removeItem("jwt-token"); // 토큰 삭제
        set({ user: null, isLoggedIn: false }); // 상태 초기화
      },
    }),
    {
      name: "user-storage", // sessionStorage에 저장될 키 이름
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
const images = [WeARE, WeARE1];
function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { login, user, isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const view = searchParams.get("view") || "login";

  const handleViewChange = (targetView) => {
    navigate(`/login?view=${targetView}`);
  };

  const handleGoMain = () => {
    navigate("/"); // MainPage 이동
  };

  async function handleSubmit() {
    try {
      const userData = await UserLogin(username, password); // 로그인 API 호출
      login({
        username: userData.username,
        authority: userData.authority,
        token: userData.token,
      }); // Zustand 상태에 로그인 정보 저장
      setUsername(""); // 입력 필드 초기화
      setPassword(""); // 입력 필드 초기화

      await getCurrentUser(); //마지막 로그인 기록을 위한 호출

      navigate("/"); // 로그인 후 메인으로 이동
    } catch (error) {
      alert("로그인 실패! 다시 시도해주세요.");
    }
  }
  async function UserLogin(username, password) {
    try {
      const response = await axios.post(
        "/api/authenticate",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("로그인 성공:", response.data);
      sessionStorage.setItem("jwt-token", response.data.token);
      return response.data;
    } catch (error) {
      console.error("로그인 실패:", error.response?.data || error.message);
      throw error;
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const [currentImage, setCurrentImage] = useState(0);

  return (
    <Container>
      <ImgWrap>
        <img src={images[currentImage]} alt={`slide-${currentImage}`} />
      </ImgWrap>
      {view === "login" && (
        <>
          <CardWrap>              
            <button value="메인으로" className="main" onClick={handleGoMain}><img src={home}/></button>
            <Card>        
              <Top>
                <H1>LOGIN</H1>
              </Top>
              <ButtomWrap>
                <Buttom>
                  {/* 입력 필드들 */}
                  <SmallBox>
                    <IconUser />
                    <Input
                      type="text"
                      placeholder="아이디를 입력해주세요"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </SmallBox>
                  <SmallBox>
                    <IconPassword />
                    <Input
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </SmallBox>

                  <FindBox>
                    <StyledButton onClick={() => handleViewChange("find-id")}>
                      아이디 찾기
                    </StyledButton>
                    <StyledButton onClick={() => handleViewChange("find-pwd")}>
                      비밀번호 찾기
                    </StyledButton>
                    <StyledButton onClick={() => handleViewChange("register")}>
                      회원가입
                    </StyledButton>
                  </FindBox>

                  <ButtonWrap>
                    <LoginButton onClick={handleSubmit} />
                  </ButtonWrap>
                </Buttom>
              </ButtomWrap>
            </Card>
          </CardWrap>
        </>
      )}

      {view === "find-id" && (
        <FindIdCardWrap>
          <button value="메인으로" className="main" onClick={handleGoMain}><img src={home}/></button>
          <FindIdOrPwd isFindId={true} />
        </FindIdCardWrap>
      )}

      {view === "find-pwd" && (
        <FindIdCardWrap>
          <button value="메인으로" className="main" onClick={handleGoMain}><img src={home}/></button>
          <FindIdOrPwd isFindId={false} />
        </FindIdCardWrap>
      )}

      {view === "register" && (
        <FindIdCardWrap>
          <button value="메인으로" className="main" onClick={handleGoMain}><img src={home}/></button>
          <RegisterStep1 onNext={() => navigate("/register")} />
        </FindIdCardWrap>
      )}
      <Icon onClick={() => navigate(-1)}>
        <IconBehind />
      </Icon>
    </Container>
  );
}
export default Login;

const FindIdCardWrap = styled.div`
  width: 550px;
  /* height: 550px; */
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrap = styled.div`
  width: 550px;
  margin: 0 auto;
  margin-top: 50px;
`;

const Card = styled.div`
  width: 550px;
  /* height: 550px; */
  /* background-color: #ffe4e1;
  clip-path: polygon(
    10% 0%,
    90% 0%,
    120% 25%,
    120% 75%,
    90% 100%,
    10% 100%,
    0% 90%,
    0% 10%
  ); */
  /* margin: 0 auto; */
`;

const Top = styled.div`
  width: 100%;
  height: 20%;
  text-align: center;
  /* padding-top: 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
`;
const H1 = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  user-select: none;
`;
const ButtomWrap = styled.div`
  width: 85%;
  height: 70%;
  margin: 0 auto;
`;
const Buttom = styled.div`
  width: 100%;
  /* border: 1px solid #1a1a1a33;
  background-color: white; */
  border-radius: 50px;
  margin: 0 auto;
  /* gap: 10px; */
  /* padding-top: 15px; */
  /* padding-bottom: 15px; */
  height: 80%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`;
const SmallBox = styled.div`
  width: 85%;
  margin: 0 auto;
  border: 1px solid #02020233;
  border-radius: 10px;
  background-color: white;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  height: 70px;
  .IconUser,
  .IconPassword {
    user-select: none;
    pointer-events: none;
  }
`;

const Input = styled.input`
  width: 80%;
  border: none;
  outline: none;
  padding-left: 30px;
  font-size: 17px;
`;

const FindBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
`;
const ButtonWrap = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  font-size: 0.8rem;
  color: #7b7b7b;
  padding: 15px;
  cursor: pointer;

  &:hover {
    color: #161616;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #3333;
  border-radius: 30px;
  color: #7b7b7b;
  padding: 15px;
  font-size: 0.8rem;
  &:hover {
    color: #161616;
  }
  &:nth-child(1) {
    display: flex;
    justify-content: end;
  }
  &:nth-child(2) {
    display: flex;
    justify-content: start;
  }
`;
const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-right: 30px; */
  cursor: pointer;

  & img {
    max-height: 100vh;
    width: auto;
    object-fit: contain;
    //display: block;
    max-width: 100%; /* 이미지가 카드 영역을 넘지 않게 함 */
  }
`;

const Icon = styled.div`
  position: absolute;
  bottom: 40px;
  right: 43.5px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const Container = styled.div`
  width: 100vw; /* ← 화면 너비 기준으로 꽉 채움 */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
  background-color: white;
  .main {
    align-items: center;
    padding: 3px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    background-color : #a1294d;
    position: absolute;
    top: 40px;
    right: 43.5px;

    img {
      transition: filter 0.3s ease;
      filter: brightness(0) invert(1);
      height: fit-content;
      width: 22px;
    }
    &:hover {
      background-color: #b84040;
      img {
        filter: brightness(0) invert(0.8);
      }
    }
  }
`;
