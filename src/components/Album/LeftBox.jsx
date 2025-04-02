import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconSearch } from '../Icons';
import { getAllUsername, searchUsernameByKeyword } from '../api';
import couple1 from '../img/couple1.png';
import couple2 from '../img/couple2.png';
import couple3 from '../img/couple3.png';
import couple4 from '../img/couple4.png';

const Container = styled.div`
  border: 1px solid black;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TopBox = styled.div`
  width: 100%;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    font-size: 2.5rem;
    font-weight: 700;
    color: #ff9987;
  }
  .button {
    font-weight: 700;
    font-size: 0.7rem;
    background-color: white;
    border: 1px solid #ff9987;
    border-radius: 20px;
    width: 80px;
    height: 30px;
    color: #2b2b2b;
    margin: 5px;
    &:hover {
      background-color: #ff9987;
      color: white;
    }
  }
`;
const MiddleBox = styled.div`
  width: 100%;
  border-radius: 16px;
`;
const SearchBox = styled.div`
  position: relative;
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
`;
const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  border: 1px solid #3333;
  border-radius: 30px;
  height: 100%;
  margin-left: 10px;
  padding-left: 10px;
  margin-right: 5px;
  &::placeholder {
    font-size: 1rem;
    font-weight: 700;
  }
`;

const SearchResults = styled.div`
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 30px;
  position: absolute;
  top: 52px; /* 검색창 바로 아래 위치 */
  left: 0;
  right: 0;
  max-height: 200px;
  transform: translateY(-20px); /* 초기 위치 설정 */
  opacity: 0;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  display: flex;
  justify-content: center;
  &.show {
    transform: translateY(0); /* 결과가 보일 때 슬라이딩 */
    opacity: 1; /* 결과의 투명도 */
  }
`;

const Wrap = styled.div`
  max-height: 200px;
  width: 90%;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 8px;
  &::-webkit-scrollbar {
    width: 7px; /* 세로 스크롤바의 너비를 8px로 설정 */
    position: absolute;
    right: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #8a8a8a; /* 핸들의 색상 */
    border-radius: 10px;
  }
  hr {
    width: 310px;
  }
`;
const Block = styled.div`
  width: 95%;
  display: flex;
  margin: 5px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #b1b1b133;
  padding-bottom: 3px;
  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 5px;
  }
  .username {
    font-size: 0.9rem;
    font-weight: 500;
    width: 55%;
    color: #1a1a1a;
  }
  .follow {
    color: #ffffff;
    background-color: #1a1a1a;
    width: 90px;
    font-size: 0.7rem;
    font-weight: 700;
  }
`;

const BottomBox = styled.div`
  border: 1px solid black;
  width: 100%;
  border-radius: 16px;
  height: 150px;
`;

function LeftBox() {
  const [inputKeyword, setInputKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [allUsers, setAllUsers] = useState([]); // db상에 전체 유저 조회
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 담기
  const [showResults, setShowResults] = useState(false); //결과 보여줄지 말지
  const searchBoxRef = useRef(null); // 바깥 영역을 클릭할때는 다시 렌더링 하지 말기!(검색바 참조)
  const urlKeyword = new URLSearchParams(location.search).get('username');

  //임시용
  useEffect(() => {
    setAllUsers([
      { username: 'user1', imgurl: couple1 },
      { username: 'user2', imgurl: couple2 },
      { username: 'user3', imgurl: couple3 },
      { username: 'user4', imgurl: couple4 },
      { username: 'user5', imgurl: couple1 },
      { username: 'user6', imgurl: couple2 },
    ]);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      //검색바를 사용하고 있는데 그 검색바 영역에서 벗어나면!!
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowResults(false); // 검색바 외부 클릭 시 결과 숨기기
        setInputKeyword('');
        setSearchResultsHeight(0);
      }
    };
    // 클릭 이벤트 등록
    document.addEventListener('mousedown', handleClickOutside);
    // 컴포넌트가 언마운트될 때 이벤트 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  //   useEffect(() => {
  //     const allUser = async () => {
  //       try {
  //         const response = await getAllUsername();
  //         if (response && response.length > 0) {
  //           setAllUsers(response); // 전체 유저 목록을 상태에 저장
  //         }
  //       } catch (error) {
  //         console.log('전체 유저를 가져오는 중 오류 발생', error);
  //       }
  //     };
  //     allUser();
  //   }, []);
  useEffect(() => {
    searchUsername(inputKeyword);
  }, [inputKeyword]); // 상태변수가 아닌 일반 변수도 사용 가능!!!

  // 검색 함수
  function searchUsername(username) {
    // username이 없으면 검색을 중단하고, 그 외엔 필터링을 진행합니다.
    if (!username) {
      setSearchResults([]); // 검색어가 비면 결과를 초기화
      setShowResults(false); // 결과를 숨김
      return;
    }
    const filteredUsers = allUsers.filter((user) =>
      user.username.toLowerCase().includes(username.toLowerCase())
    );

    setSearchResults(filteredUsers); // 필터링된 결과를 상태에 저장
    setShowResults(filteredUsers.length > 0); // 결과가 있을 때만 보여주기
    setSearchResultsHeight(filteredUsers.length > 0 ? 200 : 0); // 결과가 있으면 높이 설정
  }
  console.log(searchResults);

  return (
    <Container>
      <TopBox>
        <div className="logo">WeARE</div>
        <button className="button" id="newest">
          최신순
        </button>
        <button className="button" id="like">
          좋아요순
        </button>
        <button className="button" id="comment">
          댓글순
        </button>
      </TopBox>
      <MiddleBox>
        <SearchBox ref={searchBoxRef}>
          <InputBox>
            <Input
              type="text"
              value={inputKeyword}
              onChange={(e) => setInputKeyword(e.target.value)}
              placeholder="USERNAME을 입력해주세요"
            />
            <IconSearch
              //   onClick={() => {
              //     inputKeyword
              //       ? navigate(`/search?username=${inputKeyword}`)
              //       : alert('검색어를 입력해주세요');
              //   }}
              onClick={() => {
                // 검색어가 있을 때만 검색 실행
                if (inputKeyword) {
                  searchUsername(inputKeyword);
                } else {
                  alert('검색어를 입력해주세요');
                }
              }}
            />
          </InputBox>
          {/* 검색 결과 슬라이딩 */}
          {showResults && (
            <SearchResults className={showResults ? 'show' : ''}>
              <Wrap>
                <ul>
                  {searchResults.map((user) => (
                    <li
                      key={user.username}
                      onClick={() => navigate(`/user/story/${user.username}`)}
                    >
                      <Block>
                        <img src={user.imgurl} alt="profile" />
                        <div className="username">{user.username}</div>
                        <button className="follow">팔로우하기</button>
                      </Block>
                    </li>
                  ))}
                </ul>
              </Wrap>
            </SearchResults>
          )}
        </SearchBox>
      </MiddleBox>
      <BottomBox></BottomBox>
    </Container>
  );
}

export default LeftBox;
