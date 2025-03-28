import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    width: 110px;
    height: 40px;
    border-radius: 10px;
    background-color: #ffb4a7;
    border: 1px solid white;
    font-size: 1rem;
    font-weight: 700;
    color: white;
    cursor: pointer;
    &:hover{
        background-color: white;
        border: 1px solid #3333;
        color: #1b1b1b;
    }
    &:focus{
      outline: none;
    }
`


function RegisterButton() {
    return (
        <div>
            <Button>회원가입</Button>
        </div>
    )
}

export default RegisterButton