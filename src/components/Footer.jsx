import styled from "styled-components";
import topImg from "./img/top.png";
import { useEffect, useState } from "react";
import ChatBotButton from "./ChatBot/ChatBotButton";
import ChatBot from "./ChatBot/ChatBot";
import Alarm from "./MyPage/alarm/Alarm";
import { IconBell } from "./Icons";
import { useUserStore } from "./Login/Login";
import { useAlarmList } from "./MyPage/alarm/alarmList";

const FooterWrapper = styled.footer`
  width: 100%;
  background: rgba(31, 31, 31, 0.85);
  color: #333;
  padding: 12px 0;
  font-size: 0.9rem;
  line-height: 1.3;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
`;

const FooterTitle = styled.h4`
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 1px;
  margin-bottom: 6px;
  color: white;
`;

const FooterLine = styled.hr`
  border: none;
  border-top: 1px solid #ffffff;
  margin: 6px 0 12px;
`;

const FooterGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 24px;
`;

const Column = styled.div`
  flex-basis: 30%;
  min-width: 200px;
  display: flex;
  flex-direction: column;

  h5 {
    font-weight: bold;
    margin-bottom: 6px;
    color: white;
    font-size: 1.2rem;
  }

  p,
  a {
    margin-bottom: 3px;
    color: white;
    font-size: 0.8rem;
    text-decoration: none;
    user-select: none;
  }
`;

const FixedBtn = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index:100;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  width: 55px;
  height: 55px;

  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  pointer-events: ${(props) => (props.$show ? "auto" : "none")};
  transition: opacity 0.8s ease;

  &:focus {
    outline: none;
  }

  img {
    width: 45px;
    height: 45px;
    display: block;
    transition: 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const FixedChat = styled.div`
  position: fixed;
  bottom: 80px;
  right: 18px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  width: 55px;
  height: 55px;
`;
const BellWrapper = styled.div`
  position: fixed;
  bottom: 150px;
  right: 23px;

  .button {
    width: 50px;
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 40%;
    padding: 10px;
    cursor: pointer;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(87, 86, 86, 0.13);
    border: none;
    &:focus {
      outline: none;
    }
  }
  .bell {
    width: 20px;
  }

  .bell path {
    fill: ${({ bellColor }) => bellColor || "rgb(99, 97, 97)"};
  }
  .button:hover .bell {
    animation: bellRing 0.9s both;
  }

  @keyframes bellRing {
    0%,
    100% {
      transform-origin: top;
    }
    15% {
      transform: rotateZ(10deg);
    }
    30% {
      transform: rotateZ(-10deg);
    }
    45% {
      transform: rotateZ(5deg);
    }
    60% {
      transform: rotateZ(-5deg);
    }
    75% {
      transform: rotateZ(2deg);
    }
  }

  .button:active {
    transform: scale(0.8);
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 50%;
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);
  const { isLoggedIn } = useUserStore();
  const unreadCount = useAlarmList((state) => state.unreadCount);
  // 알람 버튼 클릭
  const toggleAlarm = () => {
    if (showAlarm) {
      // 알람이 이미 열려 있으면 → 닫기
      setShowAlarm(false);
    } else {
      // 알람 열기 전, AddAlbum 열려있으면 먼저 닫고 return
      const event = new Event("closeAddAlbum");
      window.dispatchEvent(event);

      // 실제 열기 작업은 약간 delay해서 다음 클릭에 맡기기
      if (!showChat) setTimeout(() => setShowAlarm(true), 0);
    }

    // 다른 모달은 무조건 닫기
    setShowChat(false);
  };

  // 챗봇 버튼 클릭
  const handleChat = () => {
    if (showChat) {
      setShowChat(false);
    } else {
      const event = new Event("closeAddAlbum");
      window.dispatchEvent(event);

      if (!showAlarm) setTimeout(() => setShowChat(true), 0);
    }

    setShowAlarm(false);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <FooterWrapper>
        <FooterInner>
          <FooterTitle>We ARE...</FooterTitle>
          <FooterLine />
          <FooterGrid>
            <Column>
              <h5>회사 정보</h5>
              <p>대표자: 김하늘</p>
              <p>사업자 등록번호: 123-12-12345</p>
            </Column>

            <Column>
              <h5>고객센터</h5>
              <p>전화: 042-124-5210</p>
              <p>운영시간: 평일 9:00 ~ 18:00</p>
            </Column>

            <Column>
              <h5>정책</h5>
              <p>이용약관</p>
              <p>개인정보처리방침</p>
            </Column>
          </FooterGrid>
        </FooterInner>
      </FooterWrapper>
      {isLoggedIn && (
        <>
          <BellWrapper>
            <button className="button" onClick={toggleAlarm}>
              <IconBell />
              <Badge $visible={unreadCount > 0}>{unreadCount}</Badge>
            </button>
          </BellWrapper>
          {showAlarm && <Alarm onClose={toggleAlarm} />}
          <FixedChat>
            <ChatBotButton onClick={handleChat} />
          </FixedChat>
          {showChat && <ChatBot onClose={handleCloseChat} />}
        </>
      )}
      {showTopBtn && (
        <FixedBtn onClick={scrollToTop} $show={showTopBtn}>
          <img src={topImg} alt="Top" />
        </FixedBtn>
      )}
    </>
  );
};

export default Footer;
