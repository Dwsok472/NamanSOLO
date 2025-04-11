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
    background-color: #ffffff;
    color: #8c0d17;
    border: 1px solid #3333;
  }
  &:focus {
    outline: none;
  }
`;

function LoginButton({ type, onClick }) {
  const navigate = useNavigate();

  if (type === "navigate") {
    return <Button onClick={() => navigate("/login")}>로그인</Button>;
  } else {
    return <Button onClick={onClick}>로그인</Button>;
  }
}

export default LoginButton;
