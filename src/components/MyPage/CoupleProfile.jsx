import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IconClose } from "../Icons";
import { getCurrentUser } from "../api2";

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
  overflow-y: auto;
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
  margin-top: 10px;
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

function CoupleProfile({ onClose }) {
  const [isEditable, setIsEditable] = useState(false);

  const [city, setCity] = useState("");

  const [profileF, setProfileF] = useState({
    name: "박서진",
    birthday: "1996-01-01",
    email: "girl@email.com",
    phone: "010-1111-2222",
  });

  const [profileM, setProfileM] = useState({
    name: "김동인",
    birthday: "1996-05-03",
    email: "boy@email.com",
    phone: "010-2222-3333",
  });

  useEffect(()=> {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();

        setProfileF({
          name:data.realNameF,
          birthday:data.birthdayF,
          email: data.emailF,
          phone: data.phoneF,
        });
        setProfileM({
          name: data.realNameM,
          birthday: data.birthdayM,
          email: data.emailM,
          phone: data.phoneF,
        });
        setCity(data.city);
      } catch (e) {
        console.error("정보를 제대로 불러오지 못했습니다: " +e)
      }
    }
    fetchUser();
  }, [])

  const handleChange = (type, field, value) => {
    if (type === "M") {
      setProfileM((prev) => ({ ...prev, [field]: value }));
    } else {
      setProfileF((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    setIsEditable(false);
    alert("저장되었습니다!"); // 나중에 API로 변경 가능
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
                {isEditable ? (
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
                {isEditable ? (
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
