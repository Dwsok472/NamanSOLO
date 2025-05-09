import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SwitchButton from '../../Album/SwitchButton';
import location from '../../img/location.png';
import leftkey from '../../img/leftkey.png';
import rightkey from '../../img/rightkey.png';
import Modal from '../../Album/Modal';
import MapPicker from '../../MapPicker/MapPicker';
import { IconClose, IconClose1, IconImage } from '../../Icons';
import axios from 'axios';

function ModifyAlbumAndDetail({
  onClose,
  onEditAlbum,
  onAddAlbum,
  editMode,
  editData,  // 수정할 데이터
}) {
  const [imageIndex, setImageIndex] = useState(0);  //이미지 인덱스
  const [title, setTitle] = useState(''); // 제목
  const [images, setImages] = useState([]); // 이미지들 배열 모음
  const [tags, setTags] = useState([]); // 태그 배열 모음
  const [isPublic, setIsPublic] = useState(true); // 공개 비공개 여부
  const [showMap, setShowMap] = useState(false); // 지도 펼치기 여부
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소

  console.log(tags)
  const handleOpenMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);
  const handleLocationSelect = (location) => {
    setSelectedPlace(location);
    setShowMap(false);
  };

  console.log(editMode + " " + " " + onEditAlbum)
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
    try {
      const formData = new FormData();
      const newFiles = images.filter((img) => img.file);
      // 새로 추가된 이미지만(새로 추가한 이미지는 file 객체를 포함했기 때문에 file이 있는 것만 추출), 기존 이미지는 file 객체가 없음

      newFiles.forEach((img) => formData.append("files", img.file)); // 새로 추가된 이미지들만 upload 하기

      let uploadedMedia = [];
      if (newFiles.length > 0) {
        const uploadRes = await axios.post("/api/album/upload/multiple", formData, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data",
          },
        });

        uploadedMedia = uploadRes.data.map((media) => ({
          id: media.id,
          mediaUrl: media.mediaUrl,
          mediaType: media.mediaType,
        }));
      }
      // 기존 이미지 + 새 업로드 이미지 병합
      const finalMediaList = [
        ...images.filter((img) => !img.file).map((img) => ({
          id: img.id,
          mediaUrl: img.mediaUrl,
          mediaType: img.mediaType,
        })), // 여기까지가 기존 이미지
        ...uploadedMedia, //새로 추가된 이미지
      ];

      const taglist = tags.map((tag) => ({
        name: tag.text,
      }))

      // 공통 앨범 데이터
      const albumData = {
        title,
        visibility: isPublic ? "PUBLIC" : "PRIVATE",
        mediaUrl: finalMediaList,
        latitude: selectedPlace?.lat || 0,
        longitude: selectedPlace?.lng || 0,
        location: selectedPlace?.address || "",
        tagList: taglist
      };
      console.log(taglist);

      if (editMode && onEditAlbum && editData) {
        const updateAlbum = {
          ...albumData,
          id: editData.id,
        };

        const res = await axios.put(`/api/album/update`, updateAlbum, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200 || res.status === 201) {
          alert("앨범이 수정되었습니다.");
          onEditAlbum(res.data); // 부모에게 수정된 앨범 전달
          onClose(); // 모달 닫기
          window.location.reload();
        } else {
          alert("앨범 수정 실패");
        }
      } else {
        const albumRes = await axios.post("/api/album/save", albumData, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });

        if (albumRes.status === 200 || albumRes.status === 201) {
          alert("앨범이 등록되었습니다.");
          onAddAlbum(albumData);
          window.location.reload();
          onClose();
        } else {
          alert("앨범 등록 실패");
        }
      }
    } catch (error) {
      console.error(error);
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  }
  //기존 데이터를 폼에 자동으로 채워주는 기능과 공개/비공개 스위치 제어 기능


  useEffect(() => {
    if (editMode && editData) {
      setTitle(editData.title);
      setTags(
        editData.albumTags.map((t) => ({ text: t }))
      );
      setImages(
        editData.url.map((img) => ({
          id: img.id, // id 추가
          mediaUrl: img.mediaUrl, // 이미지 URL
          mediaType: img.mediaType, // 이미지 타입 (필요한 경우)
        })),
      );
      setSelectedPlace({ address: editData.location });
      setIsPublic(editData.visibility === "PUBLIC");
    }
  }, [editMode, editData]);

  const handleSwitchChange = () => {
    setIsPublic((prev) => !prev); // 공개/비공개 상태 토글
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      mediaType: file.type.startsWith('image/') ? 'PICTURE' : 'VIDEO', // 미디어 타입 구분
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
          { text: `#${value.trim()}` },
        ]);
        e.target.value = ''; // 입력 필드를 비웁니다.
      }
    }
  };
  console.log(tags)
  // 태그 삭제 함수
  const handleTagDelete = (text) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.text !== text));
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

                  {images[imageIndex].mediaType === "PICTURE" ? (
                    <img src={
                      images[imageIndex].file
                        ? URL.createObjectURL(images[imageIndex].file)
                        : images[imageIndex].mediaUrl
                    }                  // 서버에서 불러온 이미지}
                      alt={`image-${imageIndex}`}
                      className="current-image"
                    />
                  ) : (
                    <video
                      muted
                      autoPlay
                      controls
                      loop
                      className="current-image"
                      src={images[imageIndex].file ? URL.createObjectURL(images[imageIndex].file)
                        : images[imageIndex].mediaUrl}
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
                  <div key={tag.text} className="tag-item">
                    <div
                      className="close1"
                      onClick={() => handleTagDelete(tag.text)}
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
              <button>{editMode && onEditAlbum ? "수정" : "등록"}</button>
            </div>
          </Box>
        </BoxWrap>
      </Container>
    </>
  );
}
export default ModifyAlbumAndDetail;

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
  z-index: 1003;
`;

const BoxWrap = styled.div`
  width: 25%;
  height: 750px;
  border-radius: 16px;
  transition: margin-top 0.3s ease-out;
  background-color: #000000;
  padding-bottom: 10px;
  padding-top: 10px;
  z-index: 1005;
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
    .address {
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
