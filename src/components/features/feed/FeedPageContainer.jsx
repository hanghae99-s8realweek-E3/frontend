import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getComment, postComment } from "../../../app/modules/commentsSlice";
import styled from "styled-components";
import Hide from "../../common/Hide.png";
import Appear from "../../common/Appear.png";
import Toggle from "../../common/Toggle.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getTodoListsChallengeFetch,
  getTodoListsCommentFetch,
  getTodoListsFetch,
} from "../../../app/modules/todolistsSlice";
import { getOthersTodoFetch } from "../../../app/modules/mytodosSlice";
import ChallengeCard from "../../common/ChallengeCard";
import { tokenChecker } from "../../../utils/token";

function FeedPageContainer() {
  const [selectSort, setSelectSort] = useState(false);
  const [sortState, setSortState] = useState("최신순");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const card = useSelector((state) => state.todolists.data);
  const { mbti } = useParams();
  console.log(card);

  console.log(mbti)
  useEffect(() => {
    if (tokenChecker() === false) dispatch(getTodoListsFetch(false));
    else if (tokenChecker() === true) dispatch(getTodoListsFetch(true));
  }, []);

  //checkOn의  초기값은 false로 설정
  const [checkOn, checkOff] = useState(false);
  // check 이미지 변경state
  const checkState = () => {
    if (tokenChecker() === false) {
      alert("로그인 후 이용해주세요");
      return;
    } 
    else 
    return checkOff(!checkOn);
  };

  const toggleSortPopUp = (e) => {
    e.preventDefault();
    setSelectSort(!selectSort);
  };

  // 최신순
  const datebutton = () => {
    if (tokenChecker() === false) dispatch(getTodoListsFetch(false));
    else if (tokenChecker() === true) dispatch(getTodoListsFetch(true));
    setSortState("최신순");
    setSelectSort(!selectSort);
  };
  //댓글순
  const commentbutton = () => {
    if (tokenChecker() === false) dispatch(getTodoListsCommentFetch(false));
    else if (tokenChecker() === true) dispatch(getTodoListsCommentFetch(true));
    // dispatch(getTodoListsCommentFetch());
    // navigate("/todolists?filter=commentsCounts");
    setSortState("댓글순");
    setSelectSort(!selectSort);
  };

    //도전순
  const challengebutton = () => {
    if (tokenChecker() === false) dispatch(getTodoListsChallengeFetch(false));
    else if (tokenChecker() === true) dispatch(getTodoListsChallengeFetch(true));
    // dispatch(getTodoListsChallengeFetch());
    // navigate("/todolists?filter=challengedCount");
    setSortState("도전순");
    setSelectSort(!selectSort);
  };
  const moveToSelectMBTI = () => {
    navigate('/selectmbtifeed')
  }

  return (
    <>
      {selectSort === true ? (
        <StPopupBox>
          <StSlideDiv />
          <StSort>
            <StDate onClick={datebutton}>최신순</StDate>
            <StComment onClick={commentbutton}>댓글순</StComment>
            <StChallenge onClick={challengebutton}>도전순</StChallenge>
          </StSort>
          <StCommonBar />
          {/* <StCommonButton  onClick={toggleSortPopUp}>선택하기</StCommonButton> */}
        </StPopupBox>
      ) : (
        <></>
      )}
      <StTotalWrap>
        <StHideToggle>
          {/* 거짓이면 체크안한거 참이면 체크한거 */}
          {checkOn === false ? (
            <StHideImg
              onClick={checkState}
              src={Appear}
              width="17"
              height="17"
              alt="AppearImg"
            />
          ) : (
            <StHideImg
              onClick={checkState}
              src={Hide}
              width="17"
              height="17"
              alt="AppearImg"
            />
          )}
          <StHide>도전완료 가리기</StHide>
          <StToggle onClick={toggleSortPopUp}>{sortState}</StToggle>
          <StToggleImg
            onClick={toggleSortPopUp}
            src={Toggle}
            width="12"
            height="6"
            alt="ToggleImg"
          />
        </StHideToggle>
        <StTodayMyCardWrap>
          {checkOn === true
            ? //isChallenged가 true이면 화면에 띄우면 안된다.
              //아래식이 isChallenged:true를 가지고있다를  어떻게 표현해야하는가
              card
                ?.filter((elem) => elem.isChallenged === false)
                .map((it, idx) => (
                  <ChallengeCard
                    id={it.todoId}
                    data={it}
                    key={idx}
                  ></ChallengeCard>
                ))
            : card?.map((it, idx) => (
                <ChallengeCard
                  id={it.todoId}
                  data={it}
                  key={idx}
                ></ChallengeCard>
              ))}
        </StTodayMyCardWrap>
        <StSelectMbti onClick={moveToSelectMBTI}>MBTI 선택</StSelectMbti>
      </StTotalWrap>
    </>
  );
}

