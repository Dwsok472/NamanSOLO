import React from 'react';
import styled from 'styled-components';
import { IconClose, IconEdit } from '../../Icons';

const CardWrap = styled.div`
  width: 500px;
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const Card = styled.div`
  height: 400px;
  background-color: white;
  border-radius: 50px;
  border: 1px solid #3333;
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  height: 15%;
  background-color: #ffdcd6;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;

const TopX = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
`;

const Bottom = styled.div`
  flex: 1;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Info = styled.div`
  font-size: 1rem;
`;

const ImagePreview = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 8px;
`;

const ImageRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: auto;
`;

const Button = styled.button`
  padding: 8px 20px;
  border: none;
  border-radius: 20px;
  background-color: ${(props) => props.$bg || '#ccc'};
  color: #222;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
`;

function TravelDetailView({ event, onClose, onEdit }) {
  if (!event) return null;

  return (
    <CardWrap>
      <Card>
        <Top>
            <IconEdit onClick={onEdit} /> 수정
            <TopX onClick={onClose}>
                <IconClose />
            </TopX>
          여행 일정
        </Top>
        <Bottom>
          <Info>{event.title}</Info>
          <Info>{event.startDate} ~ {event.endDate}</Info>
          {event.images?.length > 0 && (
            <ImageRow>
              {event.images.map((img, idx) => (
                <ImagePreview key={idx} src={URL.createObjectURL(img)} alt="여행사진" />
              ))}
            </ImageRow>
          )}
        </Bottom>
      </Card>
    </CardWrap>
  );
}

export default TravelDetailView;
