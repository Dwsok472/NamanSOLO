import React from 'react';
import styled from 'styled-components';
import PlaceForm from './PlaceForm';

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
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 30px 20px;
  width: 95%;
  max-width: 600px;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10000;
  color: #333;

  &:hover {
    color: #888;
  }
`;

function PlaceFormModal({ editingPlace, selectedRegion, onClose, refreshPlaces, setRegionPlaces, setFilteredPlaces }) {
  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✖</CloseButton>
        <PlaceForm
          editingPlace={editingPlace}
          selectedRegion={selectedRegion}
          onClose={onClose}
          refreshPlaces={refreshPlaces}
          setRegionPlaces={setRegionPlaces}
          setFilteredPlaces={setFilteredPlaces}
        />
      </ModalContent>
    </ModalBackground>
  );
}

export default PlaceFormModal;
