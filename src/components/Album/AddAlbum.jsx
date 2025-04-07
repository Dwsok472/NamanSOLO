import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SwitchButton from './SwitchButton';
import location from '../img/location.png';
import leftkey from '../img/leftkey.png';
import rightkey from '../img/rightkey.png';
import Modal from './Modal';
import MapPicker from '../Story/MapPicker';
import { IconClose, IconClose1, IconImage } from '../Icons';

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
  z-index: 150;
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
    }
    .rightkey {
      object-fit: cover;
      width: 20px;
      height: 20px;
      position: absolute;
      right: 10px;
      top: 50%;
      opacity: 0.8;
    }
    .fileinput {
      position: absolute;
      bottom: 0;
      right: 0;
      padding-right: 5px;
      z-index: 400;
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
    .address{
        font-size: 0.8rem;
        text-align: start;
        padding-left: 10px;

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

function AddAlbum({ onClose, onAddAlbum }) {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [tags, setTags] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleOpenMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);

  const handleLocationSelect = (location) => {
    setSelectedPlace(location);
    setShowMap(false);
  };

  const submitAlbum = () => {
    const newAlbum = {
      id: Date.now(), // 고유 ID
      imgurl: images.map((img) => img.file), // 이미지 배열
      title,
      date: Date.now(), // 현재 시간
      username: 'user7', // 예시 사용자 이름
      location: selectedPlace.address, // 예시 위치
      tag: tags.map((tag) => tag.text), // 입력된 태그
      likes: [], // 좋아요 목록
      comments: [], // 댓글 목록
      isPublic,
    };

    onAddAlbum(newAlbum); // 앨범 추가 함수 호출
    onClose(); // 앨범 추가 후 모달 닫기
  };

  const handleSwitchChange = () => {
    setIsPublic((prev) => !prev); // 공개/비공개 상태 토글
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      id: Date.now() + Math.random(), // 고유한 ID 추가
    }));
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
                  <img
                    src={URL.createObjectURL(images[imageIndex].file)}
                    alt={`image-${imageIndex}`}
                    className="current-image"
                  />
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
                placeholder="태그를 입력하시면 아래에 태그 목록이 반영됩니다"
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
                  <strong>{selectedPlace.address}</strong>
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

// useEffect(() => {
//   setData([
//     {
//       id: 11,
//       imgurl: images,
//       title: title,
//       date: Date.now,
//       username: 'user7',
//       location: '둔산로 221',
//       tag: tags,
//       likes: [],
//       comments: [],
//       isPublic
//     },
//   ]);
// }, []);
