import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PhotoCard from "./PhotoCard";
import couple1 from "../img/couple1.png";
import couple2 from "../img/couple2.png";
import couple3 from "../img/couple3.png";
import couple4 from "../img/couple4.jpg";
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
import RightBox from "./RightBox";
import { useNavigate } from "react-router-dom";
import AddAlbum from "./AddAlbum";
import Top from "./Top";

const BoardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  height: 860px;
  /* background: linear-gradient(to bottom, #940e19, #ffe3e3); */
  /* background: linear-gradient(to bottom, #7b1e3c, #ffe3e3); */
  background: linear-gradient(to bottom, #b85c79, #fdecec);
`;

const BoardFrame = styled.div`
  border-radius: 16px;
  width: 75%;
  max-width: 1900px;
  min-height: 750px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .marker{
    width: 40px;
    height: 40px;
    object-fit: cover;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: -30px;
  }
  .eraser{
    width: 40px;
    height: 40px;
    object-fit: cover;
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: -30px;
  }
`;

const PhotoArea = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); 
  grid-template-rows: repeat(2, 1fr);
  gap: 24px; /* 아이템 간 간격 */
  width: 70%;
  height: 100%;
  justify-content: center;
  align-items: center;
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

const AddButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 1rem;
  border-radius: 15px;
  background-color: #ff7a7a;
  color: white;
  &:hover{
    font-weight: 700;
  }
`


const pin = [tape1, tape2, tape3, tape4, tape5, tape6, tape7];
const AlbumBoard = () => {
  const [data, setData] = useState(null);  // 데이터 저장용
  const [loading, setLoading] = useState(true);  // 로딩 상태
  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태
  const itemsPerPage = 8;  // 한 페이지에 표시할 아이템 수
  const [selectedAlbum, setSelectedAlbum] = useState(null); //선택된 앨범 저장소!


  // 데이터 로드 (임시용, 실제 API 사용 시 아래 주석 해제)
  useEffect(() => {
    setData([
      { id: 1, imgurl: [couple1, couple2, couple3, couple4], title: "첫 나들이", date: "2025-01-01", username: "user1", tag: ["맛집", "행복"] },
      { id: 2, imgurl: [couple2, couple1, couple3, couple4], title: "첫 데이트", date: "2025-01-01", username: "user2", tag: ["사랑", "싸움"] },
      { id: 3, imgurl: [couple3, couple1, couple2, couple4], title: "평화로운 주말", date: "2025-01-01", username: "user3", tag: ["힐링", "후회"] },
      { id: 4, imgurl: [couple4, couple1, couple3, couple4], title: "사랑과 전쟁", date: "2025-01-01", username: "user4", tag: ["기타", "등등"] },
      { id: 5, imgurl: [couple4, couple1, couple3, couple4], title: "왜 너는 나를 만나서", date: "2025-01-01", username: "user5", tag: ["맛집", "행복"] },
      { id: 6, imgurl: [couple4, couple1, couple3, couple4], title: "나를 아프게 하니", date: "2025-01-01", username: "user6", tag: ["맛집", "행복"] },
      { id: 7, imgurl: [couple4, couple1, couple3, couple4], title: "나만 솔로", date: "2025-01-01", username: "user7", tag: ["맛집", "행복"] },
      { id: 8, imgurl: [couple4, couple1, couple3, couple4], title: "응 너만 솔로", date: "2025-01-01", username: "user8", tag: ["맛집", "행복"] },
      { id: 9, imgurl: [couple4, couple1, couple3, couple4], title: "하핫", date: "2025-01-01", username: "user9", tag: ["맛집", "행복"] },
      { id: 10, imgurl: [couple4, couple1, couple3, couple4], title: "자고 싶다", date: "2025-01-01", username: "user10", tag: ["맛집", "행복"] }
    ]);
    setLoading(false);  // 데이터 로드 후 로딩 상태를 false로 변경
  }, []); // 최초 렌더링 시 데이터 불러오기

  function handleSelectedAlbum(album) {
    setSelectedAlbum(album);
  }

  console.log(selectedAlbum);
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
            onClick={() => handleSelectedAlbum(album)}
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
      <Top />
      <BoardFrame>
        <img src={marker} alt="marker" className="marker" onClick={handlePrevPage} />
        <BoardInner>
          {/* <EmojiTopLeft src={imo2} alt="left emoji" />
          <EmojiBottomRight src={imo1} alt="right emoji" /> */}
          <PhotoArea>
            {loading ? <p>LOADING...</p> : generateItems()}  {/* 로딩 중일 때 메시지 */}
          </PhotoArea>
        </BoardInner>
        <img src={eraser} alt="eraser" className="eraser" onClick={handleNextPage} />
        {/* <AddButton>앨범 추가하기</AddButton> */}
      </BoardFrame>
      <RightBox albumData={selectedAlbum} />
    </BoardWrapper>
  );
};

export default AlbumBoard;



// async function getAllAlbum() {
//   try {
//     let response = await GetAllAlbum();
//     if (!response || response.length === 0) {
//       console.log('데이터를 가져오지 못했습니다.');
//       return;
//     }
//     console.log(response);
//     setData(response);
//      setLoading(false);
//   } catch (error) {
//     console.log(error);
//     alert('네트워크 오류로 정상적인 동작이 안되고 있습니다');
//   }
// }

// useEffect(() => {
//   getAllAlbum();
// }, [])