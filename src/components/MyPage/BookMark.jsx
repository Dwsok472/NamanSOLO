import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import star from "../img/star.png";
import { IconClose } from "../Icons";

const Container = styled.div`
  width: 330px;
  margin: 0 auto;
  margin-top: 30px;
`;

const ContainerMain = styled.div`
  width: 100%;
  border-radius: 30px;
  padding-top: 10px;
  background-color: #c0c0c09e;
  height: 480px;
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 30px;
  gap: 15px;
  user-select: none;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  user-select: none;
`;

const ContentBox = styled.div`
  width: 90%;
  height: 95%;
  margin: 0 auto;
  margin-top: 10px;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  cursor: pointer;
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
  width: 45%;
  height: 140px;
  margin: 0 auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 10px;
  background-color: white;
`;

const DeleteButton = styled.button`
  color: transparent;
  font-size: 0.8rem;
  border: none;
  padding: 3px;
  cursor: pointer;
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
`;

const Left = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .storyTitle {
    font-size: 1rem;
    font-weight: 700;
    padding-left: 10px;
  }
`;

const Img = styled.img`
  border-radius: 15px;
  object-fit: cover;
  border: 1px solid #333;
  align-items: center;
  width: 100px;
  height: 90px;
`;

const BottomName = styled.div`
  margin-bottom: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;

function BookMark() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const location = useLocation(); // url로부터 정보를 얻기위한 함수
  const urlKeyword = new URLSearchParams(location.search).get("userName");

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  // 페이지 로드 시 로컬스토리지에서 데이터 불러오기
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("bookmarks"));
    if (savedData) {
      setData(savedData);
    } else {
      setData([
        {
          id: 1,
          imgurl:
            "https://img.freepik.com/premium-vector/cute-kawaii-asian-lovers-couple-goals-affection-cartoon-korean-style_733271-1261.jpg",
          username: "sangsu1",
        },
        {
          id: 2,
          imgurl:
            "https://img.freepik.com/premium-vector/cute-kawaii-asian-lovers-couple-goals-affection-cartoon-korean-style_733271-1261.jpg",
          username: "sangsu2",
        },
        {
          id: 3,
          imgurl:
            "https://img.freepik.com/premium-vector/cute-kawaii-asian-lovers-couple-goals-affection-cartoon-korean-style_733271-1261.jpg",
          username: "sagsu3",
        },
        {
          id: 4,
          imgurl:
            "https://img.freepik.com/premium-vector/cute-kawaii-asian-lovers-couple-goals-affection-cartoon-korean-style_733271-1261.jpg",
          username: "sagsu4",
        },
        {
          id: 5,
          imgurl:
            "https://img.freepik.com/premium-vector/cute-kawaii-asian-lovers-couple-goals-affection-cartoon-korean-style_733271-1261.jpg",
          username: "sagsu5",
        },
        {
          id: 6,
          imgurl:
            "https://img.freepik.com/premium-vector/cute-kawaii-asian-lovers-couple-goals-affection-cartoon-korean-style_733271-1261.jpg",
          username: "sagsu6",
        },
        {
          id: 7,
          imgurl:
            "https://img.freepik.com/premium-vector/cute-kawaii-asian-lovers-couple-goals-affection-cartoon-korean-style_733271-1261.jpg",
          username: "sagsu7",
        },
        {
          id: 8,
          imgurl:
            "https://img.freepik.com/premium-vector/cute-kawaii-asian-lovers-couple-goals-affection-cartoon-korean-style_733271-1261.jpg",
          username: "sagsu8",
        },
        {
          id: 9,
          imgurl:
            "https://img.freepik.com/premium-vector/cute-kawaii-asian-lovers-couple-goals-affection-cartoon-korean-style_733271-1261.jpg",
          username: "sagsu9",
        },
      ]);
    }
    setLoading(false);
  }, []);

  return (
    <Container>
      <Top>
        <Image src={star} />
        <h1>즐겨찾기</h1>
      </Top>
      <ContainerMain>
        <ContentBox>
          {loading ? (
            <p>LOADING...</p>
          ) : (
            data.map((item) => (
              <SmallBox key={item.id}>
                <DeleteButton onClick={() => handleDelete(item.id)}>
                  <IconClose />
                </DeleteButton>
                <Left>
                  <Img src={item.imgurl} />
                </Left>

                <BottomName>
                  <p className="userName">{item.username}</p>
                </BottomName>
              </SmallBox>
            ))
          )}
        </ContentBox>
      </ContainerMain>
    </Container>
  );
}

export default BookMark;
