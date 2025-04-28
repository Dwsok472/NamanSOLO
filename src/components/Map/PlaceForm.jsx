import React, { useState } from 'react';
import styled from 'styled-components';
import { saveRecommendPlace, updateRecommendPlace, uploadRecommendPlaceImages, registerCategoryMapping, getPlacesByRegion } from '../api1';
import MapPicker from '../MapPicker/MapPicker';
import { updateCategoryMapping } from '../api1';

const FormWrapper = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 100px;
`;

const Button = styled.button`
  background: #0c0c0c;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #333;
  }
`;

const CategoryGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryItem = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
`;

const MapModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const MapModalContent = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
`;


function PlaceForm({ editingPlace, selectedRegion, onClose, refreshPlaces, setRegionPlaces, setFilteredPlaces }) {
  const [name, setName] = useState(editingPlace?.name || '');
  const [address, setAddress] = useState(editingPlace?.address || '');
  const [description, setDescription] = useState(editingPlace?.description || '');
  const [categories, setCategories] = useState(editingPlace?.category ? [editingPlace.category] : []);
  const [images, setImages] = useState([]);
  const [showMapPicker, setShowMapPicker] = useState(false);

  const categoryOptions = ['맛집', '카페', '호텔', '관광지', '포토존'];

  const handleImageUpload = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSave = async () => {
    try {
      const placeDTO = {
        id: editingPlace?.id,
        name,
        address,
        description,
        category: categories[0] || '',
        city: selectedRegion,
        latitude: 0,
        longitude: 0,
      };
  
      let savedPlace = null;
  
      if (editingPlace) {
        if (images.length > 0) {
          await uploadRecommendPlaceImages(placeDTO, images);
        } else {
          await updateRecommendPlace(placeDTO);
        }
        
        // ⭐ 카테고리 업데이트 추가
        if (categories.length > 0) {
          await updateCategoryMapping(editingPlace.id, categories);
        }
  
        await refreshPlaces();
        alert('수정 성공!');
        onClose();
      } else {
        if (images.length > 0) {
          savedPlace = await uploadRecommendPlaceImages(placeDTO, images);
        } else {
          savedPlace = await saveRecommendPlace(placeDTO);
        }
  
        if (savedPlace?.id && categories.length > 0) {
          await registerCategoryMapping(savedPlace.id, categories);
        }
        alert('등록 성공!');
      }
  
      const updatedPlaces = await getPlacesByRegion(selectedRegion);
      setRegionPlaces((prev) => ({
        ...prev,
        [selectedRegion]: updatedPlaces,
      }));
      setFilteredPlaces(updatedPlaces);
  
      refreshPlaces(); // (필요시)
      onClose(); // 모달 닫기
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장 중 오류 발생!');
    }
  };
  
  return (
    <FormWrapper>
      <Input
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="주소"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button onClick={() => setShowMapPicker(true)}>지도에서 주소 검색</Button>
      <TextArea
        placeholder="설명"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <CategoryGroup>
        {categoryOptions.map((cat) => (
          <CategoryItem key={cat}>
            <input
              type="checkbox"
              value={cat}
              checked={categories.includes(cat)}
              onChange={(e) => {
                const checked = e.target.checked;
                const value = e.target.value;
                setCategories((prev) =>
                  checked
                    ? Array.from(new Set([...prev, value]))
                    : prev.filter((c) => c !== value)
                );
              }}
            />
            {cat}
          </CategoryItem>
        ))}
      </CategoryGroup>

      <Input type="file" multiple onChange={handleImageUpload} />

      <Button onClick={handleSave}>
        {editingPlace ? '수정하기' : '등록하기'}
      </Button>

      <Button onClick={onClose}>취소</Button>

      {showMapPicker && (
        <MapModalBackground onClick={() => setShowMapPicker(false)}>
            <MapModalContent onClick={(e) => e.stopPropagation()}>
            <MapPicker
                initialAddress={address}
                onSelect={({ address }) => {
                setAddress(address);
                setShowMapPicker(false);
                }}
            onClose={() => setShowMapPicker(false)}
            />
            <Button onClick={() => setShowMapPicker(false)}>닫기</Button>
            </MapModalContent>
        </MapModalBackground>
        )}
    </FormWrapper>
  );
}

export default PlaceForm;
