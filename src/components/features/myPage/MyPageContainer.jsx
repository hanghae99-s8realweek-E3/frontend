import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMyPageFetch } from "../../../app/modules/accountsSlice";
import { cookieChecker, decodeMyCookieData, removeCookies } from "../../../utils/cookie";

function MyPageContainer () {
  const navigate = useNavigate();
  const myData = decodeMyCookieData();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPageFetch());
  }, [])

  const accountsState = useSelector(state => state.accounts.userInfo)

  if (cookieChecker() === false) {
    alert("로그인 후 이용해주세요.")
    navigate("/mypage")
  }

  // 프로필 수정 화면으로 이동
  function changeMyProfileData () {
    navigate("/modifyprofile")
  }

  // 비밀번호 변경 화면으로 이동
  function changeMyPasswordData () {
    navigate("/changepw")
  }

  // 고객센터(회원 탈퇴) 페이지로 이동
  function moveToHelpDeskPage () {
    navigate("/helpdesk")
  }

  // 내 활동 페이지로 이동
  function moveToActivity () {
    navigate("/activity")
  }

  // 팔로잉, 팔로워 클릭 시, 팔로잉/팔로워 리스트 화면 출력
  function moveToFollowList () {
    navigate('/follow')
  }

  // 로그아웃 버튼 클릭 시, 로그아웃 진행
  function logOutToSite() {
    removeCookies("token")
    navigate('/')
  }
  console.log(accountsState)
  return (
    <StMyPageContainer>
      {Object.keys(accountsState).length === 0 ? <div></div> : 
      <>
        <StMyProfileSec>
          <StMyImageBox>
            <StMyImage src="https://livedoor.blogimg.jp/youngjumpkatan/imgs/3/a/3a50d74c.jpg" />
          </StMyImageBox>
          <StMyProfileDiv>
            <h3 style={{margin:0, marginBottom:"0.5rem"}}>{accountsState.nickname} 님</h3>
            <p style={{margin:0, color:"gray"}}>{accountsState.mbti}</p>
          </StMyProfileDiv>
          <StMyFollowStat>
            <StFollowStatBtn onClick={moveToFollowList}>
              <span style={{marginBottom:"6px", fontSize:"20px"}}>{accountsState.following}</span>
              <span style={{fontSize:"13px"}}>팔로잉</span>
            </StFollowStatBtn>
            <StFollowStatBtn onClick={moveToFollowList}>
              <span style={{marginBottom:"6px", fontSize:"20px"}}>{accountsState.follower}</span>
              <span style={{fontSize:"13px"}}>팔로워</span>
            </StFollowStatBtn>
          </StMyFollowStat>
        </StMyProfileSec>

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
        <StMyPageMenu>설정</StMyPageMenu>
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

const StMyProfileSec = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  align-items: center;
  
  margin: 1rem 0;
`

const StMyImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 50%;
  margin: 0 26px;

  height: 80px;
  width: 80px;
  overflow: hidden;
`

const StMyImage = styled.img`
  height:96px;
  width: 96px;

`

const StMyProfileDiv = styled.div`
  display: flex;
  flex-direction: column;

  text-align: left;

  margin-right: 38px;
`

const StMyFollowStat = styled.div`
  display: flex;
  flex-direction: row;
`

const StFollowStatBtn = styled.button`
  background: none;

  display:flex;
  flex-direction:column;
  align-items: center;

  text-align:center;

  border: none;
  outline: none;
  margin:0 25px;

  cursor:pointer;
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