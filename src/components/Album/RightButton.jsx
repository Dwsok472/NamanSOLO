import React from "react";
import styled from "styled-components";

export const Button = ({ onClick }) => {
  return (
    <RightWrapper>
      <button className="button" onClick={onClick}>
        <div className="button-box">
          <span className="button-elem">
            <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 20.038c0-.7.3-1.5.8-2.1l16-17c1.1-1 3.2-1.4 4.4-.3 1.2 1.1 1.2 3.3 0 4.4L9.9 17.038H43c1.7 0 3 1.3 3 3s-1.3 3-3 3H9.9l11.3 11.9c1 1 1.2 3.3 0 4.4-1.2 1.1-3.3.8-4.4-.3l-16-17c-.5-.5-.8-1.1-.8-1.9z" />
            </svg>
          </span>
          <span className="button-elem">
            <svg viewBox="0 0 46 40">
              <path d="M0 20.038c0-.7.3-1.5.8-2.1l16-17c1.1-1 3.2-1.4 4.4-.3 1.2 1.1 1.2 3.3 0 4.4L9.9 17.038H43c1.7 0 3 1.3 3 3s-1.3 3-3 3H9.9l11.3 11.9c1 1 1.2 3.3 0 4.4-1.2 1.1-3.3.8-4.4-.3l-16-17c-.5-.5-.8-1.1-.8-1.9z" />
            </svg>
          </span>
        </div>
      </button>
    </RightWrapper>
  );
};

const RightWrapper = styled.div`
  .button {
    display: block;
    position: relative;
    width: 56px;
    height: 56px;
    margin: 0;
    overflow: hidden;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    border: 0;
  }

  .button:before,
  .button:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    inset: 7px;
  }

  .button:before {
    border: 4px solid #8c0d17;
    transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
      transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
  }

  .button:after {
    border: 4px solid #dd7676;
    transform: scale(1.3);
    transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
      transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    opacity: 0;
  }

  .button:hover:before,
  .button:focus:before {
    opacity: 0;
    transform: scale(0.7);
    transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
      transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .button:hover:after,
  .button:focus:after {
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
      transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
  }

  .button-box {
    display: flex;
    position: absolute;
    top: 0;
    left: -56px;
  }

  .button-elem {
    display: block;
    width: 20px;
    height: 20px;
    margin: 17px 18px 0 18px;
    transform: rotate(180deg);
    fill: #8c0d17;
  }

  .button:hover .button-box,
  .button:focus .button-box {
    transition: 0.4s;
    transform: translateX(56px);
  }
`;

export default Button;
