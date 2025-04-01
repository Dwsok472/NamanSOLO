import React from 'react';
import styled from 'styled-components';
import { IconClose } from '../../Icons';

const CardWrap = styled.div`
  width: ${(props) => props.width || '550px'};
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const Card = styled.div`
  width: ${(props) => props.cardwidth || '500px'};
  height: ${(props) => props.cardheight || '600px'};
  background-color: white;
  border-radius: 50px;
  border: 1px solid #3333;
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  height: 15%;
  background-color: ${(props) => props.topbackground || '#ffdcd6'};
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
  top: 0px;
  right: 20px;
  cursor: pointer;
`;

const Title = styled.h1`
  margin: 0 auto;
  font-size: 1.5rem;
`;

const Bottom = styled.div`
  flex: 1;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ColorPalette = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const ColorDot = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid #fff;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: auto;
`;

const Button = styled.button`
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  color: #222;
`;

function AddTravelPopup({
  width,
  cardwidth,
  cardheight,
  topbackground,
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
    <CardWrap width={width}>
      <Card cardwidth={cardwidth} cardheight={cardheight}>
        <Top topbackground={topbackground}>
          <TopX onClick={onClose}>
            <IconClose/>
          </TopX>
          <Title>{name}</Title>
        </Top>
        <Bottom>
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Input
              type="text"
              placeholder="여행 제목"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              required
            />
            <Input
              type="date"
              value={newEvent.startDate || ''}
              onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
              required
            />
            <Input
              type="date"
              value={newEvent.endDate || ''}
              onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
              required
            />
            <div>
              <label style={{ marginRight: '10px' }}>색상 선택:</label>
              <Button
                type="button"
                onClick={() => setPaletteOpen(!paletteOpen)}
                style={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
              >
                팔레트
              </Button>
              <span
                style={{
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  marginLeft: '10px',
                  backgroundColor: newEvent.color,
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>

            {paletteOpen && (
              <ColorPalette>
                {colorSamples.map((color) => (
                  <ColorDot
                    key={color}
                    color={color}
                    onClick={() => setNewEvent({ ...newEvent, color })}
                    title={color}
                  />
                ))}
              </ColorPalette>
            )}

            <ButtonGroup>
              <Button onClick={onClose} type="button" style={{ backgroundColor: '#aaa' }}>취소</Button>
              <Button type="submit" style={{ backgroundColor: '#ff7f7f' }}>추가</Button>
            </ButtonGroup>
          </form>
        </Bottom>
      </Card>
    </CardWrap>
  );
}

export default AddTravelPopup;