import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dy from "../../common/dy.jpg";

function UserProfileContainer() {
  // 정렬 토글의 초기값을 flase로 설정
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    // on,off 개념 
    setIsOpen(isOpen => !isOpen);
  }
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
        <StProfileImg src={dy} width="80" height="80" alt="dy" />
        <StFriendNameMbti>
          <StFriendName>둘리님</StFriendName>
          <StMbti>INFP</StMbti>
        </StFriendNameMbti>
        <StFollowWrap onClick={goFollow}>
          <StFollowNumber>10</StFollowNumber>
          <StFollowWord>팔로워</StFollowWord>
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
        {/* <StSort onClick={() => toggleMenu()} >인기순<ul className={isOpen ? "show-toggle" : "hide-toggle"}>
          <li>1</li><li>2</li><li>3</li><li>4</li></ul></StSort> */}
                  <StSort onClick={() => toggleMenu()} >인기순</StSort>
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
        </StTodayMyCardWrap>

        <StTodayMyCardWrap>
          {/* <StTodayMy>내가만든 투두</StTodayMy> */}
          <StCardSmallWrap>
            <StCard>공원에서 비눗방울 불기</StCard>
            <StNameCounterBox>
            <StName>아기공룡둘리님</StName>
              <StCommentCount>댓글</StCommentCount>
              <StChallengeCount>도전</StChallengeCount>
            </StNameCounterBox>
          </StCardSmallWrap>
        </StTodayMyCardWrap>
      </StBottomWrap>
    </StTotalWrap>
  );
}

const StTotalWrap = styled.div`
  display: flex;
  width: 500px;
  flex-direction: column;
`;
const StProfileImg = styled.img`
  margin-right: 26px;
  margin-left: 35px;
  border-radius: 9999px;
`;
const StTopWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 170.67px;
  margin-bottom: 48.33px;
  /* width: 380px; */
`;
const StFriendNameMbti = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12.33px;
  margin-right: 75px;
`;
const StFriendName = styled.div`
  display: flex;
  /* width: 65px; */
  flex-direction: row;
  /* width: 65px; */
  /* border: 1px solid gray; */
  /* width: 38px;
  align-items: flex-start; */
  font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 24px;
line-height: 32px;
/* identical to box height, or 133% */


color: #000000;
`;
const StMbti = styled.div`
  display: flex;
  width: 42px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  text-align: left;
  /* identical to box height, or 178% */

  color: #979797;
`;
const StFollowWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  /* width: 380px; */
  margin-top: 6.33px;
  margin-right: 74px;

  align-items: center;
`;
const StFollowNumber = styled.div`
margin-bottom: 6px;
  display: flex;
  font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 32px;
/* identical to box height, or 160% */

text-align: center;

color: #000000;
`;
const StFollowWord = styled.div`
  display: flex;
  font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 13px;
line-height: 32px;
/* identical to box height, or 246% */

text-align: center;

color: #000000;
`;
const StFollowingWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid red; */
  /* width: 380px; */
  margin-top: 6.33px;
`;
const StFollowingNumber = styled.div`
  display: flex;
  margin-bottom: 6px;
  font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 32px;
/* identical to box height, or 160% */
`;
const StFollowingWord = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
  /* identical to box height, or 246% */

  text-align: center;

  color: #000000;
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
`;
const StMiddleLeftLine = styled.div`
  height: 1px;
  width: 225px;
  background: #bdc5cd;
  transform: matrix(1, 0, 0, -1, 0, 0);
  &:hover {
    background-color: black;
  }
`;

const StMiddleRightLine = styled.div`
  height: 1px;
  width: 225px;
  background: #bdc5cd;
  transform: matrix(1, 0, 0, -1, 0, 0);
  &:hover {
    background-color: black;
  }
`;
const StBottomWrap = styled.div`
  display: flex;
  flex-direction: column;
  
`;
const StSort = styled.ul` 
  display: flex;
  flex-direction: row-reverse;
  margin: 16px 46px 18px;
`
const StTodayMyCardWrap = styled.div`
  display: flex;
  /* align-items: start; */
  flex-direction: column;
`;
const StTodayMy = styled.div`
  display: flex;
  margin: 5px;
`;

const StCardSmallWrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  margin:18px 26px 14px 24px;
  border: 1px solid #979797;
border-radius: 6px;
`;

const StCard = styled.div`
  display: flex;
  font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 600;
font-size: 24px;
line-height: 32px;
/* identical to box height, or 133% */
color: #979797;
margin: 16px 0px 11px 24px;
`;
const StNameCounterBox = styled.div`
  display: flex;

`;
const StName = styled.div`
  display: flex;
  margin: 11px 0px 11px 25px;
  font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 32px;
/* identical to box height, or 200% */
color: #979797;
  /* margin:11px 0px 0px 0px; */
`
const StCommentCount = styled.div`
/* align-items: flex-end; */
  display: flex;
  font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 13px;
line-height: 32px;
margin-top: 11px;
margin-bottom: 11px;
margin-left: 179px;
margin-right: 25px;
/* identical to box height, or 246% */
color: #979797;
  
`;
const StChallengeCount = styled.div`
  display: flex;
  font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 13px;
line-height: 32px;
margin-top: 11px;
margin-bottom: 11px;
margin-left: 25px;
margin-right: 25px;
/* identical to box height, or 246% */
color: #979797;
`;
export default UserProfileContainer;
