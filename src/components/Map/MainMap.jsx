import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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

// const BackgroundImage = styled.img`
//   width: 100%;
//   position: absolute;
//   top: 150px;
//   left: 0;
//   z-index: -1;
//   opacity: 0.3;
// `;

const BannerBox = styled.div`
  width: 100vw;
  position: relative;
  top: 0;
  z-index: 1;
`;

const SlideImage = styled.div`
  position: relative;
  width: 100%;
  background-color: #ffffff;

  .image {
    width: 100%;
    height: 350px;
    object-fit: cover;
    opacity: 0.8;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
  }
`;

const Focus = styled.button`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  background-color: #ff9996;
  border-radius: 30px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: white;
    border: 1px solid #ff9996;
    color: #141414;
  }
`;

const NavButton = styled.button`
  position: absolute;
  bottom: 16px;
  border: none;
  font-size: 1.2rem;
  padding: 8px 12px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  ${({ $left }) => $left && `left: 16px;`}
  ${({ $right }) => $right && `right: 16px;`}
  background: transparent;

  img {
    object-fit: cover;
    width: 20px;
    height: 20px;
  }

  &:focus {
    outline: none;
  }
`;

const ContentBox = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px); /* 뷰포트 기준 높이 설정 */
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const LeftBox = styled.div`
  flex: 3;
  width: 50%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 2px dashed #ffa8a8;
  pointer-events: all;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 2px dashed #ffa8a8;
  }
`;

const RightBox = styled.div`
  flex: 1;
  width: 50%;
  height: 100%;
  background-color: #75c7c3;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 2px dashed #75c7c3;
  pointer-events: none;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-left: none;
    border-top: 2px dashed #75c7c3;
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

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  margin-left: 130px;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    /* text-align: start; */
  }

  .hash {
    font-weight: 700;
    padding: 8px;
    text-decoration: underline;
    text-decoration-color: #ffa8a8;
    text-decoration-thickness: 2px;
    /* text-align: start; */
  }

  .highlight {
    color: #ff1778;
    text-decoration: none;
  }
`;

const HashWrap = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: start;
`;

const BoxWrap = styled.div`
  padding: 10px;
  align-items: center;
  margin-top: 160px;
  margin-left: 110px;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;

  .place,
  .question,
  .heart {
    object-fit: cover;
    width: 50px;
    height: 50px;
  }
`;

const Text = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  padding-left: 10px;
`;

const ScrollWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
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
                <Wrap>
                  <h1>
                    <span className="highlight">가장 행복한 하루</span>를 <br />
                    보낼 오늘
                  </h1>

                  <HashWrap>
                    <span className="hash">#데이트</span>
                    <span className="hash">#이색체험</span>
                    <span className="hash">#핫플</span>
                    <span className="hash">#힐링</span>
                  </HashWrap>
                </Wrap>
                <BoxWrap>
                  <Box>
                    <img src={place} className="place" alt="place" />
                    <Text>데이트할 장소에 대한 추천이 필요하시나요 ?</Text>
                  </Box>
                  <Box>
                    <img src={question} className="question" alt="question" />
                    <Text>데이트할 장소가 마땅치 않나요?</Text>
                  </Box>
                  <Box>
                    <img src={heart} className="heart" alt="heart" />
                    <Text>연인과의 추억을 쌓으세요</Text>
                  </Box>
                </BoxWrap>
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
          <InnerBox>
            <ImageMapMapPart onRegionClick={setSelectedRegion} />
          </InnerBox>
        </RightBox>
      </ContentBox>
    </Container>
  );
}

export default MainMap;
