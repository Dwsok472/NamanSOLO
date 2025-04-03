import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { getAllPlaces } from '../api/api1';
// import { createPlace, updatePlace, deletePlace } from '../api/api1';
// import { getPlacesByRegion } from '../api/api1';
// import { getPlacesByCategory } from '../api/api1';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RegionTitle = styled.h3`
  font-size: 1.1rem;
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

  // 카테고리별 장소조회 함수에서 카테고리별 가져온 리스트 저장하는거
  // const [filteredPlaces, setFilteredPlaces] = useState([]);

  // 장소목록 전체체 불러오는 함수 api1
  // const [places, setPlaces] = useState([]);

  // useEffect(() => {
  //   const fetchPlaces = async () => {
  //     try {
  //       const placesData = await getAllPlaces(); 
  //       setPlaces(placesData);
  //     } catch (error) {
  //       console.error("장소 목록 불러오기 실패", error);
  //     }
  //   };

  //   fetchPlaces();
  // }, []);
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  
  // 지역별로 장소 불러오기
  // useEffect(() => {
  //   if (!selectedRegion) return;
  
  //   const fetchPlaces = async () => {
  //     try {
  //       const data = await getPlacesByRegion(selectedRegion);
  //       setRegionPlaces(prev => ({ ...prev, [selectedRegion]: data }));
  //     } catch (err) {
  //       console.error("지역별 장소 조회 실패", err);
  //     }
  //   };
  
  //   fetchPlaces();
  // }, [selectedRegion]); 
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // ***생성
  // const handleRegister = async () => {
  //   try {
  //     const response = await createPlace(newPlace);
  //     const updated = [...places, {
  //       id: response.id,
  //       ...newPlace,
  //       thumbnail: typeof newPlace.image === 'string'
  //         ? newPlace.image
  //         : URL.createObjectURL(newPlace.image),
  //     }];
  //     setRegionPlaces({ ...regionPlaces, [selectedRegion]: updated });
  //     setShowForm(false);
  //   } catch (error) {
  //     console.error('등록 실패', error);
  //   }
  // };
  
  // *** 수정
  // const handleUpdate = async () => {
  //   try {
  //     const response = await updatePlace(editingId, newPlace);
  //     const updated = places.map((p) =>
  //       p.id === editingId
  //         ? {
  //             ...p,
  //             ...newPlace,
  //             thumbnail: typeof newPlace.image === 'string'
  //               ? newPlace.image
  //               : URL.createObjectURL(newPlace.image),
  //           }
  //         : p
  //     );
  //     setRegionPlaces({ ...regionPlaces, [selectedRegion]: updated });
  //     setEditingId(null);
  //   } catch (error) {
  //     console.error('수정 실패', error);
  //   }
  // };
  
  // ***삭제
  // const handleDelete = async (id) => {
  //   if (!window.confirm('정말 삭제하시겠습니까?')) return;
  //   try {
  //     await deletePlace(id);
  //     const updated = places.filter(p => p.id !== id);
  //     setRegionPlaces({ ...regionPlaces, [selectedRegion]: updated });
  //   } catch (error) {
  //     console.error('삭제 실패', error);
  //   }
  // };

  // *** 지역별 장소조회

  // useEffect(() => {
  //   if (!selectedRegion) return;
  
  //   const fetchPlaces = async () => {
  //     try {
  //       const regionData = await getPlacesByRegion(selectedRegion);
  //       setRegionPlaces(prev => ({ ...prev, [selectedRegion]: regionData }));
  //     } catch (err) {
  //       console.error("지역별 장소 조회 실패", err);
  //     }
  //   };
  
  //   fetchPlaces();
  // }, [selectedRegion]);

  // *** 카테고리별 장소조회
  // const handleCategoryClick = async (category) => {
  //   try {
  //     const data = await getPlacesByCategory(category);
  //     setFilteredPlaces(data); // 상태는 이름 자유롭게
  //   } catch (err) {
  //     console.error('카테고리 조회 실패', err);
  //   }
  // };

  // 나중에 jsx 에 등록해서 써야함
//   <button onClick={() => handleCategoryClick('카페')}>카페</button>
// <button onClick={() => handleCategoryClick('맛집')}>맛집</button>

  const [newPlace, setNewPlace] = useState({
    name: '',
    category: '',
    address: '',
    description: '',
    image: null,
    preview: ''
  });

  const places = selectedRegion ? regionPlaces[selectedRegion] || [] : [];
  const categories = ['맛집', '카페', '호텔', '관광지', '포토존'];

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

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPlace((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
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

  const handleDelete = (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const updated = places.filter(p => p.id !== id);
    setRegionPlaces({ ...regionPlaces, [selectedRegion]: updated });
  };

  const handleRegister = () => {
    if (!newPlace.name || !newPlace.category) {
      alert('이름과 카테고리는 필수입니다.');
      return;
    }

    const newItem = {
      id: editingId ?? Date.now(),
      ...newPlace,
      thumbnail: typeof newPlace.image === 'string'
        ? newPlace.image
        : URL.createObjectURL(newPlace.image),
    };

    const updated = editingId
      ? places.map(p => p.id === editingId ? newItem : p)
      : [...places, newItem];

    setRegionPlaces({ ...regionPlaces, [selectedRegion]: updated });
    setNewPlace({ name: '', category: '', address: '', description: '', image: null, preview: '' });
    setShowForm(false);
    setEditingId(null);
  };

  if (!selectedRegion) return <Wrapper>지역을 선택해주세요</Wrapper>;

  return (
    <Wrapper>
      <RegionTitle>{selectedRegion} 장소</RegionTitle>

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

      <ListContainer>
        {places.map((place) => (
          <React.Fragment key={place.id}>
            <Card onClick={() => setSelectedId(selectedId === place.id ? null : place.id)}>
              <Thumbnail src={place.thumbnail} alt={place.name} />
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
                <Thumbnail className="large" src={place.thumbnail} alt="썸네일" />
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
    </Wrapper>
  );
}

export default PlaceListPart;
