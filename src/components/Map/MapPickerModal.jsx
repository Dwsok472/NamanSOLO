import React from 'react';
import styled from 'styled-components';
import MapPicker from '../Story/MapPicker';

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
  background: white;
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  max-width: 650px;
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

  &:hover {
    color: #888;
  }
`;

function MapPickerModal({ onSelect, onClose }) {
  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✖</CloseButton>
        <MapPicker onSelect={onSelect} />
      </ModalContent>
    </ModalBackground>
  );
}

export default MapPickerModal;
