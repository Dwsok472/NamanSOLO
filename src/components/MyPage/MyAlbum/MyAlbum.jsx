import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PhotoCard from '../../Album/PhotoCard'; // 실제 경로 확인해주세요

const dummyData = [
  { id: 1, author: 'me', image: '/img1.jpg', title: '우리 여행✈️', liked: true },
  { id: 2, author: 'you', image: '/img2.jpg', title: '그날의 이야기', liked: false },
  { id: 3, author: 'me', image: '/img3.jpg', title: '맛집 탐방', liked: false },
];

const Wrapper = styled.div`
  padding: 30px;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const MyAlbum = () => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const filtered = dummyData.filter(post => post.author === 'me');
    setMyPosts(filtered);
  }, []);

  return (
    <Wrapper>
      <h2 style={{ marginBottom: '20px' }}>✨ 나의 스토리</h2>
      <Grid>
        {myPosts.map(post => (
          <PhotoCard key={post.id} post={post} />
        ))}
      </Grid>
    </Wrapper>
  );
};

export default MyAlbum;
