import styled from "styled-components";

function MyPageContainer ({ setMyPageState }) {

  function changeMyProfileData () {
    setMyPageState("modify")
  }

  return (
    <StMyPageContainer>
      <StMyProfileSec>
        <StMyImageBox>
          <StMyImage src="https://livedoor.blogimg.jp/youngjumpkatan/imgs/3/a/3a50d74c.jpg" />
        </StMyImageBox>
        <StMyProfileDiv>
          <h3 style={{margin:0, marginBottom:"0.5rem"}}>신도윤 님</h3>
          <p style={{margin:0, color:"gray"}}>ENFP</p>
        </StMyProfileDiv>
        <StMyFollowingStat>
          <div style={{display:"flex", flexDirection:"column", margin:"0 37px", textAlign:"center"}}>
            <span style={{marginBottom:"6px", fontSize:"20px"}}>10</span>
            <span style={{fontSize:"13px"}}>팔로잉</span>
          </div>
          <div style={{display:"flex", flexDirection:"column", margin:"0 37px",   textAlign:"center"}}>
            <span style={{marginBottom:"6px", fontSize:"20px"}}>15</span>
            <span style={{fontSize:"13px"}}>팔로워</span>
          </div>
        </StMyFollowingStat>
      </StMyProfileSec>
      <StMatchCheckDiv>
        <StMatchCheckBtn>궁합 알아보기</StMatchCheckBtn>
      </StMatchCheckDiv>
      <StCommonBorder />
      <div style={{display:"flex", flexDirection:"column", paddingLeft:"35px", paddingBottom:"25px"}}>
        <StMyPageMenu>나의 정보</StMyPageMenu>
        <StMyPageButton onClick={changeMyProfileData}>프로필 변경</StMyPageButton>
        <StMyPageButton>나의 활동</StMyPageButton>
      </div>
      <StCommonBorder />
      <div style={{display:"flex", flexDirection:"column", paddingLeft:"35px", paddingBottom:"25px"}}>
        <StMyPageMenu>설정</StMyPageMenu>
        <StMyPageButton>로그아웃</StMyPageButton>
        <StMyPageButton>비밀번호 변경</StMyPageButton>
        <StMyPageButton>고객센터</StMyPageButton>
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

const StMyFollowingStat = styled.div`
  display: flex;
  flex-direction: row;
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