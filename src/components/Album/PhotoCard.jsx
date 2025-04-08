import React, { useState } from "react";
import styled from "styled-components";
import leftkey from "../img/leftkey.png";
import rightkey from "../img/rightkey.png";
import StarButton from "./StarButton";


const CardWrapper = styled.div`
  width: ${({ columns }) => (columns === 3 ? "500px" : "280px")};
  height: ${({ columns }) => (columns === 3 ? "500px" : "300px")};
  padding: 10px;
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  transform: ${({ rotate, offsetY }) =>
    `rotate(${rotate}deg) translateY(${offsetY}px)`}; /* rotate와 translateY 적용 */
  transition: transform 0.3s;
  position: relative;
  text-align: center;
  grid-column: span ${(props) => props.colSpan};
  grid-row: span ${(props) => props.rowSpan};
  position: relative;
  .leftkey {
    object-fit: cover;
    width: 20px;
    height: 20px;
    position: absolute;
    left: 10px;
    top: 40%;
    opacity: 0.3;
  }
  .rightkey {
    object-fit: cover;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
    top: 40%;
    opacity: 0.3;
  }
`;

const Pin = styled.div`
  font-size: 20px;
  position: absolute;
  top: -14px;
  left: 0;
  transform: translateX(-50%) rotate(45deg);
  .pin {
    object-fit: cover;
    width: 40px;
    height: 40px;
  }
`;

const Image = styled.img`
  width: ${({ columns }) => (columns === 3 ? "430px" : "250px")};
  height: ${({ columns }) => (columns === 3 ? "430px" : "230px")};
  object-fit: cover;
  pointer-events: none;
`;

const Caption = styled.div`
  margin-top: 12px;
  font-size: 20px;
  font-weight: bold;
  color: #555;
`;

const StarButtonWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
`;

const PhotoCard = ({
  src,
  rotate = 0,
  offsetY = 0,
  pinColor = "",
  title = "",
  colSpan,
  rowSpan,
  onClick,
  draggable,
  onDragStart,
  columns,
}) => {
  const [imageIndex, setImageIndex] = useState(0);

  // 이미지 변경 함수 (왼쪽 화살표 클릭 시)
  const prevImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : src.length - 1
    );
  };

  // 이미지 변경 함수 (오른쪽 화살표 클릭 시)
  const nextImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex < src.length - 1 ? prevIndex + 1 : 0
    );
  };
  // imgurl이 배열인지, 비어있지 않은지 확인
  // if (!src || !Array.isArray(src) || src.length === 0) {
  //   return <p>이미지가 없습니다.</p>;  // src가 없거나 배열이 아닐 때, 또는 비어있을 때 대체 UI
  // }
  const currentImg = src?.[imageIndex];
  const multipleImages = src?.length > 1;

  return (
    <CardWrapper
      rotate={rotate}
      offsetY={offsetY}
      colSpan={colSpan}
      rowSpan={rowSpan}
      onClick={onClick}
      draggable={draggable}
      onDragStart={(e) => {
        e.stopPropagation(); // 드래그 시 클릭 이벤트 방지
        if (onDragStart) onDragStart(e);
      }}
      columns={columns}
    >

      {multipleImages && (
        <img
          src={leftkey}
          alt="leftkey"
          className="leftkey"
          onClick={prevImage}
        />
      )}

      {currentImg && <Image src={currentImg} alt="album" columns={columns} />}

      {multipleImages && (
        <img
          src={rightkey}
          alt="rightkey"
          className="rightkey"
          onClick={nextImage}
        />
      )}

      {title && <Caption>{title}</Caption>}
    </CardWrapper>
  );
};

export default PhotoCard;
