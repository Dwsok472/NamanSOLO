import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IconClose } from "../Icons";
import { checkEmailDuplicate, checkPhoneDuplicate, getCurrentUser, updateUserData } from "../api2";
import CityDropdown from "../Register/DropdownButton";

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 1000;
  /* padding: 10px; */
  border-radius: 8px;
  max-height: 90vh;
`;

const Top = styled.div`
  position: relative; /* 중요 */
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  background-color: #8c0d17;
  color: white;
  padding: 15px 20px;
  border-radius: 8px 8px 0 0;
`;

const CityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // 중앙 정렬
  margin-top: 10px; // 아래로 내리기
  width: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 1px;
  background: transparent;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 20px;
`;

const ProfileBox = styled.div`
  flex: 1;
  padding: 10px 20px;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
  }

  .input-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    label {
      font-weight: bold;
      margin-bottom: 5px;
    }

    button {
      margin-top: -30px;
      margin-bottom: 5px;
      align-self: flex-end;
      font-size: 0.75rem;
      padding: 5px 10px;
      border-radius: 4px;
      background-color: #8c0d17;
      color: white;
      border: none;
      cursor: pointer;
    }

    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    span {
      font-size: 1rem;
    }
  }
`;

const ControlButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 25px;
  gap: 20px;

  button {
    background-color: #9f142e;
    color: white;

    font-size: 1rem;
    padding: 10px 25px;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    &:hover {
      background-color: #8c0d17;
    }
  }
