import styled from "styled-components";

export const StCommonColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};

  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};

  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const StCommonRowBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};

  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};

  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const StCommonText = styled.div`
  font-size: ${(props) => props.fontSize};
  font-weight: 500;

  color: #000000;

  margin: ${(props) => props.margin};
  height: 32px;
`;

export const StCommonBorder = styled.div`
  background: #bdc5cd;

  display: block;

  width: ${(props) => props.width || "100%"};
  height: 1px;

  margin: ${(props) => props.margin};
`;

export const StShadowBackgroundDiv = styled.div`
  background: rgba(0, 0, 0, 0.3);

  display: block;
  position: fixed;

  top: 0;
  width: 500px;
  height: 100%;
  z-index: 10;
  @media only screen and (max-width: 500px) {
    width: 360px;
  }
`;
