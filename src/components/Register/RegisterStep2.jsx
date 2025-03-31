import React from 'react'
import Octagon from './Octagon'
import heartRate from '../img/heart-rate.png'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  margin-top: 100px;
  margin-bottom: 170px;
`;
const H1 = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  text-align: center;
  color: #202020;
`;

const Content = styled.div`
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .heartRate{
        width: 50px;
        height: 50px;
        object-fit: cover;
    }
`

function RegisterStep2() {
    return (
        <Container>
            <H1>회원가입</H1>
            <Content>
                <Octagon width="450px"
                    cardwidth="400px"
                    cardheight="500px"
                    cardbackground="#e0f7fa"
                    imgwidth="120px"
                    imgheight="120px"
                    isProfilePage={false}
                    isSignUpPage={true} />
                <img src={heartRate} className='heartRate' />
                <Octagon
                    width="450px"
                    cardwidth="400px"
                    cardheight="500px"
                    cardbackground="#ffdcd6"
                    imgwidth="120px"
                    imgheight="120px"
                    isProfilePage={false}
                    isSignUpPage={true} />
            </Content>
        </Container>
    )
}

export default RegisterStep2
