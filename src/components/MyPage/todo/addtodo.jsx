import React from 'react';
import styled from 'styled-components';
import { IconClose } from '../../Icons';

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
  height: 280px;
  .date{
    font-size: 0.8rem;
    margin-bottom: 5px;
  }
`;

const Top = styled.div`
  height: 70px;
  background-color: #8c0d17;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  color: white;
`;

const TopX = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
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
  border-bottom: 1px solid #949494;
  outline: none;
  font-size: 1rem;
  width: 100%;
  &::placeholder{
    font-size: 0.8rem;
  }
`;

const ColorSection = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 6px;
  width: fit-content;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const SelectedColorPreview = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${(props) => props.color || '#eee'};
  border: 2px solid #ccc;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ColorPalette = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
  flex-wrap: wrap;
  padding-bottom: 6px;
`;

const ColorDot = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #fff;
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
  background-color: black;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover{
    color: #838383;
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
    <CardWrap
      onClick={(e) => e.stopPropagation()}>
      <Card>
        <Top>
          <TopX onClick={onClose}><IconClose /></TopX>
          {name}
        </Top>
        <Bottom>
          <form onSubmit={onSubmit}>
            <Input
              type="text"
              placeholder="제목을 입력해주세요"
              value={newEvent.title || ''}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              required
            />

            <Input
              type="date"
              value={newEvent.start_date || ''}
              onChange={(e) => setNewEvent({ ...newEvent, start_date: e.target.value, end_date: e.target.value, type: 'ANNIVERSARY' })}
              required
              className='date'
            />

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
