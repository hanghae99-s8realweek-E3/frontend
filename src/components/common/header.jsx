import styled from "styled-components";


function Header() {

  return (
    <HeaderContainer>
      <LogoImage />
    </HeaderContainer>
  )
}

export default Header;

const HeaderContainer = styled.div`
  background: gray;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;

  height:60px;
  width:501px;

  border: 1px solid black;
  margin: 0;

  top:0;
  z-index: 5;
`

const LogoImage = styled.img`
  height: 50px;
`