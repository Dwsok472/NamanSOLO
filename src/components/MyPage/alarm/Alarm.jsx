import React, { useState, useEffect, useRef } from "react";
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
  Cheongjusi: "청주",
  Boryeong: "보령",
  Kimje: "김제",
};

const Container = styled.div`
  position: absolute; /* 벨 버튼 기준으로 위치 */
  top: 70px; /* 버튼 아래 여백 */
  right: 0; /* 오른쪽 정렬 */
  z-index: 200;
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
const DropdownWrapper = styled.div`
  position: relative;
  margin-left: auto;
`;

const DropdownButton = styled.button`
  width: 50px;
  height: 30px;
  font-size: 13px;
  font-weight: 700;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
  cursor: pointer;
  display: flex;
  align-items: center; // 세로 중앙
  justify-content: center; // 가로 중앙
`;

const DropdownList = styled.ul`
  position: absolute;
  right: 0;
  top: 40px;
  width: 70px;
  font-size: 12px;
  font-weight: 700;
  max-height: 150px; /*  여기서 높이 제한 */
  overflow-y: auto; /*  스크롤 가능 */
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 100;
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #eee;
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
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  cursor: pointer;
  // 텍스트 축소 및 펼침 스타일
  transition: background-color 0.3s ease, padding 0.3s ease;

  background-color: ${(props) => (props.isExpanded ? "#fff4f2" : "white")};
`;

const TextWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  line-height: 1.4;
  text-align: start;
  white-space: ${(props) => (props.isExpanded ? "normal" : "nowrap")};
  text-overflow: ellipsis;
  display: block;
  max-height: ${(props) => (props.isExpanded ? "500px" : "1.5em")};
`;
const ToggleIcon = styled.div`
  transition: transform 0.3s ease;
  margin-left: 8px;
  font-size: 14px;
  color: #999;
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  cursor: pointer;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 150;
`;

