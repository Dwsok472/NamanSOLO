import React from 'react'
import Star from './Star'
import PhotoCard from './PhotoCard'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import leftkey from '../img/leftkey.png';
import rightkey from '../img/rightkey.png';

const Container = styled.div``
const Top = styled.div``
const Main = styled.div``
const Box = styled.div``


function AlbumDetail({ albumData }) {
    const [albumDetail, setAlbumDetail] = useState(albumData);
    const [imageIndex, setImageIndex] = useState(0);
    const [tagIndex, setTagIndex] = useState(0);

    // 이미지 변경 함수 (왼쪽 화살표 클릭 시)
    const prevImage = () => {
        setImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : src.length - 1));
    };

    // 이미지 변경 함수 (오른쪽 화살표 클릭 시)
    const nextImage = () => {
        setImageIndex((prevIndex) => (prevIndex < src.length - 1 ? prevIndex + 1 : 0));
    };
    useEffect(() => {
        if (albumData) {
            setAlbumDetail(albumData);
        }
    }, [albumData])
    // albumDetail이 로드되지 않았다면 로딩 메시지 표시
    if (!albumDetail) {
        return <p>앨범 정보를 불러오는 중...</p>;
    }

    const { imgurl, tag } = albumDetail;
    console.log(imgurl, "", tag)
    return (
        <Container>
            <Top>
                <div className='date'>{albumDetail.date}</div>
                <Star />
            </Top>
            <Main>
                <PhotoCard albumId={albumDetail.id} />
                <Box><img src={leftkey} alt="leftkey" className="leftkey" onClick={prevImage} />
                    <img src={imgurl[imageIndex]} className='img' />
                    <img src={rightkey} alt="rightkey" className="rightkey" onClick={nextImage} />
                    <div className='username'>{albumDetail.username}</div>
                    <div className='title'>{albumDetail.title}</div>
                    <div className='tag'>{albumDetail.tag[0]}</div>
                </Box>
            </Main>
        </Container>
    )
}

export default AlbumDetail
