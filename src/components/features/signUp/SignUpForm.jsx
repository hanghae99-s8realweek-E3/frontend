//호진 담당
import React, { useEffect, useRef, useState } from "react";
import { emailFormat, passwordFormat } from "../../../utils/reqList";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { preInstance } from "../../../app/modules/instance";
import LoadingContainer from "../../../utils/loadingState";

const SignUpForm = () => {
  //hook
  const confirmNumberRef = useRef();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [checkState, setCheckState] = useState({
    email: "none",
    password: "none",
    confirm: "",
    nickname: "",
  });

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
    if (name === "nickname" && signupData.nickname.length > 12) {
      setSignupData({
        ...signupData,
        [name]: value.slice(0, 12).trim(),
      });
    } else {
      setSignupData({ ...signupData, [name]: value });
    }
    if (
      checkState.email === "none" ||
      checkState.password === "none" ||
      checkState.confirm === "none"
    ) {
      setCheckState({ ...checkState, [name]: "block" });
    }
  };

  //email중복확인
  const onClickEmailCheck = (e) => {
    //새로고침방지
    e.preventDefault();
    //정규식
    if (
      signupData.email.length === 0 ||
      emailFormat.test(signupData.email) === false
    )
      return alert("이메일 형식을 확인해주세요.");
    //payload
    const payload = e.target.value;
    //axios (instance.jsx을 import로 불러와서 사용)
    const emailCheck = async () => {
      try {
        const response = await preInstance.post("/accounts/emailAuth", {
          email: payload,
        });
        if (response.data.message === "success") {
          return alert("입력하신 이메일로 인증 번호를 전송했습니다.");
        }
      } catch (error) {
        return alert(
          "이메일로 인증 번호를 보내는 데에 실패했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    };
    emailCheck(); // 최종 동작
  };

  //인증번호 확인
  const onClickCertificate = (e) => {
    //새로고침방지
    e.preventDefault();
    //axios
    const certificate = async () => {
      try {
        const response = await preInstance.post("/accounts/emailAuth/check", {
          email: signupData.email,
          emailAuthNumber: confirmNumberRef.current.value,
        });
        if (response.data.message === "success") {
          return alert("인증에 성공했습니다.");
        }
      } catch (error) {
        return alert("인증에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    };
    certificate();
  };

  //회원가입 정보 입력 양식
  const onSubmitSignUpComplete = (e) => {
    e.preventDefault();
    //정규식
    if (
      signupData.email.length === 0 ||
      emailFormat.test(signupData.email) === false
    ) {
      return alert("이메일 형식을 확인해주세요.");
    } else if (
      signupData.password.length === 0 ||
      passwordFormat.test(signupData.password) === false ||
      signupData.password.length <= 7
    ) {
      return alert("비밀번호 형식을 확인해주세요");
    } else if (
      signupData.confirmPassword.length === 0 ||
      signupData.password !== signupData.confirmPassword
    ) {
      return alert("비밀번호2 형식을 확인해주세요");
    } else if (
      signupData.nickname.length === 0 ||
      signupData.nickname.length > 12
    ) {
      return alert("닉네임 형식(12글자 이하)을 확인해주세요 ");
    } else if (signupData.nickname.trim().length === 0) {
      return alert("정확한 닉네임을 입력해 주십시오.");
    }
    setLoading(true);
    //axios
    const postSignUpFetch = async () => {
      try {
        const response = await preInstance.post("/accounts/signup", signupData);
        //request
        if (response.data.message === "success") {
          //localStorage 에 토큰 저장후 , navigate로 다음페이지로 이동시키기
          window.localStorage.setItem("token", response.data.token);
          navigate("/mbti");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error.response);
        if (
          error.response.data.errorMessage ===
          "이메일 인증이 완료되지 않았습니다."
        ) {
          return alert(
            "이메일 인증이 완료되지 않았습니다.\n이메일 인증 후 다시 시도해주십시오."
          );
        } else {
          return alert(
            "회원가입에 실패했습니다. 잠시 후, 다시 시도해주십시오."
          );
        }
      }
    };
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
      {loading === true ? <LoadingContainer /> : <></>}
      <StOutLine type="submit" onSubmit={onSubmitSignUpComplete}>
        <StContainer>
          <StItem>
            <label>이메일</label>
            <StInputWrap marginBottom="70px" marginTop="5px">
              <StInput
                onChange={onChangeSignupData}
                type="text"
                name="email"
                value={signupData.email}
                placeholder="mimic@gmail.com"
              />
              <StInsideBtn
                value={signupData.email}
                type="button"
                onClick={onClickEmailCheck}>
                이메일 인증
              </StInsideBtn>
            </StInputWrap>
            <StErrorTextMessage>
              {checkState.email === "none"
                ? "　"
                : signupData.email.length === 0
                ? "이메일을 입력해주세요"
                : signupData.email.match(emailFormat)
                ? ""
                : "잘못된 이메일입니다"}
            </StErrorTextMessage>
          </StItem>

          <StItem>
            <label>인증번호</label>
            <StInputWrap marginBottom="70px">
              <StInput
                type="text"
                name="confirmNumber"
                ref={confirmNumberRef}
                placeholder="인증번호 입력"
              />
              <StInsideBtn type="button" onClick={onClickCertificate}>
                인증하기
              </StInsideBtn>
            </StInputWrap>
          </StItem>

          <StItem>
            <label>비밀번호</label>
            <StInputWrap marginBottom="60px">
              <StInput
                onChange={onChangeSignupData}
                type="password"
                name="password"
                maxLength={20}
                value={signupData.password}
                placeholder="비밀번호 입력"
              />
            </StInputWrap>
            <StErrorTextMessage>
              {checkState.password === "none"
                ? "　"
                : signupData.password.length === 0
                ? "비밀번호를 입력해주세요"
                : signupData.password.length < 8
                ? "최소 8자 이상 입력해주세요."
                : signupData.password.match(passwordFormat)
                ? ""
                : "영문,숫자,특수문자 중 2가지 이상을 조합해주세요."}
            </StErrorTextMessage>
          </StItem>

          <StItem>
            <label>비밀번호 확인</label>
            <StInputWrap marginBottom="70px">
              <StInput
                onChange={onChangeSignupData}
                type="password"
                name="confirmPassword"
                maxLength={20}
                value={signupData.confirmPassword}
                placeholder="비밀번호 확인"
              />
            </StInputWrap>
            <StErrorTextMessage>
              {checkState.confirm === "none"
                ? "　"
                : signupData.confirmPassword.length === 0
                ? ""
                : signupData.password === signupData.confirmPassword
                ? "　"
                : "비밀번호가 일치하지 않습니다."}
            </StErrorTextMessage>
          </StItem>

          <StItem>
            <label>닉네임</label>
            <StInputWrap marginBottom="70px">
              <StInput
                onChange={onChangeSignupData}
                type="nickname"
                name="nickname"
                value={signupData.nickname}
                placeholder="닉네임 입력"
                maxLength="12"
              />
            </StInputWrap>
            <StErrorTextMessage>
              {checkState.confirm === "none"
                ? "　"
                : signupData.nickname.length === 0
                ? ""
                : signupData.nickname.length < 13
                ? "　"
                : "닉네임은 최대 12글자까지 입력 가능합니다"}
            </StErrorTextMessage>
          </StItem>

          <StSignUpBtn>가입하기</StSignUpBtn>
        </StContainer>
      </StOutLine>
    </div>
  );
};

export default SignUpForm;

const StOutLine = styled.form`
  width: 450px;
  display: flex;
  flex-direction: column;
  height: 961px;
  margin: 50px auto;
  @media only screen and (max-width: 500px) {
    width: 360px;
  }
`;

const StContainer = styled.div`
  /* background-color: beige; */

  width: 450px;
  display: grid;
  display: inline-grid;
  text-align: start;
  gap: 10px;
  margin-top: 30px;
  @media only screen and (max-width: 500px) {
    width: 350px;
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const StItem = styled.div`
  position: relative;
  display: grid;
  display: inline-grid;
  @media only screen and (max-width: 500px) {
    width: 350px;
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const StInputWrap = styled.div`
  margin-top: ${(props) => props.marginTop || "10px"};
  margin-bottom: ${(props) => props.marginBottom || "10px"};
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
`;
const StInput = styled.input`
  /* background-color: red; */
  border: 1px solid #979797;
  border-radius: 6px;
  width: 94%;
  height: 55px;
  position: absolute;
  padding-left: 10px;
  ::placeholder {
    font-size: 18px;
    line-height: 18px;
  }
  @media only screen and (max-width: 500px) {
    width: 325px;
  }
`;
const StInsideBtn = styled.button`
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: #ff6d53;
  position: absolute;
  margin-top: 10px;
  width: 100px;
  height: 32px;
  right: 20px;
  z-index: 1;
  background-color: white;
  border: none;
  cursor: pointer;
  @media only screen and (max-width: 500px) {
    transform: translateX(0%) translateY(10%);
    -webkit-tap-highlight-color: transparent;
  }

  transition: ease 0.05s;
  &:hover {
    color: #ffa595;
  }
`;

const StSignUpBtn = styled.button`
  height: 70px;
  width: 465px;
  left: 25px;
  right: 25px;
  top: 825px;
  background: #979797;
  border-radius: 6px;
  border: none;
  color: white;
  background: #ff6d53;
  font-weight: 500;
  font-size: 22px;
  cursor: pointer;
  @media only screen and (max-width: 500px) {
    width: 340px;
    margin-left: 5px;
    margin-right: 5px;
  }
  transition: ease 0.05s;
  &:hover {
    background: #ffa595;
  }
  -webkit-tap-highlight-color: transparent;
  margin-top: 40px;
`;
const StErrorTextMessage = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 450px;
  height: 20px;
  font-size: 16px;
  color: #ff6d53;
`;
