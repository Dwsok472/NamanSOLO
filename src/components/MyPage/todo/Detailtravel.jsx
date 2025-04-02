import React, { useState } from 'react';
import styled from 'styled-components';
import { IconClose, IconEdit } from '../../Icons';
import LeftKey from '../../img/leftkey.png';
import RightKey from '../../img/rightkey.png';

const CardWrap = styled.div`
  width: 500px;
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 50px;
  border: 1px solid #3333;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Top = styled.div`
  height: 60px;
  background-color: #ffdcd6;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const IconWrap = styled.div`
  position: absolute;
  top: 12px;
  right: ${(props) => props.$right || '20px'};
  cursor: pointer;

  svg {
    width: 15px;
    height: 15px;
  }
`;

const ImagePreviewContainer = styled.div`
  width: 100%;
  height: 220px;
  background-color: #f8f8f8;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  z-index: 5;

  img {
    width: 16px;
    height: 16px;
  }
`;

const NextButton = styled(PrevButton)`
  left: auto;
  right: 10px;
`;

const Bottom = styled.div`
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ColorSection = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 6px;
  width: fit-content;
`;

const SelectedColorPreview = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${(props) => props.color || '#eee'};
  border: 2px solid #ccc;
`;

const Info = styled.div`
  font-size: 1rem;
  word-break: break-all;
`;

function DetailTravel({ event, onClose, onEdit }) {
  if (!event) return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = event.images || [];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const currentImage = images[currentImageIndex];

  return (
    <CardWrap>
      <Card>
        <Top>
          <IconWrap $right="50px" onClick={onEdit}>
            <IconEdit />
          </IconWrap>
          <IconWrap onClick={onClose}>
            <IconClose />
          </IconWrap>
          여행 일정
        </Top>

        {currentImage && (
          <ImagePreviewContainer>
            <PreviewImage
              src={
                currentImage instanceof File
                  ? URL.createObjectURL(currentImage)
                  : currentImage
              }
              alt="대표 이미지"
            />
            {images.length > 1 && (
              <>
                <PrevButton onClick={handlePrevImage}>
                  <img src={LeftKey} alt="이전" />
                </PrevButton>
                <NextButton onClick={handleNextImage}>
                  <img src={RightKey} alt="다음" />
                </NextButton>
              </>
            )}
          </ImagePreviewContainer>
        )}

        <Bottom>
          <Info><strong>{event.title}</strong></Info>
          <Info>{event.startDate} ~ {event.endDate}</Info>
          <ColorSection>
            <SelectedColorPreview color={event.color} />
          </ColorSection>
        </Bottom>
      </Card>
    </CardWrap>
  );
}

export default DetailTravel;
