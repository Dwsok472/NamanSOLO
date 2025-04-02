import React from "react";
import styled from "styled-components";
import PhotoCard from "./PhotoCard";
import couple1 from "../img/couple1.png";
import couple2 from "../img/couple2.png";
import couple3 from "../img/couple3.png";
import couple4 from "../img/couple4.png";
import couple5 from "../img/couple5.png";
import couple6 from "../img/couple6.png";
import back from "../img/back2.png";
import imo1 from "../img/imo1.png";
import imo2 from "../img/imo2.png";
import tape1 from '../img/tape1.png';
import tape2 from '../img/tape2.png';
import tape3 from '../img/tape3.png';
import tape4 from '../img/tape4.png';
import tape5 from '../img/tape5.png';
import tape6 from '../img/tape6.png';
import tape7 from '../img/tape7.png';
// import back6 from "../img/back6.png";

const BoardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0;
`;

const BoardFrame = styled.div`
  //background-image: url(${back});
  //background-size: cover;  /* 배경 이미지가 전체 영역을 덮도록 설정 */
 // background-position: center;  /* 이미지가 중앙에 오도록 설정 */
 // background-repeat: no-repeat; /* 배경 이미지가 반복되지 않도록 설정 */
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
  grid-template-columns: repeat(4, 1fr); //3개의 열로 배치
  grid-template-rows: 1fr 1fr; //2개의 행으로 배치 (위 3개, 아래 3개)
  gap: 24px; /* 아이템 간 간격 */
  width: 115%;
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
  bottom: 20px;
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
const rotations = [-8, -4, 0, 4, 8, 2];
const captions = ["커플1", "커플2", "커플3", "생각 중", "장난감과 함께", "귀여운 표정", "커플4", "커플5"];
const pin = [tape1, tape2, tape3, tape4, tape5, tape6, tape7];


const AlbumBoard = () => {
  const generateItems = () => {
    const items = [];
    // 아이템을 배치할 그리드의 크기 설정 (예: 5x5 그리드)
    const gridSize = 5;
    for (let i = 0; i < imageList.length; i++) {
      // 아이템의 colSpan, rowSpan은 3~5 중 무작위로
      const colSpan = Math.floor(Math.random() * 3) + 3;
      const rowSpan = Math.floor(Math.random() * 3) + 3;
      const rotation = rotations[i % rotations.length];
      // pinColor 배열에서 무작위로 선택
      const pinColor = pin[i % pin.length];
      const offsetY = Math.floor(Math.random() * 151) - 80;
      const caption = captions[i]; // caption 값
      // 아이템의 위치 설정 (0~gridSize - colSpan, 0~gridSize - rowSpan 범위 내에서 무작위로)
      const colStart = Math.floor(Math.random() * (gridSize - colSpan + 1));
      const rowStart = Math.floor(Math.random() * (gridSize - rowSpan + 1));
      items.push(
        <PhotoCard
          key={i}
          src={imageList[i]}  // 해당 이미지
          colSpan={colSpan}   // colSpan
          rowSpan={rowSpan}   // rowSpan
          rotate={rotation} // 회전 값
          pinColor={pinColor}
          offsetY={offsetY}   // 수직 오프셋
          caption={caption}   // 캡션
          colStart={colStart} // 그리드에서 시작하는 열
          rowStart={rowStart} // 그리드에서 시작하는 행
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
