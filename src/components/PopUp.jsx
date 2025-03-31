import styled from 'styled-components';
import { IconClose } from './Icons';

const CardWrap = styled.div`
  width: ${(props) => props.width || '550px'};
  margin: 0 auto;
  margin-top: 50px;
`;
const Card = styled.div`
  width: ${(props) => props.cardwidth || '500px'};
  height: ${(props) => props.cardheight || '600px'};
  background-color: white;
  border-radius: 50px;
  border: 1px solid #3333;
`;
const Top = styled.div`
  height: 15%;
  border: 1px solid #3333;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border: none;
  background-color: ${(props) => props.topbackground || '#ffdcd6'};
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const TopX = styled.div`
  position: absolute;
  top: 0px;
  right: 20px;
`;
const H1 = styled.h1`
  margin: 0 auto;
`;
const Buttom = styled.div``;

function PopUp({ width, cardwidth, cardheight, topbackground, name }) {
  return (
    <CardWrap width={width}>
      <Card cardwidth={cardwidth} cardheight={cardheight}>
        <Top topbackground={topbackground}>
          <TopX>
            <IconClose />
          </TopX>
          <H1 name={name}>{name}</H1>
        </Top>
        <Buttom></Buttom>
      </Card>
    </CardWrap>
  );
}

export default PopUp;
