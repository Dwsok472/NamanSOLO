import React from "react";
import heartswithrate from "../img/heartswithrate1.png";
import leftcloud from "../img/leftThought.png";
import rightcloud from "../img/rightThought.png";
import LoginButton from "../Button/LoginButton";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IconBehind } from "../Icons";

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 95vh;
  margin-top: 50px;
  margin-bottom: 50px;
  height: 95vh;
  position: relative;
  .heartswithrate {
    display: block;
    margin: 0 auto;
    width: 500px;
  }
`;
const H1 = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  text-align: center;
  color: #202020;
  user-select: none;
`;
const Box = styled.div`
  width: 100%;
  height: 15%;
  .cloudleft {
    position: absolute;
    left: 50px;
    top: 50px;
  }
  .cloudright {
    position: absolute;
    right: 60px;
    top: 150px;
  }
  .textleft {
    position: absolute;
    left: 220px;
    top: 200px;
    z-index: 5;
    font-size: 2rem;
    font-weight: 700;
    color: #8c0d17;
  }
  .textright {
    position: absolute;
    right: 210px;
    top: 300px;
    z-index: 5;
    font-size: 2rem;
    font-weight: 700;
    color: #8c0d17;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px; /* 버튼 위치를 아래로 살짝 내릴 수 있음 */
`;

const Button = styled.button`
  width: 110px;
  border-radius: 20px;
  background-color: #8c0d17;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  transition: all 0.3s ease;

  cursor: pointer;
  &:hover {
    background-color: #ffffff;
    color: #8c0d17;
    border: 1px solid #3333;
  }
  &:focus {
    outline: none;
  }
`;
const Icon = styled.div`
  position: fixed;
  bottom: 145px;
  right: 24px;
  width: 50px;
  cursor: pointer;
`;

function RegisterStep4() {
  const navigate = useNavigate();
  return (
    <Container>
      <H1>회원가입</H1>
      <img src={heartswithrate} className="heartswithrate" />
      <Box>
        <img src={leftcloud} className="cloudleft" />
        <div className="textleft">
          가입이 완료 <br />
          되었습니다
        </div>
      </Box>
      <Box>
        <img src={rightcloud} className="cloudright" />
        <div className="textright">
          둘만의 세상을 <br />
          꾸며보세요
        </div>
      </Box>
      <ButtonWrapper>
        <Button onClick={() => navigate("/login")}>시작하기</Button>
      </ButtonWrapper>
    </Container>
  );
}

export default RegisterStep4;
