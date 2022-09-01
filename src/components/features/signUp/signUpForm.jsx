import React, { useState } from "react";
import {emailFormat,passwordFormat} from "../../../utils/reqList"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
    
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  };

  const [signupData, setSignupData] = useState(initialState);

  const onChangeSignupData = (e) => {
    const { name, value } = e.target;
    // console.log(value)
    setSignupData({ ...signupData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(signupData);
    // 이메일 길이가 0이 아니고, 이메일형식이 맞으면 true
        if (signupData.email.length === 0 || emailFormat.test(signupData.email)===false) {
              return alert("이메일 형식을 확인해주세요.")
            } else if  (signupData.password.length === 0 || passwordFormat.test(signupData.password)===false || signupData.password.length <= 8){
              return alert('비밀번호 형식을 확인해주세요')
            } else if (signupData.confirmPassword.length === 0 || signupData.password !== signupData.confirmPassword){
              return alert('비밀번호2 형식을 확인해주세요')
            }
            else if (signupData.nickname.length ===0) {
              return alert('닉네임 형식을 확인해주세요 ')
            }
            navigate('/mbti');
  };

  return (
    <div>
      <StOutLine type="submit" onSubmit={onSubmit}>
        <label>이메일</label>
        <div>
        <input
          onChange={onChangeSignupData}
          type="text"
          name="email"
          value={signupData.email}
        />
        <button>중복검사</button>
        </div>

        <label>인증번호</label>
        <div>
        <input
          onChange={onChangeSignupData}
          type="text"
          name="confirmNumber"
        />
        <button>인증</button>
        </div>

        <label>비밀번호</label>
        <input
          onChange={onChangeSignupData}
          type="password"
          name="password"
          value={signupData.password}
        />

        <label>비밀번호 확인</label>
        <input
          onChange={onChangeSignupData}
          type="password"
          name="confirmPassword"
          value={signupData.confirmPassword}
        />

        <label>닉네임</label>
        <input
          onChange={onChangeSignupData}
          type="nickname"
          name="nickname"
          value={signupData.nickname}
        />

        <button>회원가입</button>
      </StOutLine>
    </div>
  );
};

export default SignUpForm;

const StOutLine = styled.form`
width:500px;
display:flex;
flex-direction: column;
margin: 100px auto;
justify-content: space-around;
`

