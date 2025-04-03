import React from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Container = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 600px;
  height: 360px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin-bottom: 12px;
`;

const FeedDonutChart = ({ total }) => {
  const chartData = {
    labels: ['업로드된 피드 수', '잔여 비율'],
    datasets: [
      {
        data: [total, 100 - total],
        backgroundColor: ['#007bff', '#e0e0e0'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    cutout: '70%',
  };

  return (
    <Container>
      <Title>월별 피드 업로드 통계</Title>
      <Doughnut data={chartData} options={options} />
      <div style={{
        position: 'absolute',
        top: '52%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
      }}>
        {total}
      </div>
    </Container>
  );
};

export default FeedDonutChart;
