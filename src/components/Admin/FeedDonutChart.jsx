import React from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// ✅ Chart.js 모듈 등록
ChartJS.register(ArcElement, Tooltip, Legend);

// ✅ 스타일 컴포넌트
const Container = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 100%;
  height: 240px;
  position: relative; // 중앙 텍스트 위치 위해
`;

const Title = styled.h3`
  font-size: 1rem;
  margin-bottom: 12px;
`;

// ✅ 차트 컴포넌트
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
    maintainAspectRatio: false, // ✅ 고정 크기 방지
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
