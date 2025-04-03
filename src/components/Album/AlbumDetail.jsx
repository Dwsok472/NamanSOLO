import React from 'react'
import PhotoCard from './PhotoCard'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import leftkey from '../img/leftkey.png';
import rightkey from '../img/rightkey.png';
import StarButton from './StarButton';
import HeartButton from './HeartButton';
import CommentButton from './CommentButton';
import comment from '../img/comment.png'
import Comment from './Comment';
const Container = styled.div`
width: 100%;
  background-color: #0e0e0e;
  border-radius: 5%;
`
const Top = styled.div`
width:100%;
padding-left: 10px;
padding-right: 10px;
padding-top: 5px;
display: flex;
justify-content: space-between;
align-items: center;
.date{
    font-size: 0.8rem;
    color: #ffffff;
}
`
const Main = styled.div`
width:100%;
padding-bottom: 20px;
`
const Box = styled.div`
width:100%;
position: relative;
.image{
    width:100%;
    height: 400px;
    object-fit: cover;
}
.leftkey{
    object-fit:cover;
    width:30px;
    height:30px;
    position:absolute;
    left:5px;
    top:35%
  }
  .rightkey{
    object-fit:cover;
    width:30px;
    height:30px;
    position:absolute;
    right:5px;
    top:35%
  }.boxwrap{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .box{
    font-size: 0.8rem;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    width: 100%;

  }
  .username{
    padding-left: 10px;
    font-weight: 700;
    
  }
  .button{
    display :flex;
    justify-content: end;
    padding-right: 5px;

  }
  .comment{
  width: 25px;
  height: 25px;
  object-fit: cover;   
  margin-left :3px ;
  cursor: pointer;
  }
  .tags{
    font-size: 0.8rem;
    color: #ffffff;
    padding-top: 10px;
    padding-bottom: 7px;
    border-bottom:1px solid white;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
`
const CommentBox = styled.div`
    
`

function AlbumDetail({ albumData }) {
    const [albumDetail, setAlbumDetail] = useState(albumData);
    const [imageIndex, setImageIndex] = useState(0);
    const [isCommentVisible, setIsCommentVisible] = useState(false);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null); // 선택된 앨범 ID

    // 이미지 변경 함수 (왼쪽 화살표 클릭 시)
    const prevImage = () => {
        setImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : albumDetail.imgurl.length - 1));
    };
    // 이미지 변경 함수 (오른쪽 화살표 클릭 시)
    const nextImage = () => {
        setImageIndex((prevIndex) => (prevIndex < albumDetail.imgurl.length - 1 ? prevIndex + 1 : 0));
    };
    // 댓글 모음 토글 함수
    const toggleCommentVisibility = (albumId) => {
        // 같은 앨범을 다시 클릭하면 댓글을 숨기고, 다른 앨범을 클릭하면 댓글을 보이게 설정
        if (selectedAlbumId === albumId) {
            setIsCommentVisible((prev) => !prev); // 동일 앨범 클릭 시 토글
        } else {
            setSelectedAlbumId(albumId); // 새로운 앨범 클릭 시 해당 앨범으로 설정
            setIsCommentVisible(true); // 새로운 앨범 댓글 보이게 설정
        }
    };

    useEffect(() => {
        if (albumData) {
            setAlbumDetail(albumData);
            setImageIndex(0);
        }
    }, [albumData])
    return (
        <Container>
            <Top>
                <div className='date'>{albumDetail.date}</div>
                <StarButton />
            </Top>
            <Main>
                <Box id={albumDetail.id}>
                    <img src={leftkey} alt="leftkey" className="leftkey" onClick={prevImage} />
                    <img src={albumDetail.imgurl[imageIndex]} alt="image" className='image' />
                    <img src={rightkey} alt="rightkey" className="rightkey" onClick={nextImage} />

                    <div className='boxwrap'>
                        <div className='box'>
                            <div className='username'>{albumDetail.username}</div>
                            <div className='title'>{albumDetail.title}</div>
                        </div>
                        <div className='button'>
                            <HeartButton />
                            <img src={comment} alt="comment" className='comment'
                                onClick={() => toggleCommentVisibility(albumDetail.id)} />
                        </div>
                    </div>
                    <div className='tags'>{
                        albumDetail.tag && albumDetail.tag.length > 0 ? (
                            albumDetail.tag.map((tag, i) => (
                                < span key={i}>
                                    #{tag}{" "}
                                </span>
                            ))
                        ) : (
                            <span>{" "}</span>
                        )}

                    </div>
                </Box>
                {isCommentVisible && selectedAlbumId === albumDetail.id && (
                    <CommentBox>
                        <Comment albumData={albumData} />
                    </CommentBox>
                )}
            </Main>
        </Container >
    )
}

export default AlbumDetail