// <StCardSmallWrap key={idx}>
//   <StCard id={it.todoId} onClick={goFeedDetail}>
//     {it.todo.length < 10 ? it.todo : it.todo.substring(0, 10) + "..."}
//   </StCard>
//   <StNameCounterBox>
//     <StName id={it.userId} onClick={goUserProfile}>
//       {it.nickname}
//     </StName>
//     <StCommentCount>댓글{it.commentCounts}</StCommentCount>
//     <StChallengeCount>도전{it.challengedCounts}</StChallengeCount>
//   </StNameCounterBox>
// </StCardSmallWrap>
const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const StHideToggle = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: row;
  margin: 154px 0px 18px;
  justify-content: flex-end;
  align-items: center;
`;

const StHideImg = styled.img`
  display: flex;
  margin: 7px 8px 8px 25px;
`;
const StHide = styled.div`
  display: flex;
  margin-right: 235px;
  align-items: center;
  justify-content: center;
`;
const StToggle = styled.div`
  display: flex;
  margin-right: 8px;
`;
const StToggleImg = styled.img`
  display: flex;
  margin: 13px 26px 13px 0px;
  justify-content: center;
  align-items: center;
`;
const StTodayMyCardWrap = styled.div`
  display: flex;
  /* align-items: start; */
  flex-direction: column;
`;
const StCardSmallWrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  margin: 18px 26px 14px 24px;
  border: 1px solid #979797;
  background-color: green;
  border-radius: 6px;
`;
const StCard = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #979797;
  margin: 16px 0px 11px 24px;
  cursor: pointer;
`;
const StNameCounterBox = styled.div`
  display: flex;
`;

//여기 width를 설정안했을때 약간 문제가생김 9/8 확인
const StName = styled.div`
  display: flex;
  margin: 11px 0px 11px 25px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: #979797;
  width: 275px;
  cursor: pointer;
`;
const StCommentCount = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
  margin: 11px 25px 11px 0px;
  color: #979797;
  text-align: end;
`;
const StChallengeCount = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
  margin: 11px 25px 11px 25px;
  color: #979797;
`;
const StSelectMbti = styled.button`
  display: flex;
  width: 200px;
  position: fixed;
  height: 60px;
  top: 850px;
  margin-left: 150px;
  background: #979797;
  border-radius: 66px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StPopupBox = styled.div`
  background: #ffffff;
  position: absolute;
  width: 500px;
  height: 683px;
  box-shadow: 0px 2.66667px 26.6667px rgba(0, 0, 0, 0.25);
  border-radius: 21.3333px 21.3333px 0px 0px;
  z-index: 10;
  bottom: 0;
`;
const StSlideDiv = styled.div`
  background: #e8e8e8;
  width: 42.67px;
  height: 5.33px;
  border-radius: 133.333px;
  margin: 21px auto 28px auto;
`;
const StSort = styled.div`
  display: flex;
  flex-direction: column;
  height: 260px;
  width: 59px;
  position: absolute;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 65px;
  text-align: center;
  color: #000000;
  margin-left: 220px;
`;
const StDate = styled.div``;
const StComment = styled.div``;
const StChallenge = styled.div``;
const StCommonBar = styled.div`
  position: absolute;
  width: 178.23px;
  margin-top: 315px;
  height: 6.65px;
  left: calc(50% - 178.23px / 2 - 1.33px);
  background: #000000;
  border-radius: 133.005px;
`;

export default FeedPageContainer;
