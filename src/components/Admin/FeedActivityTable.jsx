import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserLastActivity } from '../api1';

const Container = styled.div`
  background: white;
  flex: 1;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  margin-top: 50px;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin-bottom: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    text-align: left;
    padding: 8px;
  }

  th {
    font-size: 0.9rem;
    color: #666;
    border-bottom: 2px solid #ddd;
  }

  td {
    font-size: 0.95rem;
    border-bottom: 1px solid #eee;
  }

  tr:hover {
    background-color: #f8f9fa;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const Pagination = styled.div`
  display: inline-flex;
  gap: 8px;
  width: fit-content;
`;

const PageButton = styled.button`
  padding: 6px 12px;
  background-color: ${props => (props.active ? '#007bff' : '#e9ecef')};
  color: ${props => (props.active ? 'white' : '#333')};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #dee2e6;
  }
`;



const ITEMS_PER_PAGE = 5;

const FeedActivityTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter(user => user.username !== "AVG");
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredUsers.slice(startIndex, endIndex);

  useEffect(() => {
    getUserLastActivity()
      .then(res => {
        const sorted = res.sort((a, b) => new Date(a.lastLogin) - new Date(b.lastLogin));
        setUsers(sorted);
      })
      .catch(err => console.error('유저 활동 정보 로딩 실패', err));
  }, []);

  return (
    <Container>
      <Title>유저별 마지막 활동 기록</Title>
      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>유저</th>
            <th>마지막 활동일</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={user.username}>
              <td>{startIndex + index + 1}</td>
              <td>{user.username}</td>
              <td>
                {user.lastLogin
                  ? new Date(user.lastLogin + "T00:00:00").toLocaleDateString()
                  : '없음'}
              </td>
            </tr>
          ))}
          {Array.from({ length: ITEMS_PER_PAGE - currentItems.length }).map((_, i) => (
            <tr key={`empty-${i}`}>
              <td colSpan="3" style={{ height: '42px' }}></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PaginationWrapper>
        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton
              key={i}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
        </Pagination>
      </PaginationWrapper>
    </Container>
  );
};

export default FeedActivityTable;
