import styled from "styled-components";
import { darken } from "polished";
import pallete from '../../../global/colors'

export const Wrapper = styled.div`
  height: 100vh;
  background: linear-gradient(
    -140deg,
    ${pallete.primaryLight},
    ${pallete.primaryDefault}
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    img {
      margin: 0 0 10px;
      border-radius: 50%;
      height: 120px;
      width: 160px;
      align-self: center;
    }
    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      background: ${pallete.secondaryDefault};
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 5px;
      font-size: 16px;
      transition: background 2s;
      &:hover {
        background: ${darken(0.2, pallete.secondaryDefault)};
      }
    }
    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
    p {
      color: #fff;
    }
  }
`;