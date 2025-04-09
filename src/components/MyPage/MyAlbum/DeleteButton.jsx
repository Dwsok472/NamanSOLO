import React from "react";
import styled from "styled-components";

const DeleteButton = ({ isDragOver }) => {
  return (
    <StyledWrapper isDragOver={isDragOver}>
      <div className="trash-inner">
        <button className="bin-button">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 39 7"
            className="bin-top"
          >
            <line strokeWidth={4} stroke="white" y2={5} x2={39} y1={5} />
            <line
              strokeWidth={3}
              stroke="white"
              y2="1.5"
              x2="26.0357"
              y1="1.5"
              x1={12}
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 33 39"
            className="bin-bottom"
          >
            <mask fill="white" id="path-1-inside-1_8_19">
              <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
            </mask>
            <path
              mask="url(#path-1-inside-1_8_19)"
              fill="white"
              d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
            />
            <path strokeWidth={4} stroke="white" d="M12 6L12 29" />
            <path strokeWidth={4} stroke="white" d="M21 6V29" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 89 80"
            className="garbage"
          >
            <path
              fill="white"
              d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
            />
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .bin-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: rgb(253, 93, 93);
    cursor: pointer;
    border: 1px solid rgb(255, 201, 201);
    transition-duration: 0.3s;
    position: relative;
    overflow: hidden;
  }
  .bin-bottom {
    width: 15px;
    z-index: 2;
  }
  .bin-top {
    width: 17px;
    transform-origin: right;
    transition-duration: 0.3s;
    z-index: 2;
  }
  .bin-button:hover .bin-top {
    transform: rotate(45deg);
  }
  .bin-button:hover {
    background-color: rgb(252, 77, 77);
  }
  .bin-button:active {
    transform: scale(0.9);
  }
  .garbage {
    position: absolute;
    width: 14px;
    height: auto;
    z-index: 1;
    opacity: 0;
    transition: all 0.3s;
  }
  .bin-button:hover .garbage {
    animation: throw 0.4s linear;
  }
  @keyframes throw {
    from {
      transform: translate(-400%, -700%);
      opacity: 0;
    }
    to {
      transform: translate(0%, 0%);
      opacity: 1;
    }
  }
  ${(props) =>
    props.isDragOver &&
    `
    .bin-top {
      transform: rotate(45deg);
    }
    .garbage {
      animation: throw 0.4s linear;
    }
  `}
`;
// const StyledWrapper = styled.div`
//   .bin {
//     --black: #000000;
//     --binbg: #e6e6e6;
//     --width: 40px;
//     --height: 50px;
//     background-image: repeating-linear-gradient(
//       to right,
//       transparent,
//       transparent 5px,
//       var(--black) 5px,
//       var(--black) 7px,
//       transparent 7px
//     );
//     background-size: 11px calc(var(--height) / 2);
//     background-position: 2px center;
//     background-repeat: repeat-x;
//     margin: auto;
//     position: relative;
//     background-color: var(--binbg);
//     border: 0;
//     color: transparent;
//     width: var(--width);
//     height: var(--height);
//     border: 2px solid var(--black);
//     border-radius: 0 0 6px 6px;
//   }

//   .bin::after,
//   .bin::before {
//     content: "";
//     position: absolute;
//     transform-origin: left bottom;
//     transition: 200ms ease-in-out;
//     border-width: 2px;
//     border-style: solid;
//     margin: auto;
//     right: 0;
//   }

//   .bin::after {
//     left: -2.5px;
//     top: -5px;
//     height: 7px;
//     width: var(--width);
//     border: 2px solid var(--black);
//     background-color: var(--binbg);
//     border-radius: 5px 5px 0 0;
//   }

//   .bin::before {
//     top: -8px;
//     height: 2px;
//     width: 10px;
//     border-color: var(--black) var(--black) transparent var(--black);
//     left: 0;
//   }

//   ${(props) =>
//     props.isDragOver &&
//     `
//     .bin::after {
//       animation: binled 500ms 30ms cubic-bezier(0.215, 0.61, 0.355, 0.3) forwards;
//     }
//     .bin::before {
//       animation: ledhead 500ms 30ms cubic-bezier(0.215, 0.61, 0.355, 0.3) forwards;
//     }
//   `}

//   .trash-inner:hover .bin::after {
//     animation: binled 500ms 30ms cubic-bezier(0.215, 0.61, 0.355, 0.3) forwards;
//   }

//   .trash-inner:hover .bin::before {
//     animation: ledhead 500ms 30ms cubic-bezier(0.215, 0.61, 0.355, 0.3) forwards;
//   }

//   @keyframes binled {
//     0% {
//       transform-origin: left bottom;
//       transform: rotate(0deg);
//     }
//     50% {
//       transform-origin: left bottom;
//       transform: rotate(-45deg);
//     }
//     100% {
//       transform: rotate(0deg);
//     }
//   }

//   @keyframes ledhead {
//     0% {
//       transform: rotate(0deg);
//     }
//     50% {
//       transform: rotate(-30deg);
//     }
//     100% {
//       transform: rotate(0deg);
//     }
//   }
// `;

export default DeleteButton;
