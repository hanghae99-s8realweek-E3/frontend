import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getComment, postComment } from "../../../app/modules/commentsSlice";
import styled from "styled-components";
import Hide from "../../common/Hide.png";
import Appear from "../../common/Appear.png";
import Toggle from "../../common/Toggle.png";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTodoListsChallengeFetch,
  getTodoListsCommentFetch,
  getTodoListsFetch,
} from "../../../app/modules/todolistsSlice";
import { getOthersTodoFetch } from "../../../app/modules/mytodosSlice";
import ChallengeCard from "../../common/ChallengeCard";
import { tokenChecker } from "../../../utils/token";

function FeedPageContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const card = useSelector((state) => state.todolists.data);
  console.log(card);

  useEffect(() => {
    if(tokenChecker() === false) 
      dispatch(getTodoListsFetch(false));
      else if(tokenChecker() === true)
      dispatch(getTodoListsFetch(true));
  }, []);

  //checkOn의  초기값은 false로 설정
  const [checkOn, checkOff] = useState(false);

  // check 이미지 변경state
  const checkState = () => {
    if (tokenChecker() === false) {
      alert("로그인 후 이용해주세요");
    }
    checkOff(!checkOn);

    // if(card.isChallenged==="false") ?  <></> : <ChallengeCard/>
  };

  //컴포넌트 불러오기전 내가 임의로 지정했었음
  // const goFeedDetail = (e) => {
  //   console.log("1");
  //   const todoId = e.target.id;
  //   if (todoId !== "null" && todoId !== undefined)
  //     navigate(`/feeddetail/${todoId}`);
  // };
  // const goUserProfile = (e) => {
  //   const userId = e.target.id;
  //   console.log(userId);
  //   // dispatch(getOthersTodoFetch(card));
  //   if (userId !== "null" && userId !== undefined)
  //     navigate(`/otherspage/${userId}`);
  // };


  const challengebutton = () => {
    dispatch(getTodoListsChallengeFetch());
    navigate("/todolists?filter=challengedCount");
  };

  const commentbutton = () => {
    dispatch(getTodoListsCommentFetch());
    navigate("/todolists?filter=commentsCounts");
  };

  return (
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
        <button onClick={challengebutton}>도전순</button>
        <button onClick={commentbutton}>댓글순</button>
        <StToggle>인기순</StToggle>
        <StToggleImg src={Toggle} width="12" height="6" alt="ToggleImg" />
      </StHideToggle>
      <StTodayMyCardWrap>
        {checkOn === true
          ? 
          //isChallenged가 true이면 화면에 띄우면 안된다.
          //아래식이 isChallenged:true를 가지고있다를  어떻게 표현해야하는가
           card?.filter(elem => elem.isChallenged === false).map
            ((it, idx) => (
              <ChallengeCard id={it.todoId} data={it} key={idx}></ChallengeCard>
            ))
          
          : card?.map((it, idx) => (
              <ChallengeCard id={it.todoId} data={it} key={idx}></ChallengeCard>
            ))}
      </StTodayMyCardWrap>
      <StSelectMbti>MBTI 선택</StSelectMbti>
    </StTotalWrap>
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

export default FeedPageContainer;
