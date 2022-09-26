import styled from "styled-components";
import { StShadowBackgroundDiv } from "../components/interface/styledCommon";

function LoadingContainer() {
  return (
    <StShadowBackgroundDiv>
      <StLoadingScreen className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </StLoadingScreen>
    </StShadowBackgroundDiv>
  );
}

export default LoadingContainer;

const StLoadingScreen = styled.div`
  display: inline-block;
  position: relative;
  width: 500px;
  height: 100vh;
  transform: translateX(32%) translateY(40%);
  & > div {
    position: absolute;
    top: 33px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ff6d53;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  & > div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  & > div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  & > div:nth-child(3) {
    left: 72px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  & > div:nth-child(4) {
    left: 136px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(72px, 0);
    }
  }
  @media screen and (max-width: 500px) {
    width: 360px;
    transform: translateX(28%) translateY(40%);
    & > div {
      top: 40px;
      width: 20px;
      height: 20px;
    }
    & > div:nth-child(1) {
      left: 8px;
    }
    & > div:nth-child(2) {
      left: 8px;
    }
    & > div:nth-child(3) {
      left: 65px;
    }
    & > div:nth-child(4) {
      left: 130px;
    }
    @keyframes lds-ellipsis2 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(65px, 0);
      }
    }
  }
`;
