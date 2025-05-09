import React from 'react';
import styled from 'styled-components';
import PlaceDetail from './PlaceDetail';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1004;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 15px;
  padding: 30px;
  width: 55vw;
  height: 85vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    color: #888;
  }
`;

function PlaceModal({ place, onClose, onEdit, onDelete, isAdmin, refreshPlaces  }) {
  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✖</CloseButton>
        <PlaceDetail
          place={place}
          onEdit={onEdit}
          onDelete={onDelete}
          isAdmin={isAdmin}
          refreshPlaces={refreshPlaces}
        />
      </ModalContent>
    </ModalBackground>
  );
}

export default PlaceModal;
