import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dy from "../../common/dy.jpg";

function UserProfileContainer() {
  const navigate = useNavigate();

  const goFollow = () => {
    navigate("/");
  };

  const goFollowing = () => {
    navigate("/");
  };
  return (
    <StTotalWrap>
      <StTopWrap>
        <StProfileImg src={dy} width="44" height="44" alt="dy" />
        <StFriendNameMbti>
          <StFriendName>둘리님</StFriendName>
          <StMbti>INFP</StMbti>
        </StFriendNameMbti>
        <StFollowWrap onClick={goFollow}>
          <StFollowNumber>10</StFollowNumber>
          <StFollowWord>팔로우</StFollowWord>
        </StFollowWrap>
        <StFollowingWrap onClick={goFollowing}>
          <StFollowingNumber>10</StFollowingNumber>
          <StFollowingWord>팔로잉</StFollowingWord>
        </StFollowingWrap>
      </StTopWrap>

      <StMiddleLine></StMiddleLine>
      <StTodoWrap>
        <StChallengeTodo>도전한 TO DO</StChallengeTodo>
        <StSuggestionTodo>제안한 TO DO</StSuggestionTodo>
      </StTodoWrap>
      <StLineWrap>
      <StMiddleLeftLine></StMiddleLeftLine>
      <StMiddleRightLine></StMiddleRightLine>
      </StLineWrap>

      <StBottomWrap>
        <StTodayMyCardWrap>
          <StTodayMy>오늘의 투두</StTodayMy>
          <StCardSmallWrap>
            <StCard> 공원에서 비눗방울 불기</StCard>
            <StCounterBox>
              <StCommentCount>댓글</StCommentCount>
              <StChallengeCount>도전</StChallengeCount>
            </StCounterBox>
          </StCardSmallWrap>
        </StTodayMyCardWrap>

        <StTodayMyCardWrap>
          <StTodayMy>내가만든 투두</StTodayMy>
          <StCardSmallWrap>
            <StCard>공원에서 비눗방울 불기</StCard>
            <StCounterBox>
              <StCommentCount>댓글</StCommentCount>
              <StChallengeCount>도전</StChallengeCount>
            </StCounterBox>
          </StCardSmallWrap>
        </StTodayMyCardWrap>
      </StBottomWrap>
    </StTotalWrap>
  );
}

const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
`;
const StProfileImg = styled.img`
  margin-right: 10px;
  border-radius: 9999px;
`;
const StTopWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  margin-top: 200px;
  margin-bottom: 250px;
  width: 380px;
`;
const StFriendNameMbti = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid gray; */
  width: 38px;
  align-items: flex-start;
`;
const StFriendName = styled.div`
  display: flex;
`;
const StMbti = styled.div`
  display: flex;
`;
const StFollowWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  width: 380px;
`;
const StFollowNumber = styled.div`
  display: flex;
`;
const StFollowWord = styled.div`
  display: flex;
`;
const StFollowingWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  width: 380px;
`;
const StFollowingNumber = styled.div`
  display: flex;
`;
const StFollowingWord = styled.div`
  display: flex;
`;
const StMiddleLine = styled.div`
  display: flex;
  height: 1px;
  background: #bdc5cd;
  transform: matrix(1, 0, 0, -1, 0, 0);
  width: 500px;
  margin-bottom: 10px;
`;

const StTodoWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 60px;
  margin-bottom: 10px;
`;
const StChallengeTodo = styled.div`
  width: 105px;
  display: flex;
`;
const StSuggestionTodo = styled.div`
  width: 105px;
  display: flex;
`;

const StLineWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 25px;
  margin-right: 25px;
`
const StMiddleLeftLine = styled.div`
height: 1px;
width: 225px;
  background: #BDC5CD;
transform: matrix(1, 0, 0, -1, 0, 0);
&:hover {
  background-color: black;
  }

`

const StMiddleRightLine = styled.div`
height: 1px;
width: 225px;
  background: #BDC5CD;
transform: matrix(1, 0, 0, -1, 0, 0);
&:hover {
  background-color: black;
  }
`
const StBottomWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const StTodayMyCardWrap = styled.div`
  display: flex;
  /* align-items: start; */
  flex-direction: column;
  width: 380px;
  margin: 0 auto;
  margin-bottom: 20px;
`;
const StTodayMy = styled.div`
  display: flex;
  margin: 5px;
`;

const StCardSmallWrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  width: 380px;
  border-radius: 20px;
  padding: 5px;
`;

const StCard = styled.div`
  display: flex;
`;
const StCounterBox = styled.div`
  display: flex;
  justify-content: end;
`;

const StCommentCount = styled.div`
  display: flex;
`;
const StChallengeCount = styled.div`
  display: flex;
`;
export default UserProfileContainer;
