import React, { useState, useEffect } from 'react'
import ai from '../img/ai.png'
import styled from 'styled-components'

const BackDrop = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 150;`
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
  `
const Card = styled.div`
    width: 100%;
    margin: 0 auto;
    border-radius: 10px;
    background-color: white;
    height: 100%;
    `

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
  .ai{
    width: 30px;
    height: 30px;
    object-fit: cover;
  }
`
const Bottom = styled.div`
position:absolute;
bottom: 5%;
width: 100%;
height: 45px;
padding-left: 5px;
border-top: 1px solid #dadada;
border-bottom: 1px solid #dadada;
justify-content: center;
align-items: center;
display: flex;
input{
    width: 80%;
    outline: none;
    border: none;
}
.send{
    background-color: #383838;
    font-weight: 700;
    font-size: 0.8rem;
    color:  white;
    &:hover{
        color: #383838;
        background-color: #c9c9c9;
    }
}
`

const Main = styled.div`
width:100%;
height: 350px;
overflow-y: auto;
&::-webkit-scrollbar {
    width: 7px; /* 세로 스크롤바의 너비를 8px로 설정 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #727272; /* 핸들의 색상 */
    border-radius: 10px;
  }
`

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
    const [text, setText] = useState(""); // input 입력어 관리
    const [isSending, setIsSending] = useState(false); // 전송 중 여부를 나타내는 상태
    const [messages, setMessages] = useState([]); // 메시지 리스트
    const [botMessageIndex, setBotMessageIndex] = useState(0);

    const botMessages = [
        "안녕하세요! 무엇을 도와드릴까요?",
        "데이트 장소 추천을 해드릴까요?",
        "스토리 '위치 추가' 기반으로 추천해드리겠습니다.",
        "다음 데이트 장소는 '스페이스 워크 둔산점'입니다.",
        "감사합니다",
        "챗봇 이용이 마무리되었습니다"
    ];

    // 컴포넌트가 처음 렌더링될 때 기본 0번 인덱스의 봇 메시지 추가
    useEffect(() => {
        setMessages([{ type: "bot", text: botMessages[botMessageIndex] }]);
        setBotMessageIndex(1);
    }, []);

    // 사용자가 메시지를 보내면 봇의 메시지가 하나씩 출력됨
    const handleSend = () => {
        if (text.trim() === "") return; // 빈 텍스트는 전송하지 않도록 처리

        // 사용자 메시지 추가
        setMessages(prevMessages => [
            ...prevMessages,
            { type: "user", text }
        ]);

        setIsSending(true);
        setText(""); // 전송 후 텍스트 초기화

        // 봇의 메시지가 순차적으로 출력되도록 함
        setTimeout(() => {
            if (botMessageIndex === 1) {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { type: "bot", text: botMessages[botMessageIndex] }
                ]);
                setBotMessageIndex(2); // 2번 인덱스 메시지로 이동
            } else if (botMessageIndex === 2) {
                // 2번 인덱스와 3번 인덱스를 2초 간격으로 출력
                setMessages(prevMessages => [
                    ...prevMessages,
                    { type: "bot", text: botMessages[botMessageIndex] }
                ]);
                setTimeout(() => {
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { type: "bot", text: botMessages[botMessageIndex + 1] }
                    ]);
                }, 2000); // 2초 후에 3번 인덱스 메시지 추가
                setTimeout(() => {
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { type: "bot", text: botMessages[botMessageIndex + 2] }
                    ]);
                    setBotMessageIndex(5);
                }, 2000);
            } else if (botMessageIndex === 5) {
                // 봇 메시지 5번 추가
                setMessages(prevMessages => [
                    ...prevMessages,
                    { type: "bot", text: botMessages[botMessageIndex] }
                ]);
                setBotMessageIndex(6); // 더 이상 메시지를 추가하지 않음
            }
        }, 500); // 사용자가 메시지를 보낸 후 0.5초 뒤에 봇의 응답이 나오도록 설정
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };
    return (
        <>
            <BackDrop onClick={onClose} />
            <Container>
                <Card>
                    <Top>
                        <img src={ai} className='ai' />
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
                    <Bottom>
                        <input type="text" value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder='"데이트 장소 추천" 입력' />
                        <button className='send'
                            onClick={handleSend}
                            disabled={isSending || text.trim() === ""} // 전송 중이거나 텍스트가 없으면 비활성화
                        >전송</button>
                    </Bottom>
                </Card>
            </Container>
        </>
    )
}

export default ChatBot
