import React from "react";
import styled from "styled-components";

const DeleteButton = ({ isDragOver }) => {
  return (
    <StyledWrapper className={isDragOver ? "open" : ""}>
      <div className="trash-inner">
        <button className="bin">🗑</button>
        <div className="div">
          <small>
            <i />
          </small>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .bin {
    --black: #000000;
    --binbg: #e6e6e6;
    --width: 40px;
    --height: 50px;
    background-image: repeating-linear-gradient(
      to right,
      transparent,
      transparent 5px,
      var(--black) 5px,
      var(--black) 7px,
      transparent 7px
    );
    background-size: 11px calc(var(--height) / 2);
    background-position: 2px center;
    background-repeat: repeat-x;
    margin: auto;
    position: relative;
    background-color: var(--binbg);
    border: 0;
    color: transparent;
    width: var(--width);
    height: var(--height);
    border: 2px solid var(--black);
    border-radius: 0 0 6px 6px;
  }

  .bin::after,
  .bin::before {
    content: "";
    position: absolute;
    transform-origin: left bottom;
    transition: 200ms ease-in-out;
    border-width: 2px;
    border-style: solid;
    margin: auto;
    right: 0;
  }

  .bin::after {
    left: -2px;
    top: -5px;
    height: 7px;
    width: var(--width);
    border: 2px solid var(--black);
    background-color: var(--binbg);
    border-radius: 5px 5px 0 0;
  }

  .bin::before {
    top: -8px;
    height: 2px;
    width: 10px;
    border-color: var(--black) var(--black) transparent var(--black);
    left: 0;
  }

  /* ✅ 드래그 or 마우스 호버 시 뚜껑 애니메이션 */
  .open .bin::after,
  .open .bin::before,
  .trash-inner:hover .bin::after,
  .trash-inner:hover .bin::before {
    animation: binled 500ms 30ms cubic-bezier(0.215, 0.61, 0.355, 0.3) forwards;
  }

  .open .bin::before,
  .trash-inner:hover .bin::before {
    animation: ledhead 500ms 30ms cubic-bezier(0.215, 0.61, 0.355, 0.3) forwards;
  }

  @keyframes binled {
    0% {
      transform-origin: left bottom;
      transform: rotate(0deg);
    }

    50% {
      transform-origin: left bottom;
      transform: rotate(-45deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  .bin:focus::before,
  .bin:active::before {
    animation: ledhead 500ms 30ms cubic-bezier(0.215, 0.61, 0.355, 0.3) forwards;
  }

  @keyframes ledhead {
    0% {
      top: -10px;
      left: 5px;
      right: 7px;
      transform-origin: left bottom;
      transform: rotate(0deg);
    }

    50% {
      top: -18px;
      left: -23px;
      right: 3px;
      transform-origin: left bottom;
      transform: rotate(-45deg);
    }
    100% {
      top: -8px;
      left: 7px;
      right: 7px;
      transform: rotate(0deg);
    }
  }

  .bin:focus ~ .div,
  .bin:active ~ .div {
    cursor: none;
    z-index: 1;
  }

  .bin:focus ~ .div:hover,
  .bin:active ~ .div:hover {
    cursor: pointer;
  }

  .bin:focus ~ .overlay,
  .bin:active ~ .overlay {
    pointer-events: inherit;
    z-index: 2;
    cursor: pointer;
  }

  .bin:focus ~ .div > small,
  .bin:active ~ .div > small {
    opacity: 1;
    animation: throw 300ms 30ms cubic-bezier(0.215, 0.61, 0.355, 0.3) forwards;
  }

  .div:focus,
  .div:active,
  .div:hover {
    z-index: 1;
    cursor: none;
  }

  .div > small {
    position: absolute;
    width: 20px;
    height: 16px;
    left: 0;
    right: -58px;
    margin: auto;
    top: 27px;
    bottom: 0;
    border-left: 1px solid black;
    opacity: 0;
  }

  .div > small::before,
  .div > small::after {
    content: "";
    position: absolute;
    width: 1px;
    border-right: 1px solid black;
  }

  .div > small::before {
    height: 17px;
    transform: rotate(-42deg);
    top: -3px;
    right: 13px;
  }

  .div > small::after {
    height: 4px;
    transform: rotate(-112deg);
    top: 18px;
    right: 11px;
  }

  .div > small > i::before,
  .div > small > i::after {
    content: "";
    position: absolute;
    border-top: 1px solid black;
  }

  .div > small > i::before {
    border-left: 1px solid black;
    width: 4px;
    bottom: -4px;
    height: 4px;
    transform: rotate(66deg);
  }

  .div > small > i::after {
    border-right: 1px solid black;
    width: 5px;
    bottom: -2px;
    height: 5px;
    transform: rotate(-114deg);
    right: 6px;
  }

  @keyframes throw {
    0% {
      transform: translate(0, 0);
    }

    50% {
      transform: translate(0, -30px) rotate(-10deg);
    }

    60% {
      transform: translate(0, -40px) rotate(-30deg);
    }

    70% {
      transform: translate(-5px, -50px) rotate(-40deg) scale(1);
      opacity: 1;
    }

    80% {
      transform: translate(-10px, -60px) rotate(-60deg) scale(0.9);
      opacity: 1;
    }

    90% {
      transform: translate(-20px, -50px) rotate(-100deg) scale(0.5);
      opacity: 0.8;
    }

    100% {
      transform: translate(-30px, -20px) rotate(-80deg) scale(0.4);
      opacity: 0;
    }
  }
`;

export default DeleteButton;
