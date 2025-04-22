import React from 'react';
import styled from 'styled-components';
import koreaMap from '../img/map1.png';
import krMap from '../img/map3.png';
import picker from '../img/place.png';

const MapWrapper = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  justify-content: center;
`;

const MapImage = styled.img`
  width: 750px;
  height: auto;
  object-fit: contain;
  margin-left: -7.1%;
`;

const RegionLabel = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 3;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  cursor: pointer;
  pointer-events: auto;
  font-weight: 700;
  .picker {
    width: 40px;
    height: 40px;
    object-fit: cover;
    &:hover {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
  }
  .tooltip {
    position: absolute;
    bottom: 100%; /* picker 위에 */
    left: 50%;
    transform: translateX(-50%);
    background: rgba(77, 77, 77, 0.9);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.7rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover .tooltip {
    opacity: 1;
  }
`;

const regions = [
  { name: '인천,서울,경기', top: 15, left: 38 },
  { name: '강원도', top: 15, left: 55 },
  { name: '충청남도', top: 40, left: 35 },
  { name: '충청북도', top: 34, left: 45 },
  { name: '전라북도', top: 50, left: 38 },
  { name: '전라남도', top: 63, left: 38 },
  { name: '경상북도', top: 45, left: 58 },
  { name: '경상남도', top: 58, left: 51 },
  { name: '제주도', top: 91, left: 30 },
];

function ImageMapMapPart({ onRegionClick }) {
  return (
    <MapWrapper>
      <MapImage src={krMap} alt="지도" />
      {regions.map((region) => (
        <RegionLabel
          key={region.name}
          style={{ top: `${region.top}%`, left: `${region.left}%` }}
          onClick={() => onRegionClick(region.name)}
        >
          <img src={picker} alt="picker" className="picker" />
          <div className="tooltip">{region.name}</div>
        </RegionLabel>
      ))}
    </MapWrapper>
  );
}

export default ImageMapMapPart;
