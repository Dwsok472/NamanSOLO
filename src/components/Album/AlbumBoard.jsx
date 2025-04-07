import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PhotoCard from "./PhotoCard";
import couple1 from "../img/couple1.png";
import couple2 from "../img/couple2.png";
import couple3 from "../img/couple3.png";
import couple4 from "../img/couple4.jpg";
import tape1 from "../img/tape1.png";
import tape2 from "../img/tape2.png";
import tape3 from "../img/tape3.png";
import tape4 from "../img/tape4.png";
import tape5 from "../img/tape5.png";
import tape6 from "../img/tape6.png";
import tape7 from "../img/tape7.png";

import marker from "../img/arrow-left.png";
import eraser from "../img/arrow-right.png";
import AlbumDetailModal from "./AlbumDetailModal";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import plus from "../img/plus.png";

import Top from "./Top";
import AddAlbum from "./AddAlbum";

const BoardWrapper = styled.div`
  padding-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  height: auto;
  /* background: linear-gradient(to bottom, #940e19, #ffe3e3); */
  /* background: linear-gradient(to bottom, #7b1e3c, #ffe3e3); */
  background: linear-gradient(to bottom, #b85c79, #fdecec);
`;

const BoardFrame = styled.div`
  border-radius: 16px;
  width: 70%;
  max-width: 1900px;
  min-height: 750px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .marker {
    width: 40px;
    height: 40px;
    object-fit: cover;
    cursor: pointer;
    position: absolute;
    top: 2%;
    left: -150px;
  }
  .eraser {
    width: 40px;
    height: 40px;
    object-fit: cover;
    cursor: pointer;
    position: absolute;
    top: 2%;
    right: -150px;
  }
`;

const PhotoArea = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 24px; /* 아이템 간 간격 */
  width: 70%;
  height: 750px;
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
  position: fixed;
  bottom: 210px;
  right: 19px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;

  svg {
    width: 60px;
    height: 60px;
    stroke: #571e1e;
    fill: none;
    transition: all 0.3s ease;
  }

  &:hover svg {
    stroke: white;
    transform: rotate(90deg);
  }
