import React, { useState } from "react";
import styled from "styled-components";
import iconUser from "../img/people.png";

const ModalWrapper = styled.div`
  top: 50%;
  left: 50%;
  width: 100%;

  background: white;
  border-radius: 3px;
  /* box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3); */
  z-index: 1000;
  /* padding: 30px; */
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #8c0d17;
  color: white;
  padding: 15px 20px;
  border-radius: 8px 8px 0 0;
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
  margin-top: 25px;
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

function CoupleProfile() {
  const [isEditable, setIsEditable] = useState(false);

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
