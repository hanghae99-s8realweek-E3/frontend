import React, { useEffect, useState } from "react";
import {emailFormat,passwordFormat} from "../../../utils/reqList"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postSignUpFetch } from "../../../app/modules/accountsSlice";
import { tokenChecker } from "../../../utils/token";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.accounts)

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
            } else if  (signupData.password.length === 0 || passwordFormat.test(signupData.password)===false || signupData.password.length <= 7){
              return alert('비밀번호 형식을 확인해주세요')
            } else if (signupData.confirmPassword.length === 0 || signupData.password !== signupData.confirmPassword){
              return alert('비밀번호2 형식을 확인해주세요')
            }
            else if (signupData.nickname.length === 0) {
              return alert('닉네임 형식을 확인해주세요 ')
            }
            console.log("보내주세요")
            dispatch(postSignUpFetch(signupData))//!디스패치,모듈,페이로드 
  };

  useEffect(()=> {
    if (state.message === "success")
    // 아직 회원가입이 되지 않아 
      if (tokenChecker() === true)
        window.location.assign('/mbti')
  },[state])

  return (
    
    <div>
      <StOutLine type="submit" onSubmit={onSubmit}>
      <h4>회원가입 페이지</h4>
      <StContainer>
      <StItem>
        <label>이메일</label>
        <StInputWrap>
        <StInput
          onChange={onChangeSignupData}
          type="text"
          name="email"
          value={signupData.email}
          placeholder="이메일"
        />
        <StInsideBtn>중복검사</StInsideBtn>
        </StInputWrap>
        </StItem>
        
        <StItem>
        <label>인증번호</label>
        <StInputWrap>
        <StInput
          onChange={onChangeSignupData}
          type="text"
          name="confirmNumber"
          placeholder="인증번호"
        />
        <StInsideBtn>인증</StInsideBtn>
        </StInputWrap>
        </StItem>

        <StItem>
        <label>비밀번호</label>
        <StInputWrap>
        <StInput
          onChange={onChangeSignupData}
          type="password"
          name="password"
          value={signupData.password}
          placeholder="비밀번호"
        />
        </StInputWrap>
        </StItem>

        <StItem>
        {/* <label>비밀번호 확인</label> */}
        <StInputWrap>
        <StInput
          onChange={onChangeSignupData}
          type="password"
          name="confirmPassword"
          value={signupData.confirmPassword}
          placeholder="비밀번호 확인"
        />
        </StInputWrap>
        </StItem>

        <StItem>
        
        <label>닉네임</label>
        <StInputWrap>
        <StInput
          onChange={onChangeSignupData}
          type="nickname"
          name="nickname"
          value={signupData.nickname}
          placeholder="닉네임"
        />
        </StInputWrap>
        </StItem>

        <StSignUpBtn>회원가입</StSignUpBtn>
        </StContainer>
      </StOutLine>
    </div>
  );
};

export default SignUpForm;

const StOutLine = styled.form`
  width:450px;
  display:flex;
  flex-direction: column;
  height:800px;
  margin:50px auto;

`

const StContainer=styled.div`
/* background-color:beige; */
/* justify-content: flex-start; */
width:450px;
    display: grid;
    display: inline-grid;
    text-align: start;
    gap:10px;


`

const StItem=styled.div`
position: relative;
    display: grid;
    display: inline-grid;
`

const StInputWrap = styled.div`
    margin-top: 5px;
    margin-bottom:80px;

`
const StInput = styled.input `
  border: 1px solid #979797;
border-radius: 6px;
    width: 450px;
    height:55px;
    position: absolute;
    padding-left:10px;
`
const StInsideBtn = styled.button`
position: absolute;
margin-top :10px;
width: 80px;
height: 32px;
left: 371px;
z-index: 1;
background-color:white;
border:none;

`

const StSignUpBtn = styled.button`
height: 70px;
left: 25px;
right: 25px;
top: 825px;
background: #979797;
border-radius: 6px;
border:none;
color:white;
`