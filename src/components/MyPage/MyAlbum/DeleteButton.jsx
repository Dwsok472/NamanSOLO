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
    left: -2.5px;
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
`;

export default DeleteButton;
