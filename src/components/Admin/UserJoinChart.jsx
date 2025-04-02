// 지금은 시각화만 하기 위한 코드입니다. 통계랑은 별개입니다 그래프만 따옴
import React from 'react';
import styled from 'styled-components';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
`;

const Title = styled.h3`
  margin-bottom: 10px;
  font-size: 1.1rem;
`;

const dummyData = [
  { date: '04-01', count: 5 },
  { date: '04-02', count: 8 },
  { date: '04-03', count: 2 },
  { date: '04-04', count: 10 },
  { date: '04-05', count: 6 },
  { date: '04-06', count: 3 },
  { date: '04-07', count: 9 },
  { date: '04-08', count: 15 },
  { date: '04-09', count: 19 },
  { date: '04-10', count: 11 },
];

function UserJoinChart() {
  return (
    <ChartWrapper>
      <Title>📅 일별 유저 가입 통계</Title>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dummyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#ff5777" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

export default UserJoinChart;
