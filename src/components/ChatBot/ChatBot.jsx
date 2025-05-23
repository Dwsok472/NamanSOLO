import React, { useState, useEffect } from 'react';
import ai from '../img/ai.png';
import styled from 'styled-components';
import { useUserStore } from '../Login/Login';

function ChatBot({ onClose }) {
  const username = useUserStore((state) => state.user?.username);
  const [messages, setMessages] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [recommendationCount, setRecommendationCount] = useState(0); // 추천 횟수 저장

  const botMessages = {
    greeting: '안녕하세요! 데이트 장소 추천을 해주는 챗봇입니다',
    ask: '데이트 장소 추천을 해드릴까요?',
    more: '다른 장소도 추천해드릴까요?',
    thanks: '감사합니다.',
    end: '챗봇 이용이 마무리되었습니다.',
    bye: '알겠습니다. 다음에 도와드릴게요!',
  };

  useEffect(() => {
    setMessages([{ type: 'bot', text: botMessages.greeting }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: 'bot', text: botMessages.ask }]);
      setShowOptions(true);
    }, 1500);
  }, []);

  const fetchRecommendation = async () => {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;

    console.log("추천 횟수:", recommendationCount); // 이 부분 추가
    try {
      const res = await fetch(
        `/api/hugging/recommend?username=${username}&count=${recommendationCount}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const data = await res.text();

      setMessages((prev) => [...prev, { type: 'bot', text: data }]);

      if (recommendationCount === 0) {
        // 첫 번째 추천 후
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { type: 'bot', text: botMessages.more },
          ]);
          setShowOptions(true);
          setRecommendationCount(1);
        }, 1500);
      } else {
        // 두 번째 추천 후
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { type: 'bot', text: botMessages.thanks },
            { type: 'bot', text: botMessages.end },
          ]);
        }, 1500);
      }
    } catch (err) {
      console.error('추천 에러:', err);
    }
  };

  const handleOptionClick = (optionText) => {
    setMessages((prev) => [...prev, { type: 'user', text: optionText }]);
    setShowOptions(false);

    if (optionText === '네') {

      fetchRecommendation();
    } else {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: botMessages.bye },
        { type: 'bot', text: botMessages.end },
      ]);
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
            <MessageList>
              {messages.map((message, index) =>
                message.type === 'bot' ? (
                  <BotMessage key={index}>{message.text}</BotMessage>
                ) : (
                  <UserMessage key={index}>{message.text}</UserMessage>
                )
              )}
            </MessageList>
          </Main>
          {showOptions && (
            <Bottom>
              <button onClick={() => handleOptionClick('네')}>네</button>
              <button onClick={() => handleOptionClick('아니요')}>
                아니요
              </button>
            </Bottom>
          )}
        </Card>
      </Container>
    </>
  );
}

export default ChatBot;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1003;
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
  z-index: 1005;
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
  button {
    color: black;
    background-color: white;
    font-size: 0.8rem;
    font-weight: 700;
    width: 100px;
    &:hover {
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
