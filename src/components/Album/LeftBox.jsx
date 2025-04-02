import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    border: 1px solid black;
    width: 100%;
    margin: 0 auto;
    padding: 10px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const TopBox = styled.div`
     border: 1px solid black;
     width: 100%;
     border-radius: 16px;
     height: 50px;
`
const NewestButton = styled.button``
const LikedButton = styled.button``
const CommentedButton = styled.button``
const MiddleBox = styled.div`
     border: 1px solid black;
     width: 100%;
     border-radius: 16px;
     height: 150px;
`
const BottomBox = styled.div`
     border: 1px solid black;
     width: 100%;
     border-radius: 16px;
     height: 550px;
`

function LeftBox() {
    return (
        <Container>
            <TopBox>
                <NewestButton>최신순</NewestButton>
                <LikedButton>좋아요순</LikedButton>
                <CommentedButton>댓글순</CommentedButton>
            </TopBox>
            <MiddleBox></MiddleBox>
            <BottomBox></BottomBox>
        </Container>
    )
}

export default LeftBox
