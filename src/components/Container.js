import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(250, 250, 250);
  padding: 32px 28px;
  border-radius: 16px;
  background-image: linear-gradient(#fff, #fff), linear-gradient(90deg, rgba(101,254,195,1) 0%, rgba(0,176,255,1) 100%);
  border: 3px solid transparent;
  background-origin: padding-box;
  background-clip: padding-box, border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: all 400ms;
  overflow: hidden;
  div.logo {
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
          width: 20px;
          height: auto;
          margin-right: 4px;
      }
      p {
          font-size: 16px;
          line-height: 1.5;
      }
  }
  &>p {
      margin-top: 20px;
      text-align: center;
  }
`;
