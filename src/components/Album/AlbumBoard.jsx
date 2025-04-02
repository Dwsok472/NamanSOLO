import React from "react";
import styled from "styled-components";
import PhotoCard from "./PhotoCard";
import couple1 from "../img/couple1.png";
import couple2 from "../img/couple2.png";
import couple3 from "../img/couple3.png";
import couple4 from "../img/couple4.png";
import couple5 from "../img/couple5.png";
import couple6 from "../img/couple6.png";
import board7 from "../img/board7.png";
import imo1 from "../img/imo1.png";
import imo2 from "../img/imo2.png";
import back from "../img/back.png";
import back2 from "../img/back2.png";
import back3 from "../img/back3.png";
import back4 from "../img/back4.png";
import back5 from "../img/back5.png";
// import back6 from "../img/back6.png";

const BoardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 60px 0;
`;

const BoardFrame = styled.div`
  /* background: #0c6b43; */
  border: 20px solid #deb887;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 1900px;
  min-height: 800px;

  /* padding 제거 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhotoArea = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 24px;
  justify-content: center;
`;


const AlbumWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 1000px;
  max-width: none;
  margin: 0 auto;
  background: url(${board7}) no-repeat center center;
  background-size: 90% 95%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmojiTopLeft = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 180px;
  height: auto;
  pointer-events: none;
`;

const EmojiBottomRight = styled.img`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 200px;
  height: auto;
  pointer-events: none;
  filter: brightness(0) invert(40%) sepia(90%) saturate(800%) hue-rotate(20deg);
`;

const BoardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 40px;

  background-size: cover;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


// const PhotoArea = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 24px;
//   max-width: 0 auto;
//   margin-top: 20px;
// `;

const imageList = [couple1, couple2, couple3, couple4, couple5, couple6];
const rotations = [-8, -4, 0, 4, 8, 2];
const offsets = [0, -200, 150, 0, -130, -220];
const captions = ["커플1", "커플2", "커플3", "생각 중", "장난감과 함께", "귀여운 표정"];

const AlbumBoard = () => {
    return (
        <BoardWrapper>
            <BoardFrame>
                <BoardInner>
                <EmojiTopLeft src={imo2} alt="left emoji" />
                <EmojiBottomRight src={imo1} alt="right emoji" />
                <PhotoArea>
                    {imageList.map((img, idx) => (
                    <PhotoCard
                        key={idx}
                        src={img}
                        rotate={rotations[idx % rotations.length]}
                        offsetY={offsets[idx % offsets.length]}
                        pinColor={["📌", "📍", "🔵", "🔴", "🟡", "🧷"][idx % 6]}
                        caption={captions[idx]}
                    />
                    ))}
                </PhotoArea>
                </BoardInner>
            </BoardFrame>
            </BoardWrapper>
            );
  };
  

export default AlbumBoard;
