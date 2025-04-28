import React, { useState } from 'react';
import styled from 'styled-components';

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 10px;
`;

const NavButton = styled.button`
  background: #0c0c0c;
  color: #ffffff;
  border: none;
  padding: 6px 10px;
  font-size: 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #333;
  }
`;

function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <SliderWrapper>
      <Image src={images[currentIndex]} alt={`이미지 ${currentIndex + 1}`} />

      {images.length > 1 && (
        <ButtonGroup>
          <NavButton onClick={showPrev}>← 이전</NavButton>
          <NavButton onClick={showNext}>다음 →</NavButton>
        </ButtonGroup>
      )}
    </SliderWrapper>
  );
}

export default ImageSlider;
