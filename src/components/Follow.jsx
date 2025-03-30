import React, { useEffect, useState } from 'react';
import { IconFollowing, IconSearch } from './Icons';
import styled from 'styled-components';
import {
  getAllFollower,
  getAllFollowing,
  getFollowerByUsername,
  getFollowingByUsername,
} from './api';
import { useLocation, useNavigate } from 'react-router-dom';

const Container = styled.div``;
const SearchBox = styled.div``;
const InputBox = styled.div``;
const Input = styled.input``;
const ContentBox = styled.div``;
const SmallBox = styled.div``;
const Left = styled.div``;
const Img = styled.img``;
const Right = styled.div``;
const TopButton = styled.button``;
const ButtomButton = styled.button``;

function Follow({ type }) {
  const [inputKeyword, setInputKeyword] = useState('');
  const [data, setData] = useState(null);
  // const [follower, setFollower] = useState([]);
  // const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation(); // url로부터 정보를 얻기위한 함수
  const urlKeyword = new URLSearchParams(location.search).get('username');

  useEffect(() => {
    if (urlKeyword) {
      if (type === 'follower') {
        searchFollower(urlKeyword); // 팔로워 검색
      } else if (type === 'following') {
        searchFollowing(urlKeyword); // 팔로윙 검색
      }
    } else {
      setData(null);
      setLoading(true);
    }
  }, [urlKeyword, type]);

  useEffect(() => {
    if (type === 'follower') {
      getFollower(); // 팔로워 목록 조회
    } else if (type === 'following') {
      getFollowing(); // 팔로윙 목록 조회
    }
  }, [type]);

  // 팔로워 목록을 가져오는 함수
  async function getFollower() {
    try {
      let response = await getAllFollower();
      if (!response || response.length === 0) {
        console.log('데이터를 가져오지 못했습니다.');
        return;
      }
      console.log(response);
      setData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert('네트워크 오류로 정상적인 동작이 안되고 있습니다');
    }
  }
  // 팔로잉 목록을 가져오는 함수
  async function getFollowing() {
    try {
      let response = await getAllFollowing();
      if (!response || response.length === 0) {
        console.log('데이터를 가져오지 못했습니다.');
        return;
      }
      console.log(response);
      setData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert('네트워크 오류로 정상적인 동작이 안되고 있습니다');
    }
  }
  // 특정 username으로 팔로윙 검색
  async function searchFollowing(username) {
    try {
      let response = await getFollowingByUsername(username);
      if (!response || response.length === 0) {
        console.log('데이터를 가져오지 못했습니다.');
        return;
      }
      console.log(response);
      setData(response); // 검색된 팔로워 데이터 설정
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert('네트워크 오류로 정상적인 동작이 안되고 있습니다');
    }
  }
  // 특정 username으로 팔로워 검색
  async function searchFollower(username) {
    try {
      let response = await getFollowerByUsername(username);
      if (!response || response.length === 0) {
        console.log('데이터를 가져오지 못했습니다.');
        return;
      }
      console.log(response);
      setData(response); // 검색된 팔로워 데이터 설정
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert('네트워크 오류로 정상적인 동작이 안되고 있습니다');
    }
  }

  return (
    <Container>
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
                <Img src={item.img} />
                <p className="userName">{item.username}</p>
              </Left>
              <Right>
                <TopButton>
                  {' '}
                  {type === 'follower' ? '피드 구경가기' : '팔로우 하기'}
                </TopButton>
                <ButtomButton>
                  {' '}
                  {type === 'follower' ? '팔로우 취소' : '팔로우 하기'}
                </ButtomButton>
              </Right>
            </SmallBox>
          ))
        )}
      </ContentBox>
    </Container>
  );
}

export default Follow;
