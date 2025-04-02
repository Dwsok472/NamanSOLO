import React from "react";
import styled from "styled-components";
import PhotoCard from "./PhotoCard";
import couple1 from "../img/couple1.png";
import couple2 from "../img/couple2.png";
import couple3 from "../img/couple3.png";
import couple4 from "../img/couple4.png";
import couple5 from "../img/couple5.png";
import couple6 from "../img/couple6.png";

import imo1 from "../img/imo1.png";
import imo2 from "../img/imo2.png";
import tape1 from '../img/tape1.png';
import tape2 from '../img/tape2.png';
import tape3 from '../img/tape3.png';
import tape4 from '../img/tape4.png';
import tape5 from '../img/tape5.png';
import tape6 from '../img/tape6.png';
import tape7 from '../img/tape7.png';
import back from '../img/back111.png'

const BoardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0;
`;

const BoardFrame = styled.div`
background-image: url(${back}); /* back2.jpg 이미지 적용 */
  background-size: cover;  /* 배경 이미지가 전체 영역을 덮도록 설정 */
  background-position: center;  /* 이미지가 중앙에 오도록 설정 */
  background-repeat: no-repeat; /* 배경 이미지가 반복되지 않도록 설정 */
  border: 20px solid #deb887;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  width: 75%;
  max-width: 1900px;
  min-height: 750px;
  /* padding 제거 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhotoArea = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); //3개의 열로 배치
  grid-template-rows: repeat(2, 1fr); //2개의 행으로 배치 (위 3개, 아래 3개)
  gap: 24px; /* 아이템 간 간격 */
  width: 105%;
  height: 100%;
  justify-items: center; /* 아이템들을 중앙 정렬 */
  align-items: center; /* 아이템들을 중앙 정렬 */

`;

const EmojiTopLeft = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 180px;
  height: auto;
  pointer-events: none;
`;

const EmojiBottomRight = styled.img`
  position: absolute;
  top: 0px;
  right: 20px;
  width: 200px;
  height: auto;
  pointer-events: none;
  filter: brightness(0) invert(40%) sepia(90%) saturate(800%) hue-rotate(20deg);
`;

const BoardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 40px;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const imageList = [couple1, couple2, couple3, couple4, couple5, couple6, couple1, couple2];
const captions = ["커플1", "커플2", "커플3", "생각 중", "장난감과 함께", "귀여운 표정", "커플4", "커플5"];
const pin = [tape1, tape2, tape3, tape4, tape5, tape6, tape7];
const AlbumBoard = () => {
  const generateItems = () => {
    const items = [];
    for (let i = 0; i < imageList.length; i++) {
      // 랜덤 회전
      const rotation = Math.floor(Math.random() * 41) - 20;
      // pinColor 배열에서 무작위로 선택
      const pinColor = pin[i % pin.length];
      const offsetY = Math.floor(Math.random() * 151) - 80;
      const caption = captions[i]; // caption 값

      // 랜덤 colSpan, rowSpan 값 (3~5 범위)
      const colSpan = Math.floor(Math.random() * 2);
      const rowSpan = Math.floor(Math.random() * 4);
      items.push(
        <PhotoCard
          key={i}
          src={imageList[i]}  // 해당 이미지
          rotate={rotation} // 회전 값
          pinColor={pinColor}
          offsetY={offsetY}   // 수직 오프셋
          caption={caption}   // 캡션
          colSpan={colSpan}   // colSpan 값
          rowSpan={rowSpan}   // rowSpan 값
        />
      );
    }
    return items;
  };


  return (
    <BoardWrapper>
      <BoardFrame>
        <BoardInner>
          <EmojiTopLeft src={imo2} alt="left emoji" />
          <EmojiBottomRight src={imo1} alt="right emoji" />
          <PhotoArea>
            {generateItems()}
          </PhotoArea>
        </BoardInner>
      </BoardFrame>
    </BoardWrapper>
  );
};


export default AlbumBoard;
