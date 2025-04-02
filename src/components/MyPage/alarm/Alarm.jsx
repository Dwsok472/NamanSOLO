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
import Setting from "./Setting";

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
  "Ungsang",
  "Jeonju",
  "Changwon",
  "Suwon",
  "Sokcho",
  "Yangyang",
  "Cheongjusi",
  "Boryeong",
  "Kimje",
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
  Ungsang: "울진",
  Jeonju: "전주",
  Changwon: "창원",
  Suwon: "수원",
  Sokcho: "속초",
  Yangyang: "양양",
  Cheongjusi: "청주시",
  Boryeong: "보령",
  Kimje: "김제",
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
  max-width: 400px;
  height: 430px;
  text-align: center;
  position: relative;

  cursor: pointer;
  user-select: none;
  border-radius: 10px;
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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

// 스타일링된 select 요소
const StyledSelect = styled.select`
  font-size: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  width: 20%;
  &:focus {
    outline: none;
  }
`;

const StyledOption = styled.option`
  font-size: 16px; /* option 항목의 글자 크기 설정 */
  padding: 10px; /* option 항목에 패딩을 추가하여 여백을 조정 */
  height: 25px; /* option 항목의 높이 설정 */
  overflow: scroll; /* 내용이 넘칠 경우 스크롤바 표시 */
  overflow-x: hidden; /* 가로 스크롤바는 숨김 */

  /* 드롭다운 스크롤 기능 추가 */
  max-height: 500px; /* 드롭다운 메뉴의 최대 높이 */

  &::-webkit-scrollbar {
    width: 7px; /* 세로 스크롤바의 너비를 7px로 설정 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #727272; /* 스크롤바의 핸들 색상을 설정 */
    border-radius: 10px; /* 스크롤바 핸들의 둥근 모서리 설정 */
  }
`;

const ContainerMain = styled.div`
  width: 90%;
  height: 330px;
  margin: 0 auto;
  font-size: 16px;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 7px; /* 세로 스크롤바의 너비를 8px로 설정 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #727272; /* 핸들의 색상 */
    border-radius: 10px;
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid #eee;
  font-weight: 700;
  font-size: 15px;
  display: flex;

  align-items: center;
`;

const Show = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px; /* 이미지와 텍스트 간의 간격 */
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
`;

const AlarmItem = styled.div`
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid #eee;
  font-weight: 700;
  font-size: 15px;
  display: flex;
  align-items: center;

  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  &:hover {
    color: #8f8f8fe8;
  }

  &:focus {
    outline: none;
  }
`;

const TextWrapper = styled.div`
  flex: 1; /* 텍스트가 남는 공간을 차지하도록 함 */
  overflow: hidden; /* 텍스트가 넘칠 경우 숨김 */
  white-space: nowrap; /* 텍스트 한 줄로 처리 */
  text-overflow: ellipsis; /* 넘친 텍스트는 '...' 으로 표시 */
  display: flex;

  margin-left: 10px; /* 이미지와 텍스트 간의 간격 */
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
  const [isDraggingAlarm, setIsDraggingAlarm] = useState(false); // Alarm 모달만 위한 드래그 상태
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // 마우스 위치
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 모달의 위치
  const [showSetting, setShowSetting] = useState(false); // 설정 모달 상태 추가

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
  const handleMouseDownAlarm = (e) => {
    setIsDraggingAlarm(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // 마우스 이동 중, 드래그한 위치로 모달 이동
  const handleMouseMoveAlarm = (e) => {
    if (isDraggingAlarm) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  // 마우스를 놓을 때, 드래그 종료
  const handleMouseUpAlarm = () => {
    setIsDraggingAlarm(false);
  };

  // useEffect 안에서 이벤트 리스너
  useEffect(() => {
    const modal = document.querySelector(".alarm-modal-container");
    if (modal) {
      modal.addEventListener("mousemove", handleMouseMoveAlarm);
      modal.addEventListener("mouseup", handleMouseUpAlarm);
      modal.addEventListener("mouseleave", handleMouseUpAlarm);
    }
    return () => {
      if (modal) {
        modal.removeEventListener("mousemove", handleMouseMoveAlarm);
        modal.removeEventListener("mouseup", handleMouseUpAlarm);
        modal.removeEventListener("mouseleave", handleMouseUpAlarm);
      }
    };
  }, [isDraggingAlarm, offset]);

  // 마우스 클릭시 페이지 이동
  const handleNavigate = (path) => {
    navigate(path); // 페이지 이동
    onClose(); // 모달 닫기
  };

  // 설정 모달 열기/닫기 토글 함수
  const toggleSetting = () => {
    setShowSetting((prev) => !prev);
  };
  return (
    <Container>
      <ModalContainer
        className="alarm-modal-container"
        onMouseDown={handleMouseDownAlarm} // 마우스 다운 시 드래그 시작
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }} // 모달 위치 설정
      >
        <Top>
          <Image src={settings} alt="Settings" onClick={toggleSetting} />{" "}
          {/* 설정 아이콘 클릭 시 모달 열기 */}
          <h2>알람</h2>
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
                <Show>
                  {cityTranslations[city] || city} 날씨: {weather.temperature}
                  °C, {weather.description}
                </Show>
              </>
            ) : (
              <span>날씨 정보를 불러오는 데 실패했습니다.</span>
            )}
            {/* 도시 선택 드롭다운 */}
            <StyledSelect
              onChange={(e) => setCity(e.target.value)}
              value={city}
            >
              {cities.map((cityName, index) => (
                <StyledOption key={index} value={cityName}>
                  {cityTranslations[cityName] || cityName}
                </StyledOption>
              ))}
            </StyledSelect>
          </Content>

          {/* 알람 항목들 */}
          <AlarmItem onClick={() => handleNavigate("/mypage/todo")}>
            <Img src={firework} alt="Firework" />
            <TextWrapper>
              곧 200일이 다가오고 있어요 데이트 코스를 미리 짜고 예약하는 것은
              어떨까요?
            </TextWrapper>
          </AlarmItem>
          <AlarmItem onClick={() => handleNavigate("/events")}>
            <Img src={add} alt="Add" />
            <TextWrapper>이벤트 공지사항이 추가되었습니다</TextWrapper>
          </AlarmItem>
          <AlarmItem onClick={() => handleNavigate("/map")}>
            <Img src={place} alt="Place" />
            <TextWrapper>데이트 장소 추천이 업데이트되었습니다</TextWrapper>
          </AlarmItem>
          <AlarmItem onClick={() => handleNavigate("/mypage/story")}>
            <Img src={heart} alt="Heart" />
            <TextWrapper>
              username이 본인의 피드에 좋아요를 눌렀습니다
            </TextWrapper>
          </AlarmItem>
          <AlarmItem onClick={() => handleNavigate("/mypage/other")}>
            <Img src={group} alt="Group" />
            <TextWrapper>username이 본인을 팔로우 팔로우하였습니다</TextWrapper>
          </AlarmItem>
        </ContainerMain>
        {showSetting && <Setting onClose={toggleSetting} />}
      </ModalContainer>
    </Container>
  );
}

export default Alarm;
