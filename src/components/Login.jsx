import React, { useEffect } from 'react'
import { IconPassword, IconUser } from './Icons'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRef, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import Couple from './img/lover.png';
import { UserLogin } from './api';


const CardWrap = styled.div`
  width: 550px;
  margin: 0 auto;
  margin-top: 50px;

`;
const Card = styled.div`
  width: 550px;
  height:600px;
  background-color: #ffdcd6;
  clip-path: polygon(
    10% 0%,
    90% 0%,
    120% 25%,
    120% 75%,
    90% 100%,
    10% 100%,
    0% 90%,
    0% 10%
  );
  margin: 0 auto;
`;

const Top = styled.div`
  width: 100%;
  height: 30%;
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
`
const ButtomWrap = styled.div`
  width: 85%;
  height: 70%;
  margin: 0 auto;
`;
const Buttom = styled.div`
  width: 100%;
  border: 1px solid #1a1a1a33;
  background-color: white;
  border-radius: 50px;
  margin: 0 auto;
  gap: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  height: 80%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  
`;
const SmallBox = styled.div`
  width: 85%;
  margin: 0 auto;
  border: 1px solid #02020233;
  border-radius: 30px;
  background-color: white;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top:10px;
  height: 70px;
`;
const Input = styled.input`
  width: 80%;
  border: none;
  outline: none;
  padding-left: 30px;
`;

const FindBox = styled.div`
    width: 100%;
    height: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items:center;

`
const ButtonWrap = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
  justify-content: center;
  align-items: center;

`

const StyledLink = styled(Link)`
    text-decoration: none;
    color:#3333;
    border-radius: 30px;
    color: #7b7b7b;
    padding: 20px;
    font-size: 0.8rem;
    &:hover{
        color: #161616;
    }
    &:nth-child(1){
      display: flex;
      justify-content: end;
    }
    &:nth-child(2){
      display: flex;
      justify-content: start;
    }
`
const ImgWrap = styled.div`
   display: flex;
  justify-content: center; 
  align-items: center; 
  width: 45%; 
  padding-right: 30px;
  
  & img {
    display: block;
    max-width: 100%; /* 이미지가 카드 영역을 넘지 않게 함 */
    height: auto;
  }
`

const Container = styled.div`
 display: flex;
  flex-direction: row;
  justify-content: center; 
  align-items: center; 
  height: 90vh; 
  padding: 0 400px; /* 전체 컨테이너에 좌우 간격을 추가 (옵션) */

`

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


  async function handleSubmit() {
    try {
      const userData = await UserLogin(username, password); // 로그인 API 호출
      login({ username: userData.username }); // Zustand 상태에 로그인 정보 저장
      setUsername(''); // 입력 필드 초기화
      setPassword(''); // 입력 필드 초기화
    } catch (error) {
      alert('로그인 실패! 다시 시도해주세요.');
    }
  }


  return (
    <Container>
      <ImgWrap>
        <img src={Couple} />
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
              </FindBox>
              <ButtonWrap>
                <LoginButton onClick={handleSubmit} />
              </ButtonWrap>
              <ButtonWrap>
                <RegisterButton />
              </ButtonWrap>
            </Buttom>
          </ButtomWrap>
        </Card>
      </CardWrap>
    </Container>
  )
}

export default Login
