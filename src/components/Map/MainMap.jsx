import React from 'react'
import background from '../img/back2.jpg'
import question from '../img/question.png'
import place from '../img/place.png'
import heart from '../img/heart.png'
import styled from 'styled-components'
import ImageMap from './ImageMap'

const Container = styled.div`
    width: 100%;
    position: relative;
    display:flex;
    justify-content: center;
    align-items: center;
    .background{
        opacity: 0.3;
        width: 100%;
        position: absolute;
        z-index: -1;
    }
`
const ContentBox = styled.div`
width : 80%;
display: flex ;
flex-direction: row;
height: 1000px;
`
const LeftBox = styled.div`
border: 1px solid #85858533;
border-left: none;
width: 37%;
`
const BoxWrap = styled.div`
padding: 10px;
align-items: center;
margin-top: 30px;

`
const Wrap = styled.div`
    width: 100%;
    height: 40%;
    padding: 10px;
    padding-top : 250px;

    
h1{
    font-size: 3.3rem;
    font-weight: 700;

}
.hash{
    font-weight: 700;
    padding: 8px;
    text-decoration: underline;
    text-decoration-color: #ffa8a8;        /* 선의 색상을 빨간색으로 */
    text-decoration-thickness: 2px;    /* 선의 두께를 3px로 */

}
.highlight{
    color: #ff1778;
    text-decoration: none;
}
`
const Box = styled.div`
width: 100%;
display: flex;
align-items: center;
padding: 10px;
.place{
    object-fit: cover;
    width: 50px;
    height: 50px;
}
.question{
    object-fit: cover;
    width: 50px;
    height: 50px;
}
.heart{
    object-fit: cover;
    width: 50px;
    height: 50px;
}
`
const Text = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
    padding-left: 5px;
`
const MiddleBox = styled.div`

`
const RightBox = styled.div`

`

function MainMap() {
    return (
        <Container>
            <img src={background} className='background' />
            <ContentBox>
                <LeftBox>
                    <Wrap>
                        <h1><span class="highlight">가장 행복한 하루</span>를 <br />보낼 오늘</h1>
                        <span className='hash'>#데이트</span>
                        <span className='hash'>#이색체험</span>
                        <span className='hash'>#핫플</span>
                        <span className='hash'>#힐링</span>
                    </Wrap>
                    <BoxWrap>
                        <Box>
                            <img src={place} className='place' />
                            <Text>데이트할 장소에 대한 추천이 필요하시나요 ?</Text>
                        </Box>
                        <Box>
                            <img src={question} className='question' />
                            <Text>데이트할 장소가 마땅치 않나요?</Text>
                        </Box>
                        <Box>
                            <img src={heart} className='heart' />
                            <Text>연인과의 추억을 쌓으세요</Text>
                        </Box>
                    </BoxWrap>
                </LeftBox>
                <ImageMap />
                <MiddleBox></MiddleBox>
                <RightBox></RightBox>
            </ContentBox>
        </Container>
    )
}

export default MainMap
