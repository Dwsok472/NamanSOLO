import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { IconClose, IconPhoto } from '../../Icons';
import LeftKey from '../../img/leftkey.png';
import RightKey from '../../img/rightkey.png';

const CardWrap = styled.div`
  width: 500px;
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 50px;
  border: 1px solid #3333;
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  height: 75px;
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

const ImagePreviewContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  background-color: #f8f8f8;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: pointer;
`;

const DefaultUpload = styled.div`
  width: 100%;
  height: 100%;
  border: 2px dashed #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;
  cursor: pointer;

  svg {
    width: 48px;
    height: 48px;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  z-index: 10;

  img {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
`;

const NextButton = styled(PrevButton)`
  left: auto;
  right: 8px;
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

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border-radius: 50%;
  font-size: 6px;
  padding: 6px;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: #cccccc;
  }

  &:focus {
    outline : none;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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
  padding-bottom: 6px;
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).filter(f => f instanceof File);
    setNewEvent({
      ...newEvent,
      images: [...(newEvent.images || []), ...files]
    });
  };

  const handleDeleteImage = () => {
    const confirmDelete = window.confirm('이 이미지를 삭제할까요?');
    if (!confirmDelete) return;

    const updated = [...(newEvent.images || [])];
    updated.splice(currentImageIndex, 1);
    setNewEvent({ ...newEvent, images: updated });
    setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + newEvent.images.length) % newEvent.images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % newEvent.images.length);
  };

  return (
    <CardWrap 
      onClick={(e) => e.stopPropagation()}>
      <Card>
        <Top>
          <TopX onClick={onClose}><IconClose /></TopX>
          {name}
        </Top>
        <Bottom>
          <ImagePreviewContainer>
            {newEvent.images?.length > 0 ? (
              <>
                <PreviewImage
                  src={URL.createObjectURL(newEvent.images[currentImageIndex])}
                  alt="미리보기"
                  onClick={() => fileInputRef.current?.click()}
                />
                {newEvent.images.length > 1 && (
                  <>
                    <PrevButton onClick={handlePrevImage}><img src={LeftKey} alt="이전" /></PrevButton>
                    <NextButton onClick={handleNextImage}><img src={RightKey} alt="다음" /></NextButton>
                  </>
                )}
              </>
            ) : (
              <DefaultUpload onClick={() => fileInputRef.current?.click()}>
                <IconPhoto />
              </DefaultUpload>
            )}
            <HiddenFileInput
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            {newEvent.images?.length > 0 && (
              <DeleteButton onClick={handleDeleteImage}><IconClose /></DeleteButton>
            )}
          </ImagePreviewContainer>

          <form onSubmit={onSubmit}>
            <Input
              type="text"
              value={newEvent.title || ''}
              placeholder="제목을 입력해주세요"
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              required
            />
            <Row>
              <Input
                type="date"
                value={newEvent.start_date || ''}
                onChange={(e) => setNewEvent({ ...newEvent, start_date: e.target.value })}
                required
              />
              <Input
                type="date"
                value={newEvent.end_date || ''}
                onChange={(e) => setNewEvent({ ...newEvent, end_date: e.target.value })}
                required
              />
            </Row>

            <Label>색상</Label>
            <ColorSection onClick={() => setPaletteOpen(!paletteOpen)}>
              <SelectedColorPreview color={newEvent.color} />
            </ColorSection>

            {paletteOpen && (
              <ColorPalette>
                {colorSamples.map(color => (
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
