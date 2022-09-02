import React from "react";
import styled from "styled-components";
import dy from "../../common/dy.jpg";
function UserProfileContainer() {
  return (
    <StTotalWrap>
      <StTopWrap>
        <StProfileImg src={dy} width="44" height="44" alt="dy" />
        <StFriendNameMbti>
          <div>둘리님</div>
          <div>INFP</div>
        </StFriendNameMbti>
        <StFollowWrap>
          <div>10</div>
          <div>팔로우</div>
        </StFollowWrap>
        <StFollowWrap>
          <div>10</div>
          <div>팔로우</div>
        </StFollowWrap>
      </StTopWrap>

      <StBottomWrap>
        <StTodayMyCardWrap>
          <StTodayMy>오늘의 투두</StTodayMy>
          <StCardSmallWrap>
          <StCard> 공원에서 비눗방울 불기</StCard>
            <StCounterBox>
              <span>댓글</span>
              <span>도전</span>
            </StCounterBox>
          </StCardSmallWrap>
        </StTodayMyCardWrap>

        <StTodayMyCardWrap>
          <StTodayMy>내가만든 투두</StTodayMy>
          <StCardSmallWrap>
            <StCard>공원에서 비눗방울 불기</StCard>
            <StCounterBox>
              <span>댓글</span> 
              <span>도전</span>
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

const StFollowWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  width: 380px;
`;

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
  padding:5px
`;

const StCard = styled.div`
  display: flex;

`
const StCounterBox = styled.div`
  display: flex;
  justify-content: end;
`;
export default UserProfileContainer;
