import styled from "styled-components";
import {
  IconBirthday,
  IconEmail,
  IconImage,
  IconModify,
  IconPhone,
  IconUser,
} from "../Icons";
import { useEffect, useState } from "react";
import Profile from "../img/people.png";
import { ModifyUserInfo } from "../api";

const CardWrap = styled.div`
  width: ${(props) => props.$width || "550px"};
  margin: 0 auto;
  /* margin-top: 25px; */
  /* border: 1px solid #3333; */
  border-radius: 3px;
  /* background-color: #e6d3c1; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); */
`;

const Card = styled.div`
  width: ${(props) => props.$cardwidth || "500px"};
  height: ${(props) => props.$cardheight || "600px"};
  /* background-color: ${(props) => props.cardbackground || "#ffdcd6"}; */
  /* clip-path: polygon(
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
`;
const Top = styled.div`
  width: 100%;
  height: 30%;
  text-align: center;
  /* padding-top: 40px; */
  position: relative;
`;

const ModifyTop = styled.div`
  width: 12%;
  display: flex;
  justify-content: center;
  position: absolute;
  right: 20px;
  cursor: pointer;
`;

const Img = styled.img`
  width: ${(props) => props.$imgwidth || "130px"};
  height: ${(props) => props.$imgheight || "130px"};
  border-radius: 50%;
  object-fit: cover;
  /* border: 1px solid #3333; */
  align-items: center;
  cursor: ${(props) => (props.$editable ? "none" : "pointer")};
  pointer-events: ${(props) => (props.$editable ? "none" : "auto")};
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
  /* border: 1px solid #1a1a1a33; */
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
`;

const Input = styled.input`
  width: 80%;
  border: none;
  outline: none;
  padding-left: 30px;
  background-color: ${(props) => (props.$readOnly ? "#e0e0e0" : "#fefefe")};
`;
const ImgInput = styled.input`
  display: none;
`;

const FileButton = styled.button`
  border: none;
  cursor: ${(props) => (props.$editable ? "default" : "pointer")};
  background-color: transparent;
  position: absolute;
  bottom: 0px;
  pointer-events: ${(props) => (props.$editable ? "none" : "auto")};
  opacity: ${(props) => (props.$editable ? 0 : 1)};
  &:focus {
    outline: none;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 20px 0;
`;

const Button = styled.button`
  width: 20%;
  height: 50%;
  border-radius: 15px;
  background-color: #ffffff;
  border: 1px solid white;
  font-size: 60%;
  font-weight: 700;
  color: #414141;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.$buttoncolor || "#fda899"};
    color: #eeeeee;
  }

  &:disabled {
    background-color: #cccccc;
    color: #888;
    cursor: not-allowed;
  }
`;

// 회원가입 유저 정보 입력 및 마이프로필 커플 정보 조회 및 수정에서 사용
function Octagon({
  id,
  width,
  cardwidth,
  cardheight,
  cardbackground,
  imgwidth,
  imgheight,
  buttoncolor,
  isProfilePage,
  isSignUpPage,
  data,
  onChange,
}) {
  const [name, setName] = useState(data.name);
  const [birthday, setBirthday] = useState(data.birthday);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setName(data.name);
    setBirthday(data.birthday);
    setEmail(data.email);
    setPhone(data.phone);
  }, [data]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const isEmailValid = emailRegex.test(email);

  const formatPhoneNumber = (value) => {
  const numbersOnly = value.replace(/\D/g, ""); // 숫자만 추출
    const match = numbersOnly.match(/^(\d{3})(\d{3,4})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
  
    return numbersOnly;
  };

  const handleSubmit = async () => {
    try {
      await ModifyUserInfo({ name, birthday, email, phone });
      alert("저장 완료!");
      setIsEditable(false);
    } catch (err) {
      alert("저장 실패");
    }
  };

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
                onChange={(e) => {const value = e.target.value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z\s]/g, "");
                  setName(value); if (onChange) {
                    onChange("name", value);}}}
                $readOnly={isProfilePage && !isEditable}
                placeholder="이름을 입력해주세요"
              />
            </SmallBox>
            <SmallBox $readOnly={isProfilePage}>
              <IconBirthday />
              <Input
                type="date"
                value={birthday}
                onChange={(e) => {setBirthday(e.target.value);
                  if (onChange) {
                    onChange("birthday", e.target.value);}}}
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
