import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IconClose } from "../Icons";
import { getCurrentUser, updateUserData } from "../api2";
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
          phone: data.phoneNumberF,
        });
      } catch (e) {
        console.error("정보를 제대로 불러오지 못했습니다: " + e);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (type, field, value) => {
    if (type === "M") {
      setProfileM((prev) => ({ ...prev, [field]: value }));
    } else {
      setProfileF((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
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
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange("M", key, e.target.value)}
                  />
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
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange("F", key, e.target.value)}
                  />
                ) : (
                  <span>{value}</span>
                )}
              </div>
            )
          )}
        </ProfileBox>
      </Content>
      <CityWrapper>
        <CityDropdown
          value={city}
          isEditable={isEditable}
          onSelect={(e) => setCity(e)}
        />
      </CityWrapper>
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
