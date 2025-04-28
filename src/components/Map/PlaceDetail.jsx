import React, { useState } from 'react';
import styled from 'styled-components';
import ImageSlider from './ImageSlider';
import MapPicker from '../MapPicker/MapPicker';
import { geocodeByAddress } from './geocodeUtils';

const DetailWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

const Address = styled.div`
  font-size: 1.1rem;
  color: #555;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  text-align: center;
  max-width: 80%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const SmallButton = styled.button`
  background: #0c0c0c;
  color: #ffffff;
  border: none;
  padding: 6px 10px;
  font-size: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #333;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
`;

const MapWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
`;

const Section = styled.div`
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
`;


function PlaceDetail({ place, onEdit, onDelete, isAdmin }) {
  const [showMap, setShowMap] = useState(false);
  const [mapCoords, setMapCoords] = useState(null);

  const handleShowMap = async () => {
    try {
      const { lat, lng } = await geocodeByAddress(place.address);
      setMapCoords({ lat, lng });
      setShowMap((prev) => !prev); 
    } catch (error) {
      console.error('주소 변환 실패:', error);
      alert('주소를 찾을 수 없습니다.');
    }
  };

  return (
    <DetailWrapper>
       <Section>
        <Title>{place.name}</Title>
      </Section>

      <Section>
        <Address>{place.address}</Address>
      </Section>

        <Description>{place.description}</Description>

      {place.mediaUrl && place.mediaUrl.length > 0 && (
        <ImageWrapper>
          <ImageSlider images={place.mediaUrl.map((img) => img.mediaUrl)} />
        </ImageWrapper>
      )}

      <ButtonGroup>
        <SmallButton onClick={handleShowMap}>
          {showMap ? '지도 닫기' : '지도 보기'}
        </SmallButton>

        {isAdmin && (
          <>
            <SmallButton onClick={onEdit}>수정</SmallButton>
            <SmallButton onClick={onDelete}>삭제</SmallButton>
          </>
        )}
      </ButtonGroup>

      {showMap && mapCoords && (
        <MapWrapper>
          <MapPicker
            initialAddress={place.address}
            initialLat={mapCoords.lat}
            initialLng={mapCoords.lng}
            onSelect={() => {}}
            onClose={() => {}}
            hideSearch={true}
          />
        </MapWrapper>
      )}
    </DetailWrapper>
  );
}

export default PlaceDetail;
