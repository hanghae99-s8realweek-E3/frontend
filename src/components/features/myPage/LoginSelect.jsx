import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
// import { getKakaoLoginFetch } from '../../../app/modules/accountsSlice';
import { KAKAO_AUTH_URL } from "../../../app/modules/kakaoSlice";
import { useDispatch } from "react-redux";
// import { getKakaoLoginFetch } from "../../../app/modules/accountsSlice";

function LoginSelect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation;
  // const code = new URL(window.location.href).searchParams.get("code");
  console.log(location);
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(window.location.href);
  console.log(code);
  console.log("하..")
  console.log(document.URL);

//카카오 계정 로그인
  const goKakaoLogin = () =>{
    window.location.href = KAKAO_AUTH_URL
  };

  // https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252F3.36.126.158%252Fapi%252Faccounts%252Fauth%252Fkakao%252Fcallback%26through_account%3Dtrue%26client_id%3D6d38e857413484f790fca11de76d3626

  // const code = new URL(window.location.href).searchParams.get("token");

  // console.log(window.location.href);
  // console.log(code);

  // useEffect(() => {
  //   if (code) {
  //     console.log("통신해보자");
  //     axios
  //       .get(
  //         `http://3.36.126.158/api/accounts/auth/kakao/callback?code=${code}`
  //       )
  //       .then((response) => {
  //         console.log("흑흑");
  //         window.localStorage.setItem("token", response.data.token);
  //         navigate("/");
  //       })
  //       .catch((error) => {
  //         console.log("하")
  //         console.error(error);
  //       });
  //   }
  // }, [code]);


  useEffect(()=>{
    if(window.localStorage.getItem('token')){
    navigate('/mypage')
    }
    },[])


  //일반 로그인 연동
  const goNormalLogin = () => {
    navigate("/login");
  };

  return (
    <StTotalWrap>
      <StTopMsg>
        로그인 후 더 많은
        <br /> MBTI를 따라해봐요!
      </StTopMsg>
      <StHashMsg>#어느누군가 #하루 #따라하기</StHashMsg>
      <StKakaoLoginBtn onClick={goKakaoLogin}>
        카카오계정 로그인
        {/* <a href= "http://3.36.126.158/api/accounts/kakao"> */}

      </StKakaoLoginBtn>
      {/* <StKakaoLoginBtn onClick={goKakaoLogin}>카카오 계정 로그인</StKakaoLoginBtn> */}
      {/* <StKakaoLoginBtn> <a href={KAKAO_AUTH_URL}></a> 카카오톡 로그인</StKakaoLoginBtn> */}
      <StNormalLoginBtn onClick={goNormalLogin}>이메일 로그인</StNormalLoginBtn>
    </StTotalWrap>
  );
}

const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const StTopMsg = styled.div`
  height: 64px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #000000;
  margin: 339px 125px 15px 125px;
`;
const StHashMsg = styled.span`
  height: 32px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #979797;
  margin: 0px 0px 105px 25px;
`;
const StImg = styled.img``;

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

const KaKaoBtn = styled.button`
height: 70px;
  background: #f8e041;
  border-radius: 6px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  margin-bottom: 24px;
  > a {
    padding: 17px 0;
    font-weight: 400;
    width: 100%;
    color: #371f1e !important;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
`;
const StNormalLoginBtn = styled.button`
  height: 70px;
  background: #ff6d53;
  border: 1px solid white;
  border-radius: 6px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
  margin: 0px 25px 407.61px 25px;
  align-items: center;
  justify-content: center;
`;
export default LoginSelect;
