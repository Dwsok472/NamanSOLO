import React, { useState, useEffect } from "react";
import ai from "../img/ai.png";
import styled from "styled-components";

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Container = styled.div`
  width: 20%;
  margin: 0 auto;
  margin-top: 30px;
  margin-left: 30px;
  position: fixed;
  height: 500px;
  bottom: 5%;
  right: 8%;
  z-index: 200;
`;
const Card = styled.div`
  width: 100%;
  margin: 0 auto;
  border-radius: 10px;
  background-color: white;
  height: 100%;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  background-color: #8c0d17;
  font-weight: 700;
  font-size: 1.5rem;
  color: white;
  padding: 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .ai {
    width: 30px;
    height: 30px;
    object-fit: cover;
  }
`;
const Bottom = styled.div`
  position: absolute;
  bottom: 5%;
  width: 100%;
  height: 45px;
  padding-left: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 5px;
  button{
      color: black;
      background-color: white;
      font-size: 0.8rem;
      font-weight: 700;
      width: 100px;
      &:hover{
        color: white;
        background-color: #8c0d17;
      }
  }

`;

const Main = styled.div`
  width: 100%;
  height: 350px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 7px; /* 세로 스크롤바의 너비를 8px로 설정 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #727272; /* 핸들의 색상 */
    border-radius: 10px;
  }
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

const BotMessage = styled.div`
  align-self: flex-start;
  background-color: #e1f5fe;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
  word-wrap: break-word;
  color: #424242;
  font-weight: 700;
  font-size: 0.8rem;
`;

const UserMessage = styled.div`
  align-self: flex-end;
  background-color: #8c0d17;
  color: white;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
  word-wrap: break-word;
  font-weight: 700;
  font-size: 0.8rem;
`;

function ChatBot({ onClose }) {
  const [messages, setMessages] = useState([]); // 메시지 리스트
  const [botMessageIndex, setBotMessageIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false); // 네, 아니요 선택지 주기


  //임시 챗봇 내용
  const botMessages = [
    "안녕하세요! 데이트 장소 추천을 해주는 챗봇입니다",
    "데이트 장소 추천을 해드릴까요?",
    "스토리 '위치 추가' 기반으로 추천해드리겠습니다.",
    "다음 데이트 장소는 '스페이스 워크 둔산점'입니다.",
    "추가로 데이트 장소를 추천해드릴까요?",
    "추가 데이트 장소는 대전신세계백화점 점핑몬스터입니다.",
    "감사합니다.",
    "챗봇 이용이 마무리되었습니다.",
  ];

  useEffect(() => {
    setMessages([{ type: "bot", text: botMessages[0] }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text: botMessages[1] },
      ]);
      setBotMessageIndex(2);
      setShowOptions(true);
    }, 2000);
  }, []);

  const handleOptionClick = (optionText) => {
    setMessages((prev) => [...prev, { type: "user", text: optionText }]);
    setShowOptions(false);

    // 첫 번째 질문에 대한 응답
    if (botMessageIndex === 2 && optionText === "네") {
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "bot", text: botMessages[2] }]);
      }, 1000);

      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "bot", text: botMessages[3] }]);
      }, 3000);

      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "bot", text: botMessages[4] }]);
        setBotMessageIndex(5); // 추가 추천 분기 시작
        setShowOptions(true);
      }, 5000);
    }

    // 첫 번째 질문: 아니요
    else if (botMessageIndex === 2 && optionText === "아니요") {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "알겠습니다. 다음에 도와드릴게요!" },
          { type: "bot", text: botMessages[7] },
        ]);
        setBotMessageIndex(8);
      }, 1000);
    }

    // 추가 추천: 네
    else if (botMessageIndex === 5 && optionText === "네") {
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "bot", text: botMessages[5] }]);
      }, 1000);

      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "bot", text: botMessages[6] }]);
      }, 3000);

      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "bot", text: botMessages[7] }]);
        setBotMessageIndex(8);
      }, 5000);
    }

    // 추가 추천: 아니요
    else if (botMessageIndex === 5 && optionText === "아니요") {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "알겠습니다. 다음에 도와드릴게요!" },
          { type: "bot", text: botMessages[7] },
        ]);
        setBotMessageIndex(8);
      }, 1000);
    }
  };

  return (
    <>
      <BackDrop onClick={onClose} />
      <Container>
        <Card>
          <Top>
            <img src={ai} className="ai" />
            <span>채널봇</span>
          </Top>
          <Main>
            {/* 메시지 리스트 출력 */}
            <MessageList>
              {messages.map((message, index) => {
                return message.type === "bot" ? (
                  <BotMessage key={index} className="botmessage">
                    {message.text}
                  </BotMessage>
                ) : (
                  <UserMessage key={index} className="usermessage">
                    {message.text}
                  </UserMessage>
                );
              })}
            </MessageList>
          </Main>
          {showOptions && (
            <Bottom>
              <button onClick={() => handleOptionClick("네")}>네</button>
              <button onClick={() => handleOptionClick("아니요")}>아니요</button>
            </Bottom>
          )}
        </Card>
      </Container>
    </>
  );
}

export default ChatBot;

