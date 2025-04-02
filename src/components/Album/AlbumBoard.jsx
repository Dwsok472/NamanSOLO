import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PhotoCard from "./PhotoCard";
import couple1 from "../img/couple1.png";
import couple2 from "../img/couple2.png";
import couple3 from "../img/couple3.png";
import couple4 from "../img/couple4.png";
import imo1 from "../img/imo1.png";
import imo2 from "../img/imo2.png";
import tape1 from '../img/tape1.png';
import tape2 from '../img/tape2.png';
import tape3 from '../img/tape3.png';
import tape4 from '../img/tape4.png';
import tape5 from '../img/tape5.png';
import tape6 from '../img/tape6.png';
import tape7 from '../img/tape7.png';
import back from '../img/back111.png';
import marker from '../img/marker.png';
import eraser from '../img/eraser.png';

const BoardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0;
  height: 860px;
  .marker{
    width: 40px;
    height: 40px;
    object-fit: cover;
    cursor: pointer;
  }
  .eraser{
    width: 40px;
    height: 40px;
    object-fit: cover;
    cursor: pointer;
  }
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
  grid-template-columns: repeat(6, 1fr); 
  grid-template-rows: repeat(2, 1fr);
  gap: 24px; /* 아이템 간 간격 */
  width: 105%;
  height: 100%;
  justify-items: center;
  align-items: center;

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


const pin = [tape1, tape2, tape3, tape4, tape5, tape6, tape7];
const AlbumBoard = () => {
  const [data, setData] = useState(null);  // 데이터 저장용
  const [loading, setLoading] = useState(true);  // 로딩 상태
  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태
  const itemsPerPage = 8;  // 한 페이지에 표시할 아이템 수

  // 데이터 로드 (임시용, 실제 API 사용 시 아래 주석 해제)
  useEffect(() => {
    setData([
      { id: 1, imgurl: [couple1, couple2, couple3, couple4], title: "첫 나들이" },
      { id: 2, imgurl: [couple2, couple1, couple3, couple4], title: "첫 데이트" },
      { id: 3, imgurl: [couple3, couple1, couple2, couple4], title: "평화로운 주말" },
      { id: 4, imgurl: [couple4, couple1, couple3, couple4], title: "행복한 먹방" },
      { id: 5, imgurl: [couple4, couple1, couple3, couple4], title: "행복한 먹방" },
      { id: 6, imgurl: [couple4, couple1, couple3, couple4], title: "행복한 먹방" },
      { id: 7, imgurl: [couple4, couple1, couple3, couple4], title: "행복한 먹방" },
      { id: 8, imgurl: [couple4, couple1, couple3, couple4], title: "행복한 먹방" },
      { id: 9, imgurl: [couple4, couple1, couple3, couple4], title: "행복한 먹방" },
      { id: 10, imgurl: [couple4, couple1, couple3, couple4], title: "행복한 먹방" }
    ]);
    setLoading(false);  // 데이터 로드 후 로딩 상태를 false로 변경
  }, []); // 최초 렌더링 시 데이터 불러오기

  const generateItems = () => {
    const items = [];
    if (data) {
      // 현재 페이지에서 마지막 아이템의 index 계산
      const indexOfLastItem = currentPage * itemsPerPage;
      //현재 페이지에서 첫번재 아이템의 index 계산
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      // 데이터 자르기
      const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

      currentItems.forEach((album, i) => {
        // 랜덤 회전 값
        const rotation = Math.floor(Math.random() * 41) - 20;
        // pinColor 배열에서 무작위로 선택
        const pinColor = pin[i % pin.length];
        // 수직 오프셋 값
        const offsetY = Math.floor(Math.random() * 61) - 30;
        // 랜덤 colSpan, rowSpan 값
        const colSpan = Math.floor(Math.random() * 1) + 1;  // 1~2
        const rowSpan = Math.floor(Math.random() * 3) + 1;  // 1~3

        items.push(
          <PhotoCard
            key={album.id}
            src={album.imgurl}  // 이미지 배열
            rotate={rotation}    // 회전 값
            pinColor={pinColor}  // pin 색상
            offsetY={offsetY}    // 수직 오프셋
            title={album.title}  // 제목
            colSpan={colSpan}    // colSpan 값
            rowSpan={rowSpan}    // rowSpan 값
          />
        );
      });
    }
    return items;
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    // 총 조회되는 data에서 8을 나눠서 총 페이지 수를 만듬(10/8 = 1인데 2로 올림(ceil))
    const totalPages = Math.ceil(data.length / itemsPerPage);
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };


  return (
    <BoardWrapper>
      <img src={marker} alt="marker" className="marker" onClick={handlePrevPage} />
      <BoardFrame>
        <BoardInner>
          <EmojiTopLeft src={imo2} alt="left emoji" />
          <EmojiBottomRight src={imo1} alt="right emoji" />
          <PhotoArea>
            {loading ? <p>LOADING...</p> : generateItems()}  {/* 로딩 중일 때 메시지 */}
          </PhotoArea>
        </BoardInner>
      </BoardFrame>
      <img src={eraser} alt="eraser" className="eraser" onClick={handleNextPage} />
    </BoardWrapper>
  );
};

export default AlbumBoard;