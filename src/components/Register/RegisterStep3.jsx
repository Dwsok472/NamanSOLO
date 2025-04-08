import React, { useState, useEffect } from "react";
import styled from "styled-components";
import heartswithrate from "../img/heartswithrate1.png";
import NextButton from "../Button/NextButton";
import { IconBehind } from "../Icons";

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 90vh;
  margin-top: 50px;
  margin-bottom: 50px;

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
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  color: #202020;
  user-select: none;
`;

const Input = styled.input`
  border: none;
  outline: none;
  height: 100px;
  width: 400px;
  margin-top: 40px;
  margin-bottom: 30px;
  font-size: 35px;
  font-weight: 700;

  &::placeholder {
    font-size: 1rem;
    font-weight: 700;
    color: #c2c2c2;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  position: fixed;
  bottom: 145px;
  right: 24px;
  width: 50px;
  cursor: pointer;
`;

function RegisterStep3({ onNext }) {
  const [dday, setDday] = useState("");
  const [daysDiff, setDaysDiff] = useState(null);

  useEffect(() => {
    if (dday) {
      const selectedDate = new Date(dday);
      const today = new Date();
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      const timeDiff = today.getTime() - selectedDate.getTime();
      const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      setDaysDiff(diffInDays > 0 ? diffInDays : diffInDays < 0 ? null : 0); // 0일 미만이면 0일로 고정
    } else {
      setDaysDiff(null);
    }
  }, [dday]);

  return (
    <Container>
      <H1>회원가입</H1>
      <img
        src={heartswithrate}
        className="heartswithrate"
        alt="하트와 레이트"
      />
      <h1 className="dday">
        {daysDiff !== null
          ? `D-${daysDiff == 0 ? "DAY" : daysDiff}`
          : "D-DAY를 계산해줍니다."}
      </h1>
      <div className="inputbox">
        <Input
          type="date"
          placeholder="사귀기 시작한 날짜를 입력해주세요"
          autoComplete="off"
          value={dday}
          onChange={(e) => setDday(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
      <ButtonWrap>
        <NextButton onClick={onNext} />
      </ButtonWrap>
    </Container>
  );
}

export default RegisterStep3;

// async function onNext() {
//   try {
//     await registerCoupleDday(userId, dday);
//     onNext(); // 회원가입 완료 or 메인 페이지 이동 등
//   } catch (error) {
//     alert("D-DAY 등록에 실패했습니다.");
//   }
// }
