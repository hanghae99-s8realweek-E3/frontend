//대연
import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { KAKAO_AUTH_URL } from "../../../app/modules/kakaoSlice";

function LoginSelect() {
  const navigate = useNavigate();
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
      <StTopMsg aria-hidden="true">
        로그인 후 더 많은
        <br /> MBTI를 따라해봐요!
      </StTopMsg>
      <StHashMsg aria-hidden="true">#어느누군가 #하루 #따라하기</StHashMsg>
      <StKakaoLoginBtn
        tabIndex={0}
        aria-label="버튼을 누르면 카카오계정 로그인 페이지로 이동합니다"
        onClick={goKakaoLogin}
      >
        카카오계정 로그인
      </StKakaoLoginBtn>
      <StNormalLoginBtn
        tabIndex={0}
        aria-label="버튼을 누르면 이메일 로그인 페이지로 이동합니다"
        onClick={goNormalLogin}
      >
        이메일 로그인
      </StNormalLoginBtn>
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
  @media screen and (max-width: 500px) {
    width: 324px;
    margin: 197px auto 16px;
  }
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
  @media screen and (max-width: 500px) {
    width: 324px;
    margin: auto;
    margin-bottom: 25px;
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
  @media screen and (max-width: 500px) {
    width: 324px;
    margin: auto;
  }
`;
export default LoginSelect;
