import styled from 'styled-components';

const BurgerWrapper = styled.div`
  width: 40px;
  height: 30px;
  cursor: pointer;
  position: relative;
`;

const Bar = styled.span`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: black;
  border-radius: 9px;
  transition: all 0.3s ease;
  left: 0;

  &:nth-child(1) {
    top: ${({ $isOpen }) => ($isOpen ? '13px' : '0px')};
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg)' : 'rotate(0deg)')};
  }
  &:nth-child(2) {
    top: 13px;
    opacity: ${({ $isOpen }) => ($isOpen ? 0 : 1)};
  }
  &:nth-child(3) {
    top: ${({ $isOpen }) => ($isOpen ? '13px' : '26px')};
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-45deg)' : 'rotate(0deg)')};
  }
`;

const Burger = ({ onClick, isOpen }) => {
  return (
    <BurgerWrapper onClick={onClick}>
      <Bar isOpen={isOpen} />
      <Bar isOpen={isOpen} />
      <Bar isOpen={isOpen} />
    </BurgerWrapper>
  );
};

export default Burger;
