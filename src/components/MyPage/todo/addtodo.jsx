import React from 'react';
import styled from 'styled-components';
import { IconClose } from '../../Icons';

const CardWrap = styled.div`
  width: 500px;
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const Card = styled.div`
  height: 600px;
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

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 2px solid #ffc0cb;
  outline: none;
  font-size: 1rem;
  width: 100%;
`;

const ColorSection = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 6px;
  border-bottom: 2px solid #ffc0cb;
  width: fit-content;
  cursor: pointer;
`;

const SelectedColorPreview = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${(props) => props.color || '#eee'};
  border: 2px solid #ccc;
`;

const ColorPalette = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const ColorDot = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px #ccc;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
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

  &:focus {
    outline: none;
  }
`;

function Addtodo({
  name,
  newEvent,
  setNewEvent,
  paletteOpen,
  setPaletteOpen,
  colorSamples,
  onClose,
  onSubmit
}) {
  return (
    <CardWrap>
      <Card>
        <Top>
          <TopX onClick={onClose}><IconClose /></TopX>
          {name}
        </Top>
        <Bottom>
          <form onSubmit={onSubmit}>
            <Input
              type="text"
              placeholder="기념일 일정 제목"
              value={newEvent.title || ''}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              required
            />

            <Input
              type="date"
              value={newEvent.date || ''}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              required
            />

            <Label>색상</Label>
            <ColorSection onClick={() => setPaletteOpen((prev) => !prev)}>
              <SelectedColorPreview color={newEvent.color} />
            </ColorSection>

            {paletteOpen && (
              <ColorPalette>
                {colorSamples.map((color) => (
                  <ColorDot
                    key={color}
                    color={color}
                    onClick={() => {
                      setNewEvent({ ...newEvent, color });
                      setPaletteOpen(false);
                    }}
                  />
                ))}
              </ColorPalette>
            )}

            <ButtonRow>
              <Button type="submit" $bg="#ffe4e6">등록</Button>
            </ButtonRow>
          </form>
        </Bottom>
      </Card>
    </CardWrap>
  );
}

export default Addtodo;
