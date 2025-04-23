import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MapPicker from '../Story/MapPicker';
import {
  uploadRecommendPlaceImages,
  saveRecommendPlace,
  getAllRecommendPlaces,
  getPlacesByRegion,
  getPlacesByRegionAndCategory,
  deleteRecommendPlace,
  updateRecommendPlace,
} from '../api1';
import { useUserStore } from '../Login/Login';
import axios from 'axios';
import { registerCategoryMapping } from '../api1';
import { IconClose, IconImage } from '../Icons';

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 85vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 10px;

  position: relative;
  &::-webkit-scrollbar {
    width: 7px; /* 세로 스크롤바의 너비를 8px로 설정 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #727272; /* 핸들의 색상 */
    border-radius: 10px;
  }
`;

const RegionTitle = styled.h3`
  font-size: 3rem;
  text-align: center;
  font-weight: 700;
  margin-bottom: 15px;
  margin-top: 15px;
  color: white;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
`;

const AddButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  svg {
    width: 60px;
    height: 60px;
    stroke: #0c0c0c;
    fill: none;
    transition: all 0.3s ease;
  }

  &:hover svg {
    stroke: #858585;
    transform: rotate(90deg);
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: -10px;
  &:hover {
    color: #7e7e7e;
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
  background: #ffffff;
  padding: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
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
    color: #ffffff;
    font-size: 1rem;
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
  background: #ffffff;
  padding: 12px 16px;
  position: relative;
  .close {
    position: absolute;
    top: 0;
    bottom: -100px;
  }
`;

const DetailText = styled.p`
  font-size: 0.85rem;
  font-weight: 700;
  margin: 4px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 10px;
`;

const SmallBtn = styled.button`
  background: #0c0c0c;
  color: #ffffff;
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
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  position: relative;
  height: 730px;
  padding-bottom: 40px;
  input,
  input,
  select {
    width: 100%;
    margin: 6px 0;
    padding: 6px 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
  textarea {
    width: 100%;
    height: 120px;
    resize: none;
    margin: 6px 0;
    padding: 6px 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    outline: none;
  }
  #file-upload {
    display: none;
  }
  #file-uploads {
    display: none;
  }
  img.preview {
    width: 100%;
    border-radius: 8px;
    margin-top: 10px;
  }
  .imgwrap {
    width: 100%;
    position: relative;
    border-radius: 8px;
    .fileinput {
      position: absolute;
      bottom: 2px;
      right: 0;
      padding-right: 5px;
      z-index: 400;
      cursor: pointer;
    }
  }
  .edit {
    position: absolute;
    bottom: 10px;
    left: 40%;
    font-weight: 700;
    background-color: black;
    width: 100px;
    color: white;
    font-size: 0.8rem;
    height: 30px;
    &:hover {
      color: #ddd;
    }
  }

  .imgwraps {
    width: 100%;
    height: 350px;
    position: relative;
    border: 1px solid #ddd;
    border-radius: 8px;
    .fileinput {
      position: absolute;
      bottom: 2px;
      right: 0;
      padding-right: 5px;
      z-index: 400;
      cursor: pointer;
    }
    .fixed {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: none;
    }
  }
  .addbtn {
    position: absolute;
    bottom: 5px;
    left: 40%;
    font-weight: 700;
    background-color: black;
    width: 100px;
    color: white;
    font-size: 0.8rem;
    height: 30px;
    &:hover {
      color: #ddd;
    }
  }
`;

const AddressRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  input {
    flex: 1;
  }
