import { StCommonColumnBox, StCommonRowBox } from "../interface/styledCommon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck, faMessage, faStar } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { decodeMyTokenData } from "../../utils/token";
import instance from "../../app/modules/instance";

function ChallengeCard ({ id, data, hideState, isTodayChallenge }) {
  const [challengeComplete, setChallengeComplete] = useState(false)
  const [menuModal, setMenuModal] = useState(false);
  const params = useParams();
  const myData = decodeMyTokenData();
  const navigate = useNavigate();

  // API 새로 요청해야하나?
  // 결과값에 isCompleted 상태를 반환할 수 있으면 좋을텐데!
  // 이거 말고 다르게 해결 가능한지를 확인해보자.

  // 상세 피드 페이지로 이동시켜줌.
  function moveToFeedDetail () {
    if (id !== "null" && id !== undefined)
    navigate(`/feeddetail/${id}`);
  };

  // 오늘 날짜를 yyyy-mm-dd로 반환해줌.
  function settingTodayDate () {
    const selectYear = new Date().getFullYear();
    const selectMonth = new Date().getMonth() < 9 ? "0" + (new Date().getMonth() +1) : new Date().getMonth() + 1
    const selectDay = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
    return `${selectYear}-${selectMonth}-${selectDay}`
  }

  // 오늘의 챌린지 완료/진행중 상태를 바꿔주도록 함. 
  function changeStateChallenge (event) {
    event.stopPropagation();
    const stateChallenge = async () => {
      try {
        const response = await instance.put(`/mytodos/${id}/challenged`, { date: settingTodayDate() })
        if (response.data.message === "success") {
          if (response.data.isCompleted === 1) {
            setChallengeComplete(true)
          } else {
            setChallengeComplete(false)
          }
        }
      } catch(error) {
        alert(error.response.data.errorMessage)
      }
    }
    stateChallenge();
  }

  // 경로에 따라 카드 사이즈를 조절할지 말지 결정함.
  function locationSizeCheck () {
    if ((window.location.pathname === `/todolists/${params.mbti}` ||
          window.location.pathname === "/todolists" || 
            window.location.pathname === "/setuptodo" || 
              window.location.pathname === `/feeddetail/${params.todoId}` ||
                window.location.pathname === `/otherspage/${params.userId}` ||
                  window.location.pathname === `/activity`) === true)
                return false
    else
      return true
  }

  // 경로에 따라 완료/진행중 버튼 출력을 유도할지 말지 결정함.
  function locationButtonCheck () {
    if ((window.location.pathname === "/todolists" || 
          window.location.pathname === `/todolists/${params.mbti}` ||
            window.location.pathname === "/activity") === true)
        return false
    else
      return true
  }

  // 팝업창 열고 닫기 위한 코드
  function displayCardMenu(event) {
    event.stopPropagation();
    setMenuModal(!menuModal)
  }

  // 오늘 도전하기 위해 등록한 미믹을 취소함.
  function cancelTodayChallenge(event) {
    event.stopPropagation();
    const cancelApply = async() => {
      try {
        const response = await instance.delete(`/mytodos/${data.todoId}/challenged`, { data: { date: settingTodayDate() }});
        if (response.data.message === "success") {
          window.location.reload();
        } 
      } catch(error) {
        alert(error.response.data.errorMessage)
      }
    }
    cancelApply();
  }

  // 내가 제안한 미믹을 삭제함.
  function deleteMyTodayMakingChallenge(event) {
    event.stopPropagation();
    const deleteApply = async() => {
      try {
        const response = await instance.delete(`mytodos/${data.todoId}`)
        if (response.data.message === "success") {
          window.location.reload();
        }
      } catch(error) {
        alert(error.response.data.errorMessage)
      }
    }
    deleteApply();
  }


  // 이용 시, <ChallengeCard id={todoId} data={객체값} key={idx} hideState={true/false} isTodayChallenge={true/false} />로 작성해줄 것
  // map을 쓰지 않는 경우, key는 예외.
  return (
    <>
      {menuModal === true ? 
        <StShadowBackgroundDiv>
          { isTodayChallenge === true ?
            <StPopUpWhiteButton onClick={cancelTodayChallenge} transform="translateY(76vh)">등록 취소</StPopUpWhiteButton>
          :
            <StPopUpWhiteButton onClick={deleteMyTodayMakingChallenge} transform="translateY(76vh)">삭제</StPopUpWhiteButton>
          }
          <StPopUpWhiteButton onClick={displayCardMenu} transform="translateY(77vh)">닫기</StPopUpWhiteButton>
        </StShadowBackgroundDiv> 
        : <></>}
      <StChallengeCardDiv width={locationSizeCheck() === false ? "90%" : "100%"} id={data.todoId} onClick={moveToFeedDetail}>
        {(locationButtonCheck() === true && hideState !== "true") ?
        <StChallengeStateBtn onClick={changeStateChallenge}>
          {challengeComplete === false ?
            <FontAwesomeIcon style={{fontSize:"46px", marginRight:"19px"}} icon={faCircle} /> :
              <FontAwesomeIcon style={{fontSize:"46px", marginRight:"19px"}} icon={faCircleCheck} />}
        </StChallengeStateBtn> : <></>}
        <StCommonColumnBox width="100%">
          <StCommonRowBox>
            <StChallengeNameSpan>{data.todo.length < 10 ? data.todo : data.todo.substring(0, 10) + "..."}</StChallengeNameSpan>

            {/* '상세 메뉴의 출현 여부를 나타내는 코드. 
              절차가 헷갈릴 수 있으므로 메모함. 
              1) 지금 내 데이터가 있는가? - 있으면 true, 없으면 나타내지 않음. 
              2) 현재 페이지의 path가 '/setuptodo'인가? - 맞으면 2-1, 아니면 3으로
                2-1) path가 '/setuptodo'이면 지금 해당하는 카드가 오늘의 도전인가? - 맞으면 true, 아니면 2-1-1로
                  2-1-1) 오늘의 도전이 아니라면, 이 카드의 작성자가 내가 맞는가? 맞으면 true, 아니면 나타내지 않음.
              3) path가 '/setuptodo'가 아니라면, 카드의 작성자가 내가 맞는가? - 맞으면 true, 아니면 나타내지 않음. */}

            {myData !== undefined ?
              window.location.pathname === "/setuptodo" ?
                isTodayChallenge === true ?
                  <StMenuBtn onClick={displayCardMenu}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </StMenuBtn>
                : 
                  myData.userId === data.userId ?
                    <StMenuBtn onClick={displayCardMenu}>
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </StMenuBtn>
                  :
                  <></>
              :
                myData.userId === data.userId ?
                  <StMenuBtn onClick={displayCardMenu}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </StMenuBtn>
                :
                  <></>
            :
              <></>
            }

            </StCommonRowBox>
          <StCommonRowBox alignItems="center">
            <StNickNameSpan>{data.nickname}</StNickNameSpan>
            <StCommonRowBox alignItems="center" style={{marginRight:"5px"}}>
              <FontAwesomeIcon style={{color:"#979797", margin:"0 4px"}} icon={faMessage} />
              <StCountSpan>{data.commentCounts}</StCountSpan>
            </StCommonRowBox>
            <StCommonRowBox alignItems="center" style={{marginLeft:"5px"}}>
              <FontAwesomeIcon style={{color:"#979797", margin:"0 0 0 0"}} icon={faStar} />
              <StCountSpan style={{marginRight:"4px"}}>{data.challengedCounts}</StCountSpan>
            </StCommonRowBox>
          </StCommonRowBox>
          
        </StCommonColumnBox>
      </StChallengeCardDiv>
    </>
  )
}

