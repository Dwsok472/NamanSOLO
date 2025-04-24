import styled from "styled-components";
import {
  IconBirthday,
  IconEmail,
  IconPhone,
  IconUser,
} from "../Icons";
import { useEffect, useState } from "react";
import { ModifyUserInfo } from "../api";
import { checkEmailDuplicate, checkPhoneDuplicate } from "../api2";

const CardWrap = styled.div`
  width: ${(props) => props.$width || "550px"};
  margin: 0 auto;
  border-radius: 3px;

`;

const Card = styled.div`
  width: ${(props) => props.$cardwidth || "500px"};
  height: ${(props) => props.$cardheight || "600px"};

  margin: 0 auto;
`;

const ButtomWrap = styled.div`
  width: 90%;
  height: 70%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Buttom = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  background-color: white;
  border-radius: 10px;
  margin: 0 auto;
  gap: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  height: 80%;
`;

const SmallBox = styled.div`
  width: 85%;
  margin: 0 auto;
  border: 1px solid #02020233;
  border-radius: 10px;
  background-color: ${(props) => (props.$readOnly ? "#e0e0e0" : "#fefefe")};
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  button {
    background-color: #a0a0a0;
    font-size:0.6rem;
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
  background-color: ${(props) => (props.$readOnly ? "#e0e0e0" : "#fefefe")};
&::placeholder{
font-size: 0.7rem;
}
`;


const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 20px 0;
`;


// 회원가입 유저 정보 입력 및 마이프로필 커플 정보 조회 및 수정에서 사용
function Octagon({
  width,
  cardwidth,
  cardheight,
  cardbackground,
  isProfilePage,
  data,
  onChange,
  onStatusChange
}) {
  const [name, setName] = useState(data.name);
  const [birthday, setBirthday] = useState(data.birthday);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [emailButtonText, setEmailButtonText] = useState("중복확인");
  const [phoneButtonText, setPhoneButtonText] = useState("중복확인");
  const [emailStatus, setEmailStatus] = useState(false);
  const [phoneStatus, setPhoneStatus] = useState(false);

  useEffect(() => {
    setName(data.name);
    setBirthday(data.birthday);
    setEmail(data.email);
    setPhone(data.phone);
  }, [data]);

  const formatPhoneNumber = (value) => {
    const numbersOnly = value.replace(/\D/g, ""); // 숫자만 추출
    const match = numbersOnly.match(/^(\d{3})(\d{3,4})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return numbersOnly;
  };
  useEffect(() => {
    if (onStatusChange) {
      onStatusChange({ emailStatus, phoneStatus });
    }
  }, [emailStatus, phoneStatus]);

  async function handleCheckEmail() {
    try {
      const isAvaliable = await checkEmailDuplicate(email);
      setEmailButtonText(isAvaliable ? "사용가능" : "중복됨");
      setEmailStatus(isAvaliable);
      if (!isAvaliable) alert("이미 등록된 이메일입니다");
    } catch {
      setEmailButtonText("중복확인");
      setEmailStatus(false);
    }
  }

  useEffect(() => {
    setEmailStatus(false);
    setEmailButtonText("중복확인");
  }, [email]);
  
  useEffect(() => {
    setPhoneStatus(false);
    setPhoneButtonText("중복확인");
  }, [phone]);

  async function handleCheckPhone() {
    try {
      const isAvaliable = await checkPhoneDuplicate(phone);
      setPhoneButtonText(isAvaliable ? "사용가능" : "중복됨");
      setPhoneStatus(isAvaliable);
      if (!isAvaliable) alert("이미 등록된 번호입니다");
    } catch {
      setPhoneButtonText("중복확인");
      setPhoneStatus(false);
    }
  }
  return (
    <CardWrap width={width}>
      <Card
        $cardwidth={cardwidth}
        $cardheight={cardheight}
        $cardbackground={cardbackground}
      >
        <ButtomWrap>
          <Buttom>
            <SmallBox $readOnly={isProfilePage && !isEditable}>
              <IconUser />
              <Input
                maxLength={10}
                type="text"
                value={name}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z\s]/g, "");
                  setName(value); if (onChange) {
                    onChange("name", value);
                  }
                }}
                $readOnly={isProfilePage && !isEditable}
                placeholder="이름을 입력해주세요"
              />
            </SmallBox>
            <SmallBox $readOnly={isProfilePage}>
              <IconBirthday />
              <Input
                type="date"
                value={birthday}
                onChange={(e) => {
                  setBirthday(e.target.value);
                  if (onChange) {
                    onChange("birthday", e.target.value);
                  }
                }}
                $readOnly={isProfilePage}
                placeholder="생년월일을 입력해주세요"
                max={new Date().toISOString().split("T")[0]}
              />
            </SmallBox>
            <SmallBox $readOnly={isProfilePage && !isEditable}>
              <IconEmail />
              <Input
                maxLength={26}
                type="text"
                value={email}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, ""); // 허용 문자만 필터
                  setEmail(value);
                  if (onChange) {
                    onChange("email", value);
                  }
                }}
                $readOnly={isProfilePage && !isEditable}
                placeholder="name@naver.com"
              />
              <button onClick={handleCheckEmail}>{emailButtonText}</button>
            </SmallBox>
            <SmallBox $readOnly={isProfilePage && !isEditable}>
              <IconPhone />
              <Input
                maxLength={13}
                type="text"
                value={phone}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  setPhone(formatted);
                  if (onChange) {
                    onChange("phone", formatted);
                  }
                }}
                $readOnly={isProfilePage && !isEditable}
                placeholder="전화번호를 입력해주세요"
              />
              <button onClick={handleCheckPhone}>{phoneButtonText}</button>
            </SmallBox>
          </Buttom>
          {isProfilePage && (
            <ButtonWrap>
              {/* <Button
                $buttoncolor={buttoncolor}
                onClick={handleSubmit}
                disabled={!isEditable}
              >
                저장
              </Button> */}
            </ButtonWrap>
          )}
        </ButtomWrap>
      </Card>
    </CardWrap>
  );
}

export default Octagon;
