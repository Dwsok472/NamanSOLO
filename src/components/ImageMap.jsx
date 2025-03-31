import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import koreaMap from '../components/img/map1.jpg';
import course1 from '../components/img/course1.jpg';
import course2 from '../components/img/course2.jpg';
import course3 from '../components/img/course3.jpg';

// 🔸 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1100px;
  margin: 40px auto;
  gap: 20px;
  position: relative;
`;

const SlideBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 580px;
`;

const SlideBox = styled.div`
  flex: 1;
  background-color: #ffe9ea;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  ${({ $mode }) =>
    $mode === 'slide'
      ? `height: 540px; overflow: hidden;`
      : `max-height: 720px; overflow-y: auto;`}
`;

const SlideImage = styled.div`
  position: relative; // 추가!
  width: 100%;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const NavButton = styled.button`
  position: absolute;
  bottom: 16px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  font-size: 1.2rem;
  padding: 8px 12px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  ${({ $left }) => $left && `left: 16px;`}
  ${({ $right }) => $right && `right: 16px;`}
`;

const MapWrapper = styled.div`
  position: relative;
  flex: 1.2;
  max-width: 720px;
`;

const MapImage = styled.img`
  width: 100%;
  height: auto;
`;

const Region = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: ${({ $clip }) => $clip};
  background-color: ${({ $active }) =>
    $active ? 'rgba(255, 46, 99, 0.3)' : 'transparent'};
  transition: background-color 0.3s;
  z-index: 1;
  pointer-events: none; // 포인터 완전 차단
`;

const Label = styled.div`
  position: absolute;
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 8px;
  border-radius: 5px;
  z-index: 3;
  cursor: pointer;
  pointer-events: auto; // ✅ 이 줄 끝에 세미콜론 필수!

  &:hover {
    background: #ff91a4;
    color: white;
    // transform: scale(1.1);
  }
`;

const Description = styled.div`
  margin-top: 16px;
  background: #fff6f7;
  border-radius: 10px;
  padding: 12px 16px;
  text-align: center;
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  padding: 6px 12px;
  border: none;
  background: ${({ $active }) => ($active ? '#ffdddf' : '#f2f2f2')};
  color: ${({ $active }) => ($active ? '#ff5777' : '#555')};
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const PlaceGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PlaceCard = styled.div`
  display: flex;
  gap: 12px;
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

const PlaceThumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const PlaceInfo = styled.div`
  display: flex;
  flex-direction: column;

  .category {
    color: #ff5777;
    font-size: 0.9rem;
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

const PlaceDetail = styled.div`
  background: #fffafa;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.9rem;
    margin: 2px 0;
  }
`;

const MapOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseMapButton = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  background: #ff5777;
  color: white;
  font-weight: bold;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
`;

const PlaceFormWrapper = styled.div`
  background: #fffafa;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;

  h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    text-align: center;
  }
`;

const ImageUpload = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  background: #fff0f0;
  border: 2px dashed #ff5777;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    font-size: 2rem;
    color: #ff5777;
    cursor: pointer;
  }

  input {
    display: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  background: #ff5777;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #e84664;
  }
