import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 110px;
  border-radius: 20px;
  background-color: #8c0d17;
  border: 1px solid white;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #ffffff;
    color: #8c0d17;
    border: 1px solid #3333;
  }
  pointer-events: ${(props) => (props.$loading ? "none" : "auto")}; 
  opacity: ${(props) => (props.$loading ? 0.6 : 1)};
  &:focus {
    outline: none;
  }
`;

function NextButton({ onClick, text = "다음", $loading = false }) {
  return (
    <div>
      <Button onClick={onClick} $loading={$loading}>{text}</Button>
    </div>
  );
}

export default NextButton;
