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
      <span>로그인 후 더 많은 MBTI를 따라해봐요!</span>
      <span>
        #오늘부터 #내가 #따라쟁이
      </span>
      <StKakaoLoginBtn onClick={goKakaoLogin}>카카오톡 계정 로그인</StKakaoLoginBtn>
      <StNormalLoginBtn onClick={goNormalLogin}>이메일 로그인</StNormalLoginBtn>
    </StTotalWrap>

  );
}


const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 800px;
`
const StKakaoLoginBtn = styled.button`
  margin-top: 100px;
  margin-bottom: 50px;
`

const StNormalLoginBtn = styled.button`
  
`
export default LoginSelect;