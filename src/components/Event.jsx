import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Event() {
  const Container = styled.div`
    padding: 40px 20px;
  `;

  const Title = styled.h1`
    text-align: center;
    font-size: 2rem;
    color : #C6B8E7;
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
    max-width: 480px;
    height: fit-content;
    border-radius: 20px;
    padding: 28px 24px;
    background-color: ${(props) =>
      props.$gender === 'male' ? '#eef6ff' : '#fff0f5'};
    border: 2px solid ${(props) => (props.$gender === 'male' ? '#a3c8f2' : '#ffc9d9')};
    box-shadow: 0 6px 16px rgba(200, 200, 200, 0.15);
  `;

  const SubTitle = styled.h2`
    font-size: 1.4rem;
    margin-bottom: 20px;
    color: ${(props) =>
      props.$gender === 'male' ? '#66b' : '#f013' };
    text-align: center;
    background-color: #ffffffcc;
    padding: 8px 12px;
    border-radius: 12px;
  `;

  const GiftList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
  `;

  const GiftItem = styled.li`
    border: 1px solid #e3e3e3;
    border-radius: 12px;
    margin-bottom: 18px;
    padding: 12px;
    text-align: center;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(200, 200, 200, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 8px 16px rgba(150, 150, 150, 0.2);
    }

    img {
      width: 100%;
      max-height: 280px;
      object-fit: cover;
      border-radius: 12px;
    }

    h3 {
      font-size: 1rem;
      margin: 12px 0 8px;
      color: #333;
    }

    p {
      font-size: 0.95rem;
      color: #666;
    }
  `;

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
        const femaleQuery = encodeURIComponent('여자 선물');
        const maleQuery = encodeURIComponent('남자 선물');

        const femaleRes = await fetch(`http://localhost:3001/naver?q=${femaleQuery}`);
        const maleRes = await fetch(`http://localhost:3001/naver?q=${maleQuery}`);

        const femaleData = await femaleRes.json();
        const maleData = await maleRes.json();

        console.log('👩 여자 선물:', femaleData);
        console.log('👨 남자 선물:', maleData);

        setFemaleGifts(femaleData.items);
        setMaleGifts(maleData.items);
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
      <Title>남자/여자 선물 추천 탑 10</Title>
      <CategoryContainer>
        <Category $gender="male">
          <SubTitle $gender="male">남자 선물 추천</SubTitle>
          <GiftList>
            {Array.isArray(maleGifts) && maleGifts.map((gift, index) => (
              <GiftItem key={index} title={stripHTML(gift.title)}>
                <a href={gift.link} target="_blank" rel="noopener noreferrer">
                  <img src={gift.image} alt={stripHTML(gift.title)} />
                  <h3 dangerouslySetInnerHTML={{ __html: gift.title }} />
                  <p>가격: {Number(gift.lprice).toLocaleString()}원</p>
                </a>
              </GiftItem>
            ))}
          </GiftList>
        </Category>

        <Category $gender="female">
          <SubTitle $gender="female">여자 선물 추천</SubTitle>
          <GiftList>
            {Array.isArray(femaleGifts) && femaleGifts.map((gift, index) => (
              <GiftItem key={index} title={stripHTML(gift.title)}>
                <a href={gift.link} target="_blank" rel="noopener noreferrer">
                  <img src={gift.image} alt={stripHTML(gift.title)} />
                  <h3 dangerouslySetInnerHTML={{ __html: gift.title }} />
                  <p>가격: {Number(gift.lprice).toLocaleString()}원</p>
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