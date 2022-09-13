//호진 담당
import React, { useEffect, useRef, useState } from "react";
import {emailFormat,passwordFormat} from "../../../utils/reqList"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { postSignUpFetch } from "../../../app/modules/accountsSlice";
import { tokenChecker } from "../../../utils/token";
import { preInstance } from "../../../app/modules/instance";

const SignUpForm = () => {
  //hook
  // const accountsState = useSelector(state => state.accounts)
  const confirmNumberRef = useRef();
  const navigate = useNavigate();

  //initialState
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  };

  //state
  const [signupData, setSignupData] = useState(initialState);

  //onChangeEventHandler
  const onChangeSignupData = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  //email중복확인
  const onClickEmailCheck = (e) => {
    //새로고침방지
    e.preventDefault();
    //정규식
    if (signupData.email.length === 0 || emailFormat.test(signupData.email)===false) 
      return alert("이메일 형식을 확인해주세요.")
    //payload
    const payload = e.target.value
    //axios (instance.jsx을 import로 불러와서 사용)
    const emailCheck = async() => {
      const response = await preInstance.post("/accounts/emailAuth", {email:payload});
      if ( response.data.message === "success") {
        return alert('이메일로 인증번호를 보냈습니다') // 이메일 중복확인 성공하면, 진행할 내용들...
      } else {
        return alert(response.response.data.errorMessage)
      }
    }
    emailCheck(); // 최종 동작
  }

  //인증번호 확인
  const onClickCertificate = (e) => {
    //새로고침방지
    e.preventDefault();
    //axios
    const certificate = async () => {
        const response = await preInstance.post("/accounts/emailAuth/check", {email:signupData.email, emailAuthNumber:confirmNumberRef.current.value})
        if (response.data.message === "success") {
            return alert('인증 성공 했습니다')
        } else {
            return alert(response.response.data.errorMessage)
        }
    }
    certificate();
  }

  //회원가입 정보 입력 양식
  const onSubmitSignUpComplete = (e) => {
    e.preventDefault();
    //정규식
    if (signupData.email.length === 0 || emailFormat.test(signupData.email)===false) {
        return alert("이메일 형식을 확인해주세요.")
    } else if  (signupData.password.length === 0 || passwordFormat.test(signupData.password)===false || signupData.password.length <= 7){
        return alert('비밀번호 형식을 확인해주세요')
    } else if (signupData.confirmPassword.length === 0 || signupData.password !== signupData.confirmPassword){
        return alert('비밀번호2 형식을 확인해주세요')
    } else if (signupData.nickname.length === 0) {
        return alert('닉네임 형식을 확인해주세요 ')
    }
    //axios
    const postSignUpFetch = async () => {
        const response = await preInstance.post("/accounts/signup", signupData)
        //request
        if (response.data.message === "success") {
            //localStorage 에 토큰 저장후 , navigate로 다음페이지로 이동시키기
            window.localStorage.setItem("token", response.data.token)
            window.location.assign('/mbti')
        } else {
            return alert(response.response.data.errorMessage)
        }
    }
    postSignUpFetch(); //함수 발동
  };

  //
  // useEffect(()=> {
  //   if (accountsState.message === "success")
  //     if (tokenChecker() === true)
  //       window.location.assign('/mbti')
  // },[accountsState])

  return (
    
    <div>
      <StOutLine type="submit" onSubmit={onSubmitSignUpComplete}>
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
                <StInsideBtn value={signupData.email} type="button" onClick={onClickEmailCheck}>중복검사</StInsideBtn>
              </StInputWrap>
            </StItem>
            
            <StItem>
              <label>인증번호</label>
                <StInputWrap>
                  <StInput
                    type="text" 
                    name="confirmNumber"
                    ref={confirmNumberRef}
                    placeholder="인증번호"/>
                <StInsideBtn type="button" onClick={onClickCertificate}>인증</StInsideBtn>
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