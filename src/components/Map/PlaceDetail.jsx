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
  justify-content: flex-start; 
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

const MapModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const MapModalContent = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  width: 95%;
  max-width: 1100px;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
`;


function PlaceDetail({ place, onEdit, onDelete, isAdmin }) {
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapCoords, setMapCoords] = useState(null);

  const handleShowMap = async () => {
    try {
      const { lat, lng } = await geocodeByAddress(place.address);
      setMapCoords({ lat, lng });
      setShowMapModal(true);
    } catch (error) {
      console.error('주소 변환 실패:', error);
      alert('주소를 찾을 수 없습니다.');
    }
  };

  return (
    <DetailWrapper>
      <Title>{place.name}</Title>

      <Address>{place.address}</Address>

      <Description>{place.description}</Description>

      {place.mediaUrl && place.mediaUrl.length > 0 && (
          <ImageWrapper>
        <ImageSlider images={place.mediaUrl.map((img) => img.mediaUrl)} />
        </ImageWrapper>
        )}

        {showMapModal && mapCoords && (
        <MapModalBackground onClick={() => setShowMapModal(false)}>
            <MapModalContent onClick={(e) => e.stopPropagation()}>
            <MapPicker
                initialAddress={place.address}
                initialLat={mapCoords.lat}
                initialLng={mapCoords.lng}
                onSelect={() => setShowMapModal(false)}
                onClose={() => setShowMapModal(false)}
            />
            <SmallButton onClick={() => setShowMapModal(false)}>닫기</SmallButton>
            </MapModalContent>
        </MapModalBackground>
        )}

      <ButtonGroup>
        <SmallButton onClick={handleShowMap}>
        지도 보기
        </SmallButton>


        {isAdmin && (
          <>
            <SmallButton onClick={onEdit}>수정</SmallButton>
            <SmallButton onClick={onDelete}>삭제</SmallButton>
          </>
        )}
      </ButtonGroup>
    </DetailWrapper>
  );
}

export default PlaceDetail;
