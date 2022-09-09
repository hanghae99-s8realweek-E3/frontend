import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { passwordFormat, emailFormat } from "../../../utils/reqList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLoginFetch } from "../../../app/modules/accountsSlice";

function LoginForm() {
  const loginState = useSelector((state) => state.accounts);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  // 구조 분해 할당
  const onChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // useEffect=(() => {
  //   postLoginFetch()
  // },[])
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
      !passwordFormat.test(userData.password) ||
      userData.password.length < 8
    ) {
      alert("올바른 비밀번호를 입력하세요");
      return false;
    } else {
      dispatch(postLoginFetch(userData));
      alert("오늘부터 #환경보호 #내가바로 #수호자 환경 수호자 ");
      navigate("/");
    }
  };

  // moveSignUpPage
  const moveToSignUp = () => {
    navigate("/signup");
  };

  //8글자 미만일경우
  //test match
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

        <StLoginBtn type="submit">로그인</StLoginBtn>
      </StForm>

      {/* <button>카카오톡 계정연동</button> */}
      <StSignupBtn onClick={moveToSignUp}>회원가입</StSignupBtn>
    </StTotalWrap>
  );
}

const StTotalWrap = styled.div`
  /* width: 500px; */
  /* margin-top: 120px; */
  /* display: flex; */
  /* flex-direction: column; */
`;

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
::placeholder{
  margin-left: 150px;
}
  display: flex;
  box-sizing: border-box;
  height: 55px;
  border: 1px solid #979797;
  border-radius: 6px;
  display: flex;
  margin: 0px 25px 130px 25px;
`;

const StLoginBtn = styled.button`
  display: flex;
  height: 70px;
  border: 1px solid white;
  background: #FF6D53;
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

