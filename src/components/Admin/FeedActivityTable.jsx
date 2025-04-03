// 유저별 마지막 활동기록
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  flex: 1;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
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

const FeedActivityTable = ({ users }) => {
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
          {users.slice(0, 10).map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.lastActive}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FeedActivityTable;
