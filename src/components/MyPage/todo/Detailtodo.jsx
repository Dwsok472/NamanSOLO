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
  height: 300px;
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

const ColorPreview = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid #ccc;
`;

function Detailtodo({ event, onClose, onEdit }) {
  if (!event) return null;

  return (
    <CardWrap>
        <Card>
            <Top>
                <TopX onClick={onEdit}>
                    <IconEdit />
                </TopX>
                <TopX onClick={onClose}>
                    <IconClose />
                </TopX>
                기념일
            </Top>
            <Bottom>
                <Info>{event.title}</Info>
                <Info>{event.date}</Info>
                <ColorPreview color={event.color} />
            </Bottom>
        </Card>
    </CardWrap>
  );
}

export default Detailtodo;
