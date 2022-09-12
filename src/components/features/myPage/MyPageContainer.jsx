import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMyPageFetch } from "../../../app/modules/accountsSlice";
import { tokenChecker } from "../../../utils/token";
import ProfileCard from "../../common/ProfileCard";

function MyPageContainer () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyPageFetch());
  }, [])

  const accountsState = useSelector(state => state.accounts)

  if (tokenChecker() === false) {
    alert("로그인 후 이용해주세요.")
    window.location.assign("/mypage")
  }

  // 프로필 수정 화면으로 이동
  function changeMyProfileData () {
    window.location.assign("/modifyprofile")
  }

  // 비밀번호 변경 화면으로 이동
  function changeMyPasswordData () {
    window.location.assign("/changepw")
  }

  // 고객센터(회원 탈퇴) 페이지로 이동
  function moveToHelpDeskPage () {
    window.location.assign("/helpdesk")
  }

  // 내 활동 페이지로 이동
  function moveToActivity () {
    window.location.assign("/activity")
  }

  // 로그아웃 버튼 클릭 시, 로그아웃 진행
  function logOutToSite() {
    window.localStorage.clear();
    window.location.assign('/')
  }
  const test = () => {
    navigate(`/otherspage/${accountsState.userInfo.userId}`)
  }
  return (
    <StMyPageContainer>
      {Object.keys(accountsState.userInfo).length === 0 ? <div></div> : 
      <>
        <ProfileCard profileData={accountsState} />

        <StMatchCheckDiv>
          <StMatchCheckBtn>궁합 알아보기</StMatchCheckBtn>
        </StMatchCheckDiv>
      </>}

      <StCommonBorder />

      <div style={{display:"flex", flexDirection:"column", paddingLeft:"35px", paddingBottom:"25px"}}>
        <StMyPageMenu>나의 정보</StMyPageMenu>
        <StMyPageButton onClick={changeMyProfileData}>프로필 변경</StMyPageButton>
        <StMyPageButton onClick={moveToActivity}>나의 활동</StMyPageButton>
      </div>

      <StCommonBorder />

      <div style={{display:"flex", flexDirection:"column", paddingLeft:"35px", paddingBottom:"25px"}}>
        <StMyPageMenu onClick ={test}>설정</StMyPageMenu>
        <StMyPageButton onClick={logOutToSite}>로그아웃</StMyPageButton>
        <StMyPageButton onClick={changeMyPasswordData}>비밀번호 변경</StMyPageButton>
        <StMyPageButton onClick={moveToHelpDeskPage}>고객센터</StMyPageButton>
      </div>

    </StMyPageContainer>
  )
}

export default MyPageContainer;

const StMyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  
  text-align: left;

  margin:80px auto 108px auto;
  /* padding: 0 0.6rem; */

  width:500px;
  box-sizing: border-box;
` 

const StCommonBorder = styled.div`
  height: 1px;
  background: #BDC5CD;
`

const StMyPageButton = styled.button`
  background: none;

  text-align: left;
  font-size: 20px;
  font-weight: 700;

  border:none;
  outline: none;
  padding: 0;
  margin: 20px 0;

  cursor:pointer; 
`

const StMyPageMenu = styled.span`
  font-size: 18px;
  color: #979797;
  margin: 42px 0 8px 0;
`

const StMatchCheckDiv = styled.div`
  
  margin-bottom:46px;
`

const StMatchCheckBtn = styled.button`
  background: none;

  font-size: 13px;
  text-decoration: underline;
  font-weight: 500;

  border:none;
  margin: 0 0 0 126px;

  cursor:pointer;
`