`;

const SearchButton = styled.button`
  background-color: #070707;
  border: none;
  color: white;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.8rem;
  height: 90%;
  &:hover {
    color: #797979;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30%;
  height: 600px;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 9999;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const CategoryCheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0;
`;

const CategoryCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  input {
    width: 50px;
  }
`;

const CategoryFilterGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
  width: 95%;
  margin: 0 auto;
`;

const CategoryButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  width: 80px;
  font-weight: bold;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#8c0d17' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#fff' : '#333')};
`;

const FixedSizeImage = styled.img`
  width: 500px;
  height: 350px;
  object-fit: cover;
  border-radius: 8px;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 10px auto;
`;

const SliderControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 8px;
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
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const { user } = useUserStore();
  const isAdmin = user?.authority === 'ROLE_ADMIN';
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState({});

  const showPrevImage = (placeId, total) => {
    const currentIndex = activeImageIndex[placeId] || 0;
    setActiveImageIndex((prev) => ({
      ...prev,
      [placeId]: (currentIndex - 1 + total) % total,
    }));
  };

  const showNextImage = (placeId, total) => {
    const currentIndex = activeImageIndex[placeId] || 0;
    setActiveImageIndex((prev) => ({
      ...prev,
      [placeId]: (currentIndex + 1) % total,
    }));
  };

  const [newPlace, setNewPlace] = useState({
    name: '',
    category: '',
    address: '',
    description: '',
    images: [],
    preview: '',
  });

  const getFileName = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 1]?.trim() || '';
  };

  let places = null;
  const categories = ['맛집', '카페', '호텔', '관광지', '포토존'];
  const [activeCategory, setActiveCategory] = useState('전체');

  useEffect(() => {
    if (window.google) {
      setGoogleLoaded(true);
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
    if (!selectedRegion) return;

    if (activeCategory === '전체') {
      getPlacesByRegion(selectedRegion).then((data) => {
        setFilteredPlaces(removeDuplicatesById(data));
      });
    } else {
      getPlacesByRegionAndCategory(selectedRegion, activeCategory).then(
        (data) => {
          setFilteredPlaces(removeDuplicatesById(data));
        }
      );
    }
  }, [selectedRegion, activeCategory]);

  useEffect(() => {
    if (selectedRegion) {
      getPlacesByRegion(selectedRegion).then((data) => {
        console.log('📡 지역 장소 데이터 받아옴:', selectedRegion, data);
        setRegionPlaces((prev) => ({
          ...prev,
          [selectedRegion]: data,
        }));
      });
    }
  }, [selectedRegion]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages(files); // 여러 이미지 저장
      setNewPlace((prev) => ({
        ...prev,
        images: files, // 썸네일용 대표 이미지
        preview: URL.createObjectURL(files[0]),
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
    setSelectedCategories(place.categories || []);
    setShowForm(true);
    setNewPlace({
      name: place.name,
      category: place.category,
      address: place.address,
      description: place.description,
      preview:
        place.mediaUrl && place.mediaUrl.length > 0
          ? `${place.mediaUrl[0].mediaUrl}`
          : '',
      mediaUrl: place.mediaUrl || [],
    });
  };

  const handleSavePlace = async () => {
    try {
      const placeDTO = {
        id: editingId,
        name: newPlace.name,
        category: newPlace.category,
        address: newPlace.address,
        description: newPlace.description,
        city: selectedRegion,
        latitude: 0,
        longitude: 0,
        mediaUrl: newPlace.mediaUrl || [],
      };

      if (editingId) {
        const updatedDTO = { ...placeDTO, id: editingId };
        if (newPlace.image) {
          await uploadRecommendPlaceImages(updatedDTO, [newPlace.image]);
        } else {
          await updateRecommendPlace(updatedDTO); // 이미지 변경 없을 때
        }
        alert('수정 성공');
      } else {
        await saveRecommendPlace(placeDTO);
        alert('등록 성공');
      }

      const updatedPlaces = await getPlacesByRegion(selectedRegion);
      setRegionPlaces((prev) => ({
        ...prev,
        [selectedRegion]: updatedPlaces,
      }));
      setFilteredPlaces(updatedPlaces);

      setNewPlace({
        name: '',
        category: '',
        address: '',
        description: '',
        image: null,
        preview: '',
      });
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.error('저장 실패:', err);
      alert('저장 실패!');
    }
  };

  const handleDelete = async (id) => {
    console.log(' 삭제 요청 ID:', id);
    try {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        await deleteRecommendPlace(id);
        const updated = await getPlacesByRegion(selectedRegion);
        setRegionPlaces((prev) => ({
          ...prev,
          [selectedRegion]: updated,
        }));
        setFilteredPlaces(updated);
        alert('삭제 완료!');
      }
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류 발생!');
    }
  };

  const FileInput = () => {
    document.getElementById('file-upload').click();
  };
  const FileInputs = () => {
    document.getElementById('file-uploads').click();
  };

  const removeDuplicatesById = (arr) => {
    const seen = new Set();
    return arr.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  };

  const handleRegister = async () => {
    try {
      if (!newPlace.images || newPlace.images.length === 0) {
        alert('이미지를 업로드해주세요.');
        return;
      }

      const placeDTO = {
        name: newPlace.name,
        address: newPlace.address,
        description: newPlace.description,
        category: selectedCategories[0] || '', // 대표 카테고리 하나만 백업용
        city: selectedRegion,
        latitude: 0,
        longitude: 0,
      };

      const savedPlace = await uploadRecommendPlaceImages(
        placeDTO,
        newPlace.images
      );

      if (savedPlace?.id && selectedCategories.length > 0) {
        await registerCategoryMapping(savedPlace.id, selectedCategories);

        const updatedPlaces = await getPlacesByRegion(selectedRegion);
        setRegionPlaces((prev) => ({
          ...prev,
          [selectedRegion]: updatedPlaces,
        }));

        alert(' 등록 성공!');

        setNewPlace({
          name: '',
          category: '',
          address: '',
          description: '',
          image: null,
          preview: '',
        });
        setShowForm(false);
      }
    } catch (err) {
      console.error('등록 실패:', err);
    }
  };

  if (!selectedRegion) return <Wrapper>지역을 선택해주세요</Wrapper>;

  return (
    <Wrapper>
      <RegionTitle>{selectedRegion} 장소</RegionTitle>

      <CategoryFilterGroup>
        {['전체', ...categories].map((cat) => (
          <CategoryButton
            key={cat}
            onClick={() => setActiveCategory(cat)}
            $active={activeCategory === cat}
          >
            {cat}
          </CategoryButton>
        ))}
      </CategoryFilterGroup>

      <ListContainer>
        {filteredPlaces?.map((place) => (
          <React.Fragment key={`place-${place.id}`}>
            <Card
              onClick={() =>
                setSelectedId(selectedId === place.id ? null : place.id)
              }
            >
              <Thumbnail
                src={
                  place.mediaUrl && place.mediaUrl.length > 0
                    ? `${place.mediaUrl[0].mediaUrl}`
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
                <CloseBtn onClick={() => setSelectedId(null)}>
                  <IconClose />
                </CloseBtn>
                <DetailText>{place.description}</DetailText>
                {place.mediaUrl && place.mediaUrl.length > 0 ? (
                  <SliderWrapper>
                    <FixedSizeImage
                      src={`${
                        place.mediaUrl[activeImageIndex[place.id] || 0]
                          ?.mediaUrl
                      }`}
                      alt="장소 이미지"
                    />
                    {place.mediaUrl.length > 1 && (
                      <SliderControls>
                        <SmallBtn
                          onClick={() =>
                            showPrevImage(place.id, place.mediaUrl.length)
                          }
                        >
                          ← 이전
                        </SmallBtn>
                        <SmallBtn
                          onClick={() =>
                            showNextImage(place.id, place.mediaUrl.length)
                          }
                        >
                          다음 →
                        </SmallBtn>
                      </SliderControls>
                    )}
                  </SliderWrapper>
                ) : (
                  <Thumbnail
                    className="large"
                    src="https://via.placeholder.com/300x200?text=No+Image"
                    alt="기본 이미지"
                  />
                )}
                <ButtonGroup>
                  <SmallBtn
                    onClick={() => handleShowMap(place.id, place.address)}
                  >
                    지도 보기
                  </SmallBtn>
                  {isAdmin && (
                    <>
                      <SmallBtn onClick={() => handleEdit(place)}>
                        ✏ 수정
                      </SmallBtn>
                      <SmallBtn onClick={() => handleDelete(place.id)}>
                        🗑 삭제
                      </SmallBtn>
                    </>
                  )}
                </ButtonGroup>

                {mapId === place.id && (
                  <>
                    <CloseBtn onClick={() => setMapId(null)} className="close">
                      ✖ 지도 닫기
                    </CloseBtn>
                    <MapWrapper id={`map-${place.id}`} />
                  </>
                )}
              </Detail>
            )}

            {isAdmin && editingId === place.id && (
              <Form>
                <CloseBtn
                  onClick={() => {
                    setEditingId(null);
                    setNewPlace({
                      name: '',
                      category: '',
                      address: '',
                      description: '',
                      image: null,
                      preview: '',
                    });
                  }}
                >
                  <IconClose />
                </CloseBtn>
                <CategoryCheckboxGroup>
                  {categories.map((cat) => (
                    <CategoryCheckboxLabel key={cat}>
                      <input
                        type="checkbox"
                        value={cat}
                        checked={selectedCategories.includes(cat)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const value = e.target.value;
                          setSelectedCategories((prev) =>
                            checked
                              ? Array.from(new Set([...prev, value]))
                              : prev.filter((c) => c !== value)
                          );
                        }}
                      />
                      {cat}
                    </CategoryCheckboxLabel>
                  ))}
                </CategoryCheckboxGroup>
                <AddressRow>
                  <input
                    type="text"
                    placeholder="주소"
                    value={newPlace.address}
                    onChange={(e) =>
                      setNewPlace({ ...newPlace, address: e.target.value })
                    }
                  />
                  <SearchButton
                    type="button"
                    onClick={() => setShowMapPicker(true)}
                  >
                    장소검색
                  </SearchButton>
                </AddressRow>
                {showMapPicker && (
                  <ModalWrapper>
                    <MapPicker
                      onSelect={({ address, lat, lng }) => {
                        setNewPlace((prev) => ({
                          ...prev,
                          address,
                          latitude: lat,
                          longitude: lng,
                        }));
                        setAddress(address);
                        setLat(lat);
                        setLng(lng);
                        setShowMapPicker(false);
                      }}
                    />
                  </ModalWrapper>
                )}
                <textarea
                  placeholder="설명"
                  value={newPlace.description}
                  onChange={(e) =>
                    setNewPlace({ ...newPlace, description: e.target.value })
                  }
                />
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  onChange={handleImage}
                />
                {newPlace.preview && (
                  <div className="imgwrap">
                    <img
                      className="preview"
                      src={newPlace.preview}
                      alt="미리보기"
                    />
                    <div className="fileinput" onClick={FileInput}>
                      <IconImage />
                    </div>
                  </div>
                )}
                <AddButton
                  onClick={() => {
                    if (editingId) {
                      handleSavePlace();
                    } else {
                      handleRegister();
                    }
                  }}
                  className="edit"
                >
                  {editingId ? '수정하기' : '등록하기'}
                </AddButton>
              </Form>
            )}
          </React.Fragment>
        ))}
      </ListContainer>
      {isAdmin && !showForm && (
        <AddButton
          onClick={() => {
            setShowForm(true);
            setSelectedId(null);
            setEditingId(null);
          }}
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
      )}
      {isAdmin && showForm && editingId === null && (
        <Form>
          <CloseBtn onClick={() => setShowForm(false)}>✖</CloseBtn>
          <input
            type="text"
            placeholder="이름"
            value={newPlace.name}
            onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
          />
          <CategoryCheckboxGroup>
            {categories.map((cat) => (
              <CategoryCheckboxLabel key={cat}>
                <input
                  type="checkbox"
                  value={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const value = e.target.value;
                    setSelectedCategories((prev) =>
                      checked
                        ? Array.from(new Set([...prev, value]))
                        : prev.filter((c) => c !== value)
                    );
                  }}
                />
                {cat}
              </CategoryCheckboxLabel>
            ))}
          </CategoryCheckboxGroup>

          <AddressRow>
            <input
              type="text"
              placeholder="주소"
              value={newPlace.address}
              onChange={(e) =>
                setNewPlace({ ...newPlace, address: e.target.value })
              }
            />
            <SearchButton type="button" onClick={() => setShowMapPicker(true)}>
              장소검색
            </SearchButton>
          </AddressRow>

          {showMapPicker && (
            <ModalWrapper>
              <MapPicker
                onSelect={({ address, lat, lng }) => {
                  setNewPlace((prev) => ({
                    ...prev,
                    address,
                    latitude: lat,
                    longitude: lng,
                  }));
                  setAddress(address);
                  setLat(lat);
                  setLng(lng);
                  setShowMapPicker(false);
                }}
              />
            </ModalWrapper>
          )}

          <textarea
            placeholder="설명"
            value={newPlace.description}
            onChange={(e) =>
              setNewPlace({ ...newPlace, description: e.target.value })
            }
          />
          <input
            type="file"
            id="file-uploads"
            multiple
            onChange={handleImage}
          />
          <div className="imgwraps">
            <FixedSizeImage src={newPlace.preview} className="fixed" />
            <div className="fileinput" onClick={FileInputs}>
              <IconImage />
            </div>
          </div>
          <AddButton onClick={handleRegister} className="addbtn">
            등록하기
          </AddButton>
        </Form>
      )}
    </Wrapper>
  );
}

export default PlaceListPart;
