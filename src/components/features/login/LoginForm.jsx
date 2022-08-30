import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useEffect} from "react";
import { passwordFormat, emailFormat } from "../../../utils/reqList";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // 구조 분해 할당
  const onChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  //preventDefault
  const navigate = useNavigate();
  // 로그인 버튼 클릭시 유효성 검사에따라서 alert창 띄움
  const submitLoginData = (event) => {
    event.preventDefault();
    if (userData.email === "" || !emailFormat.test(userData.email)) {
      alert("올바른 이메일 주소를 입력하세요");
      return false;
    } else if (
      userData.password === "" ||
      !passwordFormat.test(userData.password) || userData.password.length < 8
    ) {
      alert("올바른 비밀번호를 입력하세요");
      return false;
    }
    alert("오늘부터 #환경보호 #내가바로 #수호자 환경 수호자 ");
    navigate("/")
  };


  // moveSignUpPage
  const moveToSignup =  () => {
    navigate("/signup")
  };

//8글자 미만일경우
  //test match
  return (
    <>
    <StTotalWrap>
      <StForm onSubmit={submitLoginData}>
        <label> 이메일 </label>
          <input
            //   id="inputemail"
            name="email"
            type="email"
            value={userData.email}
            placeholder="abcdef@gmail.com"
            onChange={onChange}
          />
    
        <label> 비밀번호 </label>
          <input
            //id="inputpassword"
            name="password"
            type="password"
            value={userData.password}
            placeholder="비밀번호 입력"
            onChange={onChange}
          />
      
        <button type="submit">로그인</button>
      </StForm>

        {/* <button>카카오톡 계정연동</button> */}
        <button onClick={moveToSignup}>회원가입</button>
        </StTotalWrap>
    </>
  );
}

const StTotalWrap = styled.div`
width: 500px;
margin: 0 auto;
margin-top: 120px;
  display: flex;
  flex-direction: column;
`

const StForm = styled.form`
  display: flex;
  flex-direction: column;
`
const SocialWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: red;
  margin: 0 45%;
`;

export default LoginForm;


// em rem 