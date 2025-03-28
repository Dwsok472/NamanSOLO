import React from 'react';
import styled from 'styled-components';
import koreaMap from '../components/img/map1.jpg'; 

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

const MapImage = styled.img`
  width: 100%;
  display: block;
`;

const RegionMarker = styled.div`
  position: absolute;
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  transform: translate(-50%, -100%);
  width: 18px;
  height: 18px;
  background-color: #ff7b94;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
  transition: transform 0.2s ease;

  &:hover {
    transform: translate(-50%, -110%) scale(1.2);
  }

  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    top: -28px;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    color: #333;
    font-size: 0.75rem;
    padding: 5px 8px;
    border-radius: 5px;
    white-space: nowrap;
    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  }
`;

const ImageMap = () => {
  const regions = [
    { name: '서울/경기', top: 18, left: 30, tooltip: '한강, 남산타워' },
    { name: '강원도', top: 20, left: 70, tooltip: '설악산, 속초해변' },
    { name: '충청도', top: 40, left: 27, tooltip: '보령해수욕장' },
    { name: '전라도', top: 72, left: 20, tooltip: '순천만, 담양' },
    { name: '경상도', top: 60, left: 67, tooltip: '해운대, 경주' },
    { name: '제주도', top: 92, left: 40, tooltip: '협재, 한라산' },
  ];

  return (
    <MapWrapper>
      <MapImage src={koreaMap} alt="한국 일러스트 지도" />
      {regions.map((region, i) => (
        <RegionMarker
          key={i}
          $top={region.top}
          $left={region.left}
          data-tooltip={region.tooltip}
          title={region.name}
          onClick={() => alert(`${region.name} 클릭됨`)}
        />
      ))}
    </MapWrapper>
  );
};

export default ImageMap;
