import React from 'react';
import { useEffect, useState } from 'react';

function Event() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트가 마운트되면 Fake Store API로부터 데이터 가져오기
  useEffect(() => {
    // Fake Store API로부터 선물 데이터 가져오기
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setGifts(data.slice(0, 10)); // 상위 10개 선물만 가져옴
        setLoading(false);
      })
      .catch((err) => {
        setError('선물 데이터를 불러오는 데 문제가 발생했습니다.');
        setLoading(false);
      });
  }, []);

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
      <ul style={styles.giftList}>
        {gifts.map((gift) => (
          <li key={gift.id} style={styles.giftItem}>
            <img src={gift.image} alt={gift.title} style={styles.giftImage} />
            <h3>{gift.title}</h3>
            <p>{gift.description}</p>
            <p>가격: ${gift.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Event;
