import React from 'react';
import styled from 'styled-components';
import { IconClose, IconPhoto } from '../../Icons';

const CardWrap = styled.div`
  width: 500px;
  position: absolute;
  top: 58%;
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
  background-color: #d6ecff;
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

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Tilde = styled.span`
  font-size: 1rem;
  color: #444;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  padding-bottom: 6px;
  border-bottom: 2px solid #ffc0cb;
  width: fit-content;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
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

const ButtonGroup = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  padding: 8px 20px;
  border: none;
  border-radius: 20px;
  background-color: #d6ecff;
  color: #444;
  font-size: 0.9rem;
  font-weight: bold;
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).filter((file) => file instanceof File);
    setEvent({
      ...event,
      images: [...(event.images || []), ...files],
    });
  };

  return (
    <CardWrap>
      <Card>
        <Top>
          <TopX onClick={onClose}><IconClose /></TopX>
          여행 일정 수정
        </Top>
        <Bottom>
          <form onSubmit={onSubmit}>
            <Input
              type="text"
              placeholder="여행 제목"
              value={event.title || ''}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
              required
            />

            <Label>날짜</Label>
            <Row>
              <Input
                type="date"
                value={event.startDate || ''}
                onChange={(e) => setEvent({ ...event, startDate: e.target.value })}
                required
              />
              <Tilde>~</Tilde>
              <Input
                type="date"
                value={event.endDate || ''}
                onChange={(e) => setEvent({ ...event, endDate: e.target.value })}
                required
              />
            </Row>

            <Label>사진</Label>
            <FileInputLabel htmlFor="image-edit-upload">
              <IconPhoto />
            </FileInputLabel>
            <FileInput
              type="file"
              id="image-edit-upload"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />

            <Label>색상</Label>
            <ColorSection onClick={() => setPaletteOpen((prev) => !prev)}>
              <SelectedColorPreview color={event.color} />
            </ColorSection>

            {paletteOpen && (
              <ColorPalette>
                {colorSamples.map((color) => (
                  <ColorDot
                    key={color}
                    color={color}
                    onClick={() => {
                      setEvent({ ...event, color });
                      setPaletteOpen(false);
                    }}
                  />
                ))}
              </ColorPalette>
            )}

            <ButtonGroup>
              <SubmitButton type="submit">수정</SubmitButton>
            </ButtonGroup>
          </form>
        </Bottom>
      </Card>
    </CardWrap>
  );
}

export default Edittravel;
