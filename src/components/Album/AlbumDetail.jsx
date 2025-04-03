import React from 'react'
import Star from './Star'
import PhotoCard from './PhotoCard'
import styled from 'styled-components'
import { useState, useEffect } from 'react'

const Container = styled.div``
const Top = styled.div``
const Main = styled.div``
const Box = styled.div``


function AlbumDetail({ albumId, albumData }) {
    const [albumDetail, setAlbumDetail] = useState(null);

    useEffect(() => {
        // 앨범 ID를 기반으로 상세 정보 가져오기
        const album = albumData.find((albumData) => albumData.id === parseInt(albumId));
        if (album) {
            setAlbumDetail(album);
        }
    }, [albumId, albumData]);

    if (!albumDetail) return <p>앨범 정보를 불러오는 중...</p>;

    return (
        <Container>
            <Top>
                <div className='date'>{albumDetail.date}</div>
                <Star />
            </Top>
            <Main>
                <PhotoCard albumId={albumDetail.id} />
                <Box>
                    <img src={albumDetail.imgurl[0]} className='img' />
                    <div className='username'>{albumDetail.username}</div>
                    <div>{albumDetail.title}</div>
                    <div>{albumDetail.tag[0]}</div>

                </Box>

            </Main>

        </Container>
    )
}

export default AlbumDetail
