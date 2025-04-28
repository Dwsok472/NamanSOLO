import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchFemalePresents, fetchMalePresents } from "./api2";
import gift1 from "./img/gift1.jpg";
import gift2 from "./img/gift2.jpg";
import gift3 from "./img/gift3.jpg";

const Container = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3.5rem;
  color: #1f0606;
  margin-top: 100px;
  margin-bottom: 20px;
  user-select: none;
`;

const Subtitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  color: #5f5b5b;
  margin-bottom: 30px;
`;

const CategoryContainer = styled.div`
  width: 90%;
  margin: 0 auto 70px;
`;

const GroupTitle = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  user-select: none;
`;

const TopLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #777;
  text-align: center;
  letter-spacing: 1px;
  opacity: 0.8;
`;

const GiftList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const GiftRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 100px; /* 남자 그룹과 여자 그룹 사이 */
`;

const GiftGroup = styled.div`
  display: flex;
  gap: 20px; /* 그룹 내 아이템 간격 */
`;

const GiftItem = styled.div`
  width: 300px;
  border: 1px solid #e3e3e3;
  border-radius: 12px;
  padding: 12px;
  background: #ffffffee;
  text-align: center;
  box-shadow: 0 2px 6px rgba(100, 100, 00, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 12px;
  }

  h3 {
    font-size: 1rem;
    margin: 10px 0 5px;
    height: 50px;
    overflow: hidden;
  }

  p {
    font-size: 0.8rem;
    color: #666;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

function Event() {
  const [maleGifts, setMaleGifts] = useState([]);
  const [femaleGifts, setFemaleGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const stripHTML = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const [maleData, femaleData] = await Promise.all([
          fetchMalePresents(),
          fetchFemalePresents(),
        ]);
        setFemaleGifts(femaleData);
        setMaleGifts(maleData);
        setLoading(false);
      } catch (err) {
        setError("선물 데이터를 불러오는 데 문제가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchGifts();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  // 남자/여자 각각 2개씩 끊어서 줄 만들기
  const rows = [];
  const maxLength = Math.max(maleGifts.length, femaleGifts.length);
  for (let i = 0; i < maxLength; i += 2) {
    const maleRow = maleGifts.slice(i, i + 2);
    const femaleRow = femaleGifts.slice(i, i + 2);
    rows.push({ maleRow, femaleRow });
  }

  // 한 페이지에 2줄씩 (8개)
  const rowsPerPage = 1;
  const pageStart = currentPage * rowsPerPage;
  const pageRows = rows.slice(pageStart, pageStart + rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    const maxPages = Math.ceil(rows.length / rowsPerPage);
    if (currentPage + 1 < maxPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <Title>선물랭킹 TOP10</Title>
      <Subtitle>지금 가장 인기 있는 선물을 만나보세요</Subtitle>

      <Container>
        <CategoryContainer>
          <GroupTitle>
            <TopLabel>MAN</TopLabel>
            <TopLabel>WOMAN</TopLabel>
          </GroupTitle>

          <GiftList>
            {pageRows.map((row, rowIndex) => (
              <GiftRow key={rowIndex}>
                <GiftGroup>
                  {row.maleRow.map((gift, index) => (
                    <GiftItem key={`male-${rowIndex}-${index}`}>
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
                </GiftGroup>

                <GiftGroup>
                  {row.femaleRow.map((gift, index) => (
                    <GiftItem key={`female-${rowIndex}-${index}`}>
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
                </GiftGroup>
              </GiftRow>
            ))}
          </GiftList>

          <ButtonWrapper>
            <button onClick={handlePrev} disabled={currentPage === 0}>
              ◀ 이전
            </button>
            <button
              onClick={handleNext}
              disabled={(currentPage + 1) * rowsPerPage >= rows.length}
            >
              다음 ▶
            </button>
          </ButtonWrapper>
        </CategoryContainer>
      </Container>
    </>
  );
}

export default Event;
