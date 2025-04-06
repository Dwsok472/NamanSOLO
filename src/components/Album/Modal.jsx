import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  z-index: 999;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
  background: white;
  margin: 100px auto;
  padding: 20px;
  width: 90%;
  max-width: 700px;
  border-radius: 12px;
  position: relative;
`;

const Modal = ({ children, onClose }) => (
  <Overlay onClick={onClose}>
    <ModalWrapper onClick={(e) => e.stopPropagation()}>
      {children}
    </ModalWrapper>
  </Overlay>
);

export default Modal;
