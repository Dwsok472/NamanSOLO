import React, { useState , useEffect } from 'react';
import styled from 'styled-components';
import koreaMap from '../components/img/map1.jpg';
import course1 from '../components/img/course1.jpg';
import course2 from '../components/img/course2.jpg';
import course3 from '../components/img/course3.jpg';

const Container = styled.div`
  display: flex; // 좌우 정렬
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1100px;
  margin: 40px auto;
  gap: 20px;
`;

const SlideBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; // 핵심!
  flex: 1;
  max-width: 580px;
`;

const SlideBox = styled.div`
  flex: 1;
  max-width: 580px;
  background-color: #ffe9ea;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${({ $mode }) =>
    $mode === 'slide'
      ? `
    height: 540px;
    overflow: hidden;
  `
      : `
    max-height: 720px;
    overflow-y: auto;
  `}
`;

const SlideImage = styled.div`
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
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }

  ${({ $left }) => $left && `left: 16px;`}
  ${({ $right }) => $right && `right: 16px;`}
`;



const MapWrapper = styled.div`
  position: relative;
  flex: 1.2;
  max-width: 72\                0px;
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
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: rgba(252, 1, 76, 0.43);
  }
`;

const Label = styled.div`
  position: absolute;
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  font-weight: bold;
  color: #333;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 8px;
  border-radius: 5px;
  z-index: 3;
  transition: all 0.2s ease;

  &:hover {
    background: #ff91a4;
    color: white;
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

const Description = styled.div`
  margin-top: 16px;
  background: #fff6f7;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #444;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
`;

const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const EditHeader = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

const ImagePlaceholder = styled.div`
  background: #ffe9ea;
  height: 140px;
  border-radius: 10px;
  margin-bottom: 16px;
`;

const Info = styled.p`
  font-size: 0.9rem;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const Select = styled.select`
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
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  padding: 12px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const PlaceThumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;


const PlaceInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .category {
    color: #ff5777;
    font-size: 0.9rem;
  }

  .title {
    font-weight: bold;
    font-size: 1rem;
    margin-top: 4px;
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
  margin-top: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-weight: bold;
  }

  p {
    font-size: 0.9rem;
    margin: 2px 0;
  }
`;

const NoData = styled.div`
  text-align: center;
  color: #aaa;
  margin-top: 40px;
`;

const SelectedPlaceInfo = styled.div`
  background: #fffdfd;
  border: 2px solid #ffe0e5;
  border-radius: 10px;
  padding: 16px;
  margin: 10px 0 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
`;

const DescriptionBox = styled.p`
  margin-top: 10px;
  color: #333;
  font-size: 0.9rem;
  line-height: 1.5;
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
  const [editingRegion, setEditingRegion] = useState(null);
  const [activeCategory, setActiveCategory] = useState('전체');
  const [viewMode, setViewMode] = useState('slide');
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  const slides = [
    {
      label: '데이트 코스 1',
      image: course1,
    },
    {
      label: '데이트 코스 2',
      image: course2,
    },
    {
      label: '데이트 코스 3',
      image: course3,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [slides.length]);

  const categories = ['전체', '맛집', '카페', '호텔', '관광지', '포토존'];

  const regions = [
    {
      name: '서울/경기',
      clip: 'polygon(35% 41%, 40% 27%, 45% 30%, 48% 36%, 44% 40%, 41% 44%, 38% 44%, 33% 36%)',
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
  ? (regionPlaces[selectedRegion] || []).filter(place =>
      activeCategory === '전체' ? true : place.category === activeCategory
    )
  : [];


  return (
    <Container>
    <SlideBoxWrapper>
  <SlideBox $mode={viewMode}>
    {viewMode === 'slide' && (
      <>
        <SlideImage>
          <SlideWrapper>
            <NavButton
              $left
              onClick={() =>
                setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
              }
            >
              ◀
            </NavButton>
            <img
              src={slides[slideIndex].image}
              alt={slides[slideIndex].label}
              style={{ width: '100%', height: 'auto', maxWidth: '800px' }}
            />
            <NavButton
              $right
              onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
            >
              ▶
            </NavButton>
          </SlideWrapper>
        </SlideImage>
      </>
    )}

    {viewMode === 'list' && (
      <>
        <CategoryTabs>
          {categories.map((cat) => (
            <Tab
              key={cat}
              $active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Tab>
          ))}
        </CategoryTabs>

        <PlaceGrid>
          {filteredPlaces.map((place) => (
            <React.Fragment key={place.id}>
              <PlaceCard
                onClick={() =>
                  setSelectedPlaceId(selectedPlaceId === place.id ? null : place.id)
                }
              >
                <PlaceThumbnail src={place.thumbnail} alt={place.name} />
                <PlaceInfo>
                  <strong className="category">{place.category}</strong>
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
                </PlaceDetail>
              )}
            </React.Fragment>
          ))}
        </PlaceGrid>
      </>
    )}
  </SlideBox>

  {viewMode === 'slide' && (
    <Description>지역 이름은 지역별 데이트 장소 추천입니다</Description>
  )}
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
                setEditingRegion(region.name);
                setViewMode('list');
              }}
              title={region.name}
            />
            <Label
              $top={region.labelTop}
              $left={region.labelLeft}
              onClick={() => {
                setSelectedRegion(region.name);
                setEditingRegion(region.name);
                setViewMode('list');
              }}
            >
              {region.name}
            </Label>
          </React.Fragment>

          
        ))}
      </MapWrapper>
    </Container>
  );
};

export default ImageMap;
