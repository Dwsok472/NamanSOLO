// 지금은 시각화만 하기 위한 코드입니다. 통계랑은 별개입니다 그래프만 따옴
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const UserDonutChart = ({ total = 25 }) => {
  const data = [
    { name: '가입자 수', value: total },
    { name: '잔여', value: 100 - total }
  ];

  return (
    <div style={{ width: '100%', height: 250, background: '#fff', padding: 16, borderRadius: 12 }}>
      <h4 style={{ textAlign: 'center', marginBottom: 10 }}>전체 유저 가입 통계</h4>
      <ResponsiveContainer width="100%" height="80%">
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
      <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{total}</div>
    </div>
  );
};

export default UserDonutChart;
