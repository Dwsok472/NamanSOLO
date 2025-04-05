import React from "react";
import heartswithrate from "../img/heartswithrate.png";
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
  height: 1000px;
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
  .cloudleft {
    position: absolute;
    left: 250px;
    top: 250px;
  }
  .cloudright {
    position: absolute;
    right: 400px;
    bottom: 0px;
  }
  .textleft {
    position: absolute;
    left: 410px;
    top: 400px;
    z-index: 5;
    font-size: 2rem;
    font-weight: 700;
    color: #fda899;
  }
  .textright {
    position: absolute;
    right: 530px;
    bottom: 250px;
    z-index: 5;
    font-size: 2rem;
    font-weight: 700;
    color: #fda899;
  }
`;
const Button = styled.button`
  width: 110px;
  border-radius: 20px;
  background-color: #ff9987;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  transition: all 0.3s ease;
  position: absolute;
  right: 930px;
  bottom: 0px;
  cursor: pointer;
  &:hover {
    background-color: #ffffff;
    color: #2e2e2e;
    border: 1px solid #3333;
  }
  &:focus {
    outline: none;
  }
`;
const Icon = styled.div`
  position: fixed; // 화면 기준 고정
  bottom: 80px; // 화면 하단에서 30px 위
  right: 30px; // 화면 오른쪽에서 50px 왼쪽
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

function RegisterStep4({ onBack }) {
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
      <Button onClick={() => navigate("/login")}>시작하기</Button>
      <Icon onClick={onBack}>
        <IconBehind />
      </Icon>
    </Container>
  );
}

export default RegisterStep4;
