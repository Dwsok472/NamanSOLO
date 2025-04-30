import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ResponsiveContainer } from 'recharts';
import { getDailyFeedStats } from '../api1';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

const Container = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 100%;
  height: 350px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LineChartWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin-bottom: 12px;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: #333;

    &:hover {
      color: #1e90ff;
    }
  }

  span {
    font-weight: bold;
  }
`;

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function moveDays(baseDate, days) {
  return new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000);
}

const FeedLineChart = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2025-04-01'));

  const endDate = moveDays(startDate, 6);
  const from = formatDate(startDate);
  const to = formatDate(endDate);

  useEffect(() => {
    getDailyFeedStats(from, to)
      .then(apiData => {
        const dateMap = {};
        apiData.forEach(item => {
          dateMap[item.date] = item.count;
        });
  
        const filledData = [];
        for (let i = 0; i < 7; i++) {
          const date = formatDate(moveDays(startDate, i));
          filledData.push({
            date,
            count: dateMap[date] ?? 0, // 데이터 없으면 0으로
          });
        }
  
        setData(filledData);
      })
      .catch(err => console.error('차트 데이터 로딩 실패', err));
  }, [from, to]);
  

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: '피드 수',
        data: data.map(d => d.count),
        borderColor: '#1e90ff',
        backgroundColor: 'rgba(30, 144, 255, 0.3)',
        tension: 0.3,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 20, 
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Container>
      <Title>일별 피드 생성 비율 통계</Title>
      <Nav>
        <button onClick={() => setStartDate(prev => moveDays(prev, -7))}><FaChevronLeft /></button>
        <span>{from} ~ {to}</span>
        <button onClick={() => setStartDate(prev => moveDays(prev, 7))}><FaChevronRight /></button>
      </Nav>
  
      <LineChartWrapper>
        <Line data={chartData} options={options} />
      </LineChartWrapper>
    </Container>
  );
};

export default FeedLineChart;