export default ChallengeCard;


const StChallengeCardDiv = styled.div`
  background: #ffffff;

  display:flex;
  flex-direction: row;
  align-items: center;

  width: ${props => props.width || "100%"};
  height: 102px;
  border:1px solid gray;
  border-radius: 6px;
  padding: 14px 20px 7px 20px;
  margin: 5px 25px;

  box-sizing: border-box;
  cursor:pointer;
`

const StChallengeStateBtn = styled.button`
  
  background: none;

  border:none;
  outline:none;

  cursor:pointer;
`

const StChallengeNameSpan = styled.span`
  font-size: 22px;
  font-weight: 600;
  color:#979797;
  line-height: 32px;

  margin-right:auto;
`

const StNickNameSpan = styled.span`
  font-weight: 500;
  font-size:16px;
  line-height: 32px;
  color: ${props=>props.color || "#979797"};

  margin-right:auto;
`

const StMenuBtn = styled.button`
  background: none;
  font-size:16px;
  line-height: 32px;
  color:#979797;

  border:none;
  outline:none;

  cursor:pointer;
`

const StCountSpan = styled.span`
  font-size: 13px;
  font-weight: 500;
  line-height: 32px;
  color:#979797;

  margin: 0 8px;
`

const StPopUpWhiteButton = styled.button`
  background:#ffffff;

  display:flex;
  justify-content:center;
  align-items:center;

  font-size:22px;
  font-weight:500;
  color: #979797;

  border:none;
  outline:none;
  margin:0 25px;
  border-radius:6px;

  width: 90%;
  height: 70px;
  transform: ${props=>props.transform};
  cursor:pointer;
`

const StShadowBackgroundDiv = styled.div`
  background:rgba(0,0,0,0.3);
  position: fixed;
  top:0;
  width:500px;
  height:100%;
  z-index:10; 
`