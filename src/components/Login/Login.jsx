import React, { useEffect } from "react";
import { IconPassword, IconUser } from "../Icons";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "../Button/LoginButton";
import RegisterButton from "../Button/RegisterButton";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRef, useState } from "react";
import { BrowserRouter } from "react-router-dom";
//import Couple from "../img/lover.png";
import { UserLogin } from "../api";
import WeARE from "../img/weare.png";
import { IconBehind } from "../Icons";

const CardWrap = styled.div`
  width: 550px;
  margin: 0 auto;
  margin-top: 50px;
`;

const Card = styled.div`
  width: 550px;
  height: 550px;
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
  margin: 0 auto;
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
  right: 50px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const Container = styled.div`
  width: 100vw; /* ← 화면 너비 기준으로 꽉 채움 */
  height: 92vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;

  /* padding: 0 400px; 전체 컨테이너에 좌우 간격을 추가 (옵션) */
  /* background-image: radial-gradient(circle, #ffffff, #f2ebdc); */
  /* background: linear-gradient(to bottom, #940e19, #ffe3e3); */
  /* background: linear-gradient(to bottom, #7b1e3c, #ffe3e3); */
  /* background: linear-gradient(to bottom, #b85c79, #fdecec); */
  /* background: linear-gradient(to right, #7b1e3c, #ffb3b3, #ffe3e3); */
`;

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (user) => set({ user, isLoggedIn: true }), // 로그인 처리
      logout: () => set({ user: null, isLoggedIn: false }), // 로그아웃 처리
    }),
    {
      name: "user-storage", // sessionStorage에 저장될 키 이름
      storage: createJSONStorage(() => sessionStorage), // sessionStorage에 저장
    }
  )
);

function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { login, user, isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  const handleGoMain = () => {
    navigate("/ "); // MainPage 이동
  };

  async function handleSubmit() {
    try {
      const userData = await UserLogin(username, password); // 로그인 API 호출
      login({ username: userData.username }); // Zustand 상태에 로그인 정보 저장
      setUsername(""); // 입력 필드 초기화
      setPassword(""); // 입력 필드 초기화
    } catch (error) {
      alert("로그인 실패! 다시 시도해주세요.");
    }
  }

  return (
    <Container>
      <ImgWrap onClick={handleGoMain}>
        <img src={WeARE} />
      </ImgWrap>
      <CardWrap>
        <Card>
          <Top>
            <H1>LOGIN</H1>
          </Top>
          <ButtomWrap>
            <Buttom>
              <SmallBox>
                <IconUser />
                <Input
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  autoComplete="off" // 자동완성 기능 끄기
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </SmallBox>
              <SmallBox>
                <IconPassword />
                <Input
                  type="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력해주세요"
                />
              </SmallBox>
              <FindBox>
                <StyledLink to="/find-id">아이디 찾기</StyledLink>
                <StyledLink to="/find-pwd">비밀번호 찾기</StyledLink>
                <StyledLink to="/register">회원가입</StyledLink>
              </FindBox>
              <ButtonWrap>
                <LoginButton onClick={handleSubmit} />
              </ButtonWrap>
              {/* <ButtonWrap>
                <RegisterButton />
              </ButtonWrap> */}
            </Buttom>
          </ButtomWrap>
        </Card>
      </CardWrap>
      <Icon onClick={() => navigate(-1)}>
        <IconBehind />
      </Icon>
    </Container>
  );
}

export default Login;
