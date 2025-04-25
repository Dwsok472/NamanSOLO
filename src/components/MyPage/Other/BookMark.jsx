import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import star from "../../img/star.png";
import { IconClose } from "../../Icons";
import { useUserStore } from "../../Login/Login";
import axios from "axios";
import qs from "qs";
import AlbumDetailModal from "../../Album/AlbumDetailModal";

function BookMark() {
  const currentUser = useUserStore((state) => state.user?.username);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const location = useLocation(); // url로부터 정보를 얻기위한 함수
  const urlKeyword = new URLSearchParams(location.search).get("userName");
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.albumId !== id));
    const key = `bookmarkedAlbums_${currentUser}`;
    const stored = localStorage.getItem(key);

    if (stored) {
      const parsed = JSON.parse(stored); // 배열
      const updated = parsed.filter((albumId) => albumId !== id); // 삭제
      localStorage.setItem(key, JSON.stringify(updated));
    }
  };

  async function GetAllBookmark() {
    const jwt = sessionStorage.getItem("jwt-token");
    if (!jwt) {
      return;
    }
    const stored = localStorage.getItem(`bookmarkedAlbums_${currentUser}`);
    const parsed = JSON.parse(stored);
    console.log(stored);
    try {
      // 서버로 중복 확인 요청
      const response = await axios.get("/api/album/ids", {
        params: {
          id: parsed,
        },
        paramsSerializer: {
          serialize: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }), // 핵심
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response || response.length === 0) {
        console.log("즐겨찾기 데이터를 가져오지 못했습니다.");
        return;
      }
      setData(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      alert("정보를 불러오는 과장에서 에러가 발생하였습니다! ");
      throw error; // 에러 처리
    }
  }
  console.log(data);
  useEffect(() => {
    GetAllBookmark();
  }, []);

  const handleAlbumId = async (id) => {
    setShowDetail(true);
    try {
      const response = await axios.get(`/api/album/id/${id}`);
      console.log(response.data);
      console.log(response.data.greats.length);
      if (!response || response.length === 0) {
        console.log("앨범 데이터를 가져오지 못했습니다.");
        return;
      }
      setSelectedAlbum(response.data);
      console.log(selectedAlbum);
    } catch (error) {
      console.error("앨범 정보 불러오기 실패:", error);
    }
  };
  useEffect(() => {
    if (selectedAlbum) {
      console.log("selectedAlbum:", selectedAlbum);
    }
  }, [selectedAlbum]);
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
              <SmallBox
                key={item.albumId}
                onClick={() => {
                  handleAlbumId(item.albumId);
                }}
              >
                <DeleteButton onClick={() => handleDelete(item.albumId)}>
                  <IconClose />
                </DeleteButton>
                <Left>
                  {item.url.mediaType === 'PICTURE' ? (
                    <Img src={item.url.mediaUrl} />
                  ) : (
                    <video src={item.url.mediaUrl}
                      muted
                      className="video"
                    ></video>
                  )}

                </Left>

                <BottomName>
                  <p className="userName">{item.username}</p>
                </BottomName>
              </SmallBox>
            ))
          )}
        </ContentBox>
        {showDetail && selectedAlbum && (
          <AlbumDetailModal
            albumData={selectedAlbum}
            onClose={() => setShowDetail(false)}
          />
        )}
      </ContainerMain>
    </Container>
  );
}

export default BookMark;

const Container = styled.div`
  width: 330px;
  margin: 0 auto;
  margin-top: 30px;
  /* border-right: 1px solid black; */
`;

const ContainerMain = styled.div`
  width: 100%;
  border-radius: 5px;
  padding-top: 10px;
  height: 540px;
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 30px;
  gap: 15px;
  user-select: none;
  h1{
    font-size: 1.5rem;
  }
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  user-select: none;
`;

const ContentBox = styled.div`
  width: 95%;
  height: 95%;
  margin: 0 auto;
  margin-top: 10px;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
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
  cursor: pointer;
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

  width: 15%;
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
  .video{
    border-radius: 15px;
  object-fit: cover;
  border: 1px solid #333;
  align-items: center;
  width: 100px;
  height: 90px;
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
