import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


function LoginSelect(){
  const navigate = useNavigate();

  //카카오 로그인 연동
  const goKakaoLogin = () =>{
    navigate("/kakao")
  };
  
  //일반 로그인 연동
  const goNormalLogin = () =>{
    navigate("/login");
  };

  return(
    <StTotalWrap>
      <StTopMsg>로그인 후 더 많은<br/> MBTI를 따라해봐요!</StTopMsg>
      <StHashMsg>
        #어느누군가 #하루 #따라하기
        </StHashMsg>
      <StKakaoLoginBtn onClick={goKakaoLogin}>카카오 계정 로그인</StKakaoLoginBtn>
      <StNormalLoginBtn onClick={goNormalLogin}>이메일 로그인</StNormalLoginBtn>
    </StTotalWrap>
  );
}

const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;
`
const StTopMsg = styled.div`
height: 64px;
font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 24px;
line-height: 32px;
color: #000000;
margin:339px 125px 15px 125px;
`
const StHashMsg = styled.span`
height: 32px;
font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 32px;
color: #979797;
margin: 0px 0px 105px 25px;
`
const StKakaoLoginBtn = styled.button`
height: 70px;
background: #FFD600;
border-radius: 6px;
border: 1px solid white;
font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 22px;
line-height: 32px;
text-align: center;
color: #313131;
display: flex;
align-items: center;
justify-content: center;
margin:0px 25px 25px 25px;
`
const StNormalLoginBtn = styled.button`
height: 70px;
background: #FF6D53;
border: 1px solid white;
border-radius: 6px;
font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 22px;
line-height: 32px;
text-align: center;
color: #FFFFFF;
margin: 0px 25px 407.61px 25px ;
align-items: center;
justify-content: center;
`
export default LoginSelect;