import React, { useState } from "react";
import Octagon from "./Octagon";
import rate from "../img/starrate1.png";
import styled from "styled-components";
import NextButton from "../Button/NextButton";
import iconUser from "../img/people.png";
import { IconBehind } from "../Icons";
import female from "../img/female.png";
import male from "../img/male.png";

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 90vh;
  margin-top: 50px;
  margin-bottom: 50px;
`;
const GenderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: ${(props) =>
    props.gender === "male" ? "#ffe5e5" : "#f3e6ff"};
  border-radius: 10px;
  padding: 10px 0;
  margin: 0 10px; */
  width: fit-content;
  height: 650px;
`;

const GenderLabel = styled.div`
  font-weight: 700;
  font-size: 3.5rem;
  color: #8c0d17;
  /* margin-bottom: 5px; */
  user-select: none;
`;

const GenderImage = styled.img`
  width: 150px; // 원하는 사이즈로
  height: auto;
  object-fit: cover;

  user-select: none;
`;

const H1 = styled.h1`
  font-size: 3.5rem;
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
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
`;
const ButtonWrap = styled.div`
  width: 100%;
  /* margin: o auto; */
  /* margin-top: 0px; */
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

function RegisterStep2({ onNext }) {
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
        <GenderWrapper gender="female">
          <GenderLabel> FEMALE</GenderLabel>
          <GenderImage src={female} />
          <Octagon
            id="profileF"
            gender="female"
            data={profileF}
            onChange={(field, value) =>
              setProfileF((prev) => ({ ...prev, [field]: value }))
            }
            width="450px"
            cardwidth="400px"
            cardheight="500px"
            cardbackground="#e0f7fa"
            isProfilePage={false}
            isSignUpPage={true}
          />
        </GenderWrapper>
        <img src={rate} className="heartRate" />
        <GenderWrapper gender="male">
          <GenderLabel>MALE</GenderLabel>
          <GenderImage src={male} />
          <Octagon
            id="profileM"
            gender="male"
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
        </GenderWrapper>
      </Content>
      <ButtonWrap>
        <NextButton onClick={onNext} />
      </ButtonWrap>
    </Container>
  );
}

export default RegisterStep2;
