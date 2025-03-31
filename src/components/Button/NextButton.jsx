import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 80px;
  border-radius: 10px;
  background-color: #ffcbc1;
  border: 1px solid white;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  &:hover {
    border: 1px solid #3333;
    color: #1b1b1b;
  }
  &:focus {
    outline: none;
  }
`;

function NextButton({ onClick }) {
  return (
    <div>
      <Button onClick={onClick}>다음</Button>
    </div>
  );
}

export default NextButton;
