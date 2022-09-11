import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import accountsSlice, { deleteWithdrawFetch } from "../../../app/modules/accountsSlice";
import ErrorPageContainer from "../error/ErrorPageContainer";
import { StCommonRowBox } from "../../interface/styledCommon";


function WithdrawContainer () {
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const inputRef = useRef();
  const navigate = useNavigate();
  const [pageState, setPageState] = useState("input");
  const accountState = useSelector(state=> state.accounts)

  useEffect(() => {
    dispatch(accountsSlice.actions.resetSuccessMessage());
  },[])

  useEffect(() => {
    if (accountState.message === "success")
      setPageState("survey")
    else if (accountState.errorMessage !== "")
      alert("비밀번호를 확인해주십시오.")
  },[accountState])

  function sendToWithdrawData (event) {
    event.preventDefault();
    dispatch(deleteWithdrawFetch({password: passwordRef.current.value}))
  }

  function moveToMainPage (event) {
    event.preventDefault();
    navigate("/")
  }

  // 비밀번호 검증 API를 만들지 이야기 해볼 필요 있음.
  // 아니라면 비밀번호 입력과 함께 회원 탈퇴 페이지 내용을 하나로 합치던가 하는 게 좋을 것 같다.

  return (
    <StWithdrawContainer>
      {pageState === "input" ?
        <form onSubmit={sendToWithdrawData}>
          <div style={{margin:"30px 0", textAlign:"left"}}>
            <p style={{fontSize:"18px", fontWeight:"500", color:"#999999", margin:"0"}}>회원님의 소중한 개인정보를 안전하게 보호하기 위해</p>
            <p style={{fontSize:"18px", fontWeight:"500", color:"#999999", margin:"0"}}>비밀번호를 입력해주세요.</p>
          </div>
          <label style={{fontSize:"18px", fontWeight:"500", color:"#000000", display:"block", textAlign:"left"}}>비밀번호</label>
          <StCommonInput type="password" placeholder="비밀번호를 입력" ref={passwordRef} />
          <StCommonButton>확인</StCommonButton>
        </form>
      :
        pageState === "survey" ?
        <div>
          <div style={{margin:"30px 0", textAlign:"left"}}>
            <p style={{fontSize:"18px", fontWeight:"500", color:"#999999", margin:"0"}}>미믹을 떠난다니 아쉬워요.</p>
            <p style={{fontSize:"18px", fontWeight:"500", color:"#999999", margin:"0"}}>미믹을 떠나는 이유를 알려주세요.</p>
          </div>
          <form >
            <StCommonRowBox alignItems="center">
              <input type="radio" id="1" value="manyErrors" name="suvery" style={{height:"24px", margin:"10px 8px 10px 0", outline:"none"}} /><p>오류가 너무 많습니다.</p>
            </StCommonRowBox>
            <StCommonRowBox alignItems="center">
              <input type="radio" id="2" value="ToHardDirection" name="suvery" style={{height:"24px", margin:"10px 8px 10px 0", outline:"none"}} /><p>사용법이 어렵습니다.</p>
            </StCommonRowBox>
            <StCommonRowBox alignItems="center">
              <input type="radio" id="3" value="DonotHaveFeatures" name="suvery" style={{height:"24px", margin:"10px 8px 10px 0", outline:"none"}} /><p>필요한 기능이 없습니다.</p>
            </StCommonRowBox>
            <StCommonRowBox alignItems="center">
              <input type="radio" id="4" value="lackPhonesVolume" name="suvery" style={{height:"24px", margin:"10px 8px 10px 0", outline:"none"}} /><p>휴대폰 용량이 부족합니다.</p>
            </StCommonRowBox>
            <StCommonRowBox alignItems="center">
              <input type="radio" id="4" value="lackPhonesVolume" name="suvery" style={{height:"24px", margin:"10px 8px 10px 0", outline:"none"}} /><p>기타</p>
            </StCommonRowBox>
            <StCommonInput type="text" placeholder="직접 입력" ref={inputRef} />
            <StCommonButton onClick={moveToMainPage}>확인</StCommonButton>
          </form>
        </div>
      : <ErrorPageContainer />
      }

    </StWithdrawContainer>
  )
}

export default WithdrawContainer;

const StWithdrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:flex-start;

  margin:80px 25px;

  box-sizing: border-box;
`

const StCommonInput = styled.input`
  display:flex;

  font-size: 18px;
  font-weight: 500;
  color: #000000;

  border: 1px solid #979797;
  border-radius: 6px;
  outline: none;
  margin:8px 0;
  padding:0 0 0 20px;

  width: 95%;
  min-width: 360px;
  height: 55px;

  &::placeholder {
    font-size: 18px;
    font-weight: 500;
    color: #979797;

  }
`

const StCommonButton = styled.button`
  background: #979797;

  display:flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  font-weight: 500;
  color:#FFFFFF;

  border: none;
  border-radius: 6px;
  outline: none;
  margin: 30px 0;
  padding: 0;

  width:100%;
  height: 70px;

  cursor:pointer;
`