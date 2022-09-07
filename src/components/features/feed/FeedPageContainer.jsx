import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getComment, postComment } from "../../../app/modules/commentsSlice";
import styled from "styled-components";
import Hide from "../../common/Hide.png";
import Appear from "../../common/Appear.png";
import Toggle from "../../common/Toggle.png";
import { useNavigate } from "react-router-dom";
import { gettodolistsFetch, gettodolistsFetch2 } from "../../../app/modules/todolistsSlice";
import { getOthersTodoFetch } from "../../../app/modules/mytodosSlice";

function FeedPageContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const card = useSelector((state) => state.todolists.data);
  console.log(card);

  useEffect(() => {
    dispatch(gettodolistsFetch(card));
  }, []);

  //checkOn의  초기값은 false로 설정
  const [checkOn, checkOff] = useState(false);

  //check 이미지 변경state
  const checkState = () => {
    checkOff(!checkOn);
  };

  // const cardList = card.map((number, index) => (
  //   <StCardSmallWrap key={index}>{card[1].todo}{card[1].nickname}{card[1].commentCounts}{card[1].challengeConts}</StCardSmallWrap>
  // ));

  const goFeedDetail = (e) => {
    const todoId = e.target.id;
    if (todoId !== "null" && todoId !== undefined)
      navigate(`/feeddetail/${todoId}`);
  };

  const goUserProfile = (e) => {
    const userId = e.target.id;
    console.log(userId);
    // dispatch(getOthersTodoFetch(card));
    if (userId !== "null" && userId !== undefined)
      navigate(`/otherspage/${userId}`);
  };

  const testbutton = () => {
    dispatch(gettodolistsFetch2(card))
  }
  


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
        <button onClick = {testbutton}>댓글술</button>
        <StToggle>인기순</StToggle>
        <StToggleImg src={Toggle} width="12" height="6" alt="ToggleImg" />
      </StHideToggle>
      <StTodayMyCardWrap>
        {/* <StTodayMy>오늘의 투두</StTodayMy> */}
        {card?.map((it, idx) => (
          <StCardSmallWrap  key={idx}>
            <StCard id={it.todoId} onClick={goFeedDetail}>
              {it.todo.length < 10 ? it.todo : it.todo.substring(0, 10) + "..."}
            </StCard>
            <StNameCounterBox>
              <StName id={it.userId} onClick={goUserProfile}>
                {it.nickname}
              </StName>
              <StCommentCount>댓글{it.commentCounts}</StCommentCount>
              <StChallengeCount>도전{it.challengeConts}</StChallengeCount>
            </StNameCounterBox>
          </StCardSmallWrap>
        ))}
      </StTodayMyCardWrap>
      <StSelectMbti>MBTI 선택</StSelectMbti>
    </StTotalWrap>
  );
}

const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const StHideToggle = styled.div`
  background-color: red;
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
