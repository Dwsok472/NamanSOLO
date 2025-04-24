import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import { IconPassword, IconUser } from "../Icons";
import NextButton from "../Button/NextButton";
import { Navigate, useNavigate } from "react-router-dom";
import { IconBehind } from "../Icons";
import { checkUsernameDuplicate, useRegisterStore } from "../api2";

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 80vh;
  margin-top: 50px;
`;
const H1 = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  color: #202020;
  user-select: none;
`;

const CardWrap = styled.div`
  width: 550px;
  margin: 0 auto;
  margin-top: 30px;
`;
const Card = styled.div`
  width: 550px;
  height: 620px;
  margin: 0 auto;
`;

const Top = styled.div`
  width: 100%;
  .agree_box {
    width: 450px;
    height: 180px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    background: #ffffff;
    margin: auto;
    padding: 10px;
    overflow: scroll;
    overflow-x: hidden;
    border: 1px solid #1a1a1a33;
    &::-webkit-scrollbar {
    width: 7px; /* 세로 스크롤바의 너비를 8px로 설정 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #727272; /* 핸들의 색상 */
    border-radius: 10px;
  }
  }
  .agree_box_title {
    width: 450px;
    margin: 0 auto 10px auto;
    font-size: 1.2rem;
    font-weight: 700;
    color: #8c0d17; /* 또는 #8c0d17도 잘 어울림 */
  }
  .agree_box_text {
    width: 100%;
    font-size: 0.8rem;
    color: #7e7e7e;
  }

  .checkbox {
    display: none;
  }
  .checkbox + label {
    position: relative;
    padding-left: 30px; /* 체크박스와 텍스트 사이 여백 */
    cursor: pointer;
    font-size: 1rem;
  }
  .checkbox + label::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border: 3px solid #101010;
    border-radius: 50%;
    background-color: white;
    transition: background-color 0.3s, border-color 0.3s;
  }

  .checkbox:checked + label::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 21.5%;
    transform: translate(-50%, -50%);
    width: 15px;
    height: 15px;
    background-color: black;
    border-radius: 50%;
  }

  .agree_text {
    text-align: right;
    margin-top: 10px;
    margin-right: 50px;
    font-size: 1rem;
    font-weight: 700;
    position: relative;
   .agree_guide{
    position: absolute;
    top: 0;
    right: 15%;
   }
  }
`;
const SmallBox = styled.div`
  width: 95%;
  margin: 0 auto;
  border: 1px solid #02020233;
  border-radius: 10px;
  background-color: white;
  padding-left: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 70px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  button {
    width: 95px;
    background-color: #a0a0a0;
    font-size: 0.8rem;
    font-weight: 700;
    border-radius: 20px;
    color: white;
    position: absolute;
    right: 10px;
    outline: none;
    &:hover {
      color: #212121;
    }
  }
`;
const Input = styled.input`
  width: 80%;
  height: 60px;
  border: none;
  outline: none;
  padding-left: 30px;
`;

const ButtomWrap = styled.div`
  width: 85%;
  height: 70%;
  margin: 0 auto;
`;
const Buttom = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 50px;
  margin: 0 auto;
  padding-top: 15px;
  padding-bottom: 15px;
  height: 80%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const GuideText = styled.div`
  font-size: 0.75rem;
  margin: 5px 0 10px 10px;
  text-align: ${({ $alignRight }) => ($alignRight ? "right" : "center")};
  color: ${({ $isError }) =>
    $isError === true
      ? "#d32f2f" // 에러 - 빨간색
      : $isError === false
        ? "#2e7d32" // 성공 - 초록색
        : "#888"}; // 기본 회색 or 안내 메시지용
  display: ${({ $hide }) => ($hide ? "none" : "block")};
`;
const NextButtonWrapper = styled.div`
  margin-top: 10px;
`;

