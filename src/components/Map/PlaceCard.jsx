import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #ffffff;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  width: 100%;
  height: 300px;
  text-align: center;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 8px;

  .category {
    color: #555;
    font-size: 0.9rem;
    font-weight: bold;
  }

  .title {
    font-weight: bold;
    font-size: 1.1rem;
    margin: 4px 0;
  }

  .address {
    font-size: 0.85rem;
    color: #777;
  }
`;

function PlaceCard({ place, onClick }) {
  const thumbnailUrl = place.mediaUrl?.[0]?.mediaUrl || 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <Card onClick={onClick}>
      <Thumbnail src={thumbnailUrl} alt={place.name} />
      <Info>
        <div className="category">{place.category}</div>
        <div className="title">{place.name}</div>
        <div className="address">{place.address}</div>
      </Info>
    </Card>
  );
}

export default PlaceCard;
