import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IconClose, IconPhoto } from '../../Icons';
import LeftKey from '../../img/leftkey.png';
import RightKey from '../../img/rightkey.png';

const CardWrap = styled.div`
  width: 400px;
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 15px;
  border: 1px solid #8c0d17;
  display: flex;
  flex-direction: column;
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
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  color: white;
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
  top: 0px;
  right: 10px;
  cursor: pointer;
  filter: brightness(0) invert(1);
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
  &:focus {
    outline : none;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// const FileInput = styled.input`
//   display: none;
// `;

// const FileInputLabel = styled.label`
//   display: flex;
//   align-items: center;
//   padding-bottom: 6px;
//   border-bottom: 2px solid #ffc0cb;
//   width: fit-content;
//   cursor: pointer;

//   svg {
//     width: 24px;
//     height: 24px;
//   }
// `;

const ColorSection = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 6px;
  width: fit-content;
  cursor: pointer;
`;

const SelectedColorPreview = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  padding-bottom:6px;
  background-color: ${(props) => props.color || '#eee'};
  border: 2px solid #ccc;
`;

const ColorPalette = styled.div`
  justify-content: end;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: -30px;
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef(null);

  const isFileImage = (index) => index >= (event.mediaUrl?.length || 0);

  const currentImage = event.mediaUrl[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + event.mediaUrl.length) % event.mediaUrl.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % event.mediaUrl.length);
  };
  
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (event.mediaUrl?.length) {
      const urls = event.mediaUrl.map((media) =>
        media instanceof File ? URL.createObjectURL(media) : media.mediaUrl
      );
      setImageUrls(urls);
    } else {
      setImageUrls([]);
    }
  }, [event.mediaUrl]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setEvent((prev) => ({
      ...prev,
      mediaUrl: [...(prev.mediaUrl || []), ...files]
    }));
  };

  const handleDelete = () => {
    if (!window.confirm('이 이미지를 삭제할까요?')) return;
    const updated = [...event.mediaUrl];
    updated.splice(currentIndex, 1);
    setEvent({ ...event, mediaUrl: updated });
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <CardWrap onClick={(e) => e.stopPropagation()}>
      <Card>
        <Top>
          <TopX onClick={onClose}><IconClose /></TopX>
          여행 일정 수정
        </Top>
        <Bottom>
          <ImagePreviewContainer>
            {imageUrls.length > 0 ? (
              <>
                <PreviewImage
                  src={imageUrls[currentIndex]}
                  onClick={() => fileInputRef.current.click()}
                  alt="미리보기"
                />
                {imageUrls.length > 1 && (
                  <>
                    <PrevButton onClick={handlePrev}><img src={LeftKey} alt="prev" /></PrevButton>
                    <NextButton onClick={handleNext}><img src={RightKey} alt="next" /></NextButton>
                  </>
                )}
                <DeleteButton onClick={handleDelete}><IconClose /></DeleteButton>
              </>
            ) : (
              <DefaultUpload onClick={() => fileInputRef.current.click()}>
                <IconPhoto />
              </DefaultUpload>
            )}
            <HiddenFileInput
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </ImagePreviewContainer>

          <form onSubmit={onSubmit}>
            <Input
              type="text"
              placeholder="제목을 입력해주세요"
              value={event.title || ''}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
              required
            />

            <Row>
              <Input
                type="date"
                value={event.start_date || ''}
                onChange={(e) => setEvent({ ...event, start_date: e.target.value })}
                required
              />
              <Input
                type="date"
                value={event.end_date || ''}
                onChange={(e) => setEvent({ ...event, end_date: e.target.value })}
                required
              />
            </Row>

            {/* <Label>색상</Label> */}
            <ColorSection onClick={() => setPaletteOpen(prev => !prev)}>
              <SelectedColorPreview color={event.color} />
            </ColorSection>

            {paletteOpen && (
              <ColorPalette>
                {colorSamples.filter((color)=>color!=event.color).map(color => (
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