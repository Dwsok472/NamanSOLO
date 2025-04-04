import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  width: 90px;
  border-radius: 10px;
  background-color: #8c0d17;
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

function LoginButton({ type }) {
  const navigate = useNavigate();

  if (type === "navigate") {
    return <Button onClick={() => navigate("/login")}>로그인</Button>;
  } else {
    return <Button>로그인</Button>;
  }
}

export default LoginButton;
