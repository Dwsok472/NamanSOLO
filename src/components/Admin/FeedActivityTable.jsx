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

const FeedActivityTable = () => {
  const [users, setUsers] = useState([]);

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
            <th>#</th>
            <th>유저</th>
            <th>마지막 활동일</th>
          </tr>
        </thead>
          <tbody>
          {users
            .filter(user => user.username !== "AVG")
            .slice(0, 50)
            .map((user, index) => (
              <tr key={user.username}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>
                  {user.lastLogin
                    ? new Date(user.lastLogin + "T00:00:00").toLocaleDateString()
                    : '없음'}
                </td>
              </tr>
            ))}
          </tbody>
      </Table>
    </Container>
  );
};

export default FeedActivityTable;
