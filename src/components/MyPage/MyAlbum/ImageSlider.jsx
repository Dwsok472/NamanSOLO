import React, { useState } from 'react';
import styled from 'styled-components';
import leftkey from '../../img/leftkey.png';
import rightkey from '../../img/rightkey.png';

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const NavButton = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;

  ${(props) => props.left && `left: 10px;`}
  ${(props) => props.right && `right: 10px;`}
`;

function ImageSlider({ imgurl = [] }) {
  const [index, setIndex] = useState(0);

  if (!Array.isArray(imgurl) || imgurl.length === 0) return null;

  const prev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : imgurl.length - 1));
  };

  const next = () => {
    setIndex((prev) => (prev < imgurl.length - 1 ? prev + 1 : 0));
  };

  return (
    <SliderWrapper>
      <NavButton src={leftkey} alt="left" onClick={prev} left />
      <Image src={imgurl[index]} alt={`slide-${index}`} />
      <NavButton src={rightkey} alt="right" onClick={next} right />
    </SliderWrapper>
  );
}

export default ImageSlider;