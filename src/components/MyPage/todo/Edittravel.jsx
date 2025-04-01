import React from 'react';
import styled from 'styled-components';
import { IconClose } from '../../Icons';

const CardWrap = styled.div`
  width: ${(props) => props.$width || '550px'};
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const Card = styled.div`
  width: ${(props) => props.$cardwidth || '500px'};
  height: ${(props) => props.$cardheight || '600px'};
  background-color: white;
  border-radius: 50px;
  border: 1px solid #3333;
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  height: 15%;
  background-color: ${(props) => props.$topbackground || '#d6ecff'};
  font-size: 1.2rem;
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

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const Bottom = styled.div`
  padding: 20px;
  flex: 1;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const ColorPreview = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  background-color: ${(props) => props.$color};
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PaletteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const ColorBox = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.$color};
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid #fff;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.$bg || '#ccc'};
  color: #222;
  cursor: pointer;
`;

function Edittravel({
  event,
  setEvent,
  paletteOpen,
  setPaletteOpen,
  colorSamples,
  onClose,
  onSubmit
}) {
  if (!event) return null;

  return (
    <CardWrap>
      <Card>
        <Top>
          <TopX onClick={onClose}><IconClose /></TopX>
          <Title>여행 일정 수정</Title>
        </Top>
        <Bottom>
          <form onSubmit={onSubmit}>
            <Input
              type="text"
              placeholder="여행 제목"
              value={event.title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
              required
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <Input
                type="date"
                value={event.startDate}
                onChange={(e) => setEvent({ ...event, startDate: e.target.value })}
                required
              />
              <Input
                type="date"
                value={event.endDate}
                onChange={(e) => setEvent({ ...event, endDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label>색상 선택:</label>
              <button
                type="button"
                onClick={() => setPaletteOpen(!paletteOpen)}
                style={{ marginLeft: '10px', padding: '4px 8px', cursor: 'pointer' }}
              >
                팔레트
              </button>
              <ColorPreview $color={event.color} />
            </div>
            {paletteOpen && (
              <PaletteContainer>
                {colorSamples.map((color) => (
                  <ColorBox
                    key={color}
                    $color={color}
                    onClick={() => {
                      setEvent({ ...event, color });
                      setPaletteOpen(false);
                    }}
                    title={color}
                  />
                ))}
              </PaletteContainer>
            )}
            <ButtonRow>
              <Button type="button" onClick={onClose} $bg="#aaa">취소</Button>
              <Button type="submit" $bg="#87cefa">수정</Button>
            </ButtonRow>
          </form>
        </Bottom>
      </Card>
    </CardWrap>
  );
}

export default Edittravel;