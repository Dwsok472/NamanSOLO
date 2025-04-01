import React from 'react';
import styled from 'styled-components';
import { IconClose, IconPhoto } from '../../Icons'; // Update this file to include new icon if needed

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
  top: 0;
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

const Input = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 2px solid #ffc0cb;
  outline: none;
  font-size: 1rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Row = styled.div`
  display: flex;
  align-items: center; 
  gap: 16px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding-bottom: 6px;
  border-bottom: 2px solid #ffc0cb;
  width: fit-content;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const FolderIcon = styled.div`
  font-size: 1.5rem;
`;

const PreviewContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const PreviewWrapper = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ccc;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background: rgba(255, 255, 255, 0.85);
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;

  &:hover {
    background: #ffdddd;
  }

  svg {
    width: 10px;
    height: 10px;
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
  cursor: pointer;
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
  background-color: #ffe4e6;
  color: #444;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
`;

function AddTravel({
  name,
  newEvent,
  setNewEvent,
  paletteOpen,
  setPaletteOpen,
  colorSamples,
  onClose,
  onSubmit
}) {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).filter((file) => file instanceof File);
    setNewEvent({
      ...newEvent,
      images: [...(newEvent.images || []), ...files],
    });
  };

  const handleDeleteImage = (idx) => {
    const updated = [...(newEvent.images || [])];
    updated.splice(idx, 1);
    setNewEvent({ ...newEvent, images: updated });
  };

  return (
    <CardWrap>
      <Card>
        <Top>
          <TopX onClick={onClose}>
            <IconClose />
          </TopX>
          {name}
        </Top>
        <Bottom>
          <form onSubmit={onSubmit}>
            <Input
              type="text"
              value={newEvent.title || ''}
              placeholder='제목을 입력해주세요'
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              required
            />
            <Row>
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
            </Row>

            <Label>사진</Label>
            <FileInputLabel htmlFor="image-upload">
              <IconPhoto />
            </FileInputLabel>
            <FileInput
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />

            {newEvent.images?.length > 0 && (
              <PreviewContainer>
                {newEvent.images.map((img, i) => (
                  <PreviewWrapper key={i}>
                    <PreviewImg src={URL.createObjectURL(img)} alt="미리보기" />
                    <DeleteButton type="button" onClick={() => handleDeleteImage(i)}>
                      <IconClose />
                    </DeleteButton>
                  </PreviewWrapper>
                ))}
              </PreviewContainer>
            )}

            <br />
            <Label>색상</Label>
            <ColorSection>
              <SelectedColorPreview color={newEvent.color}  type="button" onClick={() => setPaletteOpen(!paletteOpen)} />
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

            <ButtonGroup>
              <SubmitButton type="submit">등록</SubmitButton>
            </ButtonGroup>
          </form>
        </Bottom>
      </Card>
    </CardWrap>
  );
}

export default AddTravel;
