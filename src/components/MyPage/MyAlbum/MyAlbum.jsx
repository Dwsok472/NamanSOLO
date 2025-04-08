import React, { useState } from 'react';
import styled from 'styled-components';
import PhotoCard from '../../Album/PhotoCard';
import AlbumDetailModal from '../../Album/AlbumDetailModal';
import AddAlbum from '../../Album/AddAlbum';

import couple1 from '../../img/couple1.png';
import couple2 from '../../img/couple2.png';
import couple3 from '../../img/couple3.png';
import tape1 from '../../img/tape1.png';
import tape2 from '../../img/tape2.png';
import tape3 from '../../img/tape3.png';
import tape4 from '../../img/tape4.png';
import tape5 from '../../img/tape5.png';
import tape6 from '../../img/tape6.png';
import tape7 from '../../img/tape7.png';

const AlbumWrapper = styled.div`
  background: linear-gradient(to bottom, #5b232a, #e29587);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 60px 20px 100px;
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
  max-width: 1200px;
  margin-bottom: 40px;
`;

const FilterBox = styled.div`
  display: flex;
  gap: 10px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  font-weight: bold;
  background-color: ${({ active }) => (active ? '#ff5c8a' : '#fbe4eb')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;

  &:hover {
    background-color: #ff7fa4;
    color: white;
  }
`;

const LayoutControlBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 20px;
`;

const LayoutButton = styled.button`
  background-color: #fbe4eb;
  border: none;
  border-radius: 16px;
  padding: 6px 12px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #ff5c8a;
    color: white;
  }
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 40px;
  background-color: #b20a37;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 1.8rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 200;

  &:hover {
    background-color: #e91e63;
  }
`;


const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
  gap: 40px;
  width: 100%;
  max-width: 1400px;
  padding: 0 20px;
`;

const TrashZone = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #000;
  color: #fff;
  font-size: 1.2rem;
  padding: 12px 20px;
  border-radius: 10px;
  border: 2px dashed #fff;
  opacity: 0.8;
  z-index: 500;
  transition: all 0.3s;

  &:hover {
    background-color: #ff5c5c;
    color: white;
    border-color: #ff5c5c;
  }
