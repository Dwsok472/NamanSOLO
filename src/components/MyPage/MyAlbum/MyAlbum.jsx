import React, { useState, useEffect } from 'react';
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
  const username = useUserStore((state) => state.user?.username);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState('최신순');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const [columns, setColumns] = useState(5); // 기본값: 5개 보기
  const [isTrashDragOver, setIsTrashDragOver] = useState(false);
  const [myPosts, setMyPosts] = useState([]);

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

  const handleAddAlbum = (newAlbum) => {
    setMyPosts((prev) => [newAlbum, ...prev]);
  };

  const filteredData = [...myPosts]
    .filter((post) =>
      post.username.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === '좋아요순') return b.greats.length - a.greats.length;
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
            {[3, 5].map((num) => (
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
              src={album.url.map((media) => media.mediaUrl)}
              title={album.title}
              rotate={Math.floor(Math.random() * 6 - 3)}
              offsetY={Math.floor(Math.random() * 20 - 10)}
              pinColor={pin[idx % pin.length]}
              onClick={() => handleCardClick(album)}
              draggable
              onDragStart={() => setDraggedId(album.id)}
              columns={columns}
            />
          ))}
        </PhotoGrid>

        {isModalOpen && selectedPost && selectedPost.greats && (
          <AlbumDetailModal
            albumData={selectedPost}
            onClose={handleCloseModal}
            onEdit={handleEditAlbum}
          />
        )}
      </AlbumInner>
      {isAddModalOpen && (
        <ModifyAlbumAndDetail
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
      <AddButton onClick={() => setIsAddModalOpen(true)} title="Add New">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            strokeWidth="1.5"
          />
          <path d="M8 12H16" strokeWidth="1.5" />
          <path d="M12 16V8" strokeWidth="1.5" />
        </svg>
      </AddButton>
      {/* <TrashZone
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
        <DeleteButton isDragOver={isTrashDragOver} />
      </TrashZone> */}
    </AlbumWrapper>
  );
};

export default MyAlbum;

