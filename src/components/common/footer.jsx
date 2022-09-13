import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  const params = useParams();
  const navigate = useNavigate();

  // 메인 페이지로 이동
  function moveToHome() {
    navigate('/')
  }

  // 피드 페이지로 이동
  function moveToFeed() {
    navigate('/todolists')
  }

  // TODO 페이지로 이동
  function moveToTodo() {
    navigate('/setuptodo')
  }

  // 내 정보 페이지로 이동
  function moveToMyPage() {
    navigate('/mypage')
  }

  return (
    <FooterContainer>
      <FooterButtonBox>
        <StButton onClick={moveToHome}><StCircle background={window.location.pathname === "/" ? "#E8644C" : "#E8E8E8"}/>홈</StButton>
        <StButton onClick={moveToFeed}><StCircle background={window.location.pathname === "/todolists" || window.location.pathname === `/todolists/${params.mbti}` ? "#E8644C" : "#E8E8E8"}/>피드</StButton>
        <StButton onClick={moveToTodo}><StCircle background={window.location.pathname === "/setuptodo" ? "#E8644C" : "#E8E8E8"}/>TO DO</StButton>
        <StButton onClick={moveToMyPage}><StCircle background={window.location.pathname === "/mypage" ? "#E8644C" : "#E8E8E8"}/>MY</StButton>
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

const StCircle = styled.span`
  background: ${props=>props.background || "#E8E8E8"};

  border-radius: 133.005px; 
  margin-bottom:5px;

  height:30px;
  width:30px;
`