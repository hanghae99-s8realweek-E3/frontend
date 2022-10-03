import { useParams } from "react-router-dom";
import styled from "styled-components";

function Layout({ children }) {
  const params = useParams();

  function locationCheck() {
    if (
      (window.location.pathname === `/todolists/${params.mbti}` ||
        window.location.pathname === "/todolists" ||
        window.location.pathname === `/otherspage/${params.userId}` ||
        window.location.pathname === `/activity`) === true
    )
      return true;
    else return false;
  }

  return (
    <LayoutContainer
      background={locationCheck() === true ? "#EDECEC" : "#ffffff"}>
      {children}
    </LayoutContainer>
  );
}

export default Layout;

const LayoutContainer = styled.div`
  background: ${(props) => props.background || "#ffffff"};
  display: flex;
  flex-direction: column;
  position: relative;

  margin: auto;
  /* border: 1px solid red; */

  max-width: 500px;
  min-height: 100vh;

  box-shadow: 0px 0px 10px 0px rgba(183, 183, 183, 1);

  @media screen and (max-width: 500px) {
    width: 360px;
    box-shadow: none;
  }
`;
