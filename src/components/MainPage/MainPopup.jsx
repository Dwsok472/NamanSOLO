import React, { useEffect, useState } from "react";
import styled from "styled-components";
import img from '../img/1.jpg'

const PopupWrapper = styled.div`
  position: fixed;
  bottom: 300px;
  left: 50%;
  z-index: 9999;
`;

const PopupContainer = styled.div`
  width: 350px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const BannerImage = styled.img`
  width: 100%;
  display: block;
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 0.9rem;
  align-items: center;
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

  useEffect(() => {
    const hideUntil = localStorage.getItem("popup-hide-until");
    const today = new Date().toISOString().split("T")[0];

    if (hideUntil !== today) {
      setIsVisible(true);
    }
  }, []);

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
        <BannerImage src={img} alt="팝업 배너" />
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
