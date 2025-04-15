import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PhotoCard from './Album/PhotoCard';
import tape1 from './img/tape1.png';
import tape2 from './img/tape2.png';
import tape3 from './img/tape3.png';
import tape4 from './img/tape4.png';
import tape5 from './img/tape5.png';
import tape6 from './img/tape6.png';
import tape7 from './img/tape7.png';
import AlbumDetailModal from './Album/AlbumDetailModal';
import { useRef } from 'react';
import axios from 'axios';

import Top from './Album/Top';
import { Button as LeftButton } from './Album/LeftButton';
import { Button as RightButton } from './Album/RightButton';
import { useParams } from 'react-router-dom';

const pin = [tape1, tape2, tape3, tape4, tape5, tape6, tape7];
const UserAlbum = () => {
  const [data, setData] = useState([]); // 데이터 저장용
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 8; // 한 페이지에 표시할 아이템 수
  const [selectedAlbum, setSelectedAlbum] = useState(null); //선택된 앨범 저장소!
  const [showDetail, setShowDetail] = useState(false); // 모달 창 열림/닫힘 상태
  const [filter, setFilter] = useState('최신순'); // 필터용
  const [showAddAlbum, setShowAddAlbum] = useState(false);
  const itemsRef = useRef([]);
  const { username } = useParams();

  async function GetAlbumByUsername() {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;
    try {
      // 서버로 중복 확인 요청
      const response = await axios.get(
        `/api/album/username-visibility/${username}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response || response.length === 0) {
        console.log('앨범 데이터를 가져오지 못했습니다.');
        return;
      }
      setData(response.data);
      setLoading(false);
    } catch (error) {
      alert('정보를 불러오는 과장에서 에러가 발생하였습니다! ');
      throw error; // 에러 처리
    }
  }
  useEffect(() => {
    GetAlbumByUsername();
  }, []);

  // 필터링 및 정렬 로직
  const sortedData = [...data].sort((a, b) => {
    if (filter === '좋아요순') {
      return b.greats.length - a.greats.length;
    }
    if (filter === '댓글순') {
      return b.comments.length - a.comments.length;
    }
    return new Date(b.addDate) - new Date(a.addDate); // 기본 최신순
  });

  function handleSelectedAlbum(album) {
    setSelectedAlbum(album);
    setShowDetail(true); // 앨범 클릭 시 모달을 엽니다.
  }

  const toggleBack = () => {
    setShowDetail(false); // 모달을 닫는 함수
  };

  useEffect(() => {
    const handleClose = () => {
      setShowAddAlbum(false); // Footer에서 AddAlbum 닫기 요청 시 처리
    };

    window.addEventListener('closeAddAlbum', handleClose);
    return () => window.removeEventListener('closeAddAlbum', handleClose);
  }, []);

  useEffect(() => {
    itemsRef.current = []; // 페이지 변경 시 캐시된 아이템 초기화
  }, [currentPage, filter, showAddAlbum]); // currentPage가 변경될 때마다 실행

  // generateItems 함수에서 itemsRef를 사용하여 캐시된 아이템을 관리합니다.
  // const filteredData = sortedData.filter((album) => album.isPublic);
  const generateItems = () => {
    if (itemsRef.current.length === 0) {
      const items = [];
      if (sortedData) {
        // 현재 페이지에서 마지막 아이템의 index 계산
        const indexOfLastItem = currentPage * itemsPerPage;
        //현재 페이지에서 첫번째 아이템의 index 계산
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        // 정렬된 데이터 자르기
        const currentItems = sortedData.slice(
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
              src={album.url.map((media) => media.mediaUrl)} // 이미지 배열
              rotate={rotation} // 회전 값
              pinColor={pinColor} // pin 색상
              offsetY={offsetY} // 수직 오프셋
              title={album.title} // 제목
              colSpan={colSpan} // colSpan 값
              rowSpan={rowSpan} // rowSpan 값
              onClick={() => handleSelectedAlbum(album)} // 앨범 클릭 시 이벤트
            />
          );
          console.log(album.url); // 배열인가요?
          console.log(album.url.map((media) => media.mediaUrl)); // 여기 값이 정상?
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
        <MarkerWrapper>
          <LeftButton onClick={handlePrevPage} />
        </MarkerWrapper>

        <BoardInner>
          <PhotoArea>
            {loading ? <p>LOADING...</p> : generateItems()}{' '}
            {/* 로딩 중일 때 메시지 */}
          </PhotoArea>
        </BoardInner>

        <EraserWrapper>
          <RightButton onClick={handleNextPage} />
        </EraserWrapper>
      </BoardFrame>
      {showDetail && (
        <AlbumDetailModal albumData={selectedAlbum} onClose={toggleBack} />
      )}
    </BoardWrapper>
  );
};

export default UserAlbum;

const BoardWrapper = styled.div`
  padding-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  height: auto;
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
    stroke: #7b1e3c;
    fill: none;
    transition: all 0.3s ease;
  }

  &:hover svg {
    stroke: white;
    transform: rotate(90deg);
  }
`;

const MarkerWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  top: 2%;
  left: -260px;
`;

const EraserWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  top: 2%;
  right: -245px;
`;