`;

function CoupleProfile({ onClose, onUpdateNames }) {
  const [isEditable, setIsEditable] = useState(false);

  const [city, setCity] = useState("");

  const [profileF, setProfileF] = useState({
    name: "",
    birthday: "",
    email: "",
    phone: "",
  });

  const [profileM, setProfileM] = useState({
    name: "",
    birthday: "",
    email: "",
    phone: "",
  });

  const [emailCheckF, setEmailCheckF] = useState(false);
  const [emailCheckTextF, setEmailCheckTextF] = useState("중복확인");

  const [phoneCheckF, setPhoneCheckF] = useState(false);
  const [phoneCheckTextF, setPhoneCheckTextF] = useState("중복확인");

  const [emailCheckM, setEmailCheckM] = useState(false);
  const [emailCheckTextM, setEmailCheckTextM] = useState("중복확인");

  const [phoneCheckM, setPhoneCheckM] = useState(false);
  const [phoneCheckTextM, setPhoneCheckTextM] = useState("중복확인");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setCity(data.city);

        setProfileF({
          name: data.realNameF,
          birthday: data.birthF,
          email: data.emailF,
          phone: data.phoneNumberF,
        });
        setProfileM({
          name: data.realNameM,
          birthday: data.birthM,
          email: data.emailM,
          phone: data.phoneNumberM,
        });
      } catch (e) {
        console.error("정보를 제대로 불러오지 못했습니다: " + e);
      }
    };
    fetchUser();
  }, []);

  const handleCheckEmailF = async () => {
    const data = await getCurrentUser();
    if (profileF.email === data.emailF) {
      setEmailCheckF(true);
      setEmailCheckTextF("사용가능");
      return;
    }

    const isAvailable = await checkEmailDuplicate(profileF.email);
    setEmailCheckF(isAvailable);
    setEmailCheckTextF(isAvailable ? "사용가능" : "중복됨");
  };

  const handleCheckEmailM = async () => {
    const data = await getCurrentUser();
    if (profileM.email === data.emailM) {
      setEmailCheckM(true);
      setEmailCheckTextM("사용가능");
      return;
    }

    const isAvailable = await checkEmailDuplicate(profileM.email);
    setEmailCheckM(isAvailable);
    setEmailCheckTextM(isAvailable ? "사용가능" : "중복됨");
  };

  const handleCheckPhoneF = async () => {
    const data = await getCurrentUser();
    if (profileF.phone === data.phoneNumberF) {
      setPhoneCheckF(true);
      setPhoneCheckTextF("사용가능");
      return;
    }

    const isAvailable = await checkPhoneDuplicate(profileF.phone);
    setPhoneCheckF(isAvailable);
    setPhoneCheckTextF(isAvailable ? "사용가능" : "중복됨");
  };

  const handleCheckPhoneM = async () => {
    const data = await getCurrentUser();
    if (profileM.phone === data.phoneNumberM) {
      setPhoneCheckM(true);
      setPhoneCheckTextM("사용가능");
      return;
    }

    const isAvailable = await checkPhoneDuplicate(profileM.phone);
    setPhoneCheckM(isAvailable);
    setPhoneCheckTextM(isAvailable ? "사용가능" : "중복됨");
  };

  useEffect(() => {
    setEmailCheckM(false);
    setEmailCheckTextM("중복확인");
  }, [profileM.email]);


  useEffect(() => {
    setPhoneCheckM(false);
    setPhoneCheckTextM("중복확인");
  }, [profileM.phone]);

  useEffect(() => {
    setEmailCheckF(false);
    setEmailCheckTextF("중복확인");
  }, [profileF.email]);


  useEffect(() => {
    setPhoneCheckF(false);
    setPhoneCheckTextF("중복확인");
  }, [profileF.phone]);

  const handleChange = (type, field, value) => {
    if (type === "M") {
      setProfileM((prev) => ({ ...prev, [field]: value }));
    } else {
      setProfileF((prev) => ({ ...prev, [field]: value }));
    }
  };

  const isValidProfile = (profile) => {
    const nameValid = profile.name.trim().length > 0;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email);
    const phoneValid = /^\d{3}-\d{3,4}-\d{4}$/.test(profile.phone);
    return nameValid && emailValid && phoneValid;
  };

  const handleSave = async () => {
    if (!isValidProfile(profileF)) {
      alert("여자쪽 정보가 올바르지 않아요! 이메일/전화번호 형식도 확인해주세요.");
      return;
    }
    if (!isValidProfile(profileM)) {
      alert("남자쪽 정보가 올바르지 않아요! 이메일/전화번호 형식도 확인해주세요.");
      return;
    }
  
    if (profileF.email === profileM.email) {
      alert("남녀의 이메일이 동일합니다. 서로 다른 이메일을 입력해주세요.");
      return;
    }
  
    if (profileF.phone === profileM.phone) {
      alert("남녀의 전화번호가 동일합니다. 서로 다른 번호를 입력해주세요.");
      return;
    }
    
    try {
      const updatedUser = {
        realNameM: profileM.name,
        realNameF: profileF.name,
        emailM: profileM.email,
        emailF: profileF.email,
        phoneNumberM: profileM.phone,
        phoneNumberF: profileF.phone,
        city: city,
      };

      await updateUserData(updatedUser);
      onUpdateNames(profileF.name, profileM.name);
      alert("저장되었습니다!");
      setIsEditable(false);
    } catch (err) {
      console.error("저장 실패", err);
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <ModalWrapper>
      <Top>
        <h2>커플 정보 수정</h2>
        <CloseButton onClick={onClose}>
          <IconClose />
        </CloseButton>
      </Top>

      <Content>
        {/* 남자 프로필 */}
        <ProfileBox>
          <h3>남자 정보</h3>
          {Object.entries(profileM).map(([key, value]) =>
            key === "image" ? null : (
              <div className="input-field" key={key}>
                <label>{key}</label>
                {isEditable && key !== "birthday" ? (
                  <>
                    {key === "email" && (
                      <button onClick={handleCheckEmailM}>{emailCheckTextM}</button>
                    )}
                    {key === "phone" && (
                      <button onClick={handleCheckPhoneM}>{phoneCheckTextM}</button>
                    )}
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleChange("M", key, e.target.value)}
                    />
                  </>
                ) : (
                  <span>{value}</span>
                )}
              </div>
            )
          )}
        </ProfileBox>

        {/* 여자 프로필 */}
        <ProfileBox>
          <h3>여자 정보</h3>
          {Object.entries(profileF).map(([key, value]) =>
            key === "image" ? null : (
              <div className="input-field" key={key}>
                <label>{key}</label>
                {isEditable && key !== "birthday" ? (
                  <>
                    {key === "email" && (
                      <button onClick={handleCheckEmailF}>{emailCheckTextF}</button>
                    )}
                    {key === "phone" && (
                      <button onClick={handleCheckPhoneF}>{phoneCheckTextF}</button>
                    )}
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleChange("F", key, e.target.value)}
                    />
                  </>
                )
                 : (
                  <span>{value}</span>
                )}
              </div>
            )
          )}
        </ProfileBox>
      </Content>
      {isEditable ?
      <CityWrapper>
        <CityDropdown
          value={city}
          isEditable={isEditable}
          onSelect={(e) => setCity(e)}
        />
      </CityWrapper>
      : <CityWrapper><div>{city}</div></CityWrapper> }
      <ControlButtons>
        {isEditable ? (
          <button onClick={handleSave}>저장</button>
        ) : (
          <button onClick={() => setIsEditable(true)}>수정</button>
        )}
      </ControlButtons>
    </ModalWrapper>
  );
}

export default CoupleProfile;
