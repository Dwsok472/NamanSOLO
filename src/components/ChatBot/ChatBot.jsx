import React from 'react'
import ai from '../img/ai.png'
import styled from 'styled-components'

const BackDrop = styled.div``
const Container = styled.div``
const Top = styled.div``

function ChatBot({ onClose }) {
    return (
        <>
            <BackDrop onClick={onClose} />
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
