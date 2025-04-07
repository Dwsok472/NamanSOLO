import React from 'react'
import ai from '../img/ai.png'

function ChatBot() {
    return (
        <>
            <BackDrop />
            <Container>
                <Top>
                    <img src={ai} className='ai' />
                    <span>채널봇</span>
                </Top>
            </Container>
        </>

    )
}

export default ChatBot
