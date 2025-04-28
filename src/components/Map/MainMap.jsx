import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import mapjson from '../img/map.json';

// import background from "../img/back2.jpg";
import place from '../img/place.png';
import question from '../img/question.png';
import heart from '../img/heart.png';
import course1 from '../img/banner1.jpg';
import course2 from '../img/banner2.jpg';
import course3 from '../img/banner3.jpg';
import leftkey from '../img/leftkey.png';
import rightkey from '../img/rightkey.png';

import ImageMapMapPart from './ImageMapMapPart';
import PlaceListPart from './PlaceListPart';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentBox = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const LeftBox = styled.div`
  flex: 2.5;
  width: 50%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-right: 2px dashed #ffa8a8; */
  pointer-events: all;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-right: none;
    /* border-bottom: 2px dashed #ffa8a8; */
  }
`;

const RightBox = styled.div`
  flex: 1.5;
  width: 50%;
  height: 100%;
  background-color: #f6f2ea;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-left: 2px dashed #75c7c3; */
  pointer-events: none;
  margin-top: 30px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-left: none;
    /* border-top: 2px dashed #75c7c3; */
  }
`;


const InnerBox = styled.div`
  width: 100%;
  max-width: ${({ $full }) => ($full ? 'none' : '600px')};
  padding: 40px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ScrollWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const CardWrapper = styled.div`
  width: 1000px;
  height: auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  position: relative;
  margin-left: 120px;
  display: flex;
  flex-direction: column;
`;


const AnimationArea = styled.div`
  width: 100%;
  height: 650px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LottieWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  padding: 20px 30px;
  border-radius: 12px;
  text-align: center;
  width: 80%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  h3 {
    font-size: 1.5rem;
    color: #ffffff;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #c9c9c9;
    white-space: pre-line;
  }
`;

const StyledLottie = styled(Lottie)`
  width: 100%;
  height: 100%;
`;

const MapCardWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MapAnimationArea = styled.div`
  width: 100%;
  height: 650px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LabelGuide = styled.div`
  margin-top: 20px;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 14px;

  img {
    width: 30px;
    height: 30px;
    margin-bottom: 8px;
  }

  p {
    margin: 0;
    text-align: center;
    font-size: 14px;
    color: #444;
  }
`;

const GuideText = styled.p`
  font-size: 16px; /* 글자 좀 키우고 */
  color: #ff9900; /* 주황색 계열 강조 */
  font-weight: bold; /* 굵게 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* 살짝 그림자 효과 */
  margin: 0;
`;


function MainMap() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const categories = ['전체', '맛집', '카페', '호텔', '관광지', '포토존'];
  const [regionPlaces, setRegionPlaces] = useState({});
  const [categoryPlaces, setCategoryPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const [regionPlaces, setRegionPlaces] = useState({
  //   충청남도: [
  //     {
  //       id: 1,
  //       name: "로보쿡 둔산점",
  //       category: "맛집",
  //       address: "대전 서구 둔산로 221",
  //       description: "로봇 테마 맛집",
  //       thumbnail: course1,
  //     },
  //     {
  //       id: 2,
  //       name: "카페라떼온더문",
  //       category: "카페",
  //       address: "대전 서구 월평동 123-4",
  //       description: "달빛 분위기 카페",
  //       thumbnail: course2,
  //     },
  //     {
  //       id: 3,
  //       name: "스윗포토존",
  //       category: "포토존",
  //       address: "대전 서구 탄방동 77",
  //       description: "감성 포토존",
  //       thumbnail: course3,
  //     },
  //   ],
  // });

  const slides = [
    { label: '데이트 코스 1', image: course1 },
    { label: '데이트 코스 2', image: course2 },
    { label: '데이트 코스 3', image: course3 },
  ];

  const scrollToContent = () => {
    const element = document.getElementById('contentBox');
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 78;
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 500;
      let startTime = null;
      const easedProgress = (t) => t * (2 - t);

      const animateScroll = (currentTime) => {
        if (startTime === null) {
          startTime = currentTime;
        }
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const currentPosition =
          startPosition + distance * easedProgress(progress);

        window.scrollTo(0, currentPosition);
        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        }
      };

      setTimeout(() => {
        requestAnimationFrame(animateScroll);
      }, 100);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <Container>
      {/* <BackgroundImage src={background} alt="background" /> */}

      {/* <BannerBox>
        <SlideImage>
          <Focus onClick={scrollToContent}>보러가기▶</Focus>
          <NavButton
            $left
            onClick={() =>
              setSlideIndex((prev) =>
                prev === 0 ? slides.length - 1 : prev - 1
              )
            }
          >
            <img src={leftkey} alt="prev" />
          </NavButton>
          <img
            src={slides[slideIndex].image}
            alt={slides[slideIndex].label}
            className="image"
          />
          <NavButton
            $right
            onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
          >
            <img src={rightkey} alt="next" />
          </NavButton>
        </SlideImage>
      </BannerBox> */}

      <ContentBox id="contentBox">
        <LeftBox>
          <InnerBox $full>
            {!selectedRegion ? (
              <>
               <CardWrapper>
               <AnimationArea>
                <LottieWrapper>
                  <StyledLottie
                    animationData={mapjson}
                    loop
                    speed={0.5}
                  />
                </LottieWrapper>
              </AnimationArea>
                <TextOverlay>
                  <h3>마음이 가는 지역을 클릭해보세요</h3>
                  <p>두분의 특별한 하루가 시작됩니다.</p>
                </TextOverlay>
              </CardWrapper>

              </>
            ) : (
              <ScrollWrapper key={selectedRegion || 'default'}>
                <PlaceListPart
                  selectedRegion={selectedRegion}
                  regionPlaces={regionPlaces}
                  setRegionPlaces={setRegionPlaces}
                  selectedCategory={selectedCategory}
                />
              </ScrollWrapper>
            )}
          </InnerBox>
        </LeftBox>

        <RightBox>
          <InnerBox $full>
            <MapCardWrapper>
              <MapAnimationArea>
                <LottieWrapper style={{ pointerEvents: 'none' }}>
                  <ImageMapMapPart onRegionClick={setSelectedRegion} />
                </LottieWrapper>
              </MapAnimationArea>
            </MapCardWrapper>

            <LabelGuide>
              <img src={place} alt="place" />
              <GuideText>아이콘을 클릭하여 추천장소를 확인해보세요.</GuideText>
            </LabelGuide>
          </InnerBox>
        </RightBox>


      </ContentBox>
    </Container>
  );
}

export default MainMap;
