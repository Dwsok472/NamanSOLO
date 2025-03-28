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
  margin-right: 10px;
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
