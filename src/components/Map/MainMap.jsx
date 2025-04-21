import React, { useState, useEffect } from "react";
import styled from "styled-components";

import place from "../img/place.png";
import question from "../img/question.png";
import heart from "../img/heart.png";
import course1 from "../img/banner1.jpg";
import course2 from "../img/banner2.jpg";
import course3 from "../img/banner3.jpg";
import leftkey from "../img/leftkey.png";
import rightkey from "../img/rightkey.png";

import ImageMapMapPart from "./ImageMapMapPart";
import PlaceListPart from "./PlaceListPart";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(45deg, #fff, #e21b36c6, #fff);
`;
const BannerBox = styled.div`
width: 100vw;
`;

const SlideImage = styled.div`
  position: relative;
  width: 100%;
  background-color: #ffffff;
  .image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
  background: linear-gradient(to right ,#ce000e, #fdecec);
  border-radius: 30px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  &:focus {
    outline: none;
  }
  &:hover {
    color: white;
    opacity: 0.8;
  }
`;

const NavButton = styled.button`
  position: absolute;
  bottom: 50%;
  border: none;
  padding: 8px 12px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  ${({ $left }) => $left && `left: 16px;`}
  ${({ $right }) => $right && `right: 16px;`}
  background: transparent;

  img {
    object-fit: cover;
    width: 30px;
    height: 30px;
    opacity:0.5;
  }
  &:focus {
    outline: none;
  }
`;

const ContentBox = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px); /* 뷰포트 기준 높이 설정 */
  justify-content: space-evenly;
  /* background-color: white; */
  /* border: 1px solid black; */
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const LeftBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-right: none;
  }
`;

const RightBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-left: none;
  }
`;

const InnerBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-left: 150px;
  h1 {
    font-size: 4.5rem;
    font-weight: 700;
  }

  .hash {
    font-weight: 700;
    padding: 8px;
    text-decoration: underline;
    text-decoration-color: #f73434;
    text-decoration-thickness: 1px;
    
  }
  .highlight {
    color: #fff;
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
  margin-top: 150px;
  margin-left: 150px;
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
  const categories = ["전체", "맛집", "카페", "호텔", "관광지", "포토존"];
  const [regionPlaces, setRegionPlaces] = useState({});

  const slides = [
    { label: "데이트 코스 1", image: course1 },
    { label: "데이트 코스 2", image: course2 },
    { label: "데이트 코스 3", image: course3 },
  ];

  const scrollToContent = () => {
    const element = document.getElementById("contentBox");
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
      <BannerBox>
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
      </BannerBox>

      <ContentBox id="contentBox">
        <LeftBox>
          <InnerBox>
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
              <ScrollWrapper>
                <PlaceListPart
                  selectedRegion={selectedRegion}
                  regionPlaces={regionPlaces}
                  setRegionPlaces={setRegionPlaces}
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
