import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import styled from "styled-components";


function Layout ({ children }) {
  const nowPath = window.location.pathname;

  return ( 
    <LayoutContainer background={nowPath === "/todolists" || nowPath === "/setuptodo" || nowPath === "/feeddetail" ? "#EDECEC" : "#ffffff"} >
      { children }
    </LayoutContainer>
  )
}

export default Layout;


const LayoutContainer = styled.div`
  background: ${props => props.background || "#ffffff"};
  display: flex;
  flex-direction: column;
  position: relative;

  margin: auto;
  border: 1px solid red;

  width:500px;
  min-height:100vh;
`