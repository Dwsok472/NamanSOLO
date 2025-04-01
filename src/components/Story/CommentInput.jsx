import React, { useState } from "react";
import styled from "styled-components";

const InputWrap = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  padding: 10px 16px;
  border: none;
  background-color: #fda899;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
`;

const CommentInput = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim() === "") return;
    onSubmit(value);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <InputWrap>
      <Input
        placeholder="댓글을 입력하세요..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
    </InputWrap>
  );
};

export default CommentInput;
