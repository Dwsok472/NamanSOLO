import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const AllStories = () => {
  return (
    <Wrapper>
      <Title>전체 스토리 페이지</Title>
      <p>여기는 전체 스토리가 표시되는 곳입니다 🎉</p>
    </Wrapper>
  );
};

export default AllStories;