`;


const regionPlaces = {
  '충청남도': [
    {
      id: 1,
      name: '로보쿡 둔산점',
      category: '맛집',
      address: '대전 서구 둔산로 221',
      description: '로봇 테마 맛집',
      thumbnail: course1,
    },
    {
      id: 2,
      name: '카페라떼온더문',
      category: '카페',
      address: '대전 서구 월평동 123-4',
      description: '달빛 분위기 카페',
      thumbnail: course2,
    },
    {
      id: 3,
      name: '스윗포토존',
      category: '포토존',
      address: '대전 서구 탄방동 77',
      description: '감성 포토존',
      thumbnail: course3,
    },
  ],
};

const ImageMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('전체');
  const [viewMode, setViewMode] = useState('slide');
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [mapAddress, setMapAddress] = useState('');
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [placesByRegion, setPlacesByRegion] = useState(regionPlaces);
  const [editTargetId, setEditTargetId] = useState(null);
  const [newPlace, setNewPlace] = useState({
    name: '',
    category: '',
    address: '',
    description: '',
    image: null,
  });

  const slides = [
    { label: '데이트 코스 1', image: course1 },
    { label: '데이트 코스 2', image: course2 },
    { label: '데이트 코스 3', image: course3 },
  ];

  useEffect(() => {
    if (viewMode !== 'slide') return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [viewMode, slides.length]);

  useEffect(() => {
    if (window.google) {
      setGoogleLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAko5KNj0EEUrRO8tk3_OxVpxy6vQJKmi8&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleLoaded(true);
    document.body.appendChild(script);
  }, []);

  const renderMap = (address) => {
    const mapDiv = document.getElementById('map-container');
    if (!window.google || !mapDiv) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
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
  };

  useEffect(() => {
    if (showMap && googleLoaded && mapAddress) {
      const timeout = setTimeout(() => {
        renderMap(mapAddress);
      }, 100);
  
      return () => clearTimeout(timeout);
    }
  }, [showMap, googleLoaded, mapAddress]);
  

  const categories = ['전체', '맛집', '카페', '호텔', '관광지', '포토존'];

  const regions = [
    {
      name: '서울/경기',
      clip: 'polygon(35% 41%, 40% 27%, 45% 30%, 48% 36%, 44% 40%, 41% 44%, 38% 44%, 33% 35%)',
      labelTop: 35,
      labelLeft: 39,
    },
    {
      name: '강원도',
      clip: 'polygon(48% 18%, 58% 22%, 60% 30%, 55% 38%, 48% 33%, 44% 25%)',
      labelTop: 35,
      labelLeft: 56,
    },
    {
      name: '충청남도',
      clip: 'polygon(33% 36%, 38% 44%, 36% 52%, 28% 48%, 28% 38%)',
      labelTop: 52,
      labelLeft: 40,
    },
    {
      name: '전라남도',
      clip: 'polygon(26% 48%, 36% 53%, 33% 61%, 26% 61%)',
      labelTop: 77,
      labelLeft: 40,
    },
    {
      name: '경상남도',
      clip: 'polygon(40% 44%, 47% 40%, 56% 48%, 54% 58%, 44% 58%, 38% 52%)',
      labelTop: 70,
      labelLeft: 54,
    },
    {
      name: '제주도',
      clip: 'polygon(35% 88%, 39% 88%, 40% 92%, 36% 93%)',
      labelTop: 91,
      labelLeft: 38,
    },
    {
      name: '충청북도',
      clip: 'polygon(36% 47%, 40% 47%, 40% 50%, 36% 50%)',
      labelTop: 50,
      labelLeft: 49,
    },
    {
      name: '전라북도',
      clip: 'polygon(27% 60%, 33% 60%, 33% 63%, 27% 63%)',
      labelTop: 65,
      labelLeft: 42,
    },
    {
      name: '경상북도',
      clip: 'polygon(52% 56%, 58% 56%, 58% 60%, 52% 60%)',
      labelTop: 55,
      labelLeft: 60,
    },
  ];

  const filteredPlaces = selectedRegion
  ? (placesByRegion[selectedRegion] || []).filter(
      (place) => activeCategory === '전체' || place.category === activeCategory
    )
  : [];

    const updateNewPlace = (field, value) => {
      setNewPlace((prev) => ({ ...prev, [field]: value }));
    };
    
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;
    
      const previewURL = URL.createObjectURL(file);
    
      setNewPlace((prev) => ({
        ...prev,
        image: file,
        preview: previewURL,
      }));
    };
    
    const handleRegister = () => {
      if (!newPlace.image) {
        alert('이미지를 업로드해주세요.');
        return;
      }
    
      const newItem = {
        ...newPlace,
        id: editTargetId ?? Date.now(), // 수정이면 기존 id 유지, 아니면 새로 발급
        address: selectedRegion,
        region: selectedRegion,
        thumbnail: typeof newPlace.image === 'string'
          ? newPlace.image // 기존 수정일 경우 문자열 유지
          : URL.createObjectURL(newPlace.image), // 새 이미지 업로드일 경우 변환
      };
    
      const updatedList = editTargetId
        ? (placesByRegion[selectedRegion] || []).map(item =>
            item.id === editTargetId ? newItem : item
          )
        : [...(placesByRegion[selectedRegion] || []), newItem];
    
      setPlacesByRegion({
        ...placesByRegion,
        [selectedRegion]: updatedList,
      });
    
      // 상태 초기화
      setShowAddForm(false);
      setEditTargetId(null); // 👈 꼭 초기화해줘야 합니다!
      setNewPlace({ name: '', category: '', address: '', description: '', image: null });
    };
    
    const handleEdit = (place) => {
      setShowAddForm(true);
      setEditTargetId(place.id);
      setNewPlace({
        name: place.name,
        category: place.category,
        address: place.address,
        description: place.description,
        image: place.thumbnail,
      });
    };

    const handleCloseForm = () => {
      setShowAddForm(false);
      setEditTargetId(null);
      setNewPlace({ name: '', category: '', address: '', description: '', image: null });
    };
    
    const handleDelete = (id) => {
      const confirmed = window.confirm('정말 삭제하시겠습니까?');
    
      if (!confirmed) return;
    
      const updatedList = placesByRegion[selectedRegion].filter(place => place.id !== id);
      setPlacesByRegion({
        ...placesByRegion,
        [selectedRegion]: updatedList,
      });
    
      if (selectedPlaceId === id) {
        setSelectedPlaceId(null);
      }
    };
  return (
    <Container>
      <SlideBoxWrapper>
        <SlideBox $mode={viewMode}>
          {viewMode === 'slide' && (
            <SlideImage>
              <NavButton
                $left
                onClick={() => setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
              >
                ◀
              </NavButton>
              <img
                src={slides[slideIndex].image}
                alt={slides[slideIndex].label}
                style={{ width: '100%', height: 'auto' }}
              />
              <NavButton
                $right
                onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
              >
                ▶
              </NavButton>
            </SlideImage>
          )}

          {viewMode === 'list' && (
            <>
              <CategoryTabs>
                {categories.map((cat) => (
                  <Tab key={cat} $active={activeCategory === cat} onClick={() => setActiveCategory(cat)}>
                    {cat}
                  </Tab>
                ))}
              </CategoryTabs>
              
              <PlaceGrid>
                {filteredPlaces.map((place) => (
                  <React.Fragment key={place.id}>
                    <PlaceCard onClick={() => setSelectedPlaceId(selectedPlaceId === place.id ? null : place.id)}>
                      <PlaceThumbnail src={place.thumbnail} alt={place.name} />
                      <PlaceInfo>
                        <span className="category">{place.category}</span>
                        <p className="title">{place.name}</p>
                        <p className="address">{place.address}</p>
                      </PlaceInfo>
                    </PlaceCard>

                    {selectedPlaceId === place.id && (
                      <PlaceDetail>
                        <div className="header">
                          <span>{place.category}</span>
                          <button onClick={() => setSelectedPlaceId(null)}>✕</button>
                        </div>
                        <p><strong>{place.name}</strong></p>
                        <p>{place.address}</p>
                        <p>{place.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                          <p style={{ fontSize: '0.85rem', color: '#555' }}>{place.address}</p>
                          <button
                            onClick={() => {
                              setShowMap(true);
                              setMapAddress(place.address);
                              if (googleLoaded) {
                                renderMap(place.address);
                              }
                            }}
                            style={{
                              backgroundColor: '#ffebee',
                              color: '#ff5777',
                              fontSize: '0.75rem',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              border: 'none',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                            }}
                          >
                            지도 보기
                          </button>
                          <button
                            onClick={() => handleEdit(place)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#ff5777',
                              fontSize: '0.9rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            ✏️ <span style={{ fontSize: '0.85rem' }}>수정</span>
                          </button>
                          <button
                            onClick={() => handleDelete(place.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#aaa',
                              fontSize: '0.9rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            🗑️ <span style={{ fontSize: '0.85rem' }}>삭제</span>
                          </button>
                        </div>
                      </PlaceDetail>
                    )}
                  </React.Fragment>
                ))}
              </PlaceGrid>
              {viewMode === 'list' && !showAddForm && (
  <button onClick={() => setShowAddForm(true)}>+ 장소 추가</button>
)}
            </>
          )}

{showAddForm && (
  <PlaceFormWrapper>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h2>MAP 등록</h2>

    {selectedRegion && (
  <p style={{ fontSize: '0.85rem', color: '#888', margin: '8px 0' }}>
    선택된 지역: <strong>{selectedRegion}</strong>
  </p>
)}

    <button
        onClick={() => setShowAddForm(false)}
        style={{
          background: '#ff5777',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '4px 10px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        ✕
      </button>
    </div>
    
    <ImageUpload>
    {newPlace.preview ? (
    <img
      src={newPlace.preview}
      alt="미리보기"
      style={{ maxWidth: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
    />
  ) : (
    <>
      <label htmlFor="upload-image">+</label>
      <input type="file" id="upload-image" accept="image/*" onChange={handleImageUpload} />
    </>
  )}
    </ImageUpload>

    <Select value={newPlace.category} onChange={(e) => updateNewPlace('category', e.target.value)}>
      <option value="">카테고리 선택</option>
      <option value="맛집">맛집</option>
      <option value="카페">카페</option>
      <option value="호텔">호텔</option>
      <option value="관광지">관광지</option>
      <option value="포토존">포토존</option>
    </Select>

    <Input placeholder="상호명" value={newPlace.name} onChange={(e) => updateNewPlace('name', e.target.value)} />
    <Input placeholder="설명" value={newPlace.description} onChange={(e) => updateNewPlace('description', e.target.value)} />

    <SubmitBtn onClick={handleRegister}>등록하기</SubmitBtn>
  </PlaceFormWrapper>
)}

        </SlideBox>

        {viewMode === 'slide' && <Description>지역 이름은 지역별 데이트 장소 추천입니다</Description>}
      </SlideBoxWrapper>

      <MapWrapper>
        <MapImage src={koreaMap} alt="대한민국 지도" />
        {regions.map((region, i) => (
          <React.Fragment key={i}>
            <Region
              $clip={region.clip}
              $active={selectedRegion === region.name}
              onClick={() => {
                setSelectedRegion(region.name);
                setViewMode('list');
              }}
            />
            <Label
              $top={region.labelTop}
              $left={region.labelLeft}
              onClick={() => {
                setSelectedRegion(region.name);
                setViewMode('list');
              }}
            >
              {region.name}
            </Label>
          </React.Fragment>
        ))}
      </MapWrapper>

      {showMap && (
        <MapOverlay>
          <div id="map-container" style={{ width: '100%', height: '100%' }}></div>
          <CloseMapButton onClick={() => setShowMap(false)}>✕</CloseMapButton>
        </MapOverlay>
      )}
    </Container>
  );
};

export default ImageMap;