`;


const pin = [tape1, tape2, tape3, tape4, tape5, tape6, tape7];

const MyAlbum = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState('최신순');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const [columns, setColumns] = useState(5); // 기본값: 5개 보기



  const [myPosts, setMyPosts] = useState([
    {
      id: 1,
      username: 'my_user',
      title: '첫 데이트 장소',
      imgurl: [couple1],
      date: '2025-01-05',
      location: '서울 연남동',
      tag: ['데이트', '추억'],
      likes: ['user2', 'user4'],
      comments: [],
      isPublic: true,
    },
    {
      id: 2,
      username: 'my_user',
      title: '한강 야경',
      imgurl: [couple2, couple2],
      date: '2025-01-12',
      location: '한강 반포지구',
      tag: ['야경', '데이트'],
      likes: ['user1', 'user3'],
      comments: [
        {
          id: 1,
          albumId: 2,
          username: 'user1',
          text: '너무 예쁘네요!',
          date: '2025-01-13'
        }
      ],
      isPublic: true,
    },
    {
      id: 3,
      username: 'my_user',
      title: '성수동 카페 데이트',
      imgurl: [couple3],
      date: '2025-01-15',
      location: '성수동 카페거리',
      tag: ['디저트', '사진맛집'],
      likes: [],
      comments: [],
      isPublic: true,
    },
    {
      id: 4,
      username: 'my_user',
      title: '첫 데이트 장소',
      imgurl: [couple1],
      date: '2025-01-05',
      location: '서울 연남동',
      tag: ['데이트', '추억'],
      likes: ['user2', 'user4'],
      comments: [],
      isPublic: true,
    },
    {
      id: 5,
      username: 'my_user',
      title: '첫 데이트 장소',
      imgurl: [couple1],
      date: '2025-01-05',
      location: '서울 연남동',
      tag: ['데이트', '추억'],
      likes: ['user2', 'user4'],
      comments: [],
      isPublic: true,
    },
    {
      id: 6,
      username: 'my_user',
      title: '첫 데이트 장소',
      imgurl: [couple1],
      date: '2025-01-05',
      location: '서울 연남동',
      tag: ['데이트', '추억'],
      likes: ['user2', 'user4'],
      comments: [],
      isPublic: true,
    },
    {
      id: 7,
      username: 'my_user',
      title: '첫 데이트 장소',
      imgurl: [couple1],
      date: '2025-01-05',
      location: '서울 연남동',
      tag: ['데이트', '추억'],
      likes: ['user2', 'user4'],
      comments: [],
      isPublic: true,
    },
    {
      id: 8,
      username: 'my_user',
      title: '첫 데이트 장소',
      imgurl: [couple1],
      date: '2025-01-05',
      location: '서울 연남동',
      tag: ['데이트', '추억'],
      likes: ['user2', 'user4'],
      comments: [],
      isPublic: true,
    },
    {
      id: 9,
      username: 'my_user',
      title: '첫 데이트 장소',
      imgurl: [couple1],
      date: '2025-01-05',
      location: '서울 연남동',
      tag: ['데이트', '추억'],
      likes: ['user2', 'user4'],
      comments: [],
      isPublic: true,
    },
    {
      id: 10,
      username: 'my_user',
      title: '첫 데이트 장소',
      imgurl: [couple1],
      date: '2025-01-05',
      location: '서울 연남동',
      tag: ['데이트', '추억'],
      likes: ['user2', 'user4'],
      comments: [],
      isPublic: true,
    },
    {
      id: 11,
      username: 'my_user',
      title: '첫 데이트 장소',
      imgurl: [couple1],
      date: '2025-01-05',
      location: '서울 연남동',
      tag: ['데이트', '추억'],
      likes: ['user2', 'user4'],
      comments: [],
      isPublic: true,
    },
    {
      id: 12,
      username: 'my_user',
      title: '첫 데이트 장소',
      imgurl: [couple1],
      date: '2025-01-05',
      location: '서울 연남동',
      tag: ['데이트', '추억'],
      likes: ['user2', 'user4'],
      comments: [],
      isPublic: true,
    },
    {
      id: 13,
      username: 'my_user',
      title: '첫 데이트 장소',
      imgurl: [couple1],
      date: '2025-01-05',
      location: '서울 연남동',
      tag: ['데이트', '추억'],
      likes: ['user2', 'user4'],
      comments: [],
      isPublic: true,
    },
    {
      id: 14,
      username: 'my_user',
      title: '첫 데이트 장소',
      imgurl: [couple1],
      date: '2025-01-05',
      location: '서울 연남동',
      tag: ['데이트', '추억'],
      likes: ['user2', 'user4'],
      comments: [],
      isPublic: true,
    },
    {
      id: 15,
      username: 'my_user',
      title: '첫 데이트 장소',
      imgurl: [couple1],
      date: '2025-01-05',
      location: '서울 연남동',
      tag: ['데이트', '추억'],
      likes: ['user2', 'user4'],
      comments: [],
      isPublic: true,
    },
    {
      id: 16,
      username: 'my_user',
      title: '첫 데이트 장소',
      imgurl: [couple1],
      date: '2025-01-05',
      location: '서울 연남동',
      tag: ['데이트', '추억'],
      likes: ['user2', 'user4'],
      comments: [],
      isPublic: true,
    },

  ]);

  const handleAddAlbum = (newAlbum) => {
    setMyPosts((prev) => [newAlbum, ...prev]);
  };

  const filteredData = [...myPosts]
  .filter((post) =>
    post.username.toLowerCase().includes(searchKeyword.toLowerCase())
  )
  .sort((a, b) => {
    if (sortOption === '좋아요순') return b.likes.length - a.likes.length;
    if (sortOption === '댓글순') return b.comments.length - a.comments.length;
    return new Date(b.date) - new Date(a.date); // 최신순
  });

  const handleCardClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleEditAlbum = (post) => {
    setEditingPost(post);
    setIsAddModalOpen(true);
  };

  const handleUpdateAlbum = (updatedAlbum) => {
    setMyPosts((prev) =>
      prev.map((post) => (post.id === updatedAlbum.id ? updatedAlbum : post))
    );
  };

  const handleDeleteAlbum = (id) => {
    setMyPosts((prev) => prev.filter((post) => post.id !== id));
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (
    <AlbumWrapper>
      <AlbumInner>
      <HeaderBox>
        <FilterBox>
          {['최신순', '좋아요순', '댓글순'].map((label) => (
            <FilterButton
              key={label}
              active={sortOption === label}
              onClick={() => setSortOption(label)}
            >
              {label}
            </FilterButton>
          ))}
        </FilterBox>

        
      <LayoutControlBox>
        {[3, 5, 10].map((num) => (
          <LayoutButton key={num} onClick={() => setColumns(num)}>
            {num}개 보기
          </LayoutButton>
        ))}
      </LayoutControlBox>

      </HeaderBox>

        <PhotoGrid columns={columns}>
          {filteredData.map((album, idx) => (
            <PhotoCard
            key={album.id}
            src={album.imgurl}
            title={album.title}
            rotate={Math.floor(Math.random() * 6 - 3)}
            offsetY={Math.floor(Math.random() * 20 - 10)}
            pinColor={pin[idx % pin.length]}
            onClick={() => handleCardClick(album)}
            draggable
            onDragStart={
              () => setDraggedId(album.id)}
            columns={columns}
          />
          ))}
        </PhotoGrid>

        {isModalOpen && selectedPost && selectedPost.likes && (
          <AlbumDetailModal
            albumData={selectedPost}
            onClose={handleCloseModal}
            onEdit={handleEditAlbum}
          />
        )}
      </AlbumInner>
      {isAddModalOpen && (
  <AddAlbum
    onClose={() => {
      setIsAddModalOpen(false);
      setEditingPost(null);
    }}
    onAddAlbum={handleAddAlbum}
    onEditAlbum={handleUpdateAlbum} 
    editMode={!!editingPost}
    editData={editingPost}     
  />
)}
      <AddButton onClick={() => setIsAddModalOpen(true)}></AddButton>
      <TrashZone
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => {
          if (draggedId) handleDeleteAlbum(draggedId);
          setDraggedId(null);
        }}
      >
        🗑️ 삭제
      </TrashZone>
    </AlbumWrapper>
  );
};

export default MyAlbum;
