import React, { useState, useEffect } from "react";
import styled from "styled-components";
import defaultcouple from "../img/couple.png";
import { IconImage } from "../Icons";
import heart from '../img/heart.png';
import { getDdayByUsername } from "../api";
import Octagon from "../Register/Octagon";
import RegisterMain from "../Register/RegisterMain";
import ToDo from "./todo/Todo";
import Follow from "./Follow";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  &:focus{
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
  .heart{
    display: block;
    width: 70px;
    height: 70px;
  
  }
  .girl{
    font-size: 1.8rem;
    font-weight: 700;
    position: absolute;
    left: 0;
    margin-left: 40px;
  }
  .boy{
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
  overflow-y: auto;
  height: 750px;
`;
const TopSection = styled.div`
  display: flex ;
  border-bottom: 1px solid ${({ borderColor }) => borderColor || "#ababa8"};
  position: sticky;
  top: 0;
  background-color: ${({ bgColor }) => bgColor || "#fff"};
  z-index: 10;
`;
const Left = styled.div`
width:100%
`

const Button = styled.button`
  background-color: ${({ bgColor }) => bgColor || "#fcf7c9"};
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: 700;
  border: 1px solid ${({ borderColor }) => borderColor || "#fefdf1"};
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#fff56f"};
  }
  &:focus{
    outline: none;
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
    &:focus{
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

const BottomSection = styled.div``

function MyProfile() {
  const [image, setImage] = useState(defaultcouple);
  const [daysSince, setDaysSince] = useState(null);
  const [meetingDate, setMeetingDate] = useState(null);
  const [girlname, setGirlname] = useState("");
  const [boyname, setBoyname] = useState("");
  const [menu, setMenu] = useState('커플 정보');

  const handleButtonClick = (menuName) => {
    setMenu(menuName);
  };

  const handleMenu = () => {
    switch (menu) {
      case "커플 정보":
        return <Octagon />;
      case "나의 피드":
        return <RegisterMain />;
      case "나의 댓글":
        return <Octagon />;
      case "캘린더":
        return <ToDo />;
      case "그 외":
        return <Follow />;

      default:
        return null;
    }
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
  }, [])

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
    document.getElementById('file-upload').click();
  };
  return (
    <Container>
      <ProfileCard>
        <PhotoSection>
          <Img
            src={image}
            onClick={FileInput}
          />
          <ImgInput
            type="file"
            id="file-upload"
            accept="image"
            onChange={handleImageChange}
          />
          <FileButton onClick={FileInput}>
            <IconImage />
          </FileButton>
        </PhotoSection>
        <DateInfo>
          {daysSince !== null && meetingDate && (
            <DaysSince >{daysSince}일</DaysSince>
          )}
          {meetingDate && (
            <MeetingDate>{new Date(meetingDate).toLocaleDateString()}</MeetingDate>
          )}
        </DateInfo>

        <NameHeartSection>
          <div className="girl" onChange={(e) => setGirlname(e.target.value)}>{girlname || "박서진"}</div>
          <img src={heart} className="heart" />
          <div className="boy" onChange={(e) => setBoyname(e.target.value)}>{boyname || "김동인"}</div>
        </NameHeartSection>
      </ProfileCard>

      <RightProfileCard>
        <TopSection>
          <Left>
            <Button onClick={() => handleButtonClick("커플 정보")}>커플 정보</Button>
            <Button onClick={() => handleButtonClick("나의 피드")}>나의 피드</Button>
            <Button onClick={() => handleButtonClick("나의 댓글")}>나의 댓글</Button>
            <Button onClick={() => handleButtonClick("캘린더")}>캘린더</Button>
            <Button onClick={() => handleButtonClick("그 외")}>그 외</Button>
          </Left>
          <BellWrapper>
            <button className="button">
              <svg viewBox="0 0 448 512" className="bell">
                <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
              </svg>
            </button>
          </BellWrapper>
        </TopSection>
        <BottomSection>
          {handleMenu()}
        </BottomSection>
      </RightProfileCard>
    </Container>
  );
}

export default MyProfile;
