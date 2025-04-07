import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
  width: 110px;
  border-radius: 10px;
  background-color: #8c0d17;
  /* border: 1px solid white; */
  font-size: 1rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  &:hover {

    color: #d1d1d1;
  }
  &:focus {
    outline: none;
  }
`;

function RegisterButton() {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate('/login?view=register')}>회원가입</Button>
    </div>
  );
}

export default RegisterButton;
