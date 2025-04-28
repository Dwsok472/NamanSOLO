import React, { useState, useEffect } from 'react';
import { useUserStore } from '../Login/Login';
import { getPlacesByRegion, getPlacesByRegionAndCategory, deleteRecommendPlace } from '../api1';
import PlaceCard from './PlaceCard';
import PlaceDetail from './PlaceDetail';
import PlaceForm from './PlaceForm';
import PlaceModal from './PlaceModal';
import CategoryFilter from './CategoryFilter';
import PlaceFormModal from './PlaceFormModal';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 10px;
  position: relative;
  padding: 20px;
`;

const RegionTitle = styled.h3`
  font-size: 3rem;
  text-align: center;
  font-weight: 700;
  margin-bottom: 15px;
  margin-top: 30px;
  color: white;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
  max-height: 71vh;
  overflow-y: hidden;
  padding-right: 6px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
`;

const AddButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 55px;
  height: 55px;
  background: none; 
  border: 2px solid #0c0c0c; 
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  padding: 0;
  transition: all 0.3s ease;

  svg {
    width: 28px;
    height: 28px;
    stroke: #0c0c0c;
    stroke-width: 2.5;
    fill: none;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: rotate(90deg); 
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  gap: 12px;
  padding: 10px 0;
`;


const PageButton = styled.button`
  background: white;
  color: black;
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #f5f5f5;
  }

  &.active {
    background-color: #0c0c0c;
    color: white;
  }
`;



function PlaceListPart({ selectedRegion, regionPlaces, setRegionPlaces }) {
  const { user } = useUserStore();
  const isAdmin = user?.authority === 'ROLE_ADMIN';
  const [activeCategory, setActiveCategory] = useState('전체');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = ['맛집', '카페', '호텔', '관광지', '포토존'];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPlaces.slice(indexOfFirstItem, indexOfLastItem);


  useEffect(() => {
    if (!selectedRegion) return;

    const fetchPlaces = async () => {
      if (activeCategory === '전체') {
        const data = await getPlacesByRegion(selectedRegion);
        setFilteredPlaces(removeDuplicatesById(data));
      } else {
        const data = await getPlacesByRegionAndCategory(selectedRegion, activeCategory);
        setFilteredPlaces(removeDuplicatesById(data));
      }
    };

    fetchPlaces();
  }, [selectedRegion, activeCategory]);

  const removeDuplicatesById = (arr) => {
    const seen = new Set();
    return arr.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  };

  const handleDeletePlace = async (placeId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteRecommendPlace(placeId);
        const updatedPlaces = await getPlacesByRegion(selectedRegion);
        setRegionPlaces((prev) => ({
          ...prev,
          [selectedRegion]: updatedPlaces,
        }));
        setFilteredPlaces(updatedPlaces);
  
        setSelectedPlace(null);
        setEditingPlace(null);
        setShowFormModal(false);
  
        alert('삭제 완료!');
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제 실패!');
      }
    }
  };
  

  if (!selectedRegion) return <Wrapper>지역을 선택해주세요</Wrapper>;

  return (
    <Wrapper>
      <RegionTitle>{selectedRegion} 장소</RegionTitle>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <ListContainer>
       {currentItems.map((place) => (
        <PlaceCard
          key={place.id}
          place={place}
          onClick={() => setSelectedPlace(place)}
        />
      ))}
      </ListContainer>

      <PaginationWrapper>
        <PageButton 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          이전
        </PageButton>

        <PageButton 
          onClick={() => setCurrentPage(prev => 
            prev < Math.ceil(filteredPlaces.length / itemsPerPage) ? prev + 1 : prev
          )}
          disabled={currentPage >= Math.ceil(filteredPlaces.length / itemsPerPage)}
        >
          다음
        </PageButton>
      </PaginationWrapper>

      {/* 추가 버튼 (관리자만 보임) */}
      {isAdmin && !showFormModal && (
        <AddButton onClick={() => {
          setEditingPlace(null); 
          setShowFormModal(true);
        }}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" />
          </svg>
        </AddButton>
      )}

      {/* 장소 상세 모달 */}
      {selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onEdit={() => {
            setEditingPlace(selectedPlace);
            setShowFormModal(true);
            setSelectedPlace(null);
          }}
          onDelete={() => handleDeletePlace(selectedPlace.id)}
          isAdmin={isAdmin}
        />
      )}

      {/* 장소 추가/수정 폼 */}
      {showFormModal && (
        <PlaceFormModal
          editingPlace={editingPlace}
          selectedRegion={selectedRegion}
          onClose={() => {
            setShowFormModal(false);
            setEditingPlace(null);
          }}
          refreshPlaces={() => setActiveCategory('전체')}
          setRegionPlaces={setRegionPlaces}
          setFilteredPlaces={setFilteredPlaces}
        />
      )}
    </Wrapper>
  );
}

export default PlaceListPart;
