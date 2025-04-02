import React from 'react';
import { useEffect, useState } from 'react';

function Event() {
  const [maleGifts, setMaleGifts] = useState([]);
  const [femaleGifts, setFemaleGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const headers = {
          'X-Naver-Client-Id': 'J0AxHpAMVHb7L3qbN9MW',
          'X-Naver-Client-Secret': 'CUUY3zdK_8',
        };
  
        // 여자 선물 검색
        const femaleRes = await fetch(
          `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent('여자 선물')}&display=10`,
          { headers }
        );
        const femaleData = await femaleRes.json();
  
        // 남자 선물 검색
        const maleRes = await fetch(
          `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent('남자 선물')}&display=10`,
          { headers }
        );
        const maleData = await maleRes.json();
  
        // state에 저장
        setFemaleGifts(femaleData.items);
        setMaleGifts(maleData.items);
        setLoading(false);
      } catch (err) {
        setError('네이버 쇼핑 데이터를 불러오는 데 문제가 발생했습니다.');
        setLoading(false);
      }
    };
  
    fetchGifts();
  }, []);

  // 로딩 중일 때 메시지
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 오류 발생 시 메시지
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>남자/여자 선물 추천 탑 10</h1>
      <div style={styles.categoryContainer}>
        <div style={styles.category}>
          <h2>남자 선물 추천</h2>
          <ul style={styles.giftList}>
            {maleGifts.map((gift) => (
              <li key={gift.id} style={styles.giftItem}>
                <img
                  src={gift.image}
                  alt={gift.title}
                  style={styles.giftImage}
                />
                <h3>{gift.title}</h3>
                <p>{gift.description}</p>
                <p>가격: ${gift.price}</p>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.category}>
          <h2>여자 선물 추천</h2>
          <ul style={styles.giftList}>
            {femaleGifts.map((gift) => (
              <li key={gift.id} style={styles.giftItem}>
                <img
                  src={gift.image}
                  alt={gift.title}
                  style={styles.giftImage}
                />
                <h3>{gift.title}</h3>
                <p>{gift.description}</p>
                <p>가격: ${gift.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// 스타일링 객체
const styles = {
  categoryContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  category: {
    flex: 1,
    margin: '0 10px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  giftList: {
    listStyleType: 'none',
    padding: '0',
  },
  giftItem: {
    margin: '10px 0',
    textAlign: 'center',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  giftImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
};

export default Event;
