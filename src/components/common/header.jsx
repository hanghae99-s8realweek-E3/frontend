import { useNavigate } from "react-router-dom";
import styled from "styled-components";


function Header() {
  const navigate = useNavigate();

  function moveToPrevPage () {
    navigate(-1);
  }

  return (
    <HeaderContainer>
      <button type="button" onClick={moveToPrevPage}>〈 </button>
      <LogoImage />
    </HeaderContainer>
  )
}

export default Header;

const HeaderContainer = styled.div`
  background: #ffffff;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;

  height:60px;
  width:500px;

  border: 1px solid black;
  margin: 0;

  top:0;
  z-index: 5;
`

const LogoImage = styled.img`
  height: 50px;
`