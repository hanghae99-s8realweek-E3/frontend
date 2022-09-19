import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Header() {
  const navigate = useNavigate();

  // 이전 페이지로 이동
  function moveToPrevPage() {
    navigate(-1);
  }

  return (
    <HeaderContainer>
      <StBackBtn type="button" onClick={moveToPrevPage}>
        <img
          style={{
            height: "20px",
            pointerEvents: "none",
            transform: "rotateY(180deg)",
          }}
          src="https://www.freeiconspng.com/thumbs/arrow-icon/arrow-icon--myiconfinder-23.png"
          alt="button for move to previous page"
        />
      </StBackBtn>
      <LogoImage />
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  background: #ffffff;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;

  height: 60px;
  width: 500px;

  border-bottom: 1px solid #c7c7c7;
  margin: 0;

  top: 0;
  z-index: 5;

  @media screen and (max-width: 500px) {
    width: 360px;
  }
`;

const StBackBtn = styled.button`
  background: none;

  height: 17px;

  border: none;
  outline: none;

  margin-right: auto;
  margin-left: 35px;

  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 50px;
`;
