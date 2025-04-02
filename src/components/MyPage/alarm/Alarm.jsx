import React, { useState, useEffect } from "react";
import styled from "styled-components";
import settings from "../../img/settings.png";
import { IconClose } from "../../Icons";

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
  border-radius: 8px;
  min-width: 400px;
  max-width: 700px;
  text-align: center;
  position: relative;
  cursor: grab; /* 드래그 가능하도록 설정 */
  user-select: none; /* 텍스트 선택 불가 */
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
  padding: 15px;
  border-bottom: 1px solid #eee;
`;

const AlarmItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }

  &:focus {
    outline: none;
  }

  &:last-child {
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
  }
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  cursor: pointer;
`;

function Alarm({ onClose }) {
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // 마우스 위치
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 모달의 위치

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

  const handleNavigate = (path) => {
    history.push(path); // 페이지 이동
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
          <Content>다가오는 200일에 날씨는 흐릴 것으로 예상됩니다</Content>
          <AlarmItem onClick={() => handleNavigate("/mypage/todo")}>
            곧 200일이 다가오고 있어요 데이트 코스를 미리 짜고 예약하는 것은
            어떨까요?
          </AlarmItem>
          <AlarmItem onClick={() => handleNavigate("/notifications")}>
            이벤트 공지사항이 추가되었습니다
          </AlarmItem>
          <AlarmItem onClick={() => handleNavigate("/map")}>
            데이트 장소 추천이 업데이트되었습니다
          </AlarmItem>
          <AlarmItem onClick={() => handleNavigate("/mypage/story")}>
            username이 본인의 피드에 좋아요를 눌렀습니다
          </AlarmItem>
          <AlarmItem onClick={() => handleNavigate("/mypage/other")}>
            username이 본인을 팔로우 팔로우하였습니다
          </AlarmItem>
        </ContainerMain>
      </ModalContainer>
    </Container>
  );
}

export default Alarm;
