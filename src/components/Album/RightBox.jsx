import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllUsername, searchUsernameByKeyword } from '../api';

import AlbumDetail from './AlbumDetail';

const Container = styled.div`

  width: 100%;
  margin: 0 auto;
  padding: 10px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const BottomBox = styled.div`
  width: 100%;
  border-radius: 16px;
  transition: margin-top 0.3s ease-out; /* 부드러운 애니메이션 추가 */
  margin-top: 5px;


`;

function RightBox({ albumData }) {



  return (
    <Container>
      {albumData &&
        <BottomBox>
          <AlbumDetail albumData={albumData} />
        </BottomBox>}
    </Container>
  );
}
export default RightBox
