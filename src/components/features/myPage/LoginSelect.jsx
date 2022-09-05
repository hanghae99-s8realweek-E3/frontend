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
        #오늘부터 #내가 #따라쟁이
        </StHashMsg>
      <StKakaoLoginBtn onClick={goKakaoLogin}>카카오 계정 로그인</StKakaoLoginBtn>
      <StNormalLoginBtn onClick={goNormalLogin}>이메일 로그인</StNormalLoginBtn>
    </StTotalWrap>

  );
}

const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`
const StTopMsg = styled.div`
display: flex;
height: 64px;
font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 24px;
line-height: 32px;
color: #000000;
margin:154px 0px 17px 25px;
text-align: left;
`
const StHashMsg = styled.span`
display: flex;
width: 210px;
height: 32px;
font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 32px;
color: #979797;
margin: 0px 265px 130px 25px;
`
const StKakaoLoginBtn = styled.button`
height: 70px;
background: #979797;
border-radius: 6px;
font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 22px;
line-height: 32px;
text-align: center;
color: #FFFFFF;
display: flex;
align-items: center;
justify-content: center;
margin:130px 25px 25px 25px;
`

const StNormalLoginBtn = styled.button`
height: 70px;
background: #C9C9CA;
border-radius: 6px;
font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 22px;
line-height: 32px;
text-align: center;
color: #FFFFFF;
margin: 0px 25px 407.61px 25px ;
display: flex;
align-items: center;
justify-content: center;
`
export default LoginSelect;