`;

const pin = [tape1, tape2, tape3, tape4, tape5, tape6, tape7];
const AlbumBoard = () => {
  const [data, setData] = useState([]); // 데이터 저장용
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 8; // 한 페이지에 표시할 아이템 수
  const [selectedAlbum, setSelectedAlbum] = useState(null); //선택된 앨범 저장소!
  const [showDetail, setShowDetail] = useState(false); // 모달 창 열림/닫힘 상태
  const [filter, setFilter] = useState("최신순"); // 필터용
  const [showAddAlbum, setShowAddAlbum] = useState(false);
  const itemsRef = useRef([]);

  // 새 앨범을 추가하는 함수
  const addNewAlbum = (newAlbum) => {
    setData((prevData) => [newAlbum, ...prevData]);
  };

  // 데이터 로드 (임시용, 실제 API 사용 시 아래 주석 해제)
  useEffect(() => {
    setData([
      {
        id: 1,
        imgurl: [couple1, couple2, couple3, couple4],
        title: "첫 나들이",
        date: "2025-01-01",
        username: "user1",
        location: "대전 둔산로 221",
        tag: ["맛집", "행복"],
        likes: ["user1", "user3"],
        comments: [
          {
            id: 1,
            albumId: 1,
            text: "행복해 보이세요",
            username: "user1",
            date: "2025-01-01",
          },
        ],
        isPublic: true,
      },
      {
        id: 2,
        imgurl: [couple2, couple1, couple3, couple4],
        title: "첫 데이트",
        date: "2025-01-04",
        username: "user2",
        location: "대전 둔산로 221",
        tag: ["사랑", "싸움"],
        likes: ["user4", "user3", "user5"],
        comments: [
          {
            id: 2,
            albumId: 2,
            text: "어디로 놀러가신건가요 ?",
            username: "user2",
            date: "2025-01-02",
          },
          {
            id: 3,
            albumId: 2,
            text: "부럽네요",
            username: "user3",
            date: "2025-01-03",
          },
          {
            id: 4,
            albumId: 2,
            text: "저도 가고싶네요",
            username: "user4",
            date: "2025-01-04",
          },
        ],
        isPublic: true,
      },
      {
        id: 3,
        imgurl: [couple3, couple1, couple2, couple4],
        title: "평화로운 주말",
        date: "2025-01-08",
        username: "user3",
        location: "대전 둔산로 221",
        tag: ["힐링", "후회"],
        likes: ["user1", "user5", "user6"],
        comments: [
          {
            id: 5,
            albumId: 3,
            text: "커플 프로필 찍으신건가요",
            username: "user5",
            date: "2025-01-05",
          },
        ],
        isPublic: false,
      },
      {
        id: 4,
        imgurl: [couple4, couple1, couple3, couple4],
        title: "사랑과 전쟁",
        date: "2025-01-12",
        username: "user4",
        location: "대전 둔산로 221",
        tag: ["기타", "등등"],
        likes: ["user1", "user3"],
        comments: [],
        isPublic: true,
      },
      {
        id: 5,
        imgurl: [couple4, couple1, couple3, couple4],
        title: "왜 너는 나를 만나서",
        date: "2025-01-02",
        username: "user5",
        location: "대전 둔산로 221",
        tag: ["맛집", "행복"],
        likes: ["user1", "user3"],
        comments: [],
        isPublic: true,
      },
      {
        id: 6,
        imgurl: [couple4, couple1, couple3, couple4],
        title: "나를 아프게 하니",
        date: "2025-01-05",
        username: "user6",
        location: "대전 둔산로 221",
        tag: ["맛집", "행복"],
        likes: ["user1", "user3"],
        comments: [
          {
            id: 6,
            albumId: 6,
            text: "행복해 보이세요",
            username: "user5",
            date: "2025-01-05",
          },
        ],
        isPublic: false,
      },
      {
        id: 7,
        imgurl: [couple4, couple1, couple3, couple4],
        title: "나만 솔로",
        date: "2025-01-06",
        username: "user7",
        location: "대전 둔산로 221",
        tag: ["맛집", "행복"],
        likes: ["user1", "user3"],
        comments: [],
        isPublic: true,
      },
      {
        id: 8,
        imgurl: [couple4, couple1, couple3, couple4],
        title: "응 너만 솔로",
        date: "2025-01-01",
        username: "user8",
        location: "대전 둔산로 221",
        tag: ["맛집", "행복"],
        likes: ["user2", "user3"],
        comments: [
          {
            id: 7,
            albumId: 8,
            text: "어디로 놀러가신건가요",
            username: "user5",
            date: "2025-01-05",
          },
        ],
        isPublic: false,
      },
      {
        id: 9,
        imgurl: [couple4, couple1, couple3, couple4],
        title: "하핫",
        date: "2025-01-13",
        username: "user9",
        location: "대전 둔산로 221",
        tag: ["맛집", "행복"],
        likes: ["user2", "user3"],
        comments: [],
        isPublic: true,
      },
      {
        id: 10,
        imgurl: [couple4, couple1, couple3, couple4],
        title: "자고 싶다",
        date: "2025-01-03",
        username: "user10",
        location: "대전 둔산로 221",
        tag: ["맛집", "행복"],
        likes: ["user2", "user3"],
        comments: [],
        isPublic: true,
      },
    ]);
    setLoading(false); // 데이터 로드 후 로딩 상태를 false로 변경
  }, []); // 최초 렌더링 시 데이터 불러오기

  // 필터링 및 정렬 로직
  const sortedData = [...data].sort((a, b) => {
    if (filter === "좋아요순") {
      return b.likes.length - a.likes.length;
    }
    if (filter === "댓글순") {
      return b.comments.length - a.comments.length;
    }
    if (filter === "최신순") {
      return new Date(b.date) - new Date(a.date);
    }
  });

  function handleSelectedAlbum(album) {
    setSelectedAlbum(album);
    setShowDetail(true); // 앨범 클릭 시 모달을 엽니다.
  }

  const toggleBack = () => {
    setShowDetail(false); // 모달을 닫는 함수
  };
  const handleOpenAddAlbum = () => {
    setShowAddAlbum(true); // AddAlbum 모달 열기
  };
  const handleCloseAddAlbum = () => {
    setShowAddAlbum(false); // AddAlbum 모달 닫기
  };

  useEffect(() => {
    itemsRef.current = []; // 페이지 변경 시 캐시된 아이템 초기화
  }, [currentPage, filter, showAddAlbum]); // currentPage가 변경될 때마다 실행

  // generateItems 함수에서 itemsRef를 사용하여 캐시된 아이템을 관리합니다.
  const filteredData = sortedData.filter((album) => album.isPublic);
  const generateItems = () => {
    if (itemsRef.current.length === 0) {
      const items = [];
      if (filteredData) {
        // 현재 페이지에서 마지막 아이템의 index 계산
        const indexOfLastItem = currentPage * itemsPerPage;
        //현재 페이지에서 첫번째 아이템의 index 계산
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        // 정렬된 데이터 자르기
        const currentItems = filteredData.slice(
          indexOfFirstItem,
          indexOfLastItem
        );

        currentItems.forEach((album, i) => {
          // 랜덤 회전 값
          const rotation = Math.floor(Math.random() * 41) - 20;
          // pinColor 배열에서 무작위로 선택
          const pinColor = pin[i % pin.length];
          // 수직 오프셋 값
          const offsetY = Math.floor(Math.random() * 30) - 14;
          // 랜덤 colSpan, rowSpan 값
          const colSpan = Math.floor(Math.random() * 1) + 1; // 1~2
          const rowSpan = Math.floor(Math.random() * 3) + 1; // 1~3

          items.push(
            <PhotoCard
              key={album.id}
              src={album.imgurl} // 이미지 배열
              rotate={rotation} // 회전 값
              pinColor={pinColor} // pin 색상
              offsetY={offsetY} // 수직 오프셋
              title={album.title} // 제목
              colSpan={colSpan} // colSpan 값
              rowSpan={rowSpan} // rowSpan 값
              onClick={() => handleSelectedAlbum(album)} // 앨범 클릭 시 이벤트
            />
          );
        });
      }
      itemsRef.current = items; // generateItems에서 생성한 아이템들을 useRef에 저장
    }
    return itemsRef.current; // 캐시된 아이템 반환
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    itemsRef.current = []; // 페이지 변경 시 캐시된 아이템 초기화
  };

  const handleNextPage = () => {
    // 총 조회되는 data에서 8을 나눠서 총 페이지 수를 만듬(10/8 = 1인데 2로 올림(ceil))
    const totalPages = Math.ceil(data.length / itemsPerPage);
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
    itemsRef.current = []; // 페이지 변경 시 캐시된 아이템 초기화
  };
  return (
    <BoardWrapper>
      <Top filter={filter} onFilterChange={setFilter} />
      <BoardFrame>
        <img
          src={marker}
          alt="marker"
          className="marker"
          onClick={handlePrevPage}
        />
        <BoardInner>
          <PhotoArea>
            {loading ? <p>LOADING...</p> : generateItems()}{" "}
            {/* 로딩 중일 때 메시지 */}
          </PhotoArea>
        </BoardInner>
        <img
          src={eraser}
          alt="eraser"
          className="eraser"
          onClick={handleNextPage}
        />

        <AddButton onClick={handleOpenAddAlbum} title="Add New">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              strokeWidth="1.5"
            />
            <path d="M8 12H16" strokeWidth="1.5" />
            <path d="M12 16V8" strokeWidth="1.5" />
          </svg>
        </AddButton>

        {showAddAlbum && (
          <AddAlbum onClose={handleCloseAddAlbum} onAddAlbum={addNewAlbum} />
        )}
      </BoardFrame>
      {showDetail && (
        <AlbumDetailModal albumData={selectedAlbum} onClose={toggleBack} />
      )}
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
