import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useUserStore } from '../Login/Login';

function ReComment({ commentId }) {
  const [value, setValue] = useState(''); // 리댓글 입력 값
  const [data, setData] = useState([]); // 리댓글 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const currentUser = useUserStore((state) => state.user?.username);
  const isAdmin = useUserStore((state) => state.user?.authority);

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

  async function deleteByAdmin(id) {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) return;
    try {
      const response = await axios.delete(
        `/api/recomment/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return alert(response.data);
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      return null;
    }
  }

  async function handleDeleteRecomment(id) {
    const confirmDelete = window.confirm(`대댓글을 정말 삭제하시겠어요?`);
    if (!confirmDelete) return;
    await deleteByAdmin(id);
    setData((prev) => prev.filter((item) => item.id !== id));
  }


  return (
    <Container>
      <ReCommentList>
        {loading ? (
          <p>LOADING...</p>
        ) : (
          data.map((recomment) => (
            <Box key={recomment.id}>
              <span className="username">{recomment.username}</span>
              <span className="date">{recomment.addDate}</span>
              {isAdmin === "ROLE_ADMIN" && <button className='admin' onClick={() => handleDeleteRecomment(recomment.id)}>삭제</button>}
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

const Container = styled.div`
  width: 100%;
  color: white;
`;
const ReCommentList = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #f6f2ea;
`;
const Box = styled.div`
  width: 100%;
  border-bottom: 1px solid #c0c0c033;
  font-size: 0.7rem;
  color: #272727;
  padding: 3px;
  .username {
    padding-left: 10px;
    font-weight: 700;
  }
  .date {
    padding-left: 10px;
    color: #999999;
  }
  .admin{
  position: absolute;
  right: 30px;
color: #000;
background-color: #f6f2ea;
border: none;
border-radius: 6px;
font-size: 0.6rem;
font-weight: bold;
cursor: pointer;
transition: background-color 0.2s ease, color 0.2s ease;
z-index: 100;
&:hover {
background-color: #000;
color: #fff;
}
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
