import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SwitchButton from './SwitchButton';
import location from '../img/location.png';
import leftkey from '../img/leftkey.png';
import rightkey from '../img/rightkey.png';
import Modal from './Modal';
import MapPicker from '../MapPicker/MapPicker';
import { IconClose, IconClose1, IconImage } from '../Icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddAlbum({ onClose, onAddAlbum }) {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [tags, setTags] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const navigate = useNavigate();
  const handleOpenMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);

  const handleLocationSelect = (location) => {
    setSelectedPlace(location);
    setShowMap(false);
  };

  async function submitAlbum() {
    const jwt = sessionStorage.getItem('jwt-token');
    if (!jwt) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (images.length === 0) {
      alert('이미지를 한 장 이상 등록해주세요.');
      return;
    }
    if (title.trim() === '') {
      alert('제목은 필수 등록사항입니다.');
      return;
    }
    const formData = new FormData();
    images.forEach((img) => formData.append('files', img.file)); // 파일들 업로드

    try {
      // ✅ 1. 이미지 먼저 업로드
      const uploadRes = await axios.post(
        '/api/album/upload/multiple',
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const uploadedMedia = uploadRes.data; // MediaDTO 배열
      console.log(uploadedMedia);
      const convertedImages = uploadedMedia.map((media) => ({
        id: media.id,
        file: media.mediaUrl, // 이미지 URL 직접 사용
        mediaType: media.mediaType,
      }));

      setImages(convertedImages);

      // ✅ 2. 업로드된 결과로 앨범 데이터 생성
      const newAlbum = {
        title,
        visibility: isPublic ? 'PUBLIC' : 'PRIVATE',
        mediaUrl: uploadedMedia, // 여기에 서버로부터 받은 mediaUrl/mediaType을 그대로 사용
        latitude: selectedPlace?.lat || 0,
        longitude: selectedPlace?.lng || 0,
        location: selectedPlace?.address || '',
        tagList: tags.map((tag, index) => ({
          id: index,
          name: tag.text,
        })),
      };
      // ✅ 3. 앨범 저장
      const albumRes = await axios.post('/api/album/save', newAlbum, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });

      if (albumRes.status === 200 || albumRes.status === 201) {
        alert('앨범이 등록되었습니다.');
        onAddAlbum(newAlbum);
        window.location.reload();
        onClose();
      } else {
        alert('앨범 등록 실패');
      }
    } catch (error) {
      console.error(error);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  }
  const handleSwitchChange = () => {
    setIsPublic((prev) => !prev); // 공개/비공개 상태 토글
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      mediaType: file.type.startsWith('image/') ? 'PICTURE' : 'VIDEO', // 미디어 타입 구분
      id: Date.now() + Math.random(), // 고유한 ID 추가
    }));
    console.log(files);
    setImages((prevImages) => [...prevImages, ...files]);
  };
  const prevImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  // IconClose 클릭 시 해당 이미지 삭제
  const handleImageDelete = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };

  const nextImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };
  //IconImage를 클릭하면  id가 file인 곳으로 강제 이동
  const FileInput = () => {
    document.getElementById('file-upload').click();
  };

  const handleTagChange = (e) => {
    const value = e.target.value;

    // 스페이스 바를 누를 때마다 #을 추가하고 태그 분리
    if (e.key === ' ') {
      if (value.trim()) {
        setTags((prevTags) => [
          ...prevTags,
          { id: Date.now(), text: `#${value.trim()}` },
        ]);
        e.target.value = ''; // 입력 필드를 비웁니다.
      }
    }
  };

  // 태그 삭제 함수
  const handleTagDelete = (id) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };
  console.log(images);
  console.log(imageIndex);
  return (
    <>
      <Back onClick={onClose} />
      <Container>
        <BoxWrap>
          <Box>
            <div className="top">
              <SwitchButton
                isChecked={isPublic}
                onChange={handleSwitchChange} // 공개/비공개 상태 변경
              />
            </div>
            <div className="img">
              <img
                src={leftkey}
                alt="leftkey"
                className="leftkey"
                onClick={prevImage}
              />
              {images.length > 0 && (
                <>
                  <div
                    className="close"
                    onClick={() => handleImageDelete(images[imageIndex].id)}
                  >
                    <IconClose />
                  </div>
                  {images[imageIndex].mediaType === 'PICTURE' ? (
                    <img
                      src={URL.createObjectURL(images[imageIndex].file)}
                      alt={`media-${imageIndex}`}
                      className="current-image"
                    />
                  ) : (
                    <video
                      muted
                      autoPlay
                      controls
                      loop
                      className="current-image"
                      src={URL.createObjectURL(images[imageIndex].file)}
                    />
                  )}
                </>
              )}
              <img
                src={rightkey}
                alt="rightkey"
                className="rightkey"
                onClick={nextImage}
              />

              <input
                type="file"
                multiple
                id="file-upload"
                onChange={handleImageChange}
              />
              <div className="fileinput" onClick={FileInput}>
                <IconImage />
              </div>
            </div>
            <div className="inputinfo">
              <input
                type="text"
                className="title"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                className="tags"
                placeholder="태그를 입력 후 SPACE 버튼을 누르면 아래에 태그 목록이 반영됩니다"
                onKeyUp={handleTagChange}
              />
              <div className="tags-list">
                {tags.map((tag) => (
                  <div key={tag.id} className="tag-item">
                    <div
                      className="close1"
                      onClick={() => handleTagDelete(tag.id)}
                    >
                      <IconClose1 /> {/* 태그 삭제 아이콘 */}
                    </div>
                    <span className="tag">{tag.text}</span>
                  </div>
                ))}
              </div>
              {showMap && (
                <Modal onClose={handleCloseMap}>
                  <MapPicker onSelect={handleLocationSelect} />
                </Modal>
              )}
              <div className="map" onClick={handleOpenMap}>
                <img src={location} alt="" className="locationimg" />
                <div className="location">위치 추가</div>
              </div>

              {selectedPlace && (
                <div className="address">
                  선택된 위치: <strong>{selectedPlace.address}</strong>
                </div>
              )}
            </div>
            <div className="buttonBox" onClick={submitAlbum}>
              <button>등록</button>
            </div>
          </Box>
        </BoxWrap>
      </Container>
    </>
  );
}

