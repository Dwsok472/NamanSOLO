import React, { useState } from "react";
import styled from "styled-components";
import Octagon from "../Register/Octagon";
import iconUser from "../img/people.png";

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const ControlButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    background-color: #9f142e;
    color: white;
    font-size: 1rem;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    &:hover {
      background-color: #8c0d17;
    }
  }
`;

function CoupleProfile() {
  const [profileF, setProfileF] = useState({
    image: iconUser,
    name: "박서진",
    birthday: "1996-01-01",
    email: "girl@email.com",
    phone: "010-1111-2222",
  });

  const [profileM, setProfileM] = useState({
    image: iconUser,
    name: "김동인",
    birthday: "1996-05-03",
    email: "boy@email.com",
    phone: "010-2222-3333",
  });

  const [isEditable, setIsEditable] = useState(false);

  const handleSave = () => {
    // 여기에 API 호출이나 저장 로직 추가 가능
    setIsEditable(false);
    alert("저장되었습니다!");
  };

  return (
    <>
      <Content>
        <Octagon
          id="profileM"
          data={profileM}
          onChange={(field, value) =>
            setProfileM((prev) => ({ ...prev, [field]: value }))
          }
          width="450px"
          cardwidth="400px"
          cardheight="500px"
          cardbackground="#e0f7fa"
          buttoncolor="#bfe4fb"
          isProfilePage={true}
          isSignUpPage={false}
          isEditable={isEditable}
        />
        <Octagon
          id="profileF"
          data={profileF}
          onChange={(field, value) =>
            setProfileF((prev) => ({ ...prev, [field]: value }))
          }
          width="450px"
          cardwidth="400px"
          cardheight="500px"
          cardbackground="#ffdcd6"
          buttoncolor="#ffc9c2"
          isProfilePage={true}
          isSignUpPage={false}
          isEditable={isEditable}
        />
      </Content>
      <ControlButtons>
        {isEditable ? (
          <button onClick={handleSave}>저장</button>
        ) : (
          <button onClick={() => setIsEditable(true)}>수정</button>
        )}
      </ControlButtons>
    </>
  );
}

export default CoupleProfile;
