import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchFemalePresents, fetchMalePresents } from './api2';
import gift1 from './img/gift1.jpg';
import gift2 from './img/gift2.jpg';
import gift3 from './img/gift3.jpg';

const Container = styled.div`
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0;
  padding: 0;
  position: relative;
`;

const ImgWrap = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  img {
    object-fit: cover;
    width: 100%;
    height: 100vh;
    object-fit: contain;
  }
`;
const Right = styled.div`
  width: 100%;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 3.5rem;
  color: #1f0606;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
  overflow-y: auto;
  height: 850px;
  &::-webkit-scrollbar {
    width: 7px; /* 세로 스크롤바의 너비를 8px로 설정 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #727272; /* 핸들의 색상 */
    border-radius: 10px;
  }
`;

const Category = styled.div`
  width: 100%;
  max-width: 650px;
  height: fit-content;
  padding: 28px 24px;
  /* background-color: ${(props) =>
    props.$gender === 'male' ? '#9dc4ff7d' : '#ffd7cc99'}; */
  box-shadow: 0 3px 10px rgba(200, 200, 200, 0.15);
`;

const SubTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 700;
  color: ${(props) => (props.$gender === 'male' ? '#000000' : '#f88479')};
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
  width: 45%;
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
    object-fit: cover;
    border-radius: 12px;
  }

  h3 {
    height: 72px;
    font-size: 0.8rem;
    color: #333;
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 0.7rem;
    margin-top: auto;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const images = [gift1, gift2, gift3];
function Event() {
  const [maleGifts, setMaleGifts] = useState([]);
  const [femaleGifts, setFemaleGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

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
          fetchFemalePresents(),
        ]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <ImgWrap>
        <img src={images[currentImage]} alt={`slide-${currentImage}`} />
      </ImgWrap>
      <Right>
        <Title>선물 랭킹 TOP10</Title>
        <CategoryContainer>
          <Category $gender="male">
            {/* <SubTitle $gender="male">남자 선물</SubTitle> */}
            <GiftList>
              {Array.isArray(maleGifts) &&
                maleGifts.map((gift, index) => (
                  <GiftItem key={index} title={stripHTML(gift.title)}>
                    <a
                      href={gift.shoppingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={gift.imageUrl} alt={stripHTML(gift.title)} />
                      <h3 dangerouslySetInnerHTML={{ __html: gift.title }} />
                      <p>가격: {Number(gift.price).toLocaleString()}원</p>
                    </a>
                  </GiftItem>
                ))}
            </GiftList>
          </Category>

          <Category $gender="female">
            {/* <SubTitle $gender="female">여자 선물</SubTitle> */}
            <GiftList>
              {Array.isArray(femaleGifts) &&
                femaleGifts.map((gift, index) => (
                  <GiftItem key={index} title={stripHTML(gift.title)}>
                    <a
                      href={gift.shoppingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={gift.imageUrl} alt={stripHTML(gift.title)} />
                      <h3 dangerouslySetInnerHTML={{ __html: gift.title }} />
                      <p>가격: {Number(gift.price).toLocaleString()}원</p>
                    </a>
                  </GiftItem>
                ))}
            </GiftList>
          </Category>
        </CategoryContainer>
      </Right>
    </Container>
  );
}

export default Event;
