import React, { useState } from 'react';
import styled from 'styled-components';

const OuterWrapper = styled.div`
  width: 100%;
  max-width: 700px; 
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavButton = styled.button`
  background: #ffffff;
  color: #000000;
  border: none;
  padding: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  border-radius: 10%;
  cursor: pointer;
  z-index: 2;
  transition: background 0.2s;

  &:hover {
    background: #9c9b9b;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
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
    <OuterWrapper>
      {images.length > 1 && <NavButton onClick={showPrev}>이전</NavButton>}
      
      <ImageContainer>
        <Image src={images[currentIndex]} alt={`이미지 ${currentIndex + 1}`} />
      </ImageContainer>

      {images.length > 1 && <NavButton onClick={showNext}>다음</NavButton>}
    </OuterWrapper>
  );
}

export default ImageSlider;
