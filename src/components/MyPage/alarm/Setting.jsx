import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IconClose } from "../../Icons";

const Container = styled.div`
  position: fixed;
  bottom: 118px; // 원하는 위치로 조절 (알람 모달과 겹치지 않게)
  right: 500px; // 화면 오른쪽에서 적당히 띄움
  z-index: 250;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 10px;
  min-width: 350px;
  max-width: 400px;
  height: 360px;
  text-align: center;
  position: relative;
  cursor: pointer;
  user-select: none;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  background-color: #c5c4c4;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const CloseButton = styled.button`
  display: flex;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  right: 15px; /* 오른쪽 상단에 배치 */
`;

const ContainerMain = styled.div`
  width: 90%;
  height: 350px;
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

const TextWrapper = styled.div`
  flex: 1; /* 텍스트가 남는 공간을 차지하도록 함 */
  display: flex;
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

  &:focus {
    outline: none;
  }
`;

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    font-size: 15px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(182, 182, 182);
    transition: 0.4s;
    border-radius: 10px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    border-radius: 8px;
    left: 0.3em;
    bottom: 0.3em;
    transform: rotate(270deg);
    background-color: rgb(255, 255, 255);
    transition: 0.4s;
  }

  .switch input:checked + .slider {
    background-color: #21cc4c;
  }

  .switch input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  .switch input:checked + .slider:before {
    transform: translateX(1.5em);
  }
`;

function Setting({ onClose }) {
  const [alarmSettings, setAlarmSettings] = useState(null);
  const [isDraggingSetting, setIsDraggingSetting] = useState(false); // Setting 모달만 위한 드래그 상태
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // 마우스 위치
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 모달의 위치

  // 스위치 변경 시 서버에 저장
  const handleSwitchChange = async (setting) => {
    const newSettings = {
      ...alarmSettings,
      [setting]: !alarmSettings[setting],
    };
    setAlarmSettings(newSettings);

    try {
      const token = sessionStorage.getItem("jwt-token");
      await fetch("/api/alarm/setting", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          follow: newSettings.followAlarm.toString(),
          comment: newSettings.storyCommentAlarm.toString(),
          recomment: newSettings.storyReCommentAlarm.toString(),
          great: newSettings.storyLikeAlarm.toString(),
          todo: newSettings.anniversaryOneMonthAlarm.toString(),
          weather: newSettings.anniversaryWeatherAlarm.toString(),
        }),
      });
    } catch (err) {
      console.error("저장 실패:", err);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = sessionStorage.getItem("jwt-token");
        const res = await fetch("/api/alarm/setting", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("인증 실패");
        const data = await res.json();
        setAlarmSettings({
          storyLikeAlarm: data.great === "true",
          followAlarm: data.follow === "true",
          storyCommentAlarm: data.comment === "true",
          storyReCommentAlarm: data.recomment === "true",
          anniversaryWeatherAlarm: data.weather === "true",
        });
      } catch (err) {
        console.error("설정 불러오기 실패:", err);
      }
    };
    fetchSettings();
  }, []);

  // 마우스를 누를 때, 드래그 시작
  const handleMouseDownSetting = (e) => {
    e.stopPropagation(); // 이벤트 버블링 막기
    setIsDraggingSetting(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // 마우스 이동 중, 드래그한 위치로 모달 이동
  const handleMouseMoveSetting = (e) => {
    if (isDraggingSetting) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  // 마우스를 놓을 때, 드래그 종료
  const handleMouseUpSetting = () => {
    setIsDraggingSetting(false);
  };

  // 마우스 이벤트 리스너
  useEffect(() => {
    const modal = document.querySelector(".setting-modal-container");
    if (modal) {
      modal.addEventListener("mousemove", handleMouseMoveSetting);
      modal.addEventListener("mouseup", handleMouseUpSetting);
      modal.addEventListener("mouseleave", handleMouseUpSetting);
    }
    return () => {
      if (modal) {
        modal.removeEventListener("mousemove", handleMouseMoveSetting);
        modal.removeEventListener("mouseup", handleMouseUpSetting);
        modal.removeEventListener("mouseleave", handleMouseUpSetting);
      }
    };
  }, [isDraggingSetting, offset]);

  // const handleSwitchChange = (setting) => {
  //   setAlarmSettings((prevSettings) => ({
  //     ...prevSettings,
  //     [setting]: !prevSettings[setting],
  //   }));
  // };

  if (!alarmSettings) return null;

  return (
    <Container>
      <ModalContainer
        className="setting-modal-container"
        onMouseDown={handleMouseDownSetting} // 마우스 다운 시 드래그 시작
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }} // 모달 위치 설정
      >
        <Top>
          <h2>설정</h2>
          <CloseButton onClick={onClose}>
            <IconClose />
          </CloseButton>
        </Top>

        <ContainerMain>
          <AlarmItem>
            <TextWrapper>좋아요 알람</TextWrapper>
            <StyledWrapper>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={alarmSettings.storyLikeAlarm}
                  onChange={() => handleSwitchChange("storyLikeAlarm")}
                />
                <span className="slider" />
              </label>
            </StyledWrapper>
          </AlarmItem>
          <AlarmItem>
            <TextWrapper>팔로우 알람</TextWrapper>
            <StyledWrapper>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={alarmSettings.followAlarm}
                  onChange={() => handleSwitchChange("followAlarm")}
                />
                <span className="slider" />
              </label>
            </StyledWrapper>
          </AlarmItem>
          {/* <AlarmItem>
            <TextWrapper>기념일 당일 알람</TextWrapper>
            <StyledWrapper>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={alarmSettings.anniversaryAlarm}
                  onChange={() => handleSwitchChange("anniversaryAlarm")}
                />
                <span className="slider" />
              </label>
            </StyledWrapper>
          </AlarmItem> */}
          <AlarmItem>
            <TextWrapper>댓글 알람</TextWrapper>
            <StyledWrapper>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={alarmSettings.storyCommentAlarm}
                  onChange={() => handleSwitchChange("storyCommentAlarm")}
                />
                <span className="slider" />
              </label>
            </StyledWrapper>
          </AlarmItem>
          <AlarmItem>
            <TextWrapper>대댓글 알람</TextWrapper>
            <StyledWrapper>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={alarmSettings.storyReCommentAlarm}
                  onChange={() => handleSwitchChange("storyReCommentAlarm")}
                />
                <span className="slider" />
              </label>
            </StyledWrapper>
          </AlarmItem>

          <AlarmItem>
            <TextWrapper>기념일 3일 전 날씨 알람</TextWrapper>
            <StyledWrapper>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={alarmSettings.anniversaryWeatherAlarm}
                  onChange={() => handleSwitchChange("anniversaryWeatherAlarm")}
                />
                <span className="slider" />
              </label>
            </StyledWrapper>
          </AlarmItem>
          {/* <AlarmItem>
            <TextWrapper>기념일 7일 전에 알람</TextWrapper>
            <StyledWrapper>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={alarmSettings.anniversaryOneMonthAlarm}
                  onChange={() =>
                    handleSwitchChange("anniversaryOneMonthAlarm")
                  }
                />
                <span className="slider" />
              </label>
            </StyledWrapper>
          </AlarmItem> */}

          {/* <AlarmItem>
            <TextWrapper>페이지 변환 알람</TextWrapper>
            <StyledWrapper>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={alarmSettings.pageChangeAlarm}
                  onChange={() => handleSwitchChange("pageChangeAlarm")}
                />
                <span className="slider" />
              </label>
            </StyledWrapper>
          </AlarmItem> */}
        </ContainerMain>
      </ModalContainer>
    </Container>
  );
}

export default Setting;
