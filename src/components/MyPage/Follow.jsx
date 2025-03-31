import React, { useEffect, useState } from 'react';
import { IconFollowing, IconSearch, IconUsers } from '../Icons';
import styled from 'styled-components';
// import {
//   getAllFollower,
//   getAllFollowing,
//   getFollowerByUsername,
//   getFollowingByUsername,
// } from './api';
import { useLocation, useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  margin-top: 30px;
`

const ContainerMain = styled.div`
  width: 100%;
  border-radius: 30px;
  padding-top: 10px;
  background-color: #c0c0c09e;
  height: 480px;
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 30px;
  gap: 15px;
`
const SearchBox = styled.div`
width: 90%;
height: 50px;
border: 1px solid #ffffff33;
border-radius: 30px;
display: flex;
align-items: center;
margin: 0 auto;
background-color: white;
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
const ContentBox = styled.div`
width:90%;
height: 400px;
margin: 0 auto;
margin-top: 10px;
overflow: scroll;
overflow-x: hidden;
&::-webkit-scrollbar {
  width: 7px;  /* 세로 스크롤바의 너비를 8px로 설정 */
}
&::-webkit-scrollbar-thumb {
  background-color: #7a7a7a;  /* 핸들의 색상 */
  border-radius: 10px;
}
`;
const SmallBox = styled.div`
border: 1px solid #3333;
width: 90%;
height: 100px;
margin: 0 auto;
border-radius: 10px;
display: flex;
margin-bottom: 10px;
background-color: white;
`;
const Left = styled.div`
width: 60%;
padding-left: 10px;
display: flex;
align-items: center;
.userName{
  font-size: 1rem;
  font-weight: 700;
  padding-left: 10px;
}
`;
const Img = styled.img`
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #3333;
  align-items: center;
  width: 50px;
  height: 50px;

`;
const Right = styled.div`
width: 40%;
display: grid;
grid-template-rows: 1fr 1fr;
align-items: center;

`;
const TopButton = styled.button`
width: 120px;
border: 1px solid #3333;
font-size: 0.8rem;
font-weight: 700;
background-color: white;
color: #222222;
transition: all 0.3s ease;
  &:focus {
    outline: none;
  }
  &:hover {
   background-color: #afafaf;
   color: white;
   border: none;
  }
`;
const ButtomButton = styled.button`
  width: 120px;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid #3333;
  color: #fc2e2e;
  background-color: white;
  &:focus {
    outline: none;
  }
  &:hover {
    font-size: 0.9rem;
    font-weight: 700;
  }
`;

function Follow({ type }) {
  const [inputKeyword, setInputKeyword] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation(); // url로부터 정보를 얻기위한 함수
  const urlKeyword = new URLSearchParams(location.search).get('username');

  //임시용
  useEffect(() => {
    setData([
      {
        id: 1,
        imgurl: "https://img.freepik.com/premium-vector/cute-kawaii-asian-lovers-couple-goals-affection-cartoon-korean-style_733271-1261.jpg",
        username: "sangsu1234"
      },
      {
        id: 2,
        imgurl: "https://img.freepik.com/premium-vector/cute-kawaii-asian-lovers-couple-goals-affection-cartoon-korean-style_733271-1261.jpg",
        username: "sangsu1234"
      },
      {
        id: 3,
        imgurl: "https://img.freepik.com/premium-vector/cute-kawaii-asian-lovers-couple-goals-affection-cartoon-korean-style_733271-1261.jpg",
        username: "sangsu1234"
      },
      {
        id: 4,
        imgurl: "https://img.freepik.com/premium-vector/cute-kawaii-asian-lovers-couple-goals-affection-cartoon-korean-style_733271-1261.jpg",
        username: "sangsu1234"
      }
    ]);
    setLoading(false);  // 데이터가 로드된 후 로딩 상태를 false로 설정
  }, [])

  // useEffect(() => {
  //   if (urlKeyword) {
  //     if (type === 'follower') {
  //       searchFollower(urlKeyword); // 팔로워 검색
  //     } else if (type === 'following') {
  //       searchFollowing(urlKeyword); // 팔로윙 검색
  //     }
  //   } else {
  //     setData(null);
  //     setLoading(true);
  //   }
  // }, [urlKeyword, type]);

  // useEffect(() => {
  //   if (type === 'follower') {
  //     getFollower(); // 팔로워 목록 조회
  //   } else if (type === 'following') {
  //     getFollowing(); // 팔로윙 목록 조회
  //   }
  // }, [type]);

  // // 팔로워 목록을 가져오는 함수
  // async function getFollower() {
  //   try {
  //     let response = await getAllFollower();
  //     if (!response || response.length === 0) {
  //       console.log('데이터를 가져오지 못했습니다.');
  //       return;
  //     }
  //     console.log(response);
  //     setData(response);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     alert('네트워크 오류로 정상적인 동작이 안되고 있습니다');
  //   }
  // }
  // // 팔로잉 목록을 가져오는 함수
  // async function getFollowing() {
  //   try {
  //     let response = await getAllFollowing();
  //     if (!response || response.length === 0) {
  //       console.log('데이터를 가져오지 못했습니다.');
  //       return;
  //     }
  //     console.log(response);
  //     setData(response);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     alert('네트워크 오류로 정상적인 동작이 안되고 있습니다');
  //   }
  // }
  // // 특정 username으로 팔로윙 검색
  // async function searchFollowing(username) {
  //   try {
  //     let response = await getFollowingByUsername(username);
  //     if (!response || response.length === 0) {
  //       console.log('데이터를 가져오지 못했습니다.');
  //       return;
  //     }
  //     console.log(response);
  //     setData(response); // 검색된 팔로워 데이터 설정
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     alert('네트워크 오류로 정상적인 동작이 안되고 있습니다');
  //   }
  // }
  // // 특정 username으로 팔로워 검색
  // async function searchFollower(username) {
  //   try {
  //     let response = await getFollowerByUsername(username);
  //     if (!response || response.length === 0) {
  //       console.log('데이터를 가져오지 못했습니다.');
  //       return;
  //     }
  //     console.log(response);
  //     setData(response); // 검색된 팔로워 데이터 설정
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     alert('네트워크 오류로 정상적인 동작이 안되고 있습니다');
  //   }
  // }

  return (
    <Container>
      <Top>
        <IconUsers />
        <h1>{type === 'follower' ? '팔로워' : '팔로윙'}</h1>
      </Top>
      <ContainerMain>
        <SearchBox>
          <InputBox>
            <Input
              type="text"
              value={inputKeyword}
              onChange={(e) => setInputKeyword(e.target.value)}
              placeholder="검색어를 입력해주세요"
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
        <ContentBox>
          {loading ? (
            <p>LOADING...</p>
          ) : (
            data.map((item) => (
              <SmallBox key={item.id}>
                <Left>
                  <Img src={item.imgurl} />
                  <p className="userName">{item.username}</p>
                </Left>
                <Right>
                  <TopButton>
                    {' '}
                    {type === 'follower' ? '차단' : '피드 구경가기'}
                  </TopButton>
                  <ButtomButton>
                    {' '}
                    {type === 'follower' ? '팔로우 하기' : '팔로우 취소'}
                  </ButtomButton>
                </Right>
              </SmallBox>
            ))
          )}
        </ContentBox>
      </ContainerMain>
    </Container>
  );
}

export default Follow;
