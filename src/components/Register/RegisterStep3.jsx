import React, { useState } from "react";
import styled from "styled-components";
import heartswithrate from "../img/heartswithrate.png";
import NextButton from "../Button/NextButton";

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  margin-top: 100px;
  margin-bottom: 170px;
  .heartswithrate {
    display: block;
    margin: 0 auto;
    width: 500px;
  }
  .dday {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4rem;
    font-weight: 700;
    color: #1f1f1f;
  }
  .inputbox {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const H1 = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  text-align: center;
  color: #202020;
`;
const Input = styled.input`
  border: none;
  outline: none;
  height: 80px;
  width: 170px;
  font-weight: 700;
  &::placeholder {
    font-size: 1rem;
    font-weight: 700;
    color: #c2c2c2;
  }
`;
const ButtonWrap = styled.div`
  width: 100%;
  margin: o auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function RegisterStep3({ onNext }) {
  const [dday, setDday] = useState("");

  // async function onNext() {
  //   try {
  //     await registerCoupleDday(userId, dday);
  //     onNext(); // 회원가입 완료 or 메인 페이지 이동 등
  //   } catch (error) {
  //     alert("D-DAY 등록에 실패했습니다.");
  //   }
  // }

  return (
    <Container>
      <H1>회원가입</H1>
      <img src={heartswithrate} className="heartswithrate" />
      <h1 className="dday">D-DAY</h1>
      <div className="inputbox">
        <Input
          type="text"
          placeholder="D-DAY를 입력해주세요"
          autoComplete="off" // 자동완성 기능 끄기
          value={dday}
          onChange={(e) => setDday(e.target.value)}
        />
      </div>
      <ButtonWrap>
        <NextButton onClick={onNext} />
      </ButtonWrap>
    </Container>
  );
}

export default RegisterStep3;
