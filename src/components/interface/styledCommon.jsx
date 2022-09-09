import styled from "styled-components";

export const StCommonColumnBox = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: ${props=>props.justifyContent};
  align-items: ${props=>props.alignItems};

  padding: ${props=>props.padding};
  margin: ${props=>props.margin};

  width: ${props=>props.width};
  height: ${props=>props.height};
`

export const StCommonRowBox = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: ${props=>props.justifyContent};
  align-items: ${props=>props.alignItems};

  padding: ${props=>props.padding};
  margin: ${props=>props.margin};

  width: ${props=>props.width};
  height: ${props=>props.height};
`

export const StCommonText = styled.div`
  font-size: ${props=> props.fontSize};
  font-weight: 500;
  
  color: #000000;

  margin: ${props => props.margin};
  height: 32px;
`