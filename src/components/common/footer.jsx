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
    return navigate("/setuptodo")
  }

  function moveToMyPage() {
    return navigate("/myPage")
  }

  return (
    <FooterContainer>
      <FooterButtonBox>
        <StButton onClick={moveToHome}><span style={{background:"#E8E8E8", height:"30px", width:"30px", borderRadius: "133.005px", marginBottom:"5px"}} />홈</StButton>
        <StButton onClick={moveToFeed}><span style={{background:"#E8E8E8", height:"30px", width:"30px", borderRadius: "133.005px", marginBottom:"5px"}} />피드</StButton>
        <StButton onClick={moveToTodo}><span style={{background:"#E8E8E8", height:"30px", width:"30px", borderRadius: "133.005px", marginBottom:"5px"}} />TO DO</StButton>
        <StButton onClick={moveToMyPage}><span style={{background:"#E8E8E8", height:"30px", width:"30px", borderRadius: "133.005px", marginBottom:"5px"}} />MY</StButton>
      </FooterButtonBox>
      <StCommonBar />
    </FooterContainer>
  )
}

export default Footer;

const FooterContainer = styled.div`
  background: #FAFAFA;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: fixed;

  height:108px;
  width:500px;

  padding-top: 15px;

  bottom:0;
  z-index: 6;
`

const FooterButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap:5rem;
`
const StButton = styled.button`
  background: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 400;

  border: none;
  outline: none;
  padding:0;

  cursor: pointer;
`
  
const StCommonBar = styled.div`
  background: #000000;

  margin-top: 15px;
  border-radius: 133.005px;

  width: 178.23px;
  height: 6.65px;

`