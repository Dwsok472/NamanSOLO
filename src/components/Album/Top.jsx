import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUserStore } from '../Login/Login';

function Top({ filter, onFilterChange }) {
  const [inputKeyword, setInputKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 담기
  const [showResults, setShowResults] = useState(false); //결과 보여줄지 말지
  const searchBoxRef = useRef(null); // 바깥 영역을 클릭할때는 다시 렌더링 하지 말기!(검색바 참조)
  const [selected, setSelected] = useState('최신순');
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  async function handleSearch() {
    try {
      await SearchUser(inputKeyword);
    } catch (error) {
      alert('로그인 실패! 다시 시도해주세요.');
    }
  }
  async function SearchUser(inputKeyword) {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) {
      return;
    }
    try {
      const response = await axios.get(
        `/api/follow/search/all/${inputKeyword}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!response || response.length === 0) {
        console.log('해당 단어로 존재하는 유저가 없습니다');
        setSearchResults([]);
        setShowResults(false);
        return;
      }
      setSearchResults(response.data);
      setShowResults(true);
      console.log(response.data);
    } catch (error) {
      setSearchResults([]);
      setShowResults(false);
    }
  }

  useEffect(() => {
    handleSearch();
  }, [inputKeyword]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      //검색바를 사용하고 있는데 그 검색바 영역에서 벗어나면!!
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowResults(false); // 검색바 외부 클릭 시 결과 숨기기
        setInputKeyword('');
        setIsFocused(false);
      }
    };
    // 클릭 이벤트 등록
    document.addEventListener('mousedown', handleClickOutside);
    // 컴포넌트가 언마운트될 때 이벤트 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <TopBox>
        <button
          className={selected === '최신순' ? 'selected' : ''}
          id="newest"
          onClick={() => {
            onFilterChange('최신순');
            setSelected('최신순');
          }}
        >
          최신순
        </button>
        <button
          className={selected === '좋아요순' ? 'selected' : ''}
          id="like"
          active={filter === '좋아요순'}
          onClick={() => {
            onFilterChange('좋아요순');
            setSelected('좋아요순');
          }}
        >
          좋아요순
        </button>
        <button
          className={selected === '댓글순' ? 'selected' : ''}
          id="comment"
          active={filter === '댓글순'}
          onClick={() => {
            onFilterChange('댓글순');
            setSelected('댓글순');
          }}
        >
          댓글순
        </button>
      </TopBox>
      <MiddleBox>
        <SearchBox ref={searchBoxRef}>
          <div className="InputContainer">
            <input
              placeholder="USERNAME을 입력해주세요"
              id="input"
              className="input"
              name="text"
              type="text"
              value={inputKeyword}
              onChange={(e) => setInputKeyword(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  inputKeyword
                    ? SearchUser(inputKeyword)
                    : alert('검색어를 입력해주세요');
                }
              }}
            />
            <label
              className="labelforsearch"
              htmlFor="input"
              onClick={() => {
                inputKeyword
                  ? SearchUser(inputKeyword)
                  : alert('검색어를 입력해주세요');
              }}
            >
              <svg className="searchIcon" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </label>
          </div>
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
                      <img src={user.profileUrl} alt="profile" />
                      <div className="username">{user.username}</div>
                      <button
                        className={`follow ${
                          user.relation === 'FRIEND'
                            ? 'friend'
                            : user.relation === 'FOLLOWING'
                            ? 'following'
                            : user.relation === 'FOLLOWER'
                            ? 'follower'
                            : 'none'
                        }`}
                      >
                        {' '}
                        {user.relation === 'FRIEND' && '맞팔 중'}
                        {user.relation === 'FOLLOWING' && '팔로우 중'}
                        {user.relation === 'FOLLOWER' && '맞팔하기'}
                        {user.relation === 'NONE' && '팔로우하기'}
                      </button>
                    </Block>
                  </li>
                ))}
              </ul>
            </Wrap>
          </SearchResults>
        )}
      </MiddleBox>
    </Container>
  );
}

export default Top;

const SearchResults = styled.div`
  width: 334px;
  background-color: #ffffff;
  border-radius: 10px;
  height: 200px;
  opacity: 0;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -200px;
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
  .follow.friend {
    background-color: #707070;
  }

  .follow.following {
    background-color: #ffe600;
  }

  .follow.follower {
    background-color: #0af;
  }

  .follow.none {
    background-color: #000000;
  }
`;

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

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;
const TopBox = styled.div`
  width: 100%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  flex-wrap: nowrap; /* 줄바꿈 방지 */

  button {
    font-weight: 700;
    font-size: 0.9rem; /* 더 큰 글씨 */
    line-height: 1.2; /* 줄 간격 조정 */
    background-color: #ffffff;
    color: #2b2b2b;
    border-radius: 20px;
    width: 100px; /* 조금 더 넓게 */
    height: 35px; /* 고정 높이 */
    margin: 5px;
    transition: all 0.2s;
    cursor: pointer;
    white-space: nowrap; /* 글자 줄바꿈 방지 */

    &:hover {
      background-color: #8c0d17;
      color: white;
    }
  }

  .selected {
    background-color: #8c0d17;
    color: white;
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
  padding-right: 45px;
  position: relative;
`;
const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 20px; */

  .InputContainer {
    height: 40px;
    display: flex;
    align-items: center;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    overflow: hidden;
    padding-left: 15px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.075);
  }

  .input {
    width: 280px;
    height: 100%;
    border: none;
    outline: none;
    font-size: 0.9em;
    caret-color: rgb(255, 81, 0);
  }

  .labelforsearch {
    cursor: pointer;
    padding: 0px 12px;
  }

  .searchIcon {
    width: 15px;
  }

  .searchIcon path {
    fill: rgb(114, 114, 114);
  }
`;
