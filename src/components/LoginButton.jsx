import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
  width: 90px;
  height: 40px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid white;
  font-size: 1rem;
  font-weight: 700;
  border: 1px solid #3333;
    color: #1b1b1b;

    cursor: pointer;
    &:hover{
        background-color:#ff9987;
        color: white;
        border: 1px solid #3333;
    }
    &:focus{
      outline: none;
    }
`;

function LoginButton() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate('/login')}>
      로그인
    </Button>
  );
}

export default LoginButton;
