import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { IconPassword, IconUser } from "../Icons";
import NextButton from "../Button/NextButton";

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  margin-top: 100px;
  margin-bottom: 170px;
`;
const H1 = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  text-align: center;
  color: #202020;
`;

const CardWrap = styled.div`
  width: 550px;
  margin: 0 auto;
  margin-top: 50px;
`;
const Card = styled.div`
  width: 550px;
  height: 650px;
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
  padding-top: 40px;
  .agree_box {
    width: 450px;
    height: 150px;
    border-radius: 10px;
    background: #ffffff;
    margin: auto;
    padding: 10px;
    overflow: scroll;
    overflow-x: hidden;
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
    left: 20.5%;
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
  }
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
  margin-top: 10px;
  height: 70px;
  position: relative;
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
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

function RegisterStep1({ onNext }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [matchpassword, setmatchpassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [buttonText, setButtonText] = useState("중복확인");
  const [matchText, setmatchText] = useState("확인");
  const handleChange = () => {
    setIsChecked(!isChecked); // 체크된 상태를 반전
  };

  async function handleCheckUsername() {
    try {
      const check = await UserLogin(username);
      if (check.data === true) {
        setButtonText("사용 가능");
      } else {
        alert("이미 등록된 아이디입니다");
        return;
      }
    } catch (error) {
      setButtonText("중복확인");
    }
  }

  // async function handleCheckUsername() {
  //   try {
  //     const isAvailable = await checkUsernameDuplicate(username);
  //     if (isAvailable) {
  //       setButtonText("사용 가능");
  //     } else {
  //       alert("이미 등록된 아이디입니다");
  //     }
  //   } catch (error) {
  //     alert("중복 확인 중 오류가 발생했습니다");
  //   }
  // }

  async function handleMatchPwd() {
    if (password === matchpassword) {
      setmatchText("완료");
    } else {
      alert("입력하신 비밀번호가 일치하지 않습니다");
      return;
    }
  }
  return (
    <Container>
      <H1>회원가입</H1>
      <CardWrap>
        <Card>
          <Top>
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
            </div>
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

                <button onClick={handleCheckUsername}>{buttonText}</button>
              </SmallBox>
              <SmallBox>
                <IconPassword />
                <Input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </SmallBox>
              <SmallBox>
                <IconPassword />
                <Input
                  type="password"
                  placeholder="비밀번호를 재입력해주세요"
                  autoComplete="off"
                  value={matchpassword}
                  onChange={(e) => setmatchpassword(e.target.value)}
                />

                <button onClick={handleMatchPwd}>{matchText}</button>
              </SmallBox>
              <NextButton onClick={onNext} />
            </Buttom>
          </ButtomWrap>
        </Card>
      </CardWrap>
    </Container>
  );
}

export default RegisterStep1;
