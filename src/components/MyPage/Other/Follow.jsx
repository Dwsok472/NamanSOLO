import React, { useEffect, useState } from 'react';
import { IconFollowing, IconSearch, IconUsers } from '../../Icons';
import styled from 'styled-components';
import { useUserStore } from '../../Login/Login';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

function Follow({ type }) {
  const [inputKeyword, setInputKeyword] = useState('');
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // url로부터 정보를 얻기위한 함수
  const urlKeyword = new URLSearchParams(location.search).get('username');
  const currentUser = useUserStore((state) => state.user?.username);

  const data = useMemo(() => {
    return type === 'follower' ? follower : following;
  }, [type, follower, following]);

  async function GetAllFollower() {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) {
      return;
    }
    try {
      const response = await axios.get('/api/follow/all/followers', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response || response.length === 0) {
        console.log('팔로워 데이터를 가져오지 못했습니다.');
        return;
      }
      setFollower(response.data);
      setLoading(false);
    } catch (error) {
      alert('정보를 불러오는 과장에서 에러가 발생하였습니다! ');
      throw error; // 에러 처리
    }
  }
  async function GetAllFollowings() {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) {
      return;
    }
    try {
      const response = await axios.get('/api/follow/all/followings', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response || response.length === 0) {
        console.log('팔로잉 데이터를 가져오지 못했습니다.');
        return;
      }
      setFollowing(response.data);
      setLoading(false);
    } catch (error) {
      alert('정보를 불러오는 과장에서 에러가 발생하였습니다! ');
      throw error; // 에러 처리
    }
  }
  useEffect(() => {
    GetAllFollower();
    GetAllFollowings();
  }, []);

  //검색
  async function SearchUserFollower() {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;

    try {
      const response = await axios.get(`/api/follow/search/user-follower`, {
        params: { username: inputKeyword },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setFollower(response.data);
      setLoading(false);
    } catch (error) {
      throw error;
    }
  }
  async function SearchUserFollowing() {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;
    try {
      const response = await axios.get(`/api/follow/search/user-following`, {
        params: { username: inputKeyword },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setFollowing(response.data);
      setLoading(false);
    } catch (error) {
      throw error;
    }
  }

  async function handleFollowerSearch() {
    try {
      await SearchUserFollower();
    } catch (error) {
      alert('로그인 실패! 다시 시도해주세요.');
    }
  }
  async function handleFollowingSearch() {
    try {
      await SearchUserFollowing();
    } catch (error) {
      alert('로그인 실패! 다시 시도해주세요.');
    }
  }

  useEffect(() => {
    if (!inputKeyword || inputKeyword.trim() === '') {
      // 검색어가 비워지면 전체 데이터를 다시 불러옴
      if (type === 'follower') {
        GetAllFollower();
      } else {
        GetAllFollowings();
      }
      return;
    }
    if (type === 'follower') {
      handleFollowerSearch();
    } else {
      handleFollowingSearch();
    }
  }, [inputKeyword, type]);

  async function deleteFollower(username) {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;
    try {
      await axios.delete(`/api/follow/delete/follower/${username}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setFollower((prevFollowers) =>
        prevFollowers.filter((user) => user.username !== username)
      );

      setLoading(false);
      window.location.reload();
    } catch (error) {
      throw error;
    }
  }
  async function handledeleteFollower(username) {
    try {
      const isConfirmed = confirm('해당 유저를 삭제 처리하도록 할까요 ?');
      if (isConfirmed) {
        await deleteFollower(username);
      }
    } catch (error) {
      alert('삭제에 실패하였습니다');
    }
  }
  async function deleteFollowing(username) {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;
    try {
      await axios.delete(`/api/follow/delete/following/${username}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setFollowing((prevFollowings) =>
        prevFollowings.filter((user) => user.username !== username)
      );

      setLoading(false);
      window.location.reload();
    } catch (error) {
      throw error;
    }
  }

  async function handledeleteFollowing(username) {
    try {
      const isConfirmed = confirm(
        '해당 유저를 팔로우 취소 처리하도록 할까요 ?'
      );
      if (isConfirmed) {
        await deleteFollowing(username);
      }
    } catch (error) {
      alert('삭제에 실패하였습니다');
    }
  }

  async function addFollow(targetUsername) {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) {
      alert('로그인이 필요합니다.');
      return;
    }
    const newFollow = {
      follower: currentUser,
      following: targetUsername,
    };
    try {
      const response = await axios.post(
        '/api/follow/new/following',
        newFollow,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setFollowing((prev) => {
          const exists = prev.some((user) => user.username === targetUsername);
          if (exists) return prev;
          return [
            ...prev,
            {
              username: targetUsername,
              profileUrl: '', // 서버에서 받아온 경우 사용
            },
          ];
        });

        alert('팔로우 성공!');
        window.location.reload();
      } else {
        console.error('등록 실패', response);
        alert('팔로잉 등록에 실패하였습니다.');
      }
    } catch (error) {
      console.error('에러 발생', error);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  }
  return (
    <Container className={type === 'follower' ? '' : 'active'}>
      <Top>
        <IconUsers />
        <h1>{type === 'follower' ? '팔로워' : '팔로잉'}</h1>
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
              <SmallBox key={item.username}>
                <Left>
                  <Img src={item.profileUrl} />
                  <p
                    className="userName"
                    onClick={() => navigate(`/user/album/${item.username}`)}
                  >
                    {item.username}
                  </p>
                </Left>
                <Right>
                  <TopButton
                    className={item.mutualFollow ? 'mutual' : 'none'}
                    onClick={async () => {
                      if (type === 'follower' && !item.mutualFollow) {
                        await addFollow(item.username); // 팔로우 요청
                      }
                      if (type === 'following' && !item.mutualFollow) {
                        navigate(`/user/story/${item.username}`); // 앨범 구경
                      }
                    }}
                  >
                    {type === 'follower'
                      ? item.mutualFollow
                        ? '맞팔중'
                        : '팔로우 하기'
                      : item.mutualFollow
                      ? '맞팔중'
                      : '앨범 구경하기'}
                  </TopButton>
                  <ButtomButton
                    onClick={() =>
                      type === 'follower'
                        ? handledeleteFollower(item.username)
                        : handledeleteFollowing(item.username)
                    }
                  >
                    {type === 'follower' ? '팔로우 해제' : '팔로우 취소'}
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

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  margin-top: 30px;
  border: 1px solid #bb1616;
  border-radius: 20px;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.5);
  padding-top: 20px;
  background-color: white;
  margin-left: 80px;
`;

const ContainerMain = styled.div`
  width: 100%;
  border-radius: 5px;
  padding-top: 10px;
  height: 500px;
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 30px;
  gap: 15px;
  user-select: none;
  h1 {
    font-size: 1.5rem;
  }
`;
const SearchBox = styled.div`
  width: 85%;
  height: 50px;
  border: 1px solid #cecece;
  border-radius: 10px;
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
`;
const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  /* border: 1px solid #3333; */
  border-radius: 30px;
  height: 100%;
  margin-left: 10px;
  padding-left: 10px;
  margin-right: 5px;
  &::placeholder {
    font-size: 0.8rem;
    font-weight: 700;
  }
`;
const ContentBox = styled.div`
  width: 85%;
  height: 85%;
  margin: 0 auto;
  margin-top: 10px;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 7px; /* 세로 스크롤바의 너비를 8px로 설정 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #727272; /* 핸들의 색상 */
    border-radius: 10px;
  }
`;
const SmallBox = styled.div`
  border: 1px solid #3333;
  width: 100%;
  height: 80px;
  margin: 0 auto;
  border-radius: 10px;
  display: flex;
  margin-bottom: 10px;
  background-color: white;
`;
const Left = styled.div`
  width: 75%;
  padding-left: 5px;
  display: flex;
  align-items: center;
  .userName {
    font-size: 1rem;
    font-weight: 700;
    padding-left: 5px;
    cursor: pointer;
  }
`;
const Img = styled.img`
  border-radius: 50%;
  object-fit: contain;
  border: 1px solid #3333;
  align-items: center;
  width: 50px;
  height: 50px;
`;
const Right = styled.div`
  width: 43%;
  display: flex;
  flex-direction: column;
  justify-content: center; // 수직 중앙
  align-items: center; // 수평 중앙
  .none {
    &:hover {
      background-color: #afafaf;
      color: white;
      border: none;
    }
  }
  .mutual {
    background-color: #000000;
    color: white;
    border: none;
  }
`;
const TopButton = styled.button`
  width: 90px;
  border: 1px solid #3333;
  font-size: 0.6rem;
  font-weight: 700;
  background-color: white;
  color: #222222;
  transition: all 0.3s ease;
  margin: 5px;
  &:focus {
    outline: none;
  }
`;

const ButtomButton = styled.button`
  width: 90px;
  font-size: 0.6rem;
  font-weight: 700;
  border: 1px solid #3333;
  color: #fc2e2e;
  background-color: white;
  margin: 5px;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #ff3434;
    color: white;
    border: none;
  }
`;
