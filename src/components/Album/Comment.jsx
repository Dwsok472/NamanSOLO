import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReComment from './ReComment';
import axios from 'axios';
import { useUserStore } from '../Login/Login';

function Comment({ albumData, onCommentAdd }) {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [isCommentVisible, setIsCommentVisible] = useState({}); // 각 댓글의 답글 표시 여부 상태 관리
  const currentUser = useUserStore((state) => state.user?.username);

  async function GetCommentByAlbumId() {
    try {
      // 서버로 중복 확인 요청
      const response = await axios.get(`/api/comment/album-id/${albumData.id}`);
      if (!response || response.length === 0) {
        console.log('앨범 데이터를 가져오지 못했습니다.');
        return;
      }
      setData(response.data);
      setLoading(false);
    } catch (error) {
      alert('정보를 불러오는 과장에서 에러가 발생하였습니다! ');
      throw error; // 에러 처리
    }
  }
  useEffect(() => {
    GetCommentByAlbumId();
  }, []);

  const handleSubmit = () => {
    AddComment(); // 댓글 등록 함수 호출
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const newComment = {
    content: value,
    albumId: albumData.id,
  };

  const AddComment = async () => {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (value.trim() === '') return;
    try {
      const response = await axios.post('/api/comment/save', newComment, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        const savedComment = response.data;
        const updatedComments = [...data, savedComment];
        setData(updatedComments);
        setValue('');
        // ✅ 부모에게 댓글 수 전달
        if (typeof onCommentAdd === 'function') {
          onCommentAdd(updatedComments.length);
        }
      } else {
        console.error('등록 실패', response);
        alert('댓글 등록에 실패하였습니다.');
      }
    } catch (error) {
      console.error('에러 발생', error);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  const toggleCommentVisibility = (commentId) => {
    setIsCommentVisible((prevVisibility) => ({
      ...prevVisibility,
      [commentId]: !prevVisibility[commentId],
    }));
  };

  return (
    <Container>
      <CommentList>
        {loading ? (
          <p>LOADING...</p>
        ) : (
          data.map((comment) => (
            <Box key={comment.id}>
              <span className="username">{comment.username}</span>
              <span className="date">{comment.addDate}</span>
              <div className="wrap">
                <Text>{comment.content}</Text>
                <button
                  className="show-more"
                  onClick={() => toggleCommentVisibility(comment.id)}
                >
                  {' '}
                  답글 보기
                </button>
              </div>
              {isCommentVisible[comment.id] && (
                <ReComment commentId={comment.id} />
              )}{' '}
              {/* 답글 표시 */}
            </Box>
          ))
        )}
      </CommentList>
      <InputWrap>
        <Input
          placeholder="댓글을 입력하세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
      </InputWrap>
    </Container>
  );
}

export default Comment;

// const AddComment = async () => {
//     if (value.trim() === "") return; // 빈 댓글이 입력되면 등록하지 않음

//     const newComment = {
//         id: 6,
//         albumId: albumData.id,
//         text: value,
//         username: "user1",  // 실제 사용자 이름으로 변경
//         date: new Date().toISOString().split('T')[0], // 현재 날짜 (YYYY-MM-DD 형식)
//     };

//     try {
//         // 서버에 댓글을 추가하는 API 요청 (AddCommentByAlbumId는 실제 API 호출 함수로 바꿔야 함)
//         let response = await AddCommentByAlbumId(albumData.id, newComment);

//         // 새로운 댓글을 기존 데이터에 추가
//         setData((prevComments) => [...prevComments, response]);
//         setValue(""); // 댓글 입력 필드 초기화
//     } catch (error) {
//         console.error("댓글 등록에 실패했습니다.", error);
//     }
// };

// useEffect(() => {
//     getAllComment();
// })
// async function getAllComment() {
//     try {
//         let response = await getAllCommentByAlbumId(albumData.id);
//         if (!response || response.length === 0) {
//             console.log('데이터를 가져오지 못했습니다.');
//             return;
//         }
//         setData(response);
//     } catch (error) {
//         console.log(error);
//         alert('네트워크 오류로 정상적인 동작이 안되고 있습니다');
//     }
// }

// useEffect(() => {
//   const sendData = [
//     {
//       id: 1,
//       albumId: 1,
//       text: '행복해 보이세요',
//       username: 'user1',
//       date: '2025-01-01',
//     },
//     {
//       id: 2,
//       albumId: 2,
//       text: '어디로 놀러가신건가요 ?',
//       username: 'user2',
//       date: '2025-01-02',
//     },
//     {
//       id: 3,
//       albumId: 2,
//       text: '부럽네요',
//       username: 'user3',
//       date: '2025-01-03',
//     },
//     {
//       id: 4,
//       albumId: 2,
//       text: '저도 가고싶네요',
//       username: 'user4',
//       date: '2025-01-04',
//     },
//     {
//       id: 5,
//       albumId: 3,
//       text: '커플 프로필 찍으신건가요',
//       username: 'user5',
//       date: '2025-01-05',
//     },
//     {
//       id: 6,
//       albumId: 6,
//       text: '행복해 보이세요',
//       username: 'user5',
//       date: '2025-01-05',
//     },
//     {
//       id: 7,
//       albumId: 8,
//       text: '어디로 놀러가신건가요',
//       username: 'user5',
//       date: '2025-01-05',
//     },
//   ];
//   const filterdata = sendData.filter((e) => e.albumId === albumData.id);
//   setData(filterdata);
//   setLoading(false); // 데이터 로드 후 로딩 상태를 false로 변경
// }, [albumData.id]);

const Container = styled.div`
  width: 100%;
  color: white;
`;
const CommentList = styled.div`
  height: 600px; /* 최대 높이를 설정하여 스크롤이 생기도록 함 */
  overflow-y: auto; /* 스크롤 기능 활성화 */
  margin-bottom: 1px;
  &::-webkit-scrollbar {
    width: 7px; /* 세로 스크롤바의 너비를 8px로 설정 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #727272; /* 핸들의 색상 */
    border-radius: 10px;
  }
  width: 90%;
  margin: 0 auto;
`;
const Box = styled.div`
  width: 100%;
  border-bottom: 1px solid #c0c0c033;
  padding-bottom: 3px;
  padding-top: 3px;
  font-size: 1rem;
  color: #ffffff;
  .username {
    padding-left: 10px;
    font-weight: 700;
    text-align: center;
    font-size: 0.8rem;
  }
  .date {
    padding-left: 10px;
    color: #999999;
    font-size: 0.8rem;
  }
  .wrap {
    display: flex;
  }
  .show-more {
    font-size: 0.8rem;
    background-color: black;
    border-radius: 5px;
    color: white;
    &:hover {
      color: #cccccc;
    }
  }
`;
const Text = styled.div`
  width: 85%;
  padding-left: 10px;
  display: flex;
  align-items: center;
`;

const InputWrap = styled.div`
  display: flex;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: none;
  font-size: 0.8rem;
  outline: none;
  background-color: black;
  color: white;
  &::placeholder {
    color: #cfcfcf;
  }
`;

const SubmitButton = styled.button`
  border: none;
  background-color: black;
  color: white;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 10px;
  &:hover {
    color: #cccccc;
  }
`;
