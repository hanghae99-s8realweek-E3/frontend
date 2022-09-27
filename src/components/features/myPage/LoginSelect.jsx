//대연
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
  const code = new URL(window.location.href).searchParams.get("code");

  //카카오 계정 로그인
  const goKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      navigate("/mypage");
    }
  }, []);

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
      </StKakaoLoginBtn>
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
  margin: 218.33px 0px 15px 0px;
`;
const StHashMsg = styled.span`
  height: 32px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #979797;
  margin: 0px 0px 105px 0px;
`;

const StKakaoLoginBtn = styled.button`
  height: 70px;
  background: #ffd600;
  border-radius: 6px;
  border: 1px solid white;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  text-align: center;
  color: #313131;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 25px 25px 25px;
  cursor: pointer;
  transition: ease 0.05s;
  &:hover {
    background: #ffe668;
  }
`;

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
  margin: 0px 25px 340px 25px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition: ease 0.05s;
  &:hover {
    background: #ffa595;
  }
`;
export default LoginSelect;
