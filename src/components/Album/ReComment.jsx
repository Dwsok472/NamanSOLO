import React, { useEffect, useState } from "react";
import styled from "styled-components";
const Container = styled.div`
width:100%;
color: white;
`
const ReCommentList = styled.div`
width: 90%;
display: flex;
flex-direction: column;
margin: 0 auto;
`
const Box = styled.div`
width:100%;
border-bottom: 1px solid #c0c0c033;
font-size: 0.7rem;
color: #ffffff;
padding: 3px;
.username{
    padding-left: 10px;
    font-weight: 700;
}
.date{
    padding-left: 10px;
    color: #999999;
}
`
const Text = styled.div`
width:100%;
padding-left: 10px;
`


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
  font-size: 0.7rem;
  border-radius: 0;
`;

function ReComment({ commentId }) {
    const [value, setValue] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);  // 로딩 상태

    useEffect(() => {
        const sendData = [
            { id: 1, commentId: 2, text: "1", username: "user1", date: "2025-01-01" },
            { id: 2, commentId: 3, text: "2", username: "user2", date: "2025-01-02" },
            { id: 3, commentId: 4, text: "3", username: "user3", date: "2025-01-03" },
            { id: 4, commentId: 5, text: "4", username: "user4", date: "2025-01-04" },
            { id: 5, commentId: 1, text: "5", username: "user5", date: "2025-01-05" }
        ]
        const filterdata = sendData.filter((e) => e.commentId === commentId);
        setData(filterdata);
        setLoading(false);  // 데이터 로드 후 로딩 상태를 false로 변경
    }, [commentId]);


    const handleSubmit = () => {
        AddRecomment(); // 댓글 등록 함수 호출
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const AddRecomment = async () => {
        if (value.trim() === "") return; // 빈 댓글이 입력되면 등록하지 않음

        const newRecomment = {
            id: 6,
            commentId: commentId,
            text: value,
            username: "user1",
            date: new Date().toISOString().split('T')[0],
        };
        setData((prevRecomments) => [...prevRecomments, newRecomment]);
        setValue("");
    }
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

    return (
        <Container>
            <ReCommentList>
                {loading ? (<p>LOADING...</p>) : (
                    data.map((recomment) => (
                        <Box key={recomment.id}>
                            <span className="username">{recomment.username}</span>
                            <span className="date">{recomment.date}</span>
                            <Text>{recomment.text}</Text>
                        </Box>
                    ))
                )}
            </ReCommentList>
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
    )
}

export default ReComment
