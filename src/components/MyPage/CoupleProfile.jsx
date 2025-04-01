import React from 'react'
import heartRate from '../img/heart-rate.png'
import styled from 'styled-components'
import Octagon from '../Register/Octagon'


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
function CoupleProfile() {
    return (
        <Content>
            <Octagon width="450px"
                cardwidth="400px"
                cardheight="500px"
                cardbackground="#e0f7fa"
                imgwidth="120px"
                imgheight="120px"
                buttoncolor="#bfe4fb"
                isProfilePage={true}
                isSignUpPage={false} />
            <img src={heartRate} className='heartRate' />
            <Octagon
                width="450px"
                cardwidth="400px"
                cardheight="500px"
                cardbackground="#ffdcd6"
                imgwidth="120px"
                imgheight="120px"
                isProfilePage={true}
                isSignUpPage={false} />
        </Content>
    )
}

export default CoupleProfile
