import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getComment, postComment } from "../../../app/modules/commentsSlice";
import styled from "styled-components";
import Hide from "../../common/Hide.png"
import Appear from "../../common/Appear.png"
import Toggle from "../../common/Toggle.png"
import { useNavigate } from "react-router-dom";

function FeedPageContainer() {
  const navigate = useNavigate();
  const [appear,hide] = useState(false);

  const AppearHide = () => {
  }

  const goMbti = () => {
    navigate("/mbti")
  }
  return (
    <StTotalWrap>
      <StHideToggle>
      {/* <StHideImg onClick={AppearHide} ? src={Appear} width="17" height="17" alt="AppearImg" : src={Hide} width="17" height="17" alt="HideImg" /> */}
        <StHide>도전완료 가리기</StHide>
        <StToggle>인기순 정렬바</StToggle>
      <StToggleImg src = {Toggle} width="12" height="6" alt="ToggleImg"/>
      </StHideToggle>

      <StTodayMyCardWrap>
        {/* <StTodayMy>오늘의 투두</StTodayMy> */}
        <StCardSmallWrap>
          <StCard> 공원에서 비눗방울 불기</StCard>
          <StNameCounterBox>
            <StName>아기공룡둘리님</StName>
            <StCommentCount>댓글</StCommentCount>
            <StChallengeCount>도전</StChallengeCount>
          </StNameCounterBox>
        </StCardSmallWrap>
        {/* {StCardSmallWrap.map(v => {
          
          return  <StCardSmallWrap/>
        })}; */}

      </StTodayMyCardWrap>
      <StSelectMbti onClick = {goMbti}>MBTI 선택</StSelectMbti>
    </StTotalWrap>
  );
}

const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const StHideToggle = styled.div`
  display: flex;
  flex-direction: row;
  margin: 154px 0px 18px;
  justify-content: flex-end;
`;

const StHideImg = styled.img`
  display: flex;
`
const StHide = styled.div`
  display: flex;
  margin-left: 30px;
`;
const StToggle = styled.div`
  display: flex;
  margin-right: 25px;
`;
const StToggleImg = styled.img`
  display: flex;
  margin: 13px 26px 0px 0px;
`
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
  /* align-items: flex-end; */
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
  margin:11px 25px 11px 179px;
  color: #979797;
`;
const StChallengeCount = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
  margin:11px 25px 11px 25px;
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