function Alarm({ onClose /*, isOpen*/ }) {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [expandedId, setExpandedId] = useState(null); // 펼쳐진 알림 ID
  const [city, setCity] = useState(cities[0]); // 기본 도시를 서울로 설정
  const [weather, setWeather] = useState(null); // 날씨 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [isDraggingAlarm, setIsDraggingAlarm] = useState(false); // Alarm 모달만 위한 드래그 상태
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // 마우스 위치
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 모달의 위치
  const [showSetting, setShowSetting] = useState(false); // 설정 모달 상태 추가
  const [clickTimeout, setClickTimeout] = useState(null);
  const [overflowingItems, setOverflowingItems] = useState({});
  const textRefs = useRef({});
  const [isOpen, setIsOpen] = useState(false);
  // const [alarmList, setAlarmList] = useState([]);
  // const userId = 1; // 실제 로그인 유저 ID 넣기

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

  // 설정 모달 열기/닫기 토글 함수
  const toggleSetting = () => {
    setShowSetting((prev) => !prev);
  };

  // 알림 리스트 (이 부분은 컴포넌트 안에 위치)
  const alarmList = [
    {
      id: 1,
      text: "곧 200일이 다가오고 있어요 데이트 코스를 미리 짜고 예약하는 것은 어떨까요?",
      link: "/mypage/todo",
      img: firework,
      alt: "Firework",
    },
    {
      id: 2,
      text: "이벤트 공지사항이 추가되었습니다",
      link: "/events",
      img: add,
      alt: "Add",
    },
    {
      id: 3,
      text: "데이트 장소 추천이 업데이트되었습니다",
      link: "/map",
      img: place,
      alt: "Place",
    },
    {
      id: 4,
      text: "username이 본인의 피드에 좋아요를 눌렀습니다",
      link: "/mypage/story",
      img: heart,
      alt: "Heart",
    },
    {
      id: 5,
      text: "username이 본인을 팔로우 팔로우하였습니다",
      link: "/mypage/other",
      img: group,
      alt: "Group",
    },
  ];

  // 일정 기반 알림 가져오기
  // useEffect(() => {
  //   if (!isOpen) return;

  //   const load = async () => {
  //     try {
  //   const calendar = await fetchUserEvents(userId);
  //   const calendarAlarms = getUpcomingAlarms(calendar);

  //   const todayEvents = await fetchTodayEvents(userId);
  //   const eventAlarms = getTodayEventAlarms(todayEvents);

  //   const placeItems = await fetchRecommendedPlaces(userId);
  //   const placeAlarms = getPlaceRecommendAlarms(placeItems);

  //   const likeAlarms = await fetchLikeAlarms(userId);

  //   const followAlarms = await fetchFollowAlarms(userId);

  //   const weatherAlarms = await fetchWeatherAlarm(userId);

  //   const commentAlarms = await fetchCommentAlarms(userId);

  //   const replyAlarms = await fetchReplyAlarms(userId);

  //   setAlarmList([
  //     ...calendarAlarms,
  //     ...eventAlarms,
  //     ...placeAlarms,
  //     ...likeAlarms,
  //     ...followAlarms,
  //     ...weatherAlarms,
  //     ...commentAlarms,
  //     ...replyAlarms
  //   ]);
  // } catch (err) {
  //       console.error("알림 로딩 실패:", err);
  //     }
  //   };

  //   load();

  //   const interval = setInterval(load, 1000 * 60 * 60 * 24);
  //   return () => clearInterval(interval);
  // }, [isOpen, userId]);

  // WebSocket 실시간 알림 받기
  // useEffect(() => {
  //   const client = connectAlarmSocket(userId, (alarm) => {
  //     setAlarmList((prev) => [alarm, ...prev]);
  //   });

  //   return () => client.deactivate(); // 언마운트 시 연결 해제
  // }, [userId]);

  // 며칠 지난 알림 자동 제거
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const now = new Date();
  //     setAlarmList((prev) =>
  //       prev.filter((alarm) => {
  //         const created = new Date(alarm.createdAt);
  //         const diff = (now - created) / (1000 * 60 * 60 * 24);
  //         return diff <= 10; // 3일 이하만 유지
  //       })
  //     );
  //   }, 1000 * 60 * 60); // 매시간마다 체크

  //   return () => clearInterval(interval); // 언마운트 시 정리
  // }, []);

  useEffect(() => {
    const checkOverflow = () => {
      const updated = {};
      alarmList.forEach((alarm) => {
        const el = textRefs.current[alarm.id];
        if (el) {
          updated[alarm.id] = el.scrollWidth > el.clientWidth;
        }
      });
      setOverflowingItems(updated);
    };

    // 💡 DOM 렌더링이 끝난 뒤 overflow 체크 시점 보장
    const timer = setTimeout(() => {
      requestAnimationFrame(checkOverflow);
    }, 30);

    return () => clearTimeout(timer);
  }, [expandedId, alarmList]);

  // 클릭 핸들러 (이것도 컴포넌트 안에)
  const handleAlarmClick = (alarm) => {
    // 기존 타이머가 있으면 → 더블클릭
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);

      // 더블클릭 동작: 페이지 이동
      navigate(alarm.link);
      onClose();
    } else {
      // 단일 클릭 → 토글 확장
      const timeout = setTimeout(() => {
        setExpandedId((prevId) => (prevId === alarm.id ? null : alarm.id));
        setClickTimeout(null);
      }, 250); // 250ms 이내 두 번째 클릭 들어오면 더블클릭으로 처리

      setClickTimeout(timeout);
    }
  };

  return (
    <>
      <Backdrop onClick={onClose} />
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
              <DropdownWrapper>
                <DropdownButton onClick={() => setIsOpen((prev) => !prev)}>
                  {cityTranslations[city] || city}
                </DropdownButton>

                {isOpen && (
                  <DropdownList>
                    {cities.map((cityName) => (
                      <DropdownItem
                        key={cityName}
                        onClick={() => {
                          setCity(cityName);
                          setIsOpen(false);
                        }}
                      >
                        {cityTranslations[cityName] || cityName}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                )}
              </DropdownWrapper>
            </Content>

            {/* 알람 항목들 */}
            {alarmList.map((alarm) => {
              const isExpanded = expandedId === alarm.id;
              const shouldShowToggle = isExpanded || overflowingItems[alarm.id];
              return (
                <AlarmItem
                  key={alarm.id}
                  onClick={() => handleAlarmClick(alarm)}
                  isExpanded={isExpanded}
                >
                  <Img src={alarm.img} alt={alarm.alt} />
                  <TextWrapper
                    isExpanded={isExpanded}
                    ref={(el) => (textRefs.current[alarm.id] = el)} // ref 설정
                  >
                    {alarm.text}
                  </TextWrapper>

                  {shouldShowToggle && (
                    <ToggleIcon isExpanded={isExpanded}>
                      {isExpanded ? "▲" : "▼"}
                    </ToggleIcon>
                  )}
                </AlarmItem>
              );
            })}
          </ContainerMain>
        </ModalContainer>
      </Container>
      {showSetting && <Setting onClose={toggleSetting} />}
    </>
  );
}

export default Alarm;
