import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getOthersTodoFetch } from "../../../app/modules/mytodosSlice";
import dy from "../../common/dy.jpg";

function UserProfileContainer() {
  // 정렬 토글의 초기값을 flase로 설정
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    // on,off 개념
    setIsOpen((isOpen) => !isOpen);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  console.log(params);

  useEffect(() => {
    dispatch(getOthersTodoFetch(params));
  }, []);
  const card = useSelector((state) => state.mytodos.data);
  console.log(card);

  const goFollow = () => {
    navigate("/follow");
  };

  const goFollowing = () => {
    navigate("/");
  };
  return (
    <StTotalWrap>
      {Object.keys(card).length === 0 ? (
        <></>
      ) : (
        <>
          <StTopWrap>
            <StProfileImg src={dy} width="80" height="80" alt="dy" />
            <StFriendNameMbti>
              <StFriendName>{card.userInfo.nickname}</StFriendName>
              <StMbti>{card.userInfo.mbti}</StMbti>
            </StFriendNameMbti>
            <StFollowWrap onClick={goFollow}>
              <StFollowNumber>{card.userInfo.followerCount}</StFollowNumber>
              <StFollowWord>팔로워</StFollowWord>
            </StFollowWrap>
            <StFollowingWrap onClick={goFollowing}>
              <StFollowingNumber>{card.userInfo.followingCount}</StFollowingNumber>
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
            <StSort onClick={() => toggleMenu()}>인기순</StSort>
            <StTodayMyCardWrap>
              {card.createdTodo?.map((it,idx)=> (
              <StCardSmallWrap key={idx}>
                <StCard>{it.todo}</StCard>
                <StNameCounterBox>
                  <StName>{it.nickname}</StName>
                  <StCommentCount>댓글{it.commentCounts}</StCommentCount>
                  <StChallengeCount>도전{it.challengedCounts}</StChallengeCount>
                </StNameCounterBox>
              </StCardSmallWrap>
              ))}
            </StTodayMyCardWrap>
          </StBottomWrap>
        </>
      )}
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
  flex-direction: row;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
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
  color: #979797;
`;
const StFollowWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6.33px;
  margin-right: 74px;
  align-items: center;
`;
const StFollowNumber = styled.div`
  margin-bottom: 6px;
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  color: #000000;
`;
const StFollowWord = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
  text-align: center;
  color: #000000;
`;
const StFollowingWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6.33px;
`;
const StFollowingNumber = styled.div`
  display: flex;
  margin-bottom: 6px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
`;
const StFollowingWord = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
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
`;
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

//댓글이나 도전이 3자리 수이면 width 285px 1,2자리 수이면 292px
const StName = styled.div`
  display: flex;
  margin: 11px 0px 11px 25px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: #979797;
  width: 292px;
`;
const StCommentCount = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
  margin: 11px 0px 11px 0px;
  color: #979797;
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
export default UserProfileContainer;
