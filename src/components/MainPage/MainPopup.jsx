import React, { useEffect, useState } from "react";
import styled from "styled-components";

import img1 from '../img/1.jpg';
import img2 from '../img/2.jpg';
import img3 from '../img/3.jpg';

const PopupWrapper = styled.div`
  position: fixed;
  bottom: 350px;
  left: 85%;
  transform: translateX(-50%);
  z-index: 998;
`;

const PopupContainer = styled.div`
  width: 330px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  font-family: sans-serif;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 300px; 
  object-fit: cover; 
  display: block;
  transition: opacity 0.5s ease-in-out;
`;


const IndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0;
  gap: 6px;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "#000" : "#ccc")};
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  font-size: 0.9rem;
  align-items: center;
  border-top: 1px solid #eee;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const MainPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const images = [img1, img2, img3];

  useEffect(() => {
    const hideUntil = localStorage.getItem("popup-hide-until");
    const today = new Date().toISOString().split("T")[0];

    if (hideUntil !== today) {
      setIsVisible(true);
    } // 이거 주석하면 오늘하루 보지않기 기능 on

    // setIsVisible(true);  // << 이거 주석해제하면 오늘하루보지않기 없음
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const closePopup = () => {
    if (dontShowToday) {
      const today = new Date().toISOString().split("T")[0];
      localStorage.setItem("popup-hide-until", today);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <PopupWrapper>
      <PopupContainer>
        <BannerImage src={images[imageIndex]} alt="팝업 배너" />
        <IndicatorWrapper>
          {images.map((_, idx) => (
            <Dot key={idx} active={idx === imageIndex} />
          ))}
        </IndicatorWrapper>
        <ControlBar>
          <label>
            <input
              type="checkbox"
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
            />
            오늘 하루 보지 않기
          </label>
          <CloseButton onClick={closePopup}>×</CloseButton>
        </ControlBar>
      </PopupContainer>
    </PopupWrapper>
  );
};

export default MainPopup;
