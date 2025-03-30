import React from 'react';
import { useEffect, useState } from 'react';

function Event() {
  const [maleGifts, setMaleGifts] = useState([]);
  const [femaleGifts, setFemaleGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트가 마운트되면 Fake Store API로부터 데이터 가져오기
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        // 남성용 선물과 여성용 선물로 분리
        const male = data.filter(
          (item) =>
            item.category === "men's clothing" || item.category === 'jewelery'
        );
        const female = data.filter(
          (item) =>
            item.category === "women's clothing" ||
            item.category === 'womens accessories' ||
            item.category === 'jewelery'
        );

        setMaleGifts(male.slice(0, 10)); // 남성 선물 상위 10개
        setFemaleGifts(female.slice(0, 10)); // 여성 선물 상위 10개
        setLoading(false);
      })
      .catch((err) => {
        setError('선물 데이터를 불러오는 데 문제가 발생했습니다.');
        setLoading(false);
      });
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
