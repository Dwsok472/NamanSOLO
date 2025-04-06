import React from 'react';
import styled from 'styled-components';

const IntroWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #8c0d17;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transform: ${({ $slideOut }) => ($slideOut ? 'translateY(-100%)' : 'translateY(0)')};
  transition: transform 1.2s ease-in-out;
`;

const IntroText = styled.div`
  position: fixed;
  z-index: 10001;
  font-weight: bold;
  font-family: 'inherit';
  color: white;
  font-size: ${({ $animateToLogo }) => ($animateToLogo ? '2.5rem' : '10rem')};
  top: ${({ $top }) => ($top !== undefined ? `${$top}px` : '50%')};
  left: ${({ $left }) => ($left !== undefined ? `${$left}px` : '50%')};
  transform: translate(-50%, -50%);
  transition: all 1.5s ease-in-out;
`;

const Intro = ({ showIntro, animateToLogo, logoPosition, displayText, slideOut }) => {
  if (!showIntro) return null;

  return (
    <>
      {logoPosition && (
        <IntroText
          $animateToLogo={animateToLogo}
          $top={animateToLogo ? logoPosition.top : undefined}
          $left={animateToLogo ? logoPosition.left : undefined}
        >
          {displayText}
        </IntroText>
      )}
      <IntroWrapper $slideOut={slideOut} />     
    </>
  );
};

export default Intro;