const AlbumWrapper = styled.div`
  background: linear-gradient(to bottom, #b85c79, #fdecec);
  min-height: 100vh;
  display: flex;
  justify-content: center; // 수평 가운데 정렬
  align-items: flex-start; // 위에서부터 정렬
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
  /* max-width: 1200px; */
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
  font-weight: 700;
  background-color: ${({ active }) => (active ? '#8c0d17' : 'white')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
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
  background-color: white;
  /* border: none; */
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: 700;
  cursor: pointer;
  color: #333;
  /* box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15); */

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
  grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
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

// const [myPosts, setMyPosts] = useState([
//   {
//     id: 1,
//     username: "my_user",
//     title: "첫 데이트 장소",
//     imgurl: [couple1],
//     date: "2025-01-05",
//     location: "서울 연남동",
//     tag: ["데이트", "추억"],
//     likes: ["user2", "user4"],
//     comments: [],
//     isPublic: true,
//   },
//   {
//     id: 2,
//     username: "my_user",
//     title: "한강 야경",
//     imgurl: [couple2, couple2],
//     date: "2025-01-12",
//     location: "한강 반포지구",
//     tag: ["야경", "데이트"],
//     likes: ["user1", "user3"],
//     comments: [
//       {
//         id: 1,
//         albumId: 2,
//         username: "user1",
//         text: "너무 예쁘네요!",
//         date: "2025-01-13",
//       },
//     ],
//     isPublic: true,
//   },
//   {
//     id: 3,
//     username: "my_user",
//     title: "성수동 카페 데이트",
//     imgurl: [couple3],
//     date: "2025-01-15",
//     location: "성수동 카페거리",
//     tag: ["디저트", "사진맛집"],
//     likes: [],
//     comments: [],
//     isPublic: true,
//   },
//   {
//     id: 4,
//     username: "my_user",
//     title: "첫 데이트 장소",
//     imgurl: [couple1],
//     date: "2025-01-05",
//     location: "서울 연남동",
//     tag: ["데이트", "추억"],
//     likes: ["user2", "user4"],
//     comments: [],
//     isPublic: true,
//   },
//   {
//     id: 5,
//     username: "my_user",
//     title: "첫 데이트 장소",
//     imgurl: [couple1],
//     date: "2025-01-05",
//     location: "서울 연남동",
//     tag: ["데이트", "추억"],
//     likes: ["user2", "user4"],
//     comments: [],
//     isPublic: true,
//   },
//   {
//     id: 6,
//     username: "my_user",
//     title: "첫 데이트 장소",
//     imgurl: [couple1],
//     date: "2025-01-05",
//     location: "서울 연남동",
//     tag: ["데이트", "추억"],
//     likes: ["user2", "user4"],
//     comments: [],
//     isPublic: true,
//   },
//   {
//     id: 7,
//     username: "my_user",
//     title: "첫 데이트 장소",
//     imgurl: [couple1],
//     date: "2025-01-05",
//     location: "서울 연남동",
//     tag: ["데이트", "추억"],
//     likes: ["user2", "user4"],
//     comments: [],
//     isPublic: true,
//   },
//   {
//     id: 8,
//     username: "my_user",
//     title: "첫 데이트 장소",
//     imgurl: [couple1],
//     date: "2025-01-05",
//     location: "서울 연남동",
//     tag: ["데이트", "추억"],
//     likes: ["user2", "user4"],
//     comments: [],
//     isPublic: true,
//   },
//   {
//     id: 9,
//     username: "my_user",
//     title: "첫 데이트 장소",
//     imgurl: [couple1],
//     date: "2025-01-05",
//     location: "서울 연남동",
//     tag: ["데이트", "추억"],
//     likes: ["user2", "user4"],
//     comments: [],
//     isPublic: true,
//   },
//   {
//     id: 10,
//     username: "my_user",
//     title: "첫 데이트 장소",
//     imgurl: [couple1],
//     date: "2025-01-05",
//     location: "서울 연남동",
//     tag: ["데이트", "추억"],
//     likes: ["user2", "user4"],
//     comments: [],
//     isPublic: true,
//   },
//   {
//     id: 11,
//     username: "my_user",
//     title: "첫 데이트 장소",
//     imgurl: [couple1],
//     date: "2025-01-05",
//     location: "서울 연남동",
//     tag: ["데이트", "추억"],
//     likes: ["user2", "user4"],
//     comments: [],
//     isPublic: true,
//   },
//   {
//     id: 12,
//     username: "my_user",
//     title: "첫 데이트 장소",
//     imgurl: [couple1],
//     date: "2025-01-05",
//     location: "서울 연남동",
//     tag: ["데이트", "추억"],
//     likes: ["user2", "user4"],
//     comments: [],
//     isPublic: true,
//   },
//   {
//     id: 13,
//     username: "my_user",
//     title: "첫 데이트 장소",
//     imgurl: [couple1],
//     date: "2025-01-05",
//     location: "서울 연남동",
//     tag: ["데이트", "추억"],
//     likes: ["user2", "user4"],
//     comments: [],
//     isPublic: true,
//   },
//   {
//     id: 14,
//     username: "my_user",
//     title: "첫 데이트 장소",
//     imgurl: [couple1],
//     date: "2025-01-05",
//     location: "서울 연남동",
//     tag: ["데이트", "추억"],
//     likes: ["user2", "user4"],
//     comments: [],
//     isPublic: true,
//   },
//   {
//     id: 15,
//     username: "my_user",
//     title: "첫 데이트 장소",
//     imgurl: [couple1],
//     date: "2025-01-05",
//     location: "서울 연남동",
//     tag: ["데이트", "추억"],
//     likes: ["user2", "user4"],
//     comments: [],
//     isPublic: true,
//   },
//   {
//     id: 16,
//     username: "my_user",
//     title: "첫 데이트 장소",
//     imgurl: [couple1],
//     date: "2025-01-05",
//     location: "서울 연남동",
//     tag: ["데이트", "추억"],
//     likes: ["user2", "user4"],
//     comments: [],
//     isPublic: true,
//   },
// ]);