export default AddAlbum;

const Container = styled.div`
  width: 25%;
  margin: 0 auto;
  margin-top: 30px;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  /* z-index: 200; */
  /* border: 1px solid black; */
`;
const Back = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1005;
`;

const BoxWrap = styled.div`
  width: 25%;
  height: 750px;
  border-radius: 16px;
  transition: margin-top 0.3s ease-out;
  background-color: #000000;
  padding-bottom: 10px;
  padding-top: 10px;
  z-index: 210;
  display: flex;
  position: fixed;
  top: 50%; /* 화면 중앙에 위치하도록 수정 */
  left: 50%; /* 화면 중앙에 위치하도록 수정 */
  transform: translate(-50%, -50%); /* 정확히 중앙 정렬 */
  box-sizing: border-box;
`;
const Box = styled.div`
  width: 100%;
  position: relative;
  color: white; /* 글씨 색상 추가 */
  padding: 20px; /* Box 내부에 여백 추가 */
  text-align: center; /* 텍스트 중앙 정렬 */
  .buttonBox {
    margin-top: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    button {
      font-size: 1rem;
      font-weight: 700;
      background-color: black;
      color: white;
      &:hover {
        color: #b1b1b1;
      }
    }
  }
  .close {
    display: flex;
    justify-content: end;
  }
  .close1 {
    display: flex;
    justify-content: start;
  }
  .tag-item {
    display: flex;
  }
  .top {
    display: flex;
    justify-content: end;
  }
  .img {
    width: 100%;
    height: 65%;
    background-color: white;
    position: relative;
    .current-image {
      width: 100%;
      height: 90%;
      object-fit: contain;
    }
    #file-upload {
      display: none;
    }
    .leftkey {
      object-fit: cover;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 10px;
      top: 50%;
      opacity: 0.8;
      cursor: pointer;
    }
    .rightkey {
      object-fit: cover;
      width: 20px;
      height: 20px;
      position: absolute;
      right: 10px;
      top: 50%;
      opacity: 0.8;
      cursor: pointer;
    }
    .fileinput {
      position: absolute;
      bottom: 0;
      right: 0;
      padding-right: 5px;
      z-index: 400;
      cursor: pointer;
    }
  }
  .inputinfo {
    margin-top: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    input {
      outline: none;
      border: none;
      height: 30px;
      padding-left: 10px;
      background-color: black;
      color: white;
      padding-bottom: 10px;
    }
    .title {
      border-bottom: 1px solid #a5a5a533;
    }
    .tags {
      font-size: 0.7rem;
      color: #b1b1b1;
      &::placeholder {
        font-weight: 700;
        text-decoration: underline;
      }
    }
    .map {
      display: flex;
      gap: 3px;
      padding-left: 10px;
      .locationimg {
        width: 20px;
        height: 20px;
        object-fit: cover;
      }
      .location {
        font-size: 0.8rem;
        color: #ffffff;
      }
    }
    .tags-list {
      width: 100%;
      background-color: black;
      display: flex;
      justify-content: start;
      padding-left: 10px;
      color: white;
      .tag {
        color: white;
        font-size: 0.8rem;
      }
    }
  }
`;
