import React from 'react';
import styled from 'styled-components';
import Follow from './Follow';
import BookMark from './BookMark';
const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

function Other() {
  return (
    <Container>
      <Follow type="follower" />
      <Follow type="following" />
    </Container>
  );
}

export default Other;
