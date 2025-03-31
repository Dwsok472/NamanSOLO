import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
  width: 110px;
  border-radius: 10px;
  background-color: #ffb4a7;
  border: 1px solid white;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: white;
    border: 1px solid #3333;
    color: #1b1b1b;
  }
  &:focus {
    outline: none;
  }
`;

function RegisterButton() {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate('/register')}>회원가입</Button>
    </div>
  );
}

export default RegisterButton;
