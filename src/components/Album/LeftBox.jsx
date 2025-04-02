import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import { IconSearch } from '../Icons'


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
     /* border: 1px solid black; */
     width: 100%;
     border-radius: 16px;
     display: flex;
     justify-content: center;
     align-items: center;
     .logo{
        font-size: 2.5rem;
        font-weight: 700;
        color:#ff9987;
     }
     .button{
        font-weight: 700;
        font-size: 0.7rem;
        background-color: white;
        border: 1px solid #ff9987;
        border-radius: 20px;
        width: 80px;
        height: 30px;
        color: #2b2b2b;
        margin: 5px;
        &:hover{
            background-color: #ff9987;
            color: white;
        }
     }
`
const MiddleBox = styled.div`
     width: 100%;
     border-radius: 16px;
`
const SearchBox = styled.div`
width: 90%;
height: 50px;
border: 1px solid #6d6d6d33;
border-radius: 30px;
display: flex;
align-items: center;
margin: 0 auto;
background-color: #bbbbbb;
`;
const InputBox = styled.div`
width: 95%;
height: 40px;
display: flex;
align-items: center;

`
    ;
const Input = styled.input`
outline:none;
border: none;
width: 100%;
border: 1px solid #3333;
border-radius: 30px;
height: 100%;
margin-left: 10px;
padding-left: 10px;
margin-right: 5px;
&::placeholder{
  font-size: 1rem;
  font-weight: 700;
}
`;
const BottomBox = styled.div`
     border: 1px solid black;
     width: 100%;
     border-radius: 16px;
     height: 550px;
`

function LeftBox() {
    const [inputKeyword, setInputKeyword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const urlKeyword = new URLSearchParams(location.search).get('username');
    return (
        <Container>
            <TopBox>
                <div className='logo'>WeARE</div>
                <button className='button' id='newest'>최신순</button>
                <button className='button' id='like'>좋아요순</button>
                <button className='button' id='comment'>댓글순</button>
            </TopBox>
            <MiddleBox>
                <SearchBox>
                    <InputBox>
                        <Input
                            type="text"
                            value={inputKeyword}
                            onChange={(e) => setInputKeyword(e.target.value)}
                            placeholder="USERNAME을 입력해주세요"
                        />
                        <IconSearch
                            onClick={() => {
                                inputKeyword
                                    ? navigate(`/search?username=${inputKeyword}`)
                                    : alert('검색어를 입력해주세요');
                            }}
                        />
                    </InputBox>
                </SearchBox>
            </MiddleBox>
            <BottomBox></BottomBox>
        </Container>
    )
}

export default LeftBox
