// 대연 담당 파일
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { passwordFormat, emailFormat } from "../../../utils/reqList";
import { useNavigate } from "react-router-dom";
import { preInstance } from "../../../app/modules/instance";

function LoginForm() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [modal, setModal] = useState(
    ""
  );

  // 구조 분해 할당
  const onChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };


  // const submitLoginData = (event) => {
  //   event.preventDefault();
  //   if (userData.email === "" || !emailFormat.test(userData.email)) {
  //     return false
  //   } else if (
  //     userData.password === "" ||
  //     !passwordFormat.test(userData.password) ||
  //     userData.password.length < 8
  //   )
  //   {
  //   return false
  //   }
  //   const postLogin = async () => {
  //     console.log("아하하하")
  //     const response = await preInstance.post("/accounts/login", userData);
  //     console.log(response);
  //     if (response.data.message === "success") {
  //       window.localStorage.setItem("token", response.data.token);
  //       window.location.assign("/");
  //     } else {
  //       return setModal("하이요");
  //     }
  //   };
  //   postLogin();
  // };
  const submitLoginData = (event) => {
    event.preventDefault();
    if (userData.email === "" || !emailFormat.test(userData.email)) {
      return setModal("아이디 또는 비밀번호가 일치하지 않습니다.");
    } else if (
      userData.password === "" ||
      !passwordFormat.test(userData.password) ||
      userData.password.length < 8
    )
    {
    return setModal("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
    const postLogin = async () => {
      try {
        const response = await preInstance.post("/accounts/login", userData);
        if (response.data.message = "success") {
          window.localStorage.setItem("token", response.data.token);
          navigate("/");
        }
      } catch(error) {
        return setModal("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    };
    postLogin();
  };



  // moveSignUpPage
  const moveToSignUp = () => {
    navigate("/signup");
  };

  return (
    <StTotalWrap>
      <StForm onSubmit={submitLoginData}>
        <StEmail> 이메일 </StEmail>
        <StEmailInput
          //   id="inputemail"
          name="email"
          type="email"
          value={userData.email}
          placeholder="abcdef@gmail.com"
          onChange={onChange}
          StEmailInput
        />
        <StPassword> 비밀번호 </StPassword>
        <StPasswordInput
          //id="inputpassword"
          name="password"
          type="password"
          value={userData.password}
          placeholder="비밀번호 입력"
          onChange={onChange}
          StPasswordInput
        />
        <StIncorrect>{modal}</StIncorrect>

        <StLoginBtn type="submit">로그인</StLoginBtn>
      </StForm>

      {/* <button>카카오톡 계정연동</button> */}
      <StSignupBtn onClick={moveToSignUp}>회원가입</StSignupBtn>
    </StTotalWrap>
  );
}

const StTotalWrap = styled.div``;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const StEmail = styled.div`
  display: flex;
  margin: 154px 0px 8px 25px;
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
  width: 450px;
  height: 55px;
  border: 1px solid #979797;
  border-radius: 6px;
  margin: 0px 25px 30px 25px;
  text-align: left;
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
  ::placeholder {
    margin-left: 150px;
  }
  display: flex;
  box-sizing: border-box;
  height: 55px;
  border: 1px solid #979797;
  border-radius: 6px;
  display: flex;
  margin: 0px 25px 12px 25px;
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
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  height: 32px;
  color: #000000;
  cursor: pointer;
  margin: 0px 0px 439px 218px;
`;
export default LoginForm;
