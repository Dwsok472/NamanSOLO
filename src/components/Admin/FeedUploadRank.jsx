import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

const dummyData = {
  '2025-01': [
    { id: 1, username: 'USER1', count: 12 },
    { id: 2, username: 'USER2', count: 11 },
    { id: 3, username: 'USER3', count: 10 },
    { id: 4, username: 'USER4', count: 9 },
    { id: 5, username: 'USER5', count: 8 },
    { id: 6, username: 'USER6', count: 7 },
    { id: 7, username: 'USER7', count: 6 },
    { id: 8, username: 'USER8', count: 5 },
    { id: 9, username: 'USER9', count: 4 },
    { id: 10, username: 'USER10', count: 3 },
  ],
};

function FeedUploadRank() {
  const [currentMonth, setCurrentMonth] = useState('2025-01');
  const [selectedUser, setSelectedUser] = useState(null);

  const users = dummyData[currentMonth] || [];

  const handlePrevMonth = () => {
    setCurrentMonth('2025-01');
  };

  const handleNextMonth = () => {
    setCurrentMonth('2025-02');
  };

  return (
    <Wrapper>
    <Container>
      <TitleRow>
        <h3>기간별 피드 업로드 유저 통계</h3>
        <div className="nav">
          <button onClick={handlePrevMonth}><FaChevronLeft /></button>
          {currentMonth.replace('-', '년 ')}월
          <button onClick={handleNextMonth}><FaChevronRight /></button>
        </div>
      </TitleRow>

      <List>
        {users.map((user, index) => (
          <ListItem
            key={user.id}
            $active={selectedUser === user.id}
            onClick={() => setSelectedUser(user.id)}
          >
            <div className="rank">{index + 1}</div>
            <div className="username">{user.username}</div>
            <div className="count">{user.count}개</div>
          </ListItem>
        ))}
      </List>
    </Container>
    </Wrapper>
  );
}

export default FeedUploadRank;
