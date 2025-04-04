import React, { useState } from "react";
import Octagon from "./Octagon";
import heartRate from "../img/heart-rate.png";
import styled from "styled-components";
import NextButton from "../Button/NextButton";
import iconUser from "../img/people.png";
import { IconBehind } from "../Icons";

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 90vh;
  margin-top: 50px;
  margin-bottom: 50px;
`;
const H1 = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  text-align: center;
  color: #202020;
  user-select: none;
`;

const Content = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .heartRate {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;
const ButtonWrap = styled.div`
  width: 100%;
  margin: o auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  position: fixed; // 화면 기준 고정
  bottom: 80px; // 화면 하단에서 30px 위
  right: 30px; // 화면 오른쪽에서 50px 왼쪽
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

function RegisterStep2({ onNext, onBack }) {
  const [profileF, setProfileF] = useState({
    image: iconUser,
    name: "",
    birthday: "",
    email: "",
    phone: "",
  });
  const [profileM, setProfileM] = useState({
    image: iconUser,
    name: "",
    birthday: "",
    email: "",
    phone: "",
  });

  // async function handleNextStep() {
  //     try {
  //       await registerCoupleProfile(profileF, profileM);
  //       onNext(); // 다음 단계로 이동
  //     } catch (error) {
  //       alert("커플 프로필 등록 중 문제가 발생했습니다.");
  //     }
  //   }
  return (
    <Container>
      <H1>회원가입</H1>
      <Content>
        <Octagon
          id="profileF"
          data={profileF}
          onChange={(field, value) =>
            setProfileF((prev) => ({ ...prev, [field]: value }))
          }
          width="450px"
          cardwidth="400px"
          cardheight="500px"
          cardbackground="#e0f7fa"
          imgwidth="120px"
          imgheight="120px"
          isProfilePage={false}
          isSignUpPage={true}
        />
        <img src={heartRate} className="heartRate" />
        <Octagon
          id="profileM"
          data={profileM}
          onChange={(field, value) =>
            setProfileM((prev) => ({ ...prev, [field]: value }))
          }
          width="450px"
          cardwidth="400px"
          cardheight="500px"
          cardbackground="#ffdcd6"
          imgwidth="120px"
          imgheight="120px"
          isProfilePage={false}
          isSignUpPage={true}
        />
      </Content>
      <ButtonWrap>
        <NextButton onClick={onNext} />
      </ButtonWrap>
      <Icon onClick={onBack}>
        <IconBehind />
      </Icon>
    </Container>
  );
}

export default RegisterStep2;
