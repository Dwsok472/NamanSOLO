import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { IconSearch } from '../Icons';
import couple1 from '../img/couple1.png';
import couple2 from '../img/couple2.png';
import couple3 from '../img/couple3.png';
import couple4 from '../img/couple4.jpg';
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;

`;
const TopBox = styled.div`
  width: 100%;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  .button {
    font-weight: 700;
    font-size: 0.7rem;
    background-color: #ffffff;
    border-radius: 20px;
    width: 80px;
    color: #2b2b2b;
    margin: 5px;
    &:hover {
      background-color: #f2a0a0;
      color: white;
    }
  }
`;


const MiddleBox = styled.div`
  width: 100%;
  height: auto;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 3px;
  padding-right: 30px;
  position: relative;
`;
const SearchBox = styled.div`
  width: 300px;
  height: 50px;
  /* border: 1px solid #6d6d6d33; */
  border-radius: 10px;
  /* background-color: #bbbbbb; */
  padding-top : 3.5px;
`;
const InputBox = styled.div`
  width: 95%;
  height: 30px;
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  /* border: 1px solid #3333; */
  border-radius: 5px;
  height: 100%;
  margin-left: 10px;
  padding-left: 10px;
  margin-right: 5px;
  font-size: 0.8rem;
  font-weight: 700;
  &::placeholder {
    font-size: 0.6rem;
    font-weight: 700;
  }
`;

const SearchResults = styled.div`
  width: 35%;
  background-color: #ffffff;
  border-radius: 10px;
  max-height: 200px;
  transform: translateY(-20px); /* 초기 위치 설정 */
  opacity: 0;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -190px;
z-index: 1;
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
    width: 7px; 
    position: absolute;
    right: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #8c0d17; 
    border-radius: 5px;
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
  padding-bottom: 5px;
  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 5px;
  }
  .username {
    font-size: 0.8rem;
    font-weight: 500;
    width: 55%;
    color: #1a1a1a;
  }
  .follow {
    color: #ffffff;
    background-color: #1a1a1a;
    width: 80px;
    font-size: 0.6rem;
    font-weight: 700;
  }
`;


function Top() {
  const [inputKeyword, setInputKeyword] = useState('');
  const [allUsers, setAllUsers] = useState([]); // db상에 전체 유저 조회
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 담기
  const [showResults, setShowResults] = useState(false); //결과 보여줄지 말지
  const searchBoxRef = useRef(null); // 바깥 영역을 클릭할때는 다시 렌더링 하지 말기!(검색바 참조)

  const navigate = useNavigate();
  const location = useLocation();

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
      }
    };
    // 클릭 이벤트 등록
    document.addEventListener('mousedown', handleClickOutside);
    // 컴포넌트가 언마운트될 때 이벤트 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



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
    console.log(filteredUsers);
  }
  console.log(searchResults);


  return (
    <Container>
      <TopBox>
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
        </SearchBox>
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
      </MiddleBox>
    </Container>
  )
}

export default Top

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