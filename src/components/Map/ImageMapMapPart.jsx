import React from 'react';
import styled from 'styled-components';
import koreaMap from '../img/map1.png';

const MapWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: auto;
  position: relative;
`;

const MapImage = styled.img`
  width: 110%;
  height: auto;
  object-fit: contain;
`;

const RegionLabel = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 3;
  background: rgba(255,255,255,0.8);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  cursor: pointer;
  pointer-events: auto;
  font-weight: 700;
  &:hover {
    background: #32eb1ac5;
    color: white;
  }
`;

const regions = [
  { name: '서울/경기', top: 35, left: 39 },
  { name: '강원도', top: 35, left: 56 },
  { name: '충청남도', top: 52, left: 40 },
  { name: '전라남도', top: 77, left: 40 },
  { name: '경상남도', top: 70, left: 54 },
  { name: '제주도', top: 91, left: 38 },
  { name: '충청북도', top: 50, left: 49 },
  { name: '전라북도', top: 65, left: 42 },
  { name: '경상북도', top: 55, left: 60 },
];

function ImageMapMapPart({ onRegionClick }) {
  return (
    <MapWrapper>
      <MapImage src={koreaMap} alt="지도" />
      {regions.map((region) => (
        <RegionLabel
          key={region.name}
          style={{ top: `${region.top}%`, left: `${region.left}%` }}
          onClick={() => onRegionClick(region.name)}
        >
          {region.name}
        </RegionLabel>
      ))}
    </MapWrapper>
  );
}

export default ImageMapMapPart;
