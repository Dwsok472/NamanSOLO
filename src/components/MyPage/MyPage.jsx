import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { IconImage } from "../Icons";
import heart from "../img/heart.png";
import { useLocation } from "react-router-dom";
import Todo from "./todo/Todo";
import Other from "./Other/Other";
import MyAlbum from "./MyAlbum/MyAlbum";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import CoupleProfile from "./CoupleProfile";
import CommentPage from "./Comment/CommentPage";
import MySetting from "./MySetting";
import Edit from "../img/edit.png";
import {
  fetchAnniversaries,
  fetchTravels,
  getCurrentUser,
  updateUserData,
  uploadProfileImage,
} from "../api2";
import { IconEdit } from "../Icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  padding: 20px;
  /* background: linear-gradient(to bottom, #b85c79, #fdecec); */
  /* background: linear-gradient(to bottom, #940e19, #ffe3e3, #fff); */
  /* background: linear-gradient(to bottom, #ffb3ae, #ffe2e2, #f2ebdc); */
  /* background-color: ${({ bgColor }) => bgColor || "#fff"}; */
  /* background: linear-gradient(to bottom, #940e19, #ffe3e3); */
  background: linear-gradient(to bottom, #ffe3e3, #fff, #ffe3e3);
`;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 380px;
  padding: 20px;
  border: 1px solid #d2d2d2;
  /* border-radius: 10px; */
  text-align: center;
  background-color: ${({ bgColor }) => bgColor || "white"};
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  /* margin-right: 30px; */
  padding-bottom: 50px;
  height: 750px;
  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
`;

const PhotoSection = styled.div`
  /* padding-top: 8%; */
  margin-bottom: 8%;
  position: relative;
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  object-fit: contain;
  border: 1px solid #3333;
  align-items: center;
  background-color: white;
`;
const ImgInput = styled.input`
  display: none;
`;
const FileButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  position: absolute;
  bottom: 0px;
  right: 30px;
  &:focus {
    outline: none;
  }
`;

const DateInfo = styled.div`
  margin-top: 5%;
  /* border-top: 1px solid ${({ borderColor }) =>
    borderColor || "#7c7c7ca8"}; */
  padding-top: 3%;
  padding-bottom: 3%;
`;

const DaysSince = styled.div`
  font-size: 4.5rem;
  color: ${({ color }) => color || "#bf1f3c"};
  font-weight: 700;
  margin: 0 auto;
`;

const MeetingDate = styled.div`
  font-size: 1.2rem;
  color: ${({ color }) => color || "#1f1f1f"};
  button {
  }
`;
const EditIcon = styled.img`
  align-items: center;
  width: 1rem;
  height: 1rem;
  margin-left: 6px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

const NameHeartSection = styled.div`
  display: flex;
  padding-bottom: 3%;
  justify-content: center;
  align-items: center;
  padding-top: 1%;
  margin-top: 50px;
  margin-bottom: 5px;
  position: relative;
  .heart {
    display: block;
    width: 70px;
    height: 70px;
  }
  .girl {
    font-size: 1.8rem;
    font-weight: 700;
    position: absolute;
    left: 0;
    margin-left: 40px;
  }
  .boy {
    font-size: 1.8rem;
    font-weight: 700;
    position: absolute;
    right: 0;
    margin-right: 30px;
  }
`;

const RightProfileCard = styled.div`
  width: 100%;
  overflow: auto;
  max-width: 1100px;
  padding: 20px;
  border: 1px solid #c9c9c9;
  /* border-radius: 10px; */
  background-color: ${({ bgColor }) => bgColor || "#fff"};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  height: 750px;
  &::-webkit-scrollbar {
    width: 7px; /* 세로 스크롤바의 너비를 8px로 설정 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #727272; /* 핸들의 색상 */
    border-radius: 10px;
  }
  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-left: none; /* 겹치는 border 제거 */
  }
`;
const TopSection = styled.div`
  display: flex;
  /* border-bottom: 1px solid ${({ borderColor }) =>
    borderColor || "#ababa8"}; */
  top: 0;
  /* background-color: ${({ bgColor }) => bgColor || "#fff"}; */
`;
const Left = styled.div`
  display: flex;
  width: 100%;
`;

const EditButton = styled.button`
  position: absolute;
  top: 25px;
  right: 18px;
  padding: 5px 12px;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
  svg {
    width: 15px;
    height: 15px;
  }
`;
const ModalWrapper = styled.div`
  border-radius: 3px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Button = styled.button`
  margin-left: ${({ $isStory }) => ($isStory ? "auto" : "0")};
  color: ${({ $isStory }) => ($isStory ? "#9f142e" : "#000")};
  background-color: ${({ $isStory }) => ($isStory ? "#ffffff" : "transparent")};
  background-color: transparent;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: 700;
  /* border: 1px solid ${({ borderColor }) => borderColor || "#fefdf1"}; */
  /* border-radius: 20px; */
  width: 145px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    color: ${({ $isStory }) => ($isStory ? "#ffffff" : "#9f142e")};
    background-color: ${({ $isStory }) => ($isStory ? "#9f142e" : "#ffffff")};
    border: 1px solid ${({ $isStory }) => ($isStory ? "#9f142e" : "#3333")};
  }
  &:focus {
    outline: none;
  }
  &.selected {
    background-color: #9f142e;
    color: #ffffff;
  }
