import React, { useState, useEffect } from 'react';
import background from '../img/back2.jpg'
import question from '../img/question.png'
import place from '../img/place.png'
import heart from '../img/heart.png'
import styled from 'styled-components'
import ImageMap from './ImageMap'
import course1 from '../img/banner1.jpg';
import course2 from '../img/banner2.jpg';
import course3 from '../img/banner3.jpg';
import leftkey from '../img/leftkey.png';
import rightkey from '../img/rightkey.png';
import { scroller } from 'react-scroll';

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  `
const BackgroundImage = styled.img`
  width: 100%;
  position: absolute;
  top: 150px;
  left: 0;
  z-index: -1;
  opacity: 0.3; /* 배경 이미지 투명도 */

`;
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
     bottom: 30px;  // 배너 이미지 하단에서 30px 위로 위치시킵니다.
     left: 50%;  // 화면의 가운데로 배치합니다
     transform: translateX(-50%);  // 정확하게 가운데로 맞추기 위한 방법.
     z-index: 5;
     font-size: 1rem;
     font-weight: 700;
     color: white;
     background-color: #ff9996;
     border-radius: 30px;
     box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);   
     &:focus{
        outline: none;
     }
     &:hover{
        background-color: white;
        border:1px solid #ff9996;
        color: #141414;
     }
`
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
  background: transparent; /* 배경색을 투명하게 설정 */
  
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
margin-top: 60px;
  width: 95%;
  display: flex;
  flex-direction: row;
  height: 1000px;
  z-index: 2;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
  }
`;

const LeftBox = styled.div`
  border: 1px solid #85858533;
  border-left: none;
  border-top: none;
  border-bottom: none;
  width: 43%;
  padding: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Wrap = styled.div`
  width: 100%;
  height: 40%;
  padding: 10px;
  padding-top: 250px;

  h1 {
    font-size: 3.3rem;
    font-weight: 700;
  }

  .hash {
    font-weight: 700;
    padding: 8px;
    text-decoration: underline;
    text-decoration-color: #ffa8a8;
    text-decoration-thickness: 2px;
  }

  .highlight {
    color: #ff1778;
    text-decoration: none;
  }
`;

const BoxWrap = styled.div`
  padding: 10px;
  align-items: center;
  margin-top: 30px;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;

  .place,
  .question,
  .heart {
    object-fit: cover;
    width: 50px;
    height: 50px;
  }
`;

const Text = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  padding-left: 5px;
`;

const MiddleBox = styled.div`

`
const RightBox = styled.div`

`

function MainMap() {
    const [slideIndex, setSlideIndex] = useState(0);
    const [viewMode, setViewMode] = useState('slide');

    const slides = [
        { label: '데이트 코스 1', image: course1 },
        { label: '데이트 코스 2', image: course2 },
        { label: '데이트 코스 3', image: course3 },
    ];
    const scrollToContent = () => {
        scroller.scrollTo('contentBox', {
            smooth: true,
            offset: -60, // 배너 아래에서 60px만큼 떨어지도록
            duration: 500, // 0.5동안 부드럽게 내려가라
        });
    };

    useEffect(() => {
        if (viewMode !== 'slide') return;
        const interval = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [viewMode, slides.length]);
    return (
        <Container>
            <BackgroundImage src={background} alt="background" />
            <BannerBox>
                {viewMode === 'slide' && (
                    <SlideImage>
                        <Focus onClick={scrollToContent}>보러가기▶</Focus>
                        <NavButton
                            $left
                            onClick={() => setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                        >
                            <img src={leftkey} />
                        </NavButton>
                        <img
                            src={slides[slideIndex].image}
                            alt={slides[slideIndex].label}
                            className='image' />
                        <NavButton
                            $right
                            onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
                        >
                            <img src={rightkey} />
                        </NavButton>
                    </SlideImage>
                )}
            </BannerBox>

            <ContentBox id="contentBox">
                <LeftBox>
                    <Wrap>
                        <h1><span class="highlight">가장 행복한 하루</span>를 <br />보낼 오늘</h1>
                        <span className='hash'>#데이트</span>
                        <span className='hash'>#이색체험</span>
                        <span className='hash'>#핫플</span>
                        <span className='hash'>#힐링</span>
                    </Wrap>
                    <BoxWrap>
                        <Box>
                            <img src={place} className='place' />
                            <Text>데이트할 장소에 대한 추천이 필요하시나요 ?</Text>
                        </Box>
                        <Box>
                            <img src={question} className='question' />
                            <Text>데이트할 장소가 마땅치 않나요?</Text>
                        </Box>
                        <Box>
                            <img src={heart} className='heart' />
                            <Text>연인과의 추억을 쌓으세요</Text>
                        </Box>
                    </BoxWrap>
                </LeftBox>
                <ImageMap />
                <MiddleBox></MiddleBox>
                <RightBox></RightBox>
            </ContentBox>
        </Container>
    )
}

export default MainMap
