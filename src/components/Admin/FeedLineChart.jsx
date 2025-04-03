//일별 피드 그래프 점선
import React from 'react';
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
  width: 90%;
  height: 30%;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin-bottom: 12px;
`;

const FeedLineChart = ({ data }) => {
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
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <Container>
      <Title>일별 피드 생성 비율 통계</Title>
      <Line data={chartData} options={options} />
    </Container>
  );
};

export default FeedLineChart;
