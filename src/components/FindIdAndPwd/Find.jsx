import React, { useState, useEffect } from "react";
import { IconEmail, IconPhone, IconUser } from "../Icons";
import LoginButton from "../Button/LoginButton";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 170px;
  & hr {
    width: 90%;
    opacity: 0.5;
    margin: 0 auto;
  }
`;
const H1 = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  text-align: center;
  color: #202020;
  user-select: none;
`;
const CardWrap = styled.div`
  width: 550px;
  margin: 0 auto;
  margin-top: 50px;
`;
const Top = styled.div`
  width: 80%;
  /* padding-top: 40px; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-left: 55px;
`;
const Card = styled.div`
  width: 550px;
  padding-bottom: 10px;
  /* background-color: #ffdcd6;
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
  /* padding-top: 50px; */
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
  label {
    font-size: 0.8rem;
    font-weight: 700;
  }
`;
const Button = styled.button`
  width: 120px;
  background-color: #a0a0a0;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 20px;
  color: white;
  margin: 0 auto;
  margin-top: 5px;
  outline: none;
  &:hover {
    color: #212121;
  }
  &:focus {
    outline: none;
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
  margin: 0 auto;
`;
const Buttom = styled.div`
  width: 100%;
  /* border: 1px solid #1a1a1a33; */
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
const Box = styled.div`
  width: 150px;
  height: 50px;
  /* background-color: #ebebeb;
  clip-path: polygon(
    10% 0%,
    90% 0%,
    100% 25%,
    120% 75%,
    100% 100%,
    0% 100%,
    0% 90%,
    0% 25%
  ); */
  margin: 0 auto;
  /* border-right: 1px solid #e4e4e4; */
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  transition: all 0.3s ease;
  cursor: pointer;
  &.selected {
    background-color: #747474;
    color: white;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
function Find({ isFindId }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState();
  const [id, setId] = useState("");
  const [codeText, setCodeText] = useState("인증하기");
  const [correctCode, setCorrectCode] = useState(null); // 실제로 발송된 인증번호 (예시로 '123456' 사용)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [writeOneMorePassword, setWriteOneMorePassword] = useState("");

  const [selectedOption, setSelectedOption] = useState("phone");
  const navigate = useNavigate(); // useNavigate 훅으로 페이지 이동 함수 생성

  const handleLoginRedirect = () => {
    if (newPassword === writeOneMorePassword) {
      alert("변경이 완료되었습니다");
      navigate("/login"); // 로그인 페이지로 이동
    } else {
      alert("작성하신 비밀번호가 일치하지 않습니다. 다시 확인 부탁드립니다");
      return;
    }
  };

  // async function handleLoginRedirect() {
  //   if (newPassword !== writeOneMorePassword) {
  //     alert("작성하신 비밀번호가 일치하지 않습니다.");
  //     return;
  //   }

  //   try {
  //     await resetPassword({ username, email, newPassword });
  //     alert("비밀번호가 변경되었습니다.");
  //     navigate("/login");
  //   } catch (error) {
  //     alert("비밀번호 재설정에 실패했습니다.");
  //   }
  // }

  const handleBoxClick = (option) => {
    setSelectedOption(option);
  };
  // 인증번호 처리
  async function handleCode() {
    if (code === correctCode) {
      setCodeText("인증완료");
    } else {
      alert("입력하신 인증번호가 일치하지 않습니다");
      return;
    }
  }

  // async function handleCode() {
  //   const target = selectedOption === "phone" ? phone : email;

  //   try {
  //     const isValid = await verifyAuthCode({ code, target });
  //     if (isValid) {
  //       setCodeText("인증완료");
  //     } else {
  //       alert("입력하신 인증번호가 일치하지 않습니다");
  //     }
  //   } catch (error) {
  //     alert("인증 확인 중 오류가 발생했습니다");
  //   }
  // }

  // 인증번호 요청
  async function requestCode() {
    // 실제로는 서버에서 인증번호를 보내야 함
    const generatedCode = "123456"; // 예시로 '123456' 사용
    setCorrectCode(generatedCode); // 서버에서 받은 인증번호로 설정
    alert("인증번호가 전송되었습니다.");
  }

  // async function requestCode() {
  //   const target = selectedOption === "phone" ? phone : email;
  //   const type = selectedOption;

  //   try {
  //     await sendAuthCode({ type, target });
  //     alert("인증번호가 전송되었습니다.");
  //   } catch (error) {
  //     alert("인증번호 전송에 실패했습니다.");
  //   }
  // }

  useEffect(() => {
    // 아이디 찾기 또는 비밀번호 찾기 페이지 제목 설정
    if (isFindId) {
      document.title = "아이디 찾기"; // true
    } else {
      document.title = "비밀번호 찾기"; //false
    }
  }, [isFindId]);

  // async function handleFindId() {
  //   try {
  //     const target = selectedOption === "phone" ? phone : email;
  //     const foundId = await findUserId({ name, type: selectedOption, target });
  //     setId(foundId);
  //   } catch (error) {
  //     alert("아이디 찾기에 실패했습니다.");
  //   }
  // }
  return (
    <Container>
      <H1>{isFindId ? "아이디 찾기" : "비밀번호 찾기"}</H1>
      {isFindId ? (
        <CardWrap>
          <Top>
            <Box
              className={selectedOption === "phone" ? "selected" : ""}
              onClick={() => handleBoxClick("phone")}
            >
              번호로 찾기
            </Box>
            <Box
              className={selectedOption === "email" ? "selected" : ""}
              onClick={() => handleBoxClick("email")}
            >
              EMAIL로 찾기
            </Box>
          </Top>
          <Card>
            <ButtomWrap>
              <Buttom>
                <SmallBox>
                  <IconUser />
                  <Input
                    type="text"
                    placeholder="이름를 입력해주세요"
                    autoComplete="off" // 자동완성 기능 끄기
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </SmallBox>
                {selectedOption === "phone" ? (
                  <SmallBox>
                    <IconPhone />
                    <Input
                      type="text"
                      placeholder="전화번호를 입력해주세요"
                      autoComplete="off" // 자동완성 기능 끄기
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </SmallBox>
                ) : (
                  <SmallBox>
                    <IconEmail />
                    <Input
                      type="text"
                      placeholder="이메일을 입력해주세요"
                      autoComplete="off" // 자동완성 기능 끄기
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </SmallBox>
                )}

                <Button> 인증번호 발송</Button>
                <SmallBox>
                  <label>인증번호</label>
                  <Input
                    type="text"
                    placeholder="인증번호를 입력해주세요"
                    autoComplete="off" // 자동완성 기능 끄기
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <button onClick={handleCode}>{codeText}</button>
                </SmallBox>
                <hr />
                {/* <Button onClick={handleFindId}>아이디 조회</Button> */}
                <SmallBox>
                  <label>나의 아이디</label>
                  <Input
                    type="text"
                    autoComplete="off" // 자동완성 기능 끄기
                    value={id}
                    readOnly
                  />
                  <button>복사</button>
                </SmallBox>
              </Buttom>
            </ButtomWrap>
          </Card>
          <ButtonWrap>
            <LoginButton type="navigate" />
          </ButtonWrap>
        </CardWrap>
      ) : (
        <CardWrap>
          <Card>
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
                  <IconEmail />
                  <Input
                    type="text"
                    placeholder="이메일를 입력해주세요"
                    autoComplete="off" // 자동완성 기능 끄기
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </SmallBox>
                <Button> 인증번호 발송</Button>
                <SmallBox>
                  <label>인증번호</label>
                  <Input
                    type="text"
                    placeholder="인증번호를 입력해주세요"
                    autoComplete="off" // 자동완성 기능 끄기
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <button onClick={handleCode}>{codeText}</button>
                </SmallBox>
                <hr />
                <SmallBox>
                  <label>새 비밀번호</label>
                  <Input
                    type="password"
                    placeholder="변경하실 비밀번호를 입력해주세요"
                    autoComplete="off" // 자동완성 기능 끄기
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </SmallBox>
                <SmallBox>
                  <label>재입력</label>
                  <Input
                    type="password"
                    placeholder="재입력 입력해주세요"
                    autoComplete="off" // 자동완성 기능 끄기
                    value={writeOneMorePassword}
                    onChange={(e) => setWriteOneMorePassword(e.target.value)}
                  />
                </SmallBox>
                <Button onClick={handleLoginRedirect}> 확인 </Button>
              </Buttom>
            </ButtomWrap>
          </Card>
        </CardWrap>
      )}
    </Container>
  );
}

export default Find;