`;

const BottomSection = styled.div`
  width: 100%;
  /* overflow: scroll;
  overflow-x: hidden; */
  .heartRate {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
  &::-webkit-scrollbar {
    width: 7px; /* 세로 스크롤바의 너비를 8px로 설정 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #727272; /* 핸들의 색상 */
    border-radius: 10px;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const DateInputRow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 12px;

  input {
    text-align: center;
    font-size: 1rem;
    width: 140px;
  }

  button {
    position: absolute;
    bottom: 488px; // 인풋보다 살짝 아래
    right: 60px; // 우측으로 살짝
   color: white;
    padding: 6px 12px;
    border: none;
    background-color: #000000;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    &:hover {
      background-color: #ffe2e2;
    }
  }
`;

function MyPage() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [originalMeetingDate, setOriginalMeetingDate] = useState(null);
  const pathname = location.pathname;
  const imgRef = useRef(null);
  const [image, setImage] = useState();
  const [daysSince, setDaysSince] = useState(null);
  const [meetingDate, setMeetingDate] = useState(null);
  const [girlname, setGirlname] = useState("");
  const [boyname, setBoyname] = useState("");
  const [menu, setMenu] = useState("커플 정보");
  const [selectedOption, setSelectedOption] = useState("커플 정보");
  const navigate = useNavigate();
  const [tempImage, setTempImage] = useState(null); // blob용
  const [selectedFile, setSelectedFile] = useState(null); // 진짜 파일
  const [showCoupleProfile, setShowCoupleProfile] = useState(false);
  const [editDateMode, setEditDateMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const handleButtonClick = (menu) => {
    setMenu(menu);
    switch (menu) {
      case "스토리":
        setTimeout(() => {
          navigate("/mypage/story", { replace: true });
        }, 0);
        break;
      case "나의 댓글":
        navigate("/mypage/comment");
        break;
      case "커플 캘린더":
        navigate("/mypage/todo");
        break;
      case "그 외":
        navigate("/mypage/other");
        break;
      default:
        break;
    }
  };

  const handleBoxClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const refetchAll = async () => {
      const annivs = await fetchAnniversaries();
      const travels = await fetchTravels();
      setEvents([...annivs, ...travels]);
    };

    refetchAll();
  }, [meetingDate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        console.log(data);

        console.log("🔥 키 리스트:", Object.keys(data));
        setGirlname(data.realNameF);
        setBoyname(data.realNameM);
        setMeetingDate(data.dDay);
        setOriginalMeetingDate(data.dDay);
        const mediaUrl = [data.mediaDTO.mediaUrl];
        setImage(mediaUrl);

        setLoading(false);
      } catch (err) {
        console.error("유저 불러오기 실패", err);
        return;
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (meetingDate) {
      calculateDaysSince(meetingDate, new Date()); // meetingDate가 있을 때만 계산
    }
  }, [meetingDate]);

  const calculateDaysSince = (meetingDate, currentDate) => {
    const date1 = new Date(meetingDate);
    const date2 = new Date(currentDate);
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    const timeDiff = date2 - date1;
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (daysDiff < 1) {
      setDaysSince("오늘");
    }
    setDaysSince(daysDiff);
  };
  const handleCompleteEdit = async () => {
    try {
      let uploadedImageUrl = null;

      if (selectedFile) {
        // 업로드 -> 경로 받아오기
        uploadedImageUrl = await uploadProfileImage(selectedFile);
      }

      const updatedData = {
        realNameM: boyname,
        realNameF: girlname,
        dday: meetingDate, // 없으면 null로 전달
      };

      if (uploadedImageUrl) {
        updatedData.profileImageUrl = uploadedImageUrl;
      }

      await updateUserData(updatedData);

      if (uploadedImageUrl) {
        setImage(uploadedImageUrl); // 실제 이미지 반영
      }
      const [annivs, travels] = await Promise.all([
        fetchAnniversaries(),
        fetchTravels(),
      ]);

      setOriginalMeetingDate(meetingDate);
      setIsEditMode(false);
    } catch (err) {
      console.error("수정 실패", err);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    try {
      const file = e.target.files[0];
      if (!file) return;

      setSelectedFile(file);
      setTempImage(URL.createObjectURL(file)); // 로컬 미리보기용
    } catch (e) {
      console.error("이미지 처리 실패", e);
    }
  };

  return (
    <Container>
      <ProfileCard>
        {loading ? (
          <div style={{ marginTop: "200px", fontSize: "1.5rem" }}>
            불러오는 중...
          </div>
        ) : (
          <>
            <MySetting onClick={() => setShowCoupleProfile(true)} />
            <EditButton
              onClick={() => {
                if (isEditMode) {
                  handleCompleteEdit();
                }
                setIsEditMode((prev) => !prev);
              }}
            >
              {isEditMode ? "완료" : <IconEdit />}
            </EditButton>
            <PhotoSection>
              {isEditMode ? (
                <Img
                  src={tempImage || image}
                  alt="profile"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    imgRef.current.click();
                  }}
                />
              ) : (
                <Img src={image} alt="profile" />
              )}
              {isEditMode && (
                <FileButton
                  onClick={() => imgRef.current && imgRef.current.click()}
                >
                  <IconImage />
                </FileButton>
              )}

              <ImgInput
                type="file"
                id="file-upload-c"
                accept="image/*"
                ref={imgRef}
                onChange={handleImageChange}
              />
            </PhotoSection>
            <DateInfo>
              {daysSince !== null && meetingDate && (
                <DaysSince>{daysSince}일</DaysSince>
              )}
              {meetingDate && (
                <MeetingDate>
                  {isEditMode ? (
                    <DateInputRow>
                      <input
                        type="date"
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                      />
                      <button
                        onClick={() => {
                          setEditDateMode(false);
                          setTempImage(null);
                          setSelectedFile(null);
                          setIsEditMode(false);
                          setMeetingDate(originalMeetingDate);
                        }}
                      >
                        취소
                      </button>
                    </DateInputRow>
                  ) : (
                    <>
                      {new Date(meetingDate).toLocaleDateString("ko-KR")}
                      {isEditMode && (
                        <span
                          style={{
                            marginLeft: "8px",
                            cursor: "pointer",
                            fontSize: "16px",
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                          onClick={() => setIsEditMode(true)}
                        >
                          <EditIcon src={Edit} alt="수정" />
                        </span>
                      )}
                    </>
                  )}
                </MeetingDate>
              )}
            </DateInfo>

            <NameHeartSection>
              <div
                className="girl"
                onChange={(e) => setGirlname(e.target.value)}
              >
                {boyname || "박서진"}
              </div>
              <img src={heart} className="heart" />
              <div className="boy" onChange={(e) => setBoyname(e.target.value)}>
                {girlname || "김동인"}
              </div>
            </NameHeartSection>
          </>
        )}
      </ProfileCard>

      <RightProfileCard>
        <TopSection>
          <Left>
            <Button
              onClick={() => {
                handleButtonClick("그 외");
                handleBoxClick("그 외");
              }}
              className={pathname.includes("/mypage/other") ? "selected" : ""}
            >
              즐겨찾기
            </Button>
            <Button
              onClick={() => {
                handleButtonClick("나의 댓글");
                handleBoxClick("나의 댓글");
              }}
              className={pathname.includes("/mypage/comment") ? "selected" : ""}
            >
              나의 댓글
            </Button>
            <Button
              onClick={() => {
                handleButtonClick("커플 캘린더");
                handleBoxClick("커플 캘린더");
              }}
              className={pathname.includes("/mypage/todo") ? "selected" : ""}
            >
              캘린더
            </Button>
            <Button
              $isStory
              onClick={() => {
                handleButtonClick("스토리");
                handleBoxClick("스토리");
              }}
              className={pathname.includes("/mypage/story") ? "selected" : ""}
            >
              My Story
            </Button>
          </Left>
        </TopSection>
        <BottomSection>
          {" "}
          <Routes>
            <Route path="/myalbum" element={<MyAlbum />} />
            <Route path="/comment" element={<CommentPage />} />
            <Route
              path="/todo"
              element={<Todo originalMeetingDate={originalMeetingDate} />}
            />
            <Route path="/other" element={<Other />} />
          </Routes>
        </BottomSection>
      </RightProfileCard>
      {showCoupleProfile && (
        <>
          <ModalWrapper>
            <CoupleProfile
              onClose={() => setShowCoupleProfile(false)}
              onUpdateNames={(girl, boy) => {
                setGirlname(girl);
                setBoyname(boy);
              }}
            />
          </ModalWrapper>
          <Backdrop onClick={() => setShowCoupleProfile(false)} />
        </>
      )}
    </Container>
  );
}

export default MyPage;
