// 유저 마지막 활동기록 평균

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #fff3f3;
  flex: 1;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin-bottom: 12px;
  color: #ff5a5a;
`;

const Number = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #e64545;
`;

const Unit = styled.div`
  margin-top: 4px;
  font-size: 0.85rem;
  color: #666;
`;

function FeedAvgBox({ averageDays }) {
  return (
    <Container>
      <Title>유저별 마지막 활동 평균</Title>
      <Number>{averageDays}</Number>
      <Unit>일 전</Unit>
    </Container>
  );
}

export default FeedAvgBox;
