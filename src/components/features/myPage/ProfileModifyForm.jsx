import { useState } from "react";
import styled from "styled-components";


function ProfileModifyForm () {
  // 내가 선택한 MBTI 값을 설정하는 상태
  const [myMBTISide, setMyMBTISide] = useState("");
  // 내 MBTI를 수정하기 위해 팝업을 띄워야하는지를 설정하는 상태
  const [selectMBTI, setSelectMBTI] = useState(false);
  // mbti 16개 리스트
  const mbtiList = ["ISTJ","ISFJ","INFJ","INTJ","ISTP","ISFP","INFP","INTP","ESTP","ESFP","ENFP","ENTP","ESTJ","ESFJ","ENFJ","ENTJ"];

  // 선택한 MBTI의 값으로 상태를 변경
  function changeMBTIProfile(event) {
    setMyMBTISide(event.target.value)
  }

  // MBTI 선택창을 띄울지 말지 설정
  function toggleMBTISelectPopUp() {
    setSelectMBTI(!selectMBTI)
  }
  return(
    <>
      {selectMBTI === true ?
        <StPopupBox>
          <StSlideDiv />
          {mbtiList.map((elem, idx) => 
            <StMBTIBtn key={idx} background={myMBTISide === elem ? "skyblue" : "white"} onClick={changeMBTIProfile} value={elem}>
              {elem}
            </StMBTIBtn>)
          }
          <StCloseButton type="button" onClick={toggleMBTISelectPopUp}>선택하기</StCloseButton>
        </StPopupBox> : <></> }
      <StContainer>
        <StMyProfileSec>
          <StMyImageBox>
            <StMyImage src="https://livedoor.blogimg.jp/youngjumpkatan/imgs/3/a/3a50d74c.jpg" />
          </StMyImageBox>
          <StChangeImageBtn type="button">이미지 변경</StChangeImageBtn>
        </StMyProfileSec>
        <StCommonBorder />
        <StInputSettingBox>
          <StCommonLabel>나의 정보</StCommonLabel>
          <StCommonInput />
        </StInputSettingBox>
        <StCommonBorder />
        <StInputSettingBox>
          <StCommonLabel>나의 MBTI</StCommonLabel>
          <StSelectMBTIBtn onClick={toggleMBTISelectPopUp}>{myMBTISide === "" ? "선택하기" : myMBTISide}</StSelectMBTIBtn>
        </StInputSettingBox>
        <StCommonBorder />
      </StContainer>
    </>
  )
}

export default ProfileModifyForm;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  position: relative;
  
  text-align: left;

  margin:80px auto;
  padding: 0 12px;

  width:500px;
  box-sizing: border-box;
`

const StMyProfileSec = styled.form`
  display: flex;
  flex-direction: column;
  justify-content:center;
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
  margin: 17px;

  height: 135px;
  width: 135px;
  overflow: hidden;
`

const StMyImage = styled.img`
  height: 144px;
  width: 144px;

`

const StChangeImageBtn = styled.button`
  background: none;

  font-size: 18px;
  color: #979797;

  border: none;
  outline: none;
  margin-bottom: 69px;

  cursor: pointer;
`

const StCommonBorder = styled.div`
  height: 1px;
  background: gray;
  margin: 0 13px;
`

const StInputSettingBox = styled.div`
  padding: 25px 25px;
`

const StCommonLabel = styled.label`
  color: #979797;
  font-size: 18px;
  font-weight: 500;

`

const StCommonInput = styled.input`
  font-size: 18px;
  color:#979797;
  font-weight: 500;

  border:none;
  outline: none;

  margin-left:106px;
  padding: 0;
  width:234px;
`

const StMBTIBtn = styled.button`
  background: ${props => props.background};

  height: 105px;
  width: 105px;

  border: 1px solid #979797;
  border-radius: 6px;
  
  margin:6px;
  
  box-sizing: border-box;

  cursor: pointer;
`

const StSelectMBTIBtn = styled.button`
  background: none;

  font-size: 18px;
  text-align: left;

  border:none;
  outline: none;

  margin-left:98px;
  padding: 0;
  width:200px;

  cursor: pointer;
`

const StPopupBox = styled.div`
  background: #FFFFFF;
  
  position: absolute;
  width: 500px;
  height: 683px;

  box-shadow: 0px 2.66667px 26.6667px rgba(0, 0, 0, 0.25);
  border-radius: 21.3333px 21.3333px 0px 0px;

  z-index: 10;
  bottom:0;
`

const StSlideDiv = styled.div`
  background: #E8E8E8;

  width: 42.67px;
  height: 5.33px;

  border-radius: 133.333px;
  margin: 21px auto 28px auto;
`


const StCloseButton = styled.div`
  background: #979797;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  color: #FFFFFF;

  border-radius: 6px;
  margin: 25px;

  width: 450px;
  height:70px;

`