import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getMonthlyFeedRank } from  '../api1';

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Container = styled.div`
  background: white;
  flex: 1;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h3 {
    font-size: 1rem;
    font-weight: bold;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: #333;

    &:hover {
      color: #ff5777;
    }
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 12px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  background: ${({ $active }) => ($active ? '#ffe3e3' : '#f8f8f8')};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #ffe3e3;
  }

  .rank {
    width: 26px;
    height: 26px;
    background: ${({ $active }) => ($active ? '#ff4d4d' : '#444')};
    color: white;
    border-radius: 6px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }

  .username {
    font-weight: bold;
    flex: 1;
  }

  .count {
    font-size: 0.85rem;
    color: #666;
  }
`;

function FeedUploadRank() {
  const [currentMonth, setCurrentMonth] = useState('2025-04');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getMonthlyFeedRank(currentMonth)
      .then((res) => setUserList(res))
      .catch((err) => console.error('업로드 랭킹 로드 실패:', err));
  }, [currentMonth]);

  const handlePrevMonth = () => {
    const [year, month] = currentMonth.split('-').map(Number);
    const prev = new Date(year, month - 2);
    const formatted = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`;
    setCurrentMonth(formatted);
  };

  const handleNextMonth = () => {
    const [year, month] = currentMonth.split('-').map(Number);
    const next = new Date(year, month);
    const formatted = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`;
    setCurrentMonth(formatted);
  };

  return (
    <Wrapper>
      <Container>
        <TitleRow>
          <h3>기간별 앨범 업로드 유저 통계</h3>
          <div className="nav">
            <button onClick={handlePrevMonth}><FaChevronLeft /></button>
            {currentMonth.replace('-', '년 ')}월
            <button onClick={handleNextMonth}><FaChevronRight /></button>
          </div>
        </TitleRow>

        <List>
          {userList.length > 0 ? userList.map((user, index) => (
            <ListItem
              key={index}
              $active={selectedUser === index}
              onClick={() => setSelectedUser(index)}
            >
              <div className="rank">{index + 1}</div>
              <div className="username">{user.username}</div>
              <div className="count">{user.count}개</div>
            </ListItem>
          )) : (
            <div>데이터가 없습니다.</div>
          )}
        </List>
      </Container>
    </Wrapper>
  );
}

export default FeedUploadRank;