function RegisterStep1({ onNext }) {
  const { setFormData } = useRegisterStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [matchpassword, setmatchpassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [buttonText, setButtonText] = useState("중복확인");

  const usernameRef = useRef();
  const pwdRef = useRef();
  const matchPwdRef = useRef();
  const navigate = useNavigate();

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  async function handleCheckUsername() {
    if (username.length < 6 || username.length > 12) {
      alert("아이디는 6~12자의 영문 또는 숫자를 입력해주세요.")
    }
    try {
      const isAvaliable = await checkUsernameDuplicate(username);
      if (isAvaliable) {
        setButtonText("사용 가능");
      } else {
        alert("이미 등록된 아이디입니다");
        return;
      }
    } catch (error) {
      setButtonText("중복확인");
    }
  }

  const handleNextStep = () => {
    if (buttonText !== "사용 가능") {
      alert("아이디가 중복되는지 확인해주세요.");
      usernameRef.current.focus();
      return;
    }

    if (matchpassword !== password) {
      alert("비밀번호가 일치하는지 확인하세요.");
      return;
    }

    if (!isChecked) {
      alert("약관에 동의해주세요.");
      document.getElementById("agree").focus();
      return;
    }

    onNext();
  };
  
  useEffect(()=> {
    setButtonText("중복확인");
  }, [username])

  return (
    <Container>
      <H1>회원가입</H1>
      <CardWrap>
        <Card>
            <Top>
            <div className="agree_box_title">이용약관</div>
            <div className="agree_box">
              <div className="agree_box_text">
                <p>
                  제 1 조 (목적) 본 약관은 기업마당 사이트가 제공하는 모든
                  서비스(이하 “서비스”)의 이용조건 및 절차, 이용자와 기업마당
                  사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을
                  목적으로 합니다.
                </p>
                <br />

                <p>제 2 조 (약관의 효력과 변경)</p>
                <p>
                  기업마당 사이트는 귀하가 본 약관 내용에 동의하는 경우 기업마당
                  사이트의 서비스 제공 행위 및 귀하의 서비스 사용 행위에 본
                  약관이 우선적으로 적용됩니다. 기업마당 사이트는 본 약관을 사전
                  고지 없이 변경할 수 있고 변경된 약관은 기업마당 사이트 내에
                  공지하거나 e-mail을 통해 회원에게 공지하며, 공지와 동시에 그
                  효력이 발생됩니다. 이용자가 변경된 약관에 동의하지 않는 경우,
                  이용자는 본인의 회원등록을 취소 (회원탈락)할 수 있으며 계속
                  사용의 경우는 약관 변경에 대한 동의로 간주 됩니다.
                </p>
                <br />

                <p>제 3 조 (약관 외 준칙)</p>
                <p>
                  본 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법,
                  정보통신윤리위원회심의규정, 정보통신 윤리강령, 프로그램보호법
                  및 기타 관련 법령의 규정에 의합니다.
                </p>
                <br />

                <p>제 4 조 (용어의 정의)</p>
                <p>
                  본 약관에서 사용하는 용어의 정의는 다음과 같습니다. 이용자 :
                  본 약관에 따라 기업마당 사이트가 제공하는 서비스를 받는 자.
                  가입 : 기업마당 사이트가 제공하는 신청서 양식에 해당 정보를
                  기입하고, 본 약관에 동의하여 서비스 이용계약을 완료시키는
                  행위. 회원 : 기업마당 사이트에 개인 정보를 제공하여 회원
                  등록을 한 자로서 기업마당 사이트가 제공하는 서비스를 이용할 수
                  있는 자. 비밀번호 : 이용자와 회원ID가 일치하는지를 확인하고
                  통신상의 자신의 비밀보호를 위하여 이용자 자신이 선정한 문자와
                  숫자의 조합. 탈퇴 : 회원이 이용계약을 종료시키는 행위. 제 2 장
                  서비스 제공 및 이용 제 5 조 (이용계약의 성립) 본 약관에서
                  사용하는 용어의 정의는 다음과 같습니다. 이용계약은 신청자가
                  온라인으로 기업마당 사이트에서 제공하는 소정의 가입신청
                  양식에서 요구하는 사항을 기록하여 가입을 완료하는 것으로
                  성립됩니다. 기업마당 사이트는 다음 각 호에 해당하는 이용계약에
                  대하여는 가입을 취소할 수 있습니다.
                  <br />
                  ① 다른 사람의 명의를 사용하여 신청하였을 때<br />
                  ② 이용계약 신청서의 내용을 허위로 기재하였거나 신청하였을 때
                  <br />
                  ③ 다른 사람의 기업마당 사이트 서비스 이용을 방해하거나 그
                  정보를 도용하는 등의 행위를 하였을 때<br />
                  ④ 기업마당 사이트를 이용하여 법령과 본 약관이 금지하는 행위를
                  하는 경우
                  <br />⑤ 기타 기업마당 사이트가 정한 이용신청요건이 미비 되었을
                  때
                </p>
                <br />
              </div>
            </div>
            <div className="agree_text">
              <input
                type="checkbox"
                className="checkbox"
                id="agree"
                checked={isChecked}
                onChange={handleChange}
              />
              <label htmlFor="agree">동의</label>
              <GuideText $isError={!isChecked} $alignRight={true} $hide={isChecked === true} className="agree_guide">
                해당 약관에 동의하셔야  진행이 가능합니다.
              </GuideText>
            </div>
          </Top>
          <ButtomWrap>
            <Buttom>
              <SmallBox>
                <IconUser />
                <Input
                  ref={usernameRef}
                  type="text"
                  maxLength={12}
                  placeholder="아이디를 입력해주세요"
                  autoComplete="off"
                  value={username}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/[^a-zA-Z.0-9-_]/g, '');
                    setUsername(clean);
                    setFormData({ username: clean });
                  }}
                />
                <button onClick={handleCheckUsername}>{buttonText}</button>
              </SmallBox>
              <GuideText $isError={username.length >= 0 && username.length < 6}>
                6~12자의 영문 또는 숫자를 입력해주세요.
              </GuideText>
              <SmallBox>
                <IconPassword />
                <Input
                  maxLength={16}
                  ref={pwdRef}
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/[^a-z!-_A-Z0-9]/g, '');
                    setPassword(clean);
                    setFormData({ password: clean });
                  }}
                />
              </SmallBox>
              <GuideText $isError={password.length >= 0 && password.length < 8}>
                숫자 1번부터 -까지의 특수문자, 영문, 숫자를 포함해 8자 이상 입력해주세요.
              </GuideText>
              <SmallBox>
                <IconPassword />
                <Input
                  maxLength={16}
                  ref={matchPwdRef}
                  type="password"
                  placeholder="비밀번호를 재입력해주세요"
                  autoComplete="off"
                  value={matchpassword}
                  onChange={(e) => setmatchpassword(e.target.value)}
                />
              </SmallBox>
              {password.length > 0 && matchpassword.length > 0 &&
                (password !== matchpassword ? (
                  <GuideText $isError={true}>비밀번호가 일치하지 않습니다.</GuideText>
                ) : (
                  <GuideText $isError={false}>비밀번호가 일치합니다.</GuideText>
                ))}
              <NextButtonWrapper>
                <NextButton onClick={handleNextStep} />
              </NextButtonWrapper>
            </Buttom>
          </ButtomWrap>
        </Card>
      </CardWrap>
    </Container>
  );
}

export default RegisterStep1;