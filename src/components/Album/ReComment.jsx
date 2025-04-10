import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useUserStore } from '../Login/Login';

function ReComment({ commentId }) {
  const [value, setValue] = useState(''); // 리댓글 입력 값
  const [data, setData] = useState([]); // 리댓글 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const currentUser = useUserStore((state) => state.user?.username);

  async function GetCommentByCommentId() {
    try {
      // 서버로 중복 확인 요청
      const response = await axios.get(
        `/api/recomment/comment-id/${commentId}`
      );
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
    GetCommentByCommentId();
  }, []);

  const handleSubmit = () => {
    AddRecomment(); // 리댓글 등록 함수 호출
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const newRecomment = {
    commentId: commentId,
    content: value,
  };
  const AddRecomment = async () => {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (value.trim() === '') return; // 빈 리댓글이 입력되면 등록하지 않음
    try {
      const response = await axios.post('/api/recomment/save', newRecomment, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200 || response.status === 201) {
        const savedReComment = response.data;
        const updatedReComments = [...data, savedReComment];
        setData(updatedReComments);
        setValue('');
      } else {
        console.error('등록 실패', response);
        alert('대댓글 등록에 실패하였습니다.');
      }
    } catch (error) {
      console.error('에러 발생', error);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <ReCommentList>
        {loading ? (
          <p>LOADING...</p>
        ) : (
          data.map((recomment) => (
            <Box key={recomment.id}>
              <span className="username">{currentUser}</span>
              <span className="date">{recomment.addDate}</span>
              <Text>{recomment.content}</Text>
            </Box>
          ))
        )}
      </ReCommentList>
      <InputWrap>
        <Input
          placeholder="댓글을 입력하세요"
          value={value}
          onChange={(e) => setValue(e.target.value)} // 입력값 상태 관리
          onKeyDown={handleKeyDown}
        />
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
      </InputWrap>
    </Container>
  );
}

export default ReComment;

// const AddComment = async () => {
//     if (value.trim() === "") return; // 빈 댓글이 입력되면 등록하지 않음

//     const newComment = {
//         id: 6,
//         commentId: comment.id,
//         text: value,
//         username: "user1",  // 실제 사용자 이름으로 변경
//         date: new Date().toISOString().split('T')[0], // 현재 날짜 (YYYY-MM-DD 형식)
//     };

//     try {
//         // 서버에 댓글을 추가하는 API 요청 (AddRecommentByCommentId는 실제 API 호출 함수로 바꿔야 함)
//         let response = await AddRecommentByCommentId(comment.id, newRecomment);

//         // 새로운 댓글을 기존 데이터에 추가
//         setData((prevRecomments) => [...prevRecomments, response]);
//         setValue(""); // 댓글 입력 필드 초기화
//     } catch (error) {
//         console.error("댓글 등록에 실패했습니다.", error);
//     }
// };

// useEffect(() => {
//     getAllComment();
// })
// async function getAllReComment() {
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
//     { id: 1, commentId: 2, text: '1', username: 'user1', date: '2025-01-01' },
//     { id: 2, commentId: 3, text: '2', username: 'user2', date: '2025-01-02' },
//     { id: 3, commentId: 4, text: '3', username: 'user3', date: '2025-01-03' },
//     { id: 4, commentId: 5, text: '4', username: 'user4', date: '2025-01-04' },
//     { id: 5, commentId: 1, text: '5', username: 'user5', date: '2025-01-05' },
//   ];

//   // 해당 commentId에 맞는 리댓글만 필터링하여 데이터 설정
//   const filterdata = sendData.filter((e) => e.commentId === commentId);
//   setData(filterdata);
//   setLoading(false); // 데이터 로딩 완료
// }, [commentId]); // commentId 변경 시만 실행되도록 설정

const Container = styled.div`
  width: 100%;
  color: white;
`;
const ReCommentList = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #333333;
`;
const Box = styled.div`
  width: 100%;
  border-bottom: 1px solid #c0c0c033;
  font-size: 0.7rem;
  color: #ffffff;
  padding: 3px;
  .username {
    padding-left: 10px;
    font-weight: 700;
  }
  .date {
    padding-left: 10px;
    color: #999999;
  }
`;
const Text = styled.div`
  width: 100%;
  padding-left: 10px;
`;

const InputWrap = styled.div`
  display: flex;
  margin-top: 12px;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: none;
  font-size: 0.8rem;
  outline: none;
  color: white;
  background-color: black;
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
  font-size: 0.8rem;
  border-radius: 0;
  &:hover {
    color: #cccccc;
  }
`;
