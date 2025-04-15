import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  uploadRecommendPlaceImages,
  saveRecommendPlace,
  getAllRecommendPlaces,
  getPlacesByRegion
} from '../api1';
import axios from 'axios';


const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RegionTitle = styled.h3`
  font-size: 1.4rem;
  text-align: center;
  font-weight: 700;
  margin-bottom: 8px;
`;

const AddButton = styled.button`
  background: #ff5777;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #e84664;
  }
`;

const CloseBtn = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  color: #888;
  font-size: 1.1rem;
  cursor: pointer;
  margin-bottom: 6px;

  &:hover {
    color: #ff5777;
  }

  &:focus {
    outline: none;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
`;

const Card = styled.div`
  background: white;
  padding: 12px;
  border-radius: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;

  &.large {
    width: 100%;
    height: auto;
    margin-top: 10px;
    border-radius: 12px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .category {
    color: #ff5777;
    font-size: 0.8rem;
  }
  .title {
    font-weight: bold;
    font-size: 1rem;
  }
  .address {
    font-size: 0.85rem;
    color: #555;
  }
`;

const Detail = styled.div`
  background: #fffafa;
  padding: 12px 16px;
  border-radius: 10px;
`;

const DetailText = styled.p`
  font-size: 0.85rem;
  margin: 4px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 10px;
`;

const SmallBtn = styled.button`
  background: #ffebee;
  color: #ff5777;
  border: none;
  padding: 6px 10px;
  font-size: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:focus {
    outline: none;
  }
`;

const MapWrapper = styled.div`
  margin-top: 12px;
  width: 100%;
  height: 280px;
`;

const Form = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;

  input, select, textarea {
    width: 100%;
    margin: 6px 0;
    padding: 6px 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
  }

  img.preview {
    width: 100%;
    border-radius: 8px;
    margin-top: 10px;
  }
`;

function PlaceListPart({ selectedRegion, regionPlaces, setRegionPlaces }) {
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [mapAddress, setMapAddress] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [mapId, setMapId] = useState(null);
  const [images, setImages] = useState([]);
  
  const [newPlace, setNewPlace] = useState({
    name: '',
    category: '',
    address: '',
    description: '',
    image: null,
    preview: ''
  });

  const getFileName = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 1]?.trim() || '';
  };
  

  const places = selectedRegion ? regionPlaces[selectedRegion] || [] : [];
  const categories = ['맛집', '카페', '호텔', '관광지', '포토존'];
  const [activeCategory, setActiveCategory] = useState('전체');

  const filteredPlaces = activeCategory === '전체'
  ? places
  : places.filter(p => p.category === activeCategory);

  useEffect(() => {
    if (window.google) {
      setGoogleLoaded(true);
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAko5KNj0EEUrRO8tk3_OxVpxy6vQJKmi8&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setGoogleLoaded(true);
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (mapId && googleLoaded && mapAddress) {
      const mapDiv = document.getElementById(`map-${mapId}`);
      const geocoder = new window.google.maps.Geocoder();
      if (!mapDiv) return;

      geocoder.geocode({ address: mapAddress }, (results, status) => {
        if (status === 'OK') {
          const map = new window.google.maps.Map(mapDiv, {
            center: results[0].geometry.location,
            zoom: 15,
          });
          new window.google.maps.Marker({
            map,
            position: results[0].geometry.location,
          });
        } else {
          mapDiv.innerText = `주소를 찾을 수 없습니다: ${status}`;
        }
      });
    }
  }, [mapId, googleLoaded, mapAddress]);

  useEffect(() => {
    if (selectedRegion) {
      getPlacesByRegion(selectedRegion).then((data) => {
        console.log("📡 지역 장소 데이터 받아옴:", selectedRegion, data);
        setRegionPlaces(prev => ({
          ...prev,
          [selectedRegion]: data,
        }));
      });
    }
  }, [selectedRegion]);
  

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPlace((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file), // ✅ 미리보기용 URL 생성!
      }));
    }
  };
  
  

  const handleShowMap = (id, address) => {
    setMapId(id);
    setMapAddress(address);
    setTimeout(() => {
      const el = document.getElementById(`map-${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleEdit = (place) => {
    setEditingId(place.id);
    setShowForm(false);
    setNewPlace({
      name: place.name,
      category: place.category,
      address: place.address,
      description: place.description,
      image: place.thumbnail,
      preview: place.thumbnail
    });
  };

  const fetchAll = async () => {
    const res = await getAllRecommendPlaces();
    console.log("📦 응답 데이터:", res);
  
    // 👇 여기를 상황에 맞게 고쳐야 해!
    const realData = Array.isArray(res) ? res : res.data;
    setPlaces(realData);
  };


  const handleRegister = async () => {
    try {
      if (!newPlace.image) {
        alert("이미지를 업로드해주세요.");
        return;
      }
  
      const placeDTO = {
        name: newPlace.name,
        address: newPlace.address,
        description: newPlace.description,
        category: newPlace.category,
        city: selectedRegion, // ✔️ 중요!
        latitude: 0,
        longitude: 0,
      };
  
      await uploadRecommendPlaceImages(placeDTO, [newPlace.image]);
  
      // ✔️ 등록 성공 후 해당 지역 장소 다시 불러오기
      const updatedPlaces = await getPlacesByRegion(selectedRegion);
      setRegionPlaces((prev) => ({
        ...prev,
        [selectedRegion]: updatedPlaces,
      }));
  
      alert("✅ 등록 성공!");
  
      // 폼 초기화
      setNewPlace({
        name: '',
        category: '',
        address: '',
        description: '',
        image: null,
        preview: '',
      });
      setShowForm(false);
  
    } catch (err) {
      console.error("📛 등록 실패:", err);
      alert("등록 실패 😭");
    }
  };
  

  if (!selectedRegion) return <Wrapper>지역을 선택해주세요</Wrapper>;

  return (
    <Wrapper>
      <RegionTitle>{selectedRegion} 장소</RegionTitle>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {['전체', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              background: activeCategory === cat ? '#ffebee' : '#eee',
              color: activeCategory === cat ? '#ff5777' : '#333',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <ListContainer>
        {filteredPlaces.map((place) => (
          <React.Fragment key={place.id}>
            <Card onClick={() => setSelectedId(selectedId === place.id ? null : place.id)}>
            <Thumbnail
                src={
                  place.media && place.media.length > 0
                    ? `http://localhost:8082/api/recommend_place/download/${getFileName(place.media[0].mediaUrl)}`
                    : 'https://via.placeholder.com/60?text=No+Image'
                }
                alt={place.name}
              />
              <Info>
                <div className="category">{place.category}</div>
                <div className="title">{place.name}</div>
                <div className="address">{place.address}</div>
              </Info>
            </Card>

            {selectedId === place.id && (
              <Detail>
                <CloseBtn onClick={() => setSelectedId(null)}>✖</CloseBtn>
                <DetailText>{place.description}</DetailText>
                <Thumbnail
                  className="large"
                  src={
                    place.media && place.media.length > 0
                      ? `http://localhost:8082${place.media[0].mediaUrl}`
                      : 'https://via.placeholder.com/300x200?text=No+Image'
                  }
                  alt="썸네일"
                />
                <ButtonGroup>
                  <SmallBtn onClick={() => handleShowMap(place.id, place.address)}>지도 보기</SmallBtn>
                  <SmallBtn onClick={() => handleEdit(place)}>✏ 수정</SmallBtn>
                  <SmallBtn onClick={() => handleDelete(place.id)}>🗑 삭제</SmallBtn>
                </ButtonGroup>

                {mapId === place.id && (
                  <>
                    <CloseBtn onClick={() => setMapId(null)}>✖ 지도 닫기</CloseBtn>
                    <MapWrapper id={`map-${place.id}`} />
                  </>
                )}
              </Detail>
            )}

            {editingId === place.id && (
              <Form>
                <CloseBtn onClick={() => {
                  setEditingId(null);
                  setNewPlace({ name: '', category: '', address: '', description: '', image: null, preview: '' });
                }}>✖</CloseBtn>
                <input type="text" placeholder="이름" value={newPlace.name}
                  onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })} />
                <select value={newPlace.category}
                  onChange={(e) => setNewPlace({ ...newPlace, category: e.target.value })}>
                  <option value="">카테고리 선택</option>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
                <input type="text" placeholder="주소" value={newPlace.address}
                  onChange={(e) => setNewPlace({ ...newPlace, address: e.target.value })} />
                <textarea placeholder="설명" value={newPlace.description}
                  onChange={(e) => setNewPlace({ ...newPlace, description: e.target.value })} />
                <input type="file" onChange={handleImage} />
                {newPlace.preview && <img className="preview" src={newPlace.preview} alt="미리보기" />}
                <AddButton onClick={handleRegister}>수정하기</AddButton>
              </Form>
            )}
          </React.Fragment>
        ))}
      </ListContainer>
      {!showForm && <AddButton onClick={() => setShowForm(true)}>+ 장소 추가</AddButton>}
        {showForm && !editingId && (
          <Form>
            <CloseBtn onClick={() => setShowForm(false)}>✖</CloseBtn>
            <input type="text" placeholder="이름" value={newPlace.name}
              onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })} />
            <select value={newPlace.category}
              onChange={(e) => setNewPlace({ ...newPlace, category: e.target.value })}>
              <option value="">카테고리 선택</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <input type="text" placeholder="주소" value={newPlace.address}
              onChange={(e) => setNewPlace({ ...newPlace, address: e.target.value })} />
            <textarea placeholder="설명" value={newPlace.description}
              onChange={(e) => setNewPlace({ ...newPlace, description: e.target.value })} />
            <input type="file" onChange={handleImage} />
            {newPlace.preview && <img className="preview" src={newPlace.preview} alt="미리보기" />}
            <AddButton onClick={handleRegister}>등록하기</AddButton>
          </Form>
      )}
    </Wrapper>
  );
}

export default PlaceListPart;
