import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { getUserJoinDates } from '../api1';

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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const NavBtn = styled.button`
  background: #f2f2f2;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;


function UserJoinChart() {
  const [chartData, setChartData] = useState([]);
  const [endDate, setEndDate] = useState(new Date()); 

  const handlePrev = () => {
    const newEnd = new Date(endDate);
    newEnd.setDate(endDate.getDate() - 10);
    setEndDate(newEnd);
  };
  
  const handleNext = () => {
    const newEnd = new Date(endDate);
    newEnd.setDate(endDate.getDate() + 10);
    setEndDate(newEnd);
  };
  

  useEffect(() => {
    getUserJoinDates().then(data => {
      const grouped = {};
  
      const fromDate = new Date(endDate);
      fromDate.setDate(endDate.getDate() - 9); // 총 10일
  
      data.forEach(user => {
        const dateStr = user.addDate;
        if (!dateStr) return;
  
        const date = new Date(dateStr);
        if (date >= fromDate && date <= endDate) {
          const key = dateStr.slice(5);
          grouped[key] = (grouped[key] || 0) + 1;
        }
      });
  
      const days = [];
      for (let i = 9; i >= 0; i--) {
        const d = new Date(endDate);
        d.setDate(endDate.getDate() - i);
        const key = d.toISOString().slice(5, 10);
        days.push(key);
      }
  
      const formatted = days.map(date => ({
        date,
        count: grouped[date] || 0,
      }));
  
      setChartData(formatted);
    });
  }, [endDate]);
  
  

  return (
    <ChartWrapper>
      <Title>📅 일별 유저 가입 통계</Title>
      <ButtonGroup>
        <NavBtn onClick={handlePrev}>이전</NavBtn>
        <NavBtn onClick={handleNext}>다음</NavBtn>
      </ButtonGroup>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
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
