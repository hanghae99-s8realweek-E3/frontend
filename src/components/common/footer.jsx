import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  const navigate = useNavigate();

  function moveToHome() {
    return navigate("/")
  }

  function moveToFeed() {
    return navigate("/feed")
  }

  function moveToTodo() {
    return navigate("/todo")
  }

  function moveToMyPage() {
    return navigate("/myPage")
  }

  return (
    <FooterContainer>
      <StButton onClick={moveToHome}>홈</StButton>
      <StButton onClick={moveToFeed}>피드</StButton>
      <StButton onClick={moveToTodo}>TO DO</StButton>
      <StButton onClick={moveToMyPage}>MY</StButton>
    </FooterContainer>
  )
}

export default Footer;

const FooterContainer = styled.div`
  background: white;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap:3rem;
  position: fixed;

  height:60px;
  width:501px;

  border: 1px solid blue;
  margin: 0;

  bottom:0;
  z-index: 5;
`

const StButton = styled.button`
  background: none;

  border: 2px solid blue;
  outline: none;
  border-radius: 5px;

  height: 50px;
  width: 70px;

  cursor: pointer;

  &:hover {
    background: gray;
    color:white;  
  }
`