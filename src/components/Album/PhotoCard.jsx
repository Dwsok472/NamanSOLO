import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AddAlbum, GetAlbumById, GetAllAlbum } from "../api";
import couple1 from '../img/couple1.png';
import couple2 from '../img/couple2.png';
import couple3 from '../img/couple3.png';
import couple4 from '../img/couple4.png';

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

const PhotoCard = ({ src, rotate = 0, offsetY = 0, pinColor = '', title = "", colSpan, rowSpan }) => {

  return (
    <CardWrapper rotate={rotate} offsetY={offsetY} colSpan={colSpan} rowSpan={rowSpan}>
      <Pin><img src={pinColor} className="pin" /></Pin>
      <Image src={src} alt="album" />
      {title && <Caption>{title}</Caption>}
    </CardWrapper>
  );
};

export default PhotoCard;
