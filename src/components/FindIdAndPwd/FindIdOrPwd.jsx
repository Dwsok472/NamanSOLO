import React, { useState, useEffect } from "react";
import { IconEmail, IconPhone, IconUser } from "../Icons";
import LoginButton from "../Button/LoginButton";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function FindIdOrPwd({ isFindId }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [realName, setRealName] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [writeOneMorePassword, setWriteOneMorePassword] = useState("");
    const [verify, setVerify] = useState(false);

    const [selectedOption, setSelectedOption] = useState("phone");
    const navigate = useNavigate(); // useNavigate 훅으로 페이지 이동 함수 생성

    async function verifyUser() {
        try {
            const res = await axios.get('api/user/exist', {
                params: {
                    username,
                    realName,
                    email
                }
            });
            console.log(res.data)
            if (res.data === true || res.data === false) {
                setVerify(true);
                alert("인증에 성공하였습니다")
            }
        } catch (error) {
            alert("일치하지 않은 정보입니다. 다시 확인해주세요");
        }
    }
    async function handleVerifyUser() {
        await verifyUser();
    }
    async function findPassword() {
        try {
            const trimmedPassword = newPassword.trim();
            const trimmedConfirm = writeOneMorePassword.trim();

            if (!trimmedPassword || !trimmedConfirm) {
                alert("공란으로 비밀번호를 설정하실 수 없습니다");
                return;
            }

            if (trimmedPassword !== trimmedConfirm) {
                alert("작성하신 비밀번호가 일치하지 않습니다. 다시 확인 부탁드립니다");
                return;
            }
            const response = await axios.put('api/user/modify-pw', {
                username,
                email,
                newPassword: trimmedPassword,
                confirmNewPassword: trimmedConfirm
            });
            alert(response.data); // "비밀번호가 성공적으로 변경되었습니다."
            navigate("/login");
        } catch (error) {
            alert(error.response?.data || "에러가 발생했습니다. 다시 시도해주세요.");
        }
    }


    // 비밀번호 일치 여부 확인 및 공란 불가 처리    
    async function handleLoginRedirect() {
        try {
            if (verify === true) {
                await findPassword();
            } else {
                alert("정보를 입력 후 사용 가능합니다")
                return
            }
        } catch (error) {
            alert('인증 실패! 다시 시도해주세요.');
        }
    }
    //이메일 찾기인지, 전화번호로 찾기인지 확인
    const handleBoxClick = (option) => {
        setSelectedOption(option);
    }

    async function findUsername() {
        if (!name.trim() || (selectedOption === 'phone' && !phone.trim()) ||
            (selectedOption === 'email' && !email.trim())) {
            alert("이름과 전화번호 또는 이메일을 정확히 입력해주세요.");
            return;
        }
        try {
            const url = selectedOption === "phone" ? '/api/user/find-user/phone' : '/api/user/find-user/email';
            const param = selectedOption === "phone" ? { realName: name, phoneNumber: phone } : { realName: name, email: email };
            console.log(name)
            const response = await axios.get(url, {
                params: param
            })
            setId(response.data);
        } catch (error) {
            throw error;
        }
    }
    async function handleFindUsername() {
        try {
            await findUsername();
        } catch (error) {
            alert('인증 실패! 다시 시도해주세요.');
        }
    }


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

                                <Button onClick={handleFindUsername}>인증하기</Button>
                                <hr />
                                <SmallBox>
                                    <label>나의 아이디</label>
                                    <Input
                                        type="text"
                                        autoComplete="off" // 자동완성 기능 끄기
                                        value={id}
                                        readOnly
                                    />
                                    <button onClick={() => navigator.clipboard.writeText(id).then(() => alert("아이디가 복사되었습니다")).catch(() => alert('복사에 실패했습니다.'))}>복사</button>
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
                                    <IconUser />
                                    <Input
                                        type="text"
                                        placeholder="성함을 입력해주세요"
                                        autoComplete="off" // 자동완성 기능 끄기
                                        value={realName}
                                        onChange={(e) => setRealName(e.target.value)}
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
                                <Button onClick={handleVerifyUser}> 인증하기</Button>
                                <hr />
                                <SmallBox>
                                    <label>새 비밀번호</label>
                                    <Input
                                        type="password"
                                        placeholder="변경하실 비밀번호를 입력해주세요"
                                        autoComplete="off" // 자동완성 기능 끄기
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value.replace(/[^a-z!-_A-Z0-9]/g, ''))}
                                    />
                                </SmallBox>
                                <GuideText $isError={newPassword.length >= 0 && newPassword.length < 8}>
                                    특수문자, 영문, 숫자를 포함해 8자 이상 입력해주세요.
                                </GuideText>
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

export default FindIdOrPwd;

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  margin-top: 150px;
  margin-bottom: 170px;
  & hr {

    opacity: 0.5;
    margin: 0 auto;
  }
`;
const H1 = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  text-align: center;
  color: #202020;
  user-select: none;
`;
const CardWrap = styled.div`
  width: 550px;
  margin: 0 auto;
  margin-top: 20px;
`;
const Top = styled.div`
  width: 100%;
  /* padding-top: 40px; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* grid-template-columns: 1fr 1fr 1fr; */
  /* margin-left: 55px; */
`;
const Box = styled.div`
  width: 150px;
  height: 50px;
  border: 1px solid #02020233;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  transition: all 0.3s ease;
  cursor: pointer;
  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-left: none; /* 겹치는 border 제거 */
  }
  &.selected {
    background-color: #8c0d17;
    color: white;
  }
`;

const Card = styled.div`
  width: 550px;
  padding-bottom: 10px;
  margin: 0 auto;
`;
const SmallBox = styled.div`
  width: 85%;
  margin: 0 auto;
  border: 1px solid #02020233;
  border-radius: 10px;
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
const GuideText = styled.div`
  font-size: 0.75rem;
  text-align: ${({ $alignRight }) => ($alignRight ? "right" : "center")};
  color: ${({ $isError }) =>
        $isError === true
            ? "#d32f2f" // 에러 - 빨간색
            : $isError === false
                ? "#2e7d32" // 성공 - 초록색
                : "#888"}; // 기본 회색 or 안내 메시지용
  display: ${({ $hide }) => ($hide ? "none" : "block")};
`;
const Button = styled.button`
  width: 120px;
  background-color: #8c0d17;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 20px;
  color: white;
  margin: 0 auto;
  margin-top: 5px;
  outline: none;
  &:hover {
    background-color: #ffffff;
    color: #8c0d17;
    border: 1px solid #3333;
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
  font-size: 15px;
`;

const ButtomWrap = styled.div`
  width: 85%;
  margin: 0 auto;
`;
const Buttom = styled.div`
  width: 100%;
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

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
