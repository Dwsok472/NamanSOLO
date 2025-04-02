import React, { useState, useEffect } from "react";
import styled from "styled-components";
import settings from "../../img/settings.png";
import firework from "../../img/firework.png";
import add from "../../img/add.png";
import place from "../../img/place.png";
import heart from "../../img/heart.png";
import group from "../../img/group.png";
import { IconClose } from "../../Icons";
import { useNavigate } from "react-router-dom";

// OpenWeatherMap API 키
const API_KEY = "2e1e70c1aa8c4ea567aa7ab322820ca7"; // 발급받은 API 키를 여기 넣으세요.

// 대한민국 주요 도시 목록
const cities = [
  "Seoul",
  "Busan",
  "Incheon",
  "Daegu",
  "Daejeon",
  "Gwangju",
  "Ulsan",
  "Jeonju",
  "Changwon",
  "Suwon",
];

// 도시 이름과 한국어 매핑 객체
const cityTranslations = {
  Seoul: "서울",
  Busan: "부산",
  Incheon: "인천",
  Daegu: "대구",
  Daejeon: "대전",
  Gwangju: "광주",
  Ulsan: "울산",
  Jeonju: "전주",
  Changwon: "창원",
  Suwon: "수원",
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 50px;
  min-width: 350px;
  max-width: 500px;
  height: 480px;
  text-align: center;
  position: relative;
  cursor: pointer;
  user-select: none;
  border-radius: 50px;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  background-color: #ffdcd6;
  padding: 15px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;

const CloseButton = styled.button`
  padding: 3px 8px;
  margin-right: 5px;
  background-color: transparent;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  font-size: 18px;
  &:focus {
    outline: none;
  }
`;

const ContainerMain = styled.div`
  font-size: 16px;
`;

const Content = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  font-weight: 700;
  font-size: 20px;
  display: flex;

  align-items: center;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  cursor: pointer;
`;

const AlarmItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center; /* 이미지와 텍스트를 수평으로 가운데 정렬 */

  cursor: pointer;
  white-space: nowrap; /* 텍스트가 한 줄로만 표시되도록 설정 */
  overflow: hidden; /* 텍스트가 넘치면 숨김 */
  text-overflow: ellipsis; /* 넘친 텍스트는 '...' 으로 표시 */

  &:hover {
    color: #8f8f8fe8;
  }

  &:focus {
    outline: none;
  }
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  cursor: pointer;
`;

function Alarm({ onClose }) {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [city, setCity] = useState(cities[0]); // 기본 도시를 서울로 설정
  const [weather, setWeather] = useState(null); // 날씨 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // 마우스 위치
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 모달의 위치

  // 날씨 정보를 가져오는 함수
  const fetchWeather = async (cityName) => {
    setLoading(true); // 데이터 로딩 시작
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=kr`
      );
      const data = await response.json();
      if (data.weather && data.weather[0]) {
        setWeather({
          description: data.weather[0].description,
          temperature: data.main.temp,
          icon: data.weather[0].icon,
        });
      }
    } catch (error) {
      console.error("날씨 데이터를 가져오는 데 오류가 발생했습니다.", error);
    } finally {
      setLoading(false); // 데이터 로딩 완료 후 로딩 상태를 false로 변경
    }
  };

  // 도시가 변경될 때마다 날씨 정보 새로 가져오기
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  // 마우스를 누를 때, 드래그 시작
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x, // 마우스와 모달의 x 차이
      y: e.clientY - position.y, // 마우스와 모달의 y 차이
    });
  };

  // 마우스 이동 중, 드래그한 위치로 모달 이동
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  // 마우스를 놓을 때, 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 마우스 이벤트 리스너
  useEffect(() => {
    const modal = document.querySelector(".modal-container");
    if (modal) {
      modal.addEventListener("mousemove", handleMouseMove);
      modal.addEventListener("mouseup", handleMouseUp);
      modal.addEventListener("mouseleave", handleMouseUp);
    }
    return () => {
      if (modal) {
        modal.removeEventListener("mousemove", handleMouseMove);
        modal.removeEventListener("mouseup", handleMouseUp);
        modal.removeEventListener("mouseleave", handleMouseUp);
      }
    };
  }, [isDragging, offset]);

  // 마우스 클릭시 페이지 이동
  const handleNavigate = (path) => {
    navigate(path); // 페이지 이동
    onClose(); // 모달 닫기
  };

  return (
    <Container>
      <ModalContainer
        className="modal-container"
        onMouseDown={handleMouseDown} // 마우스 다운 시 드래그 시작
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }} // 모달 위치 설정
      >
        <Top>
          <Image src={settings} alt="Settings" /> <h2>알람</h2>
          <CloseButton onClick={onClose}>
            <IconClose />
          </CloseButton>
        </Top>

        <ContainerMain>
          {/* 날씨 정보 표시 */}
          <Content>
            {loading ? (
              <span>날씨 정보를 불러오는 중...</span>
            ) : weather ? (
              <>
                <Img
                  src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                  alt={weather.description}
                />
                <span>
                  {city} 날씨: {weather.temperature}°C, {weather.description}
                </span>
              </>
            ) : (
              <span>날씨 정보를 불러오는 데 실패했습니다.</span>
            )}
            {/* 도시 선택 드롭다운 */}
            <select onChange={(e) => setCity(e.target.value)} value={city}>
              {cities.map((cityName, index) => (
                <option key={index} value={cityName}>
                  {cityTranslations[cityName] || cityName}{" "}
                  {/* 한국어 도시 이름 표시 */}
                </option>
              ))}
            </select>
          </Content>

          {/* 알람 항목들 */}
          <AlarmItem onClick={() => handleNavigate("/mypage/todo")}>
            <Img src={firework} alt="Firework" />곧 200일이 다가오고 있어요
            데이트 코스를 미리 짜고 예약하는 것은 어떨까요?
          </AlarmItem>
          <AlarmItem onClick={() => handleNavigate("/events")}>
            <Img src={add} alt="Add" />
            이벤트 공지사항이 추가되었습니다
          </AlarmItem>
          <AlarmItem onClick={() => handleNavigate("/map")}>
            <Img src={place} alt="Place" />
            데이트 장소 추천이 업데이트되었습니다
          </AlarmItem>
          <AlarmItem onClick={() => handleNavigate("/mypage/story")}>
            <Img src={heart} alt="Heart" />
            username이 본인의 피드에 좋아요를 눌렀습니다
          </AlarmItem>
          <AlarmItem onClick={() => handleNavigate("/mypage/other")}>
            <Img src={group} alt="Group" />
            username이 본인을 팔로우 팔로우하였습니다
          </AlarmItem>
        </ContainerMain>
      </ModalContainer>
    </Container>
  );
}

export default Alarm;
