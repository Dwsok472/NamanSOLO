import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IconPhoto } from "./Icons";
import defaultcouple from "../components/img/defaultcouple.jpg";
import puzzle from "../components/img/puzzle.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  padding: 20px;
  background-color: ${({ bgColor }) => bgColor || "#fff"};
`;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 380px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  background-color: ${({ bgColor }) => bgColor || "#ffae9f5c"};
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  margin-right: 30px;
`;

const PhotoSection = styled.div`
  padding-top: 8%;
  margin-bottom: 8%;
  position: relative;
  display: flex;
  justify-content: center;
`;

const ProfilePhotoContainer = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  border: 2px solid #9d97977f;
  overflow: hidden;
`;

const ProfilePhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlusButton = styled.label`
  position: absolute;
  bottom: -10px;
  right: 20%;
  width: 30px;
  border-radius: 50%;
  background-color: transparent;
  color: ${({ color }) => color || "#9d97977f"};
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  opacity: 0.7;
  border: 2px solid ${({ borderColor }) => borderColor || "#9d97977f"};
  z-index: 1;
`;

const DateInfo = styled.div`
  margin-top: 10%;

  border-top: 1px solid ${({ borderColor }) => borderColor || "#2d2828a8"};
  padding-top: 5%;
`;

const MeetingDate = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${({ color }) => color || "#333"};
`;

const DaysSince = styled.p`
  font-size: 55px;
  color: ${({ color }) => color || "#ee6f58e5"};
  font-weight: bold;
  margin: 0 auto;
`;

const NameHeartSection = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 5%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const NameBox = styled.image`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bgColor }) => bgColor || "#f1f1f1"};
  padding: 10px;
  border-radius: 5px;
  height: 110px;
`;

const Heart = styled.span`
  font-size: 24px;
`;

const Name = styled.p`
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  display: inline-block;
  background-color: ${({ bgColor }) => bgColor || "#f1f1f1"};
  text-align: center;
  width: 70px;
  margin: 0;
`;

const RightProfileCard = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: ${({ bgColor }) => bgColor || "#fff"};
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid ${({ borderColor }) => borderColor || "#ababa8"};
`;

const Button = styled.button`
  background-color: ${({ bgColor }) => bgColor || "#fefdf1"};
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid ${({ borderColor }) => borderColor || "#fefdf1"};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#fffaba"};
  }
`;

const BellWrapper = styled.div`
  .button {
    width: ${({ width }) => width || "50px"};
    height: ${({ height }) => height || "50px"};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(87, 86, 86, 0.13);
    border: none;
  }

  .bell {
    width: "18px";
  }

  .bell path {
    fill: ${({ bellColor }) => bellColor || "rgb(99, 97, 97)"};
  }

  .button:hover {
    background-color: rgb(186, 186, 186);
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

function MyProfile() {
  const [image, setImage] = useState(null);
  const [daysSince, setDaysSince] = useState(null);
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [name, setName] = useState("");

  useEffect(() => {
    calculateDaysSince(meetingDate, new Date());
  }, [meetingDate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const calculateDaysSince = (meetingDate, currentDate) => {
    const date1 = new Date(meetingDate);
    const date2 = new Date(currentDate);
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    const timeDiff = date2 - date1;
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    setDaysSince(daysDiff);
  };

  return (
    <Container>
      <ProfileCard>
        <PhotoSection>
          <ProfilePhotoContainer>
            {<ProfilePhoto src={defaultcouple} alt="profile" />}
          </ProfilePhotoContainer>
          <PlusButton htmlFor="image-upload">
            <IconPhoto />
          </PlusButton>
          <input
            type="file"
            id="image-upload"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </PhotoSection>

        <DateInfo>
          {daysSince !== null && meetingDate && (
            <DaysSince>{daysSince}일째</DaysSince>
          )}
          {meetingDate && (
            <MeetingDate>{meetingDate.toLocaleDateString()}</MeetingDate>
          )}
        </DateInfo>

        <NameHeartSection>
          <NameBox src={puzzle}>
            <Name>{name || "김동인"}</Name>
          </NameBox>
          <Heart>❤️</Heart>
          <NameBox>
            <Name>{name || "박서진"}</Name>
          </NameBox>
        </NameHeartSection>
      </ProfileCard>

      <RightProfileCard>
        <RightSection>
          <Button>커플 정보</Button>
          <Button>나의 피드</Button>
          <Button>나의 댓글</Button>
          <Button>캘린더</Button>
          <Button>즐겨찾기</Button>
          <BellWrapper>
            <button className="button">
              <svg viewBox="0 0 448 512" className="bell">
                <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
              </svg>
            </button>
          </BellWrapper>
        </RightSection>
      </RightProfileCard>
    </Container>
  );
}

export default MyProfile;
