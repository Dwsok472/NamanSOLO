import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchFemalePresents, fetchMalePresents } from './api2';

const Container = styled.div`
  padding: 40px 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  color : #f6a5c0;
  margin-bottom: 40px;
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
`;

const Category = styled.div`
  width: 100%;
  max-width: 800px;
  height: fit-content;
  border-radius: 20px;
  padding: 28px 24px;
  background-color: none;
  box-shadow: 0 3px 10px rgba(200, 200, 200, 0.15);
`;

const SubTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 20px;
  color: ${(props) =>
    props.$gender === 'male' ? '#a1a1d192' : '#f3878e75' };
  text-align: center;
  background-color: none;
  padding: 8px 12px;
  border-radius: 12px;
`;

const GiftList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 0;
  margin: 0;
`;

const GiftItem = styled.li`
  width: 48%;
  border: 1px solid #e3e3e3;
  border-radius: 12px;
  margin-bottom: 18px;
  padding: 12px;
  text-align: center;
  background: #ffffffee;
  box-shadow: 0 2px 6px rgba(200, 200, 200, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  flex-direction: column;

  &:hover {
    text-decoration: underline;
  }

  a {
    display: flex;
    flex-direction: column;
    height: 100%;
      &:hover {
      font-weight: 700;
    }
  }
  img {
    width: 100%;
    min-height: 280px;
    max-height: 280px;
    object-fit: cover;
    border-radius: 12px;
  }

  h3 {
    height: 72px;
    font-size: 1.0rem;
    margin: 12px 0 8px;
    color: #333;
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis; 
  }

  p {
    font-size: 0.95rem;
    margin-top: auto;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function Event() {
  const [maleGifts, setMaleGifts] = useState([]);
  const [femaleGifts, setFemaleGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stripHTML = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const [maleData, femaleData] = await Promise.all([
          fetchMalePresents(),
          fetchFemalePresents()
        ])

        console.log('👩 여자 선물:', femaleData);
        console.log('👨 남자 선물:', maleData);

        setFemaleGifts(femaleData);
        setMaleGifts(maleData);
        setLoading(false);
      } catch (err) {
        setError('선물 데이터를 불러오는 데 문제가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchGifts();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Title>BEST 선물</Title>
      <CategoryContainer>
        <Category $gender="male">
          <SubTitle $gender="male">남자 선물</SubTitle>
          <GiftList>
            {Array.isArray(maleGifts) && maleGifts.map((gift, index) => (
              <GiftItem key={index} title={stripHTML(gift.title)}>
                <a href={gift.shoppingUrl} target="_blank" rel="noopener noreferrer">
                  <img src={gift.imageUrl} alt={stripHTML(gift.title)} />
                  <h3 dangerouslySetInnerHTML={{ __html: gift.title }} />
                  <p>가격: {Number(gift.price).toLocaleString()}원</p>
                </a>
              </GiftItem>
            ))}
          </GiftList>
        </Category>

        <Category $gender="female">
          <SubTitle $gender="female">여자 선물</SubTitle>
          <GiftList>
            {Array.isArray(femaleGifts) && femaleGifts.map((gift, index) => (
              <GiftItem key={index} title={stripHTML(gift.title)}>
                <a href={gift.shoppingUrl} target="_blank" rel="noopener noreferrer">
                  <img src={gift.imageUrl} alt={stripHTML(gift.title)} />
                  <h3 dangerouslySetInnerHTML={{ __html: gift.title }} />
                  <p>가격: {Number(gift.price).toLocaleString()}원</p>
                </a>
              </GiftItem>
            ))}
          </GiftList>
        </Category>
      </CategoryContainer>
    </Container>
  );
}

export default Event;