import React, { useState, useEffect } from "react";
import styled from "styled-components";
import defaultcouple from "../img/couple.png";
import { IconBell, IconImage } from "../Icons";
import heart from "../img/heart.png";
import { useLocation } from "react-router-dom";
import { getDdayByUsername } from "../api";
import Octagon from "../Register/Octagon";
import RegisterMain from "../Register/RegisterMain";
import Todo from "./todo/Todo";
import Follow from "./Follow";
import Other from "./Other";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import RegisterStep2 from "../Register/RegisterStep2";
import heartRate from "../img/heart-rate.png";
import CoupleProfile from "./CoupleProfile";
import Alarm from "./alarm/Alarm";
import CommentPage from "./Comment/CommentPage";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  padding: 20px;
  background-color: ${({ bgColor }) => bgColor || "#fff"};
`;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 380px;
  padding: 20px;
  border-radius: 30px;
  text-align: center;
  background-color: ${({ bgColor }) => bgColor || "#ffdcd6"};
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  margin-right: 30px;
  padding-bottom: 50px;
  height: 750px;
`;

const PhotoSection = styled.div`
  padding-top: 8%;
  margin-bottom: 8%;
  position: relative;
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #3333;
  align-items: center;
  cursor: pointer;
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
  border-top: 1px solid ${({ borderColor }) => borderColor || "#7c7c7ca8"};
  padding-top: 3%;
  padding-bottom: 3%;
`;

const DaysSince = styled.p`
  font-size: 4.5rem;
  color: ${({ color }) => color || "#ff7979e3"};
  font-weight: 700;
  margin: 0 auto;
`;

const MeetingDate = styled.p`
  font-size: 1.2rem;
  color: ${({ color }) => color || "#808080"};
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
  max-width: 1100px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 30px;
  background-color: ${({ bgColor }) => bgColor || "#fff"};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  height: 750px;
`;
const TopSection = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ borderColor }) => borderColor || "#ababa8"};
  top: 0;
  background-color: ${({ bgColor }) => bgColor || "#fff"};
`;
const Left = styled.div`
  width: 100%;
`;

const Button = styled.button`
  background-color: ${({ bgColor }) => bgColor || "#fcf7c9"};
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: 700;
  border: 1px solid ${({ borderColor }) => borderColor || "#fefdf1"};
  border-radius: 20px;
  width: 145px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#fff56f"};
  }
  &:focus {
    outline: none;
  }
  &.selected {
    background-color: #fff56f;
    color: #181818;
  }
`;
const BellWrapper = styled.div`
  .button {
    width: 50px;
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 40%;
    padding: 10px;
    cursor: pointer;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(87, 86, 86, 0.13);
    border: none;
    &:focus {
      outline: none;
    }
  }
  .bell {
    width: 20px;
  }

  .bell path {
    fill: ${({ bellColor }) => bellColor || "rgb(99, 97, 97)"};
  }
  .button:hover .bell {
    animation: bellRing 0.9s both;
  }

  @keyframes bellRing {
    0%,
    100% {
      transform-origin: top;
    }
    15% {
      transform: rotateZ(10deg);
    }
    30% {
      transform: rotateZ(-10deg);
    }
    45% {
      transform: rotateZ(5deg);
    }
    60% {
      transform: rotateZ(-5deg);
    }
    75% {
      transform: rotateZ(2deg);
    }
  }

  .button:active {
    transform: scale(0.8);
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
function MyPage() {
  const location = useLocation();
  const pathname = location.pathname;

  const [image, setImage] = useState(defaultcouple);
  const [daysSince, setDaysSince] = useState(null);
  const [meetingDate, setMeetingDate] = useState(null);
  const [girlname, setGirlname] = useState("");
  const [boyname, setBoyname] = useState("");
  const [menu, setMenu] = useState("커플 정보");
  const [selectedOption, setSelectedOption] = useState("커플 정보");
  const navigate = useNavigate();
  const [showAlarm, setShowAlarm] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (menu) => {
    setMenu(menu);
    switch (menu) {
      case "커플 정보":
        navigate("/mypage/info");
        break;
      case "나의 스토리":
        navigate("/mypage/story");
        break;
      case "나의 댓글":
        navigate("/mypage/comment");
        break;
      case "캘린더":
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

  /* useEffect(() => {
    getDday();
  }, []);
  async function getDday() {
    try {
      let response = await getDdayByUsername(username);
      if (!response || response.length === 0) {
        console.log('데이터를 가져오지 못했습니다.');
        return;
      }
      setMeetingDate(response);
    } catch (error) {
      console.log(error);
      alert('네트워크 오류로 정상적인 동작이 안되고 있습니다');
    }
  } */
  //임시용
  useEffect(() => {
    setMeetingDate("2025.03.30");
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
    setDaysSince(daysDiff);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const FileInput = () => {
    document.getElementById("file-upload-c").click();
  };
  // 알람 모달 열기/닫기 함수
  const toggleAlarm = () => {
    setShowAlarm((prev) => !prev);
  };
  return (
    <Container>
      <ProfileCard>
        <PhotoSection>
          <Img src={image} onClick={FileInput} />
          <ImgInput
            type="file"
            id="file-upload-c"
            accept="image"
            onChange={handleImageChange}
          />
          <FileButton onClick={FileInput}>
            <IconImage />
          </FileButton>
        </PhotoSection>
        <DateInfo>
          {daysSince !== null && meetingDate && (
            <DaysSince>{daysSince}일</DaysSince>
          )}
          {meetingDate && (
            <MeetingDate>
              {new Date(meetingDate).toLocaleDateString()}
            </MeetingDate>
          )}
        </DateInfo>

        <NameHeartSection>
          <div className="girl" onChange={(e) => setGirlname(e.target.value)}>
            {girlname || "박서진"}
          </div>
          <img src={heart} className="heart" />
          <div className="boy" onChange={(e) => setBoyname(e.target.value)}>
            {boyname || "김동인"}
          </div>
        </NameHeartSection>
      </ProfileCard>

      <RightProfileCard>
        <TopSection>
          <Left>
            <Button
              onClick={() => {
                handleButtonClick("커플 정보");
                handleBoxClick("커플 정보");
              }}
              className={pathname.includes("/mypage/info") ? "selected" : ""}
            >
              커플 정보
            </Button>
            <Button
              onClick={() => {
                handleButtonClick("나의 스토리");
                handleBoxClick("나의 스토리");
              }}
              className={pathname.includes("/mypage/story") ? "selected" : ""}
            >
              나의 스토리
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
                handleButtonClick("캘린더");
                handleBoxClick("캘린더");
              }}
              className={pathname.includes("/mypage/todo") ? "selected" : ""}
            >
              캘린더
            </Button>
            <Button
              onClick={() => {
                handleButtonClick("그 외");
                handleBoxClick("그 외");
              }}
              className={pathname.includes("/mypage/other") ? "selected" : ""}
            >
              그 외
            </Button>
          </Left>
          <BellWrapper>
            <button className="button" onClick={toggleAlarm}>
              <IconBell />
            </button>
            {showAlarm && <Alarm onClose={toggleAlarm} />}
          </BellWrapper>
        </TopSection>
        <BottomSection>
          {" "}
          <Routes>
            <Route path="/info" element={<CoupleProfile />} />
            <Route path="/story" element={<RegisterStep2 />} />
            <Route path="/comment" element={<CommentPage />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/other" element={<Other />} />
          </Routes>
        </BottomSection>
      </RightProfileCard>
    </Container>
  );
}

export default MyPage;
