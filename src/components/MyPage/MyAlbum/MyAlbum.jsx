import React, { useState } from 'react';
import styled from 'styled-components';
import PhotoCard from '../../Album/PhotoCard';
import AlbumDetailModal from '../../Album/AlbumDetailModal';

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

const HeaderTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 40px;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 40px;
  width: 100%;
`;

const pin = [tape1, tape2, tape3, tape4, tape5, tape6, tape7];

const MyAlbum = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const myPosts = [
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
  ];

  return (
    <AlbumWrapper>
      <AlbumInner>
        <HeaderTitle>✨ 나의 스토리</HeaderTitle>
        <PhotoGrid>
          {myPosts.map((album, idx) => (
            <PhotoCard
              key={album.id}
              src={album.imgurl}
              title={album.title}
              rotate={Math.floor(Math.random() * 6 - 3)}
              offsetY={Math.floor(Math.random() * 20 - 10)}
              pinColor={pin[idx % pin.length]}
              onClick={() => handleCardClick(album)}
            />
          ))}
        </PhotoGrid>

        {isModalOpen && selectedPost && selectedPost.likes && (
          <AlbumDetailModal albumData={selectedPost} onClose={handleCloseModal} />
        )}
      </AlbumInner>
    </AlbumWrapper>
  );
};

export default MyAlbum;
