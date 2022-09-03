import styled from "styled-components";


function Layout ({ children }) {

  return ( 
    <LayoutContainer>
      { children }
    </LayoutContainer>
  )
}

export default Layout;


const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  margin: auto;
  border: 1px solid red;

  width:500px;
  min-height:100vh;
`