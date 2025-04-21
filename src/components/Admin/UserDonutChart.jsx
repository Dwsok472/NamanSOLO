import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { getAllUsers } from '../api1';
import styled from 'styled-components';

const ChartContainer = styled.div`
  width: 100%;
  height: 280px;
  background: #fff;
  padding: 16px;
  border-radius: 12px;
`;

const ChartTitle = styled.h4`
  text-align: center;
  margin-bottom: 10px;
`;

const UserCount = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const LegendBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ColorCircle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const LegendText = styled.span`
  font-size: 13px;
  color: #333;
`;

const GoalLabel = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
`;


const COLORS = ['#0088FE', '#00C49F'];

const UserDonutChart = () => {
  const getNextGoal = (count) => {
    if (count < 100) return 100;
    if (count < 1000) return 1000;
    if (count < 10000) return 10000;
    return Math.ceil(count / 10000) * 10000; // 그 이상은 만 단위로 증가
  };


  const [totalUsers, setTotalUsers] = useState(0);
  const goal = getNextGoal(totalUsers);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers(); 
        setTotalUsers(users.length);
      } catch (error) {
        console.error('가입자 수 불러오기 실패:', error);
      }
    };

    fetchUsers();
  }, []);
  const data = [
    { name: '가입자 수', value: totalUsers },
    { name: '남은 가입자 수', value: Math.max(0, goal - totalUsers) },
  ];

  
  return (
    <ChartContainer>
      <ChartTitle>총 목표 가입자 수</ChartTitle>
      <GoalLabel> 현재재 목표: {goal.toLocaleString()}명</GoalLabel>
      <ResponsiveContainer width="100%" height="65%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={55}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <UserCount>{totalUsers}</UserCount>

      <LegendBox>
        {data.map((entry, index) => (
          <LegendItem key={entry.name}>
            <ColorCircle color={COLORS[index % COLORS.length]} />
            <LegendText>{entry.name}</LegendText>
          </LegendItem>
        ))}
      </LegendBox>
    </ChartContainer>
  );
};

export default UserDonutChart;
