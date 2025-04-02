import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  width: 230px;
  height: 270px;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transform: ${({ rotate, offsetY }) => `rotate(${rotate}deg) translateY(${offsetY}px)`}; /* rotate와 translateY 적용 */
  transition: transform 0.3s;
  position: relative;
  text-align: center;
  grid-column: span ${(props) => props.colSpan};
  grid-row: span ${(props) => props.rowSpan};
`;

const Pin = styled.div`
  font-size: 20px;
  position: absolute;
  top: -14px;
  left: 0;
  transform: translateX(-50%) rotate(45deg);
  .pin{
    object-fit: cover;
    width: 40px;
    height: 40px;
  }
`;

const Image = styled.img`
  width: 210px;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  pointer-events: none;
`;

const Caption = styled.div`
  margin-top: 12px;
  font-size: 20px;
  font-weight: bold;
  color: #555;
`;

const PhotoCard = ({ src, rotate = 0, offsetY = 0, pinColor = '', caption = "", colSpan, rowSpan }) => {
  return (
    <CardWrapper rotate={rotate} offsetY={offsetY} colSpan={colSpan} rowSpan={rowSpan}>
      <Pin ><img src={pinColor} className="pin" /></Pin>
      <Image src={src} alt="album" />
      {caption && <Caption>{caption}</Caption>}
    </CardWrapper>
  );
};

export default PhotoCard;
