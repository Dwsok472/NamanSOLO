import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReComment from './ReComment';
import { AddCommentByAlbumId, getAllCommentByAlbumId } from '../api';

const Container = styled.div`
  width: 100%;
  color: white;
`;
const CommentList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .more {
  }
`;
const Box = styled.div`
  width: 100%;
  border-bottom: 1px solid #c0c0c033;
  font-size: 0.8rem;
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
  .wrap{
    display: flex;
  }
  .show-more{
    font-size: 0.4rem;
    background-color: white;
    &:hover{
     font-weight :700 ;
    }
  }
`;
const Text = styled.div`
  width: 85%;
  padding-left: 10px;
`;

const InputWrap = styled.div`
  display: flex;
  margin-top: 12px;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  /* border: 1px solid #ccc; */
  border: none;
  font-size: 14px;
  outline: none;
`;

const SubmitButton = styled.button`
  border: none;
  background-color: #fda899;
  color: white;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.8rem;
  border-radius: 0;
`;

function Comment({ albumData, addComment }) {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [isCommentVisible, setIsCommentVisible] = useState({});
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(5); // 보이는 댓글의 갯수

  console.log(albumData.id);

  useEffect(() => {
    const sendData = [
      {
        id: 1,
        albumId: 2,
        text: '행복해 보이세요',
        username: 'user1',
        date: '2025-01-01',
      },
      {
        id: 2,
        albumId: 2,
        text: '어디로 놀러가신건가요 ?',
        username: 'user2',
        date: '2025-01-02',
      },
      {
        id: 3,
        albumId: 2,
        text: '부럽네요',
        username: 'user3',
        date: '2025-01-03',
      },
      {
        id: 4,
        albumId: 2,
        text: '저도 가고싶네요',
        username: 'user4',
        date: '2025-01-04',
      },
      {
        id: 5,
        albumId: 2,
        text: '커플 프로필 찍으신건가요',
        username: 'user5',
        date: '2025-01-05',
      },
      {
        id: 6,
        albumId: 6,
        text: '행복해 보이세요',
        username: 'user5',
        date: '2025-01-05',
      },
      {
        id: 7,
        albumId: 8,
        text: '어디로 놀러가신건가요',
        username: 'user5',
        date: '2025-01-05',
      },
    ];
    const filterdata = sendData.filter((e) => e.albumId === albumData.id);
    setData(filterdata);
    setLoading(false); // 데이터 로드 후 로딩 상태를 false로 변경
  }, [albumData.id]);

  const handleSubmit = () => {
    AddComment(); // 댓글 등록 함수 호출
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const AddComment = async () => {
    if (value.trim() === '') return; // 빈 댓글이 입력되면 등록하지 않음

    const newComment = {
      id: data.length + 1,
      albumId: albumData.id,
      text: value,
      username: 'user1',
      date: new Date().toISOString().split('T')[0],
    };
    setData((prevComments) => [...prevComments, newComment]);
    setValue('');
  };

  // 리댓글 표시 여부를 각 댓글별로 토글
  const toggleCommentVisibility = (commentId) => {
    setIsCommentVisible((prevVisibility) => ({
      ...prevVisibility,
      [commentId]: !prevVisibility[commentId], // 기존 값 반전
    }));
  };

  // 더보기 버튼 클릭 시 댓글 5개씩 추가
  const loadMoreComments = () => {
    setVisibleCommentsCount((prevCount) => prevCount + 5); // 5개씩 증가
  };

  return (
    <Container>
      <CommentList>
        {loading ? (
          <p>LOADING...</p>
        ) : (
          data.slice(0, visibleCommentsCount).map((comment) => (
            <Box
              key={comment.id}

            >
              <span className="username">{comment.username}</span>
              <span className="date">{comment.date}</span>
              <div className='wrap'>
                <Text>{comment.text}</Text>
                <button className='show-more' onClick={() => toggleCommentVisibility(comment.id)}>답글 보기</button>
              </div>
              {isCommentVisible[comment.id] && (
                <ReComment commentId={comment.id} />
              )}
            </Box>
          ))
        )}
        {data.length > visibleCommentsCount && (
          <div onClick={loadMoreComments} className="more">
            더보기
          </div>
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
