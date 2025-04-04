import React, { useState } from 'react';
import styled from 'styled-components';
import Octagon from '../Register/Octagon';
import heartRate from '../img/heart-rate.png';
import defaultcouple from '../img/couple.png';
import iconUser from '../img/people.png';

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  .heartRate {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

function CoupleProfile() {
  const [profileF, setProfileF] = useState({
    image: iconUser,
    name: '박서진',
    birthday: '1996.01.01',
    email: 'girl@email.com',
    phone: '010-1111-2222',
    isEditable: false,
  });

  const [profileM, setProfileM] = useState({
    image: iconUser,
    name: '김동인',
    birthday: '1996.05.03',
    email: 'boy@email.com',
    phone: '010-2222-3333',
    isEditable: false,
  });

  return (
    <Content>
      <Octagon
        id="profileF"
        data={profileF}
        onChange={(field, value) =>
          setProfileF((prev) => ({ ...prev, [field]: value }))
        }
        width="450px"
        cardwidth="400px"
        cardheight="500px"
        cardbackground="#e0f7fa"
        imgwidth="120px"
        imgheight="120px"
        buttoncolor="#bfe4fb"
        isProfilePage={true}
        isSignUpPage={false}
      />
      <img src={heartRate} className="heartRate" />
      <Octagon
        id="profileM"
        data={profileM}
        onChange={(field, value) =>
          setProfileM((prev) => ({ ...prev, [field]: value }))
        }
        width="450px"
        cardwidth="400px"
        cardheight="500px"
        cardbackground="#ffdcd6"
        imgwidth="120px"
        imgheight="120px"
        buttoncolor="#ffc9c2"
        isProfilePage={true}
        isSignUpPage={false}
      />
    </Content>
  );
}

export default CoupleProfile;