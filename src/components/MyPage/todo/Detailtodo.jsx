import React from 'react';
import styled from 'styled-components';
import { IconClose, IconEdit } from '../../Icons';

const CardWrap = styled.div`
  width: 350px;
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 15px;
  border: 1px solid #94949433;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Top = styled.div`
  height: 75px;
  background-color: #8c0d17;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: white;
`;

const IconWrap = styled.div`
  position: absolute;
  top: 0px;
  right: ${(props) => props.$right || '20px'};
  cursor: pointer;

  svg {
    width: 15px;
    height: 15px;
    filter: brightness(0) invert(1);
  }
`;

const Bottom = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Info = styled.div`
  font-size: 1rem;
  word-break: break-word;
  width: 100%;
  padding: 10px;
  font-weight: 700;
`;

const ColorSection = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 6px;
  width: fit-content;
`;

const SelectedColorPreview = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${(props) => props.color || '#eee'};
  border: 2px solid #ccc;
`;

function DetailTodo({ localEvent, onClose, onEdit }) {
  if (!localEvent) return null;

  return (
    <CardWrap
      onClick={(e) => e.stopPropagation()}>
      <Card>
        <Top>
          <IconWrap $right="50px" onClick={onEdit}>
            <IconEdit />
          </IconWrap>
          <IconWrap onClick={onClose}>
            <IconClose />
          </IconWrap>
          기념일 보기
        </Top>

        <Bottom>
          <Info>제목 : {localEvent.title}</Info>
          <Info>날짜 : {localEvent.start_date}</Info>
          <ColorSection>
            <SelectedColorPreview color={localEvent.color} />
          </ColorSection>
        </Bottom>
      </Card>
    </CardWrap>
  );
}

export default DetailTodo;
