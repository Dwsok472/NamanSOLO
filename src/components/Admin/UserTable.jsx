import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllUsers } from '../api1'; 

const TableWrapper = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const TableTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
`;

const SearchInput = styled.input`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.85rem;

  &:focus {
    outline: none;
    border-color: #303631;
  }
`;

const UserList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px 18px;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${({ $active }) => ($active ? '#ffe6e7' : '#f9f9f9')};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #ffe6e7;
  }
`;

const Rank = styled.div`
  background: ${({ active }) => (active ? '#ff4d4f' : '#555')};
  color: white;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.85rem;
`;

const Name = styled.div`
  font-weight: 700;
`;

const Date = styled.div`
  font-size: 0.85rem;
  color: #555;
`;

const Pagination = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  gap: 16px;

  button {
    background: #eee;
    border: none;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 1.1rem;
    cursor: pointer;

    &:hover {
      background: #ccc;
    }

    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
  }
`;

function UserTable() {
  const USERS_PER_PAGE = 10;
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch((err) => console.error('유저 목록 불러오기 실패', err));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(keyword.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const currentUsers = filteredUsers.slice(
    page * USERS_PER_PAGE,
    (page + 1) * USERS_PER_PAGE
  );

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    setPage(0);
  };

  return (
    <TableWrapper>
      <HeaderRow>
        <TableTitle>전체 회원 목록 조회</TableTitle>
        <SearchInput
          type="text"
          placeholder="유저 이름 검색"
          value={keyword}
          onChange={handleSearch}
        />
      </HeaderRow>

      <UserList>
        {currentUsers.map((user, idx) => {
          const globalIndex = page * USERS_PER_PAGE + idx;
          const isSelected = user.id === selectedId;

          return (
            <UserItem
              key={user.id}
              $active={isSelected}
              onClick={() => setSelectedId(user.id)}
            >
              <Rank active={isSelected}>{globalIndex + 1}</Rank>
              <Name>{user.username}</Name>
              <Date>{user.addDate}</Date> 
            </UserItem>
          );
        })}
      </UserList>

      <Pagination>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          ◀
        </button>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
        >
          ▶
        </button>
      </Pagination>
    </TableWrapper>
  );
}

export default UserTable;
