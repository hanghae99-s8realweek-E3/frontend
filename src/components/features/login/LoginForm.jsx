// 대연 return 구문 쪽 주석 inputCard컴포넌트 이용보류
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { passwordFormat, emailFormat } from "../../../utils/reqList";
import { useNavigate } from "react-router-dom";
import { preInstance } from "../../../app/modules/instance";
// import InputCard from "../../common/InputCard";
import LoadingContainer from "../../../utils/loadingState";

function LoginForm() {
  const navigate = useNavigate();
  const [modal, setModal] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  // 구조 분해 할당
  const onChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const submitLoginData = (event) => {
    //이벤트 발생방지
    event.preventDefault();
    setLoading(true);
    //req.List.jsx에 있는 정규식 사용
    if (userData.email === "" || !emailFormat.test(userData.email)) {
      return setModal("아이디 또는 비밀번호가 일치하지 않습니다.");
    } else if (
      userData.password === "" ||
      !passwordFormat.test(userData.password) ||
      userData.password.length < 8
    ) {
      return setModal("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
    // 로그인 버튼 클릭시 서버와의 통신
    const postLogin = async () => {
      try {
        const response = await preInstance.post("/accounts/login", userData);
        if (response.data.message === "success") {
          window.localStorage.setItem("token", response.data.token);
          setLoading(false);
          navigate("/");
        }
      } catch (error) {
        setLoading(false);
        return setModal("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    };
    //함수 실행
    postLogin();
  };
  // moveSignUpPage
  const moveToSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      {loading === true ? <LoadingContainer /> : <></>}
      <StTotalWrap>
        <StForm onSubmit={submitLoginData}>
          <StEmail> 이메일 </StEmail>
          <StEmailInput
            name="email"
            // type="email" 을 넣었을 때 설정해 놓은 모달창이 아닌 type="email"의 alert창이 뜨는 문제
            value={userData.email}
            placeholder="abcdef@gmail.com"
            onChange={onChange}
          />
          {/* <InputCard
          name="email"
          // type="email" 을 넣었을 때 설정해 놓은 모달창이 아닌 type="email"의 alert창이 뜨는 문제
          value={userData.email}
          placeholder="abcdef@gmail.com"
          onChange={onChange}
        /> */}
          <StPassword> 비밀번호 </StPassword>
          <StPasswordInput
            name="password"
            type="password" // 비밀번호 입력시 숫자 가려지게 하는 역할
            value={userData.password}
            placeholder="비밀번호 입력"
            onChange={onChange}
          />
          {/* <InputCard
          name="password"
          value={userData.password}
          placeholder="비밀번호 입력"
          type="password"
          onChange={onChange}
        /> */}
          <StIncorrect>{modal}</StIncorrect>
          <StLoginBtn type="submit">로그인</StLoginBtn>
        </StForm>
        <StSignupBtn onClick={moveToSignUp}>회원가입</StSignupBtn>
      </StTotalWrap>
    </>
  );
}

const StTotalWrap = styled.div``;
const StForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const StEmail = styled.div`
  display: flex;
  margin: 93.33px 0px 8px 25px;
  height: 32px;
  font-family: IBM Plex Sans KR;
  font-size: 18px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
`;
const StEmailInput = styled.input`
  display: flex;
  box-sizing: border-box;
  height: 55px;
  border: 1px solid #979797;
  border-radius: 6px;
  margin: 0px 25px 30px 25px;
  text-align: left;
  padding-left: 19px;
`;
const StPassword = styled.div`
  display: flex;
  margin-left: 25px;
  margin-bottom: 8px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #000000;
`;
const StPasswordInput = styled.input`
  display: flex;
  box-sizing: border-box;
  height: 55px;
  border: 1px solid #979797;
  border-radius: 6px;
  display: flex;
  margin: 0px 25px 12px 25px;
  padding-left: 19px;
`;
const StIncorrect = styled.div`
  display: flex;
  margin: 0 0 86px 25px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: #ff6d53;
`;
const StLoginBtn = styled.button`
  display: flex;
  height: 70px;
  border: 1px solid white;
  background: #ff6d53;
  border-radius: 6px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  margin: 0px 25px 36px 25px;
  justify-content: center;
  align-items: center;
`;
const StSignupBtn = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  height: 32px;
  color: #000000;
  cursor: pointer;
  margin: 0px 0px 439px auto;
`;
export default LoginForm;
