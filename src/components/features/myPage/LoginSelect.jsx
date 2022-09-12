import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getKakaoLoginFetch } from '../../../app/modules/accountsSlice';


function LoginSelect(){
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //카카오 로그인 연동
  const goKakaoLogin = () =>{
    dispatch(getKakaoLoginFetch());
    navigate("/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252F3.36.126.158%252Fapi%252Faccounts%252Fauth%252Fkakao%252Fcallback%26through_account%3Dtrue%26client_id%3D6d38e857413484f790fca11de76d3626")
  };

  // https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252F3.36.126.158%252Fapi%252Faccounts%252Fauth%252Fkakao%252Fcallback%26through_account%3Dtrue%26client_id%3D6d38e857413484f790fca11de76d3626
  
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