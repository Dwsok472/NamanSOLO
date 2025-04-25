import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import settings from "../../img/settings.png";
import { IconClose } from "../../Icons";
import { useNavigate } from "react-router-dom";
import Setting from "./Setting";
import { useAlarmList } from "./alarmList";
import { useUserStore } from "../../Login/Login";
// import { fetchMyAlarms } from "../../api3";


const Container = styled.div`
  position: absolute; /* 벨 버튼 기준으로 위치 */
  bottom: 50px; /* 버튼 아래 여백 */
  right: 100px; /* 오른쪽 정렬 */
  z-index: 20000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 50px;
  min-width: 350px;
  max-width: 400px;
  height: 430px;
  text-align: center;
  position: relative;
  z-index: 380;
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
  background-color: #8c0d17;
  color: white;
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
  width: 60px;
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
  height: 340px;
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
  z-index: 210;
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
  // 알림 리스트 (이 부분은 컴포넌트 안에 위치)
  const alarmList = useAlarmList((state) => state.alarmList);
  const currentUser = useUserStore.getState().user?.username;
  const filteredAlarms = alarmList.filter((alarm) => alarm.username === currentUser);

  const resetUnreadCount = useAlarmList((state) => state.resetUnreadCount);

  // const [alarmList, setAlarmList] = useState([]);
  // const userId = 1; // 실제 로그인 유저 ID 넣기

  useEffect(() => {
    const currentUser = useUserStore.getState().user?.username;
    if (!currentUser) return;
  
    const stored = localStorage.getItem(`alarms-${currentUser}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      useAlarmList.setState({
        alarmList: parsed.alarmList,
        unreadCount: parsed.unreadCount,
      });
      console.log(" 로컬스토리지 알람 복원됨:", parsed);
  
      // 복원 성공 후 → 이때 초기화
      const unread = parsed.alarmList.filter((alarm) => !alarm.isRead);
      unread.forEach((alarm) => {
        useAlarmList.getState().markAsRead(alarm.id);
      });
  
      useAlarmList.getState().resetUnreadCount();
    }
  }, []);
  
  useEffect(() => {
    const currentUser = useUserStore.getState().user?.username;
    if (!currentUser) return;
  
    const stored = localStorage.getItem(`alarms-${currentUser}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      useAlarmList.setState({
        alarmList: parsed.alarmList,
        unreadCount: parsed.unreadCount,
      });
      console.log("✅ 로컬스토리지 알람 복원됨:", parsed);
    }
  }, []);

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

            {filteredAlarms.map((alarm) => {
              const isExpanded = expandedId === alarm.id;
              const shouldShowToggle = isExpanded || overflowingItems[alarm.id];
              return (
                <AlarmItem
                  key={alarm.id}
                  isExpanded={isExpanded}
                  onClick={() => handleAlarmClick(alarm)}
                >
                  <Img src={alarm.img || undefined} alt={alarm.alt || "알림"} />
                  <TextWrapper
                    isExpanded={isExpanded}
                    ref={(el) => (textRefs.current[alarm.id] = el)}
                  >
                    {alarm.text}
                  </TextWrapper>

                  {shouldShowToggle && (
                    <ToggleIcon isExpanded={isExpanded}>
                      {isExpanded ? "▲" : "▼"}
                    </ToggleIcon>
                  )}
                  {isExpanded && (
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          const token = sessionStorage.getItem("jwt-token");
                          await axios.delete(`/api/alarm/${alarm.id}`, {
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          useAlarmList.getState().removeAlarm(alarm.id); // 상태에서도 삭제
                          console.log("✅ 알람 삭제 완료:", alarm.id);
                        } catch (err) {
                          console.error("❌ 알람 삭제 실패:", err);
                        }
                      }}
                      style={{
                        marginLeft: "10px",
                        fontSize: "12px",
                        color: "#8c0d17",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      삭제
                    </button>

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

// OpenWeatherMap API 키
const API_KEY = "2e1e70c1aa8c4ea567aa7ab322820ca7"; // 발급받은 API 키를 여기 넣으세요.

// 대한민국 주요 도시 목록
const cities = [
  "Seoul",
  "Busan",
  "Daegu",
  "Incheon",
  "Gwangju",
  "Daejeon",
  "Ulsan",
  "Sejong",
  "Suwon",
  "Yongin",
  "Seongnam",
  "Goyang",
  "Bucheon",
  "Ansan",
  "Anyang",
  "Namyangju",
  "Hwaseong",
  "Pyeongtaek",
  "Uijeongbu",
  "Siheung",
  "Gwangmyeong",
  "Gwangju-si",
  "Hanam",
  "Gunpo",
  "Icheon",
  "Anseong",
  "Osan",
  "Yangju",
  "Paju",
  "Dongducheon",
  "Guri",
  "Gapyeong",
  "Yangpyeong",
  "Yeoncheon",
  "Pocheon",
  "Chuncheon",
  "Wonju",
  "Gangneung",
  "Donghae",
  "Samcheok",
  "Taebaek",
  "Sokcho",
  "Hongcheon",
  "Hoengseong",
  "Pyeongchang",
  "Jeongseon",
  "Cheorwon",
  "Hwacheon",
  "Yanggu",
  "Inje",
  "Goseong_Gangwon",
  "Yangyang",
  "Cheongju",
  "Chungju",
  "Jecheon",
  "Boeun",
  "Okcheon",
  "Yeongdong",
  "Jincheon",
  "Goesan",
  "Eumseong",
  "Danyang",
  "Jeungpyeong",
  "Cheonan",
  "Asan",
  "Gongju",
  "Boryeong",
  "Seosan",
  "Nonsan",
  "Gyeryong",
  "Dangjin",
  "Geumsan",
  "Buyeo",
  "Seocheon",
  "Cheongyang",
  "Hongseong",
  "Yesan",
  "Taean",
  "Jeonju",
  "Gunsan",
  "Iksan",
  "Namwon",
  "Gimje",
  "Jeongeup",
  "Wanju",
  "Jinan",
  "Muju",
  "Jangsu",
  "Imsil",
  "Sunchang",
  "Gochang",
  "Buan",
  "Mokpo",
  "Suncheon",
  "Yeosu",
  "Naju",
  "Gwangyang",
  "Damyang",
  "Gokseong",
  "Gurye",
  "Goheung",
  "Boseong",
  "Hwasun",
  "Jangheung",
  "Gangjin",
  "Haenam",
  "Yeongam",
  "Muan",
  "Hampyeong",
  "Yeonggwang",
  "Jangseong",
  "Wando",
  "Jindo",
  "Sinan",
  "Pohang",
  "Gyeongju",
  "Gimcheon",
  "Andong",
  "Gumi",
  "Yeongju",
  "Yeongcheon",
  "Sangju",
  "Mungyeong",
  "Gyeongsan",
  "Uljin",
  "Uiseong",
  "Yeongyang",
  "Yeongdeok",
  "Bonghwa",
  "Cheongsong",
  "Seongju",
  "Chilgok",
  "Gunwi",
  "Cheongdo",
  "Changwon",
  "Jinju",
  "Tongyeong",
  "Sacheon",
  "Gimhae",
  "Miryang",
  "Geoje",
  "Yangsan",
  "Uiryeong",
  "Haman",
  "Changnyeong",
  "Goseong_Gyeongnam",
  "Namhae",
  "Hadong",
  "Sancheong",
  "Hamyang",
  "Geochang",
  "Hapcheon",
  "Jeju",
  "Seogwipo",
];

// 도시 이름과 한국어 매핑 객체
const cityTranslations = {
  Seoul: "서울",
  Busan: "부산",
  Daegu: "대구",
  Incheon: "인천",
  Gwangju: "광주",
  Daejeon: "대전",
  Ulsan: "울산",
  Sejong: "세종",
  Suwon: "수원",
  Yongin: "용인",
  Seongnam: "성남",
  Goyang: "고양",
  Bucheon: "부천",
  Ansan: "안산",
  Anyang: "안양",
  Namyangju: "남양주",
  Hwaseong: "화성",
  Pyeongtaek: "평택",
  Uijeongbu: "의정부",
  Siheung: "시흥",
  Gwangmyeong: "광명",
  "Gwangju-si": "광주",
  Hanam: "하남",
  Gunpo: "군포",
  Icheon: "이천",
  Anseong: "안성",
  Osan: "오산",
  Yangju: "양주",
  Paju: "파주",
  Dongducheon: "동두천",
  Guri: "구리",
  Gapyeong: "가평",
  Yangpyeong: "양평",
  Yeoncheon: "연천",
  Pocheon: "포천",
  Chuncheon: "춘천",
  Wonju: "원주",
  Gangneung: "강릉",
  Donghae: "동해",
  Samcheok: "삼척",
  Taebaek: "태백",
  Sokcho: "속초",
  Hongcheon: "홍천",
  Hoengseong: "횡성",
  Pyeongchang: "평창",
  Jeongseon: "정선",
  Cheorwon: "철원",
  Hwacheon: "화천",
  Yanggu: "양구",
  Inje: "인제",
  Goseong_Gangwon: "고성",
  Yangyang: "양양",
  Cheongju: "청주",
  Chungju: "충주",
  Jecheon: "제천",
  Boeun: "보은",
  Okcheon: "옥천",
  Yeongdong: "영동",
  Jincheon: "진천",
  Goesan: "괴산",
  Eumseong: "음성",
  Danyang: "단양",
  Jeungpyeong: "증평",
  Cheonan: "천안",
  Asan: "아산",
  Gongju: "공주",
  Boryeong: "보령",
  Seosan: "서산",
  Nonsan: "논산",
  Gyeryong: "계룡",
  Dangjin: "당진",
  Geumsan: "금산",
  Buyeo: "부여",
  Seocheon: "서천",
  Cheongyang: "청양",
  Hongseong: "홍성",
  Yesan: "예산",
  Taean: "태안",
  Jeonju: "전주",
  Gunsan: "군산",
  Iksan: "익산",
  Namwon: "남원",
  Gimje: "김제",
  Jeongeup: "정읍",
  Wanju: "완주",
  Jinan: "진안",
  Muju: "무주",
  Jangsu: "장수",
  Imsil: "임실",
  Sunchang: "순창",
  Gochang: "고창",
  Buan: "부안",
  Mokpo: "목포",
  Suncheon: "순천",
  Yeosu: "여수",
  Naju: "나주",
  Gwangyang: "광양",
  Damyang: "담양",
  Gokseong: "곡성",
  Gurye: "구례",
  Goheung: "고흥",
  Boseong: "보성",
  Hwasun: "화순",
  Jangheung: "장흥",
  Gangjin: "강진",
  Haenam: "해남",
  Yeongam: "영암",
  Muan: "무안",
  Hampyeong: "함평",
  Yeonggwang: "영광",
  Jangseong: "장성",
  Wando: "완도",
  Jindo: "진도",
  Sinan: "신안",
  Pohang: "포항",
  Gyeongju: "경주",
  Gimcheon: "김천",
  Andong: "안동",
  Gumi: "구미",
  Yeongju: "영주",
  Yeongcheon: "영천",
  Sangju: "상주",
  Mungyeong: "문경",
  Gyeongsan: "경산",
  Uljin: "울진",
  Uiseong: "의성",
  Yeongyang: "영양",
  Yeongdeok: "영덕",
  Bonghwa: "봉화",
  Cheongsong: "청송",
  Seongju: "성주",
  Chilgok: "칠곡",
  Gunwi: "군위",
  Cheongdo: "청도",
  Changwon: "창원",
  Jinju: "진주",
  Tongyeong: "통영",
  Sacheon: "사천",
  Gimhae: "김해",
  Miryang: "밀양",
  Geoje: "거제",
  Yangsan: "양산",
  Uiryeong: "의령",
  Haman: "함안",
  Changnyeong: "창녕",
  Goseong_Gyeongnam: "고성",
  Namhae: "남해",
  Hadong: "하동",
  Sancheong: "산청",
  Hamyang: "함양",
  Geochang: "거창",
  Hapcheon: "합천",
  Jeju: "제주",
  Seogwipo: "서귀포",
};

export default Alarm;
