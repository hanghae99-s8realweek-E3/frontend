import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getComment, postComment } from "../../../app/modules/commentsSlice";
import styled from "styled-components";
import Hide from "../../common/Hide.png";
import Appear from "../../common/Appear.png";
import Toggle from "../../common/Toggle.png";
import { useNavigate } from "react-router-dom";

function FeedPageContainer() {
  const navigate = useNavigate();
  const [appear, hide] = useState(false);
  const cardList = [
    { todo: "밥먹기1", nickname: "kdy1", commentCounts: 1, challengeConts: 1 },
    { todo: "밥먹기2", nickname: "kdy2", commentCounts: 2, challengeConts: 2 },
    { todo: "밥먹기3", nickname: "kdy3", commentCounts: 3, challengeConts: 3 },
    { todo: "밥먹기4", nickname: "kdy4", commentCounts: 4, challengeConts: 4 },
    { todo: "밥먹기5", nickname: "kdy5", commentCounts: 5, challengeConts: 5 },
  ];
  // const cardList = card.map((number, index) => (
  //   <StCardSmallWrap key={index}>{card[1].todo}{card[1].nickname}{card[1].commentCounts}{card[1].challengeConts}</StCardSmallWrap>
  // ));

  const AppearHide = () => {
    // src={Hide} width="17" height="17" alt="HideImg"
  };
  const goFeedDetail = () => {
    navigate("/feeddetail");
  };
  const goMbti = () => {
    navigate("/mbti");
  };
  // console.log(card);
  return (
    <StTotalWrap>
      <StHideToggle>
        <StHideImg
          onClick={AppearHide}
          src={Appear}
          width="17"
          height="17"
          alt="AppearImg"
        />
        <StHide>도전완료 가리기</StHide>
        <StToggle>인기순</StToggle>
        <StToggleImg src={Toggle} width="12" height="6" alt="ToggleImg" />
      </StHideToggle>

      <StTodayMyCardWrap>
        {/* <StTodayMy>오늘의 투두</StTodayMy> */}
        {cardList?.map((it, idx) => (
          <StCardSmallWrap onClick={goFeedDetail} key={idx}>
            <StCard>{it.todo}</StCard>
            <StNameCounterBox>
              <StName>{it.nickname}</StName>
              <StCommentCount>댓글{it.commentCounts}</StCommentCount>
              <StChallengeCount>도전{it.challengeConts}</StChallengeCount>
            </StNameCounterBox>
          </StCardSmallWrap>
        ))}
        {/* <StCard> {card[0].todo}</StCard>
          <StNameCounterBox>
            <StName>{card[0].nickname}</StName>
            <StCommentCount>댓글{card[0].commentCounts}</StCommentCount>
            <StChallengeCount>도전{card[0].challengeConts}</StChallengeCount>
          </StNameCounterBox> */}
      </StTodayMyCardWrap>

      <StSelectMbti onClick={goMbti}>MBTI 선택</StSelectMbti>
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
`;
const StNameCounterBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const StName = styled.div`
  display: flex;
  margin: 11px 0px 11px 25px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: #979797;
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
  position: absolute;
  height: 60px;
  left: 150px;
  right: 150px;
  top: 850px;
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
