import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PhotoCard from '../../Album/PhotoCard';
import AlbumDetailModal from '../../Album/AlbumDetailModal';
import AddAlbum from '../../Album/AddAlbum';
import tape1 from '../../img/tape1.png';
import tape2 from '../../img/tape2.png';
import tape3 from '../../img/tape3.png';
import tape4 from '../../img/tape4.png';
import tape5 from '../../img/tape5.png';
import tape6 from '../../img/tape6.png';
import tape7 from '../../img/tape7.png';
import DeleteButton from './DeleteButton';
import { useUserStore } from '../../Login/Login';
import axios from 'axios';
import ModifyAlbumAndDetail from './ModifyAlbumAndDetail';

const pin = [tape1, tape2, tape3, tape4, tape5, tape6, tape7];
const MyAlbum = () => {
  const username = useUserStore((state) => state.user?.username); //현재 유저
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 앨범
  const [isModalOpen, setIsModalOpen] = useState(false); // 디테일 오픈
  const [sortOption, setSortOption] = useState('최신순'); // 옵션들
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 앨범 추가 열기
  const [editingPost, setEditingPost] = useState(null); // 수정할 데이터 값들
  const [draggedId, setDraggedId] = useState(null); // 드래그 값
  const [$columns, setColumns] = useState(5); // 기본값: 5개 보기
  const [isTrashDragOver, setIsTrashDragOver] = useState(false);
  const [myPosts, setMyPosts] = useState([]); // 나의 포스트들~~
  // 내 앨범 가지고 오기!!!!!
  async function GetMyAlbum() {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) {
      return;
    }
    try {
      // 서버로 중복 확인 요청
      const response = await axios.get(`/api/album/username/${username}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response || response.length === 0) {
        console.log('앨범 데이터를 가져오지 못했습니다.');
        return;
      }
      setMyPosts(response.data);
    } catch (error) {
      alert('정보를 불러오는 과장에서 에러가 발생하였습니다! ');
      throw error; // 에러 처리
    }
  }
  useEffect(() => {
    GetMyAlbum();
  }, []);

  //앨범 추가 시 , 내 기존 앨범에서 추가된 앨범을 앞에다가 넣기!!!
  const handleAddAlbum = (newAlbum) => {
    setMyPosts((prev) => [newAlbum, ...prev]);
  };

  // 필터링 및 정렬 로직
  const filteredData = [...myPosts].sort((a, b) => {
    if (sortOption === '좋아요순') return b.greats.length - a.greats.length;
    if (sortOption === '댓글순') return b.comments.length - a.comments.length;
    return new Date(b.addDate) - new Date(a.addDate); // 기본 최신순
  });
  console.log(filteredData);
  //내 앨범 클릭 시, 디테일 창 보이게
  const handleCardClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };
  //디테일 창 닫기!!!!
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  // 수정할 수 있도록 처리!!!
  const handleEditAlbum = (post) => {
    setEditingPost(post);
    setIsAddModalOpen(true);
  };

  //앨범 정보를 수정한 후 화면에 반영
  //updatedAlbum.id와 일치하는 게시글을 찾아서, 그 자리만 updatedAlbum으로 바꿈
  const handleUpdateAlbum = (updatedAlbum) => {
    setMyPosts((prev) =>
      prev.map((post) => (post.id === updatedAlbum.id ? updatedAlbum : post))
    );
  };
  // 앨범 삭제
  async function deleteMyAlbum(id) {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;
    try {
      // 서버로 중복 확인 요청
      await axios.delete(`/api/album/id/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setMyPosts((prev) => prev.filter((album) => album.id !== id));
      // window.location.reload();
    } catch (error) {
      throw error;
    }
  }

  //해당 ID를 가진 앨범을 삭제하기
  async function handleDeleteAlbum(id) {
    const confirmDelete = window.confirm(`앨범을 정말 삭제하시겠어요?`);
    if (!confirmDelete) return;
    await deleteMyAlbum(id);
    setSelectedPost(null);
    setIsModalOpen(false);
  }

  return (
    <AlbumWrapper>
      <AlbumInner>
        <HeaderBox>
          {/* 필터링 */}
          <FilterBox>
            {['최신순', '좋아요순', '댓글순'].map((label) => (
              <FilterButton
                key={label}
                $active={sortOption === label}
                onClick={() => setSortOption(label)}
              >
                {label}
              </FilterButton>
            ))}
          </FilterBox>
          {/* 3,5개로 볼건지 선택(디폴트 5개) */}
          <LayoutControlBox>
            {[3, 5].map((num) => (
              <LayoutButton key={num} onClick={() => setColumns(num)}>
                {num}개 보기
              </LayoutButton>
            ))}
          </LayoutControlBox>
        </HeaderBox>
        {/* 선택된 컬럼 수에 따라서 다르게 화면 렌더링 */}
        {/* filteredData: 필터된 조건에 따라서 다르게 렌더링 */}
        <PhotoGrid $columns={$columns}>
          {filteredData.map((album, idx) => (
            <PhotoCard
              key={album.id}
              src={album.url.map((media) => ({
                url: media.mediaUrl,
                type: media.mediaType,
              }))}
              title={album.title}
              rotate={Math.floor(Math.random() * 6 - 3)}
              $offsetY={Math.floor(Math.random() * 20 - 10)}
              $pinColor={pin[idx % pin.length]}
              //디테일 창 볼 수 있도록 처리
              onClick={() => handleCardClick(album)}
              draggable
              //드래그하면 해당 앨범 아이디 저장
              onDragStart={() => setDraggedId(album.id)}
              $columns={$columns}
            />
          ))}
        </PhotoGrid>
        {/* 디테일(수정 버튼 있음) 열기 */}
        {isModalOpen && selectedPost && (
          <AlbumDetailModal
            albumData={selectedPost}
            onClose={handleCloseModal}
            onEdit={handleEditAlbum}
          />
        )}
      </AlbumInner>
      {/* 앨범 추가하기 */}
      {isAddModalOpen && (
        <ModifyAlbumAndDetail
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingPost(null);
          }}
          onAddAlbum={handleAddAlbum}
          onEditAlbum={handleUpdateAlbum}
          editMode={!!editingPost} // 강제로 불리언으로 변경하기
          editData={editingPost}
        />
      )}
      <AddButton
        onClick={() => {
          setIsAddModalOpen(true);
          setEditingPost(null);
        }}
        title="Add New"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            strokeWidth="1.5"
          />
          <path d="M8 12H16" strokeWidth="1.5" />
          <path d="M12 16V8" strokeWidth="1.5" />
        </svg>
      </AddButton>
      {/* 앨범 추가하기 끝 */}
      {/* 앨범을 끌고가서 쓰레기통에 버리기 */}
      <TrashZone
        onDragOver={(e) => {
          e.preventDefault();
          setIsTrashDragOver(true);
        }}
        onDragLeave={() => setIsTrashDragOver(false)}
        onDrop={() => {
          if (draggedId) handleDeleteAlbum(draggedId);
          setDraggedId(null);
          setIsTrashDragOver(false); // 드래그 종료 시 초기화
        }}
      >
        <DeleteButton $isDragOver={isTrashDragOver} />
      </TrashZone>
      {/* 앨범을 끌고가서 쓰레기통에 버리기 끝 */}
    </AlbumWrapper>
  );
};

export default MyAlbum;

const AlbumWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center; // 수평 가운데 정렬
  align-items: flex-start; // 위에서부터 정렬
  padding: 60px 20px 100px;
  padding-top: 100px;
`;
const AlbumInner = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
`;
const FilterBox = styled.div`
  display: flex;
  gap: 10px;
`;
const FilterButton = styled.button`
  width: 90px;
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  font-weight: 700;
  font-size: 0.8rem;
  background-color: ${({ $active }) => ($active ? '#8c0d17' : 'white')};
  color: ${({ $active }) => ($active ? '#fff' : '#333')};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #8c0d17;
    color: white;
  }
`;
const LayoutControlBox = styled.div`
  padding: 8px 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;
const LayoutButton = styled.button`
  width: 90px;
  background-color: white;
  /* border: none; */
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  color: #333;
  transition: all 0.2s;
  &:hover {
    background-color: #8c0d17;
    color: white;
  }
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
const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
  gap: 40px;
  max-width: 1400px;
  padding: 0 20px;
  margin: 0 auto;
`;
const TrashZone = styled.div`
  position: fixed;
  bottom: 30px;
  left: 70px;
`;
