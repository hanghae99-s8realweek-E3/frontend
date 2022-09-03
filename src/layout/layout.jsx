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
  justify-content: center; //하위컴포넌트 영향(팔로우페이지-호진)
  align-items: center;
  position: relative;

  margin: auto;
  border: 1px solid red;

  width:500px;
  min-height:100vh;
`