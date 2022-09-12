import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getOthersTodoFetch } from "../../../app/modules/mytodosSlice";
import {
  getTodoListsChallengeFetch,
  getTodoListsCommentFetch,
  getTodoListsFetch,
} from "../../../app/modules/todolistsSlice";
import { tokenChecker } from "../../../utils/token";
import ChallengeCard from "../../common/ChallengeCard";
import ProfileCard from "../../common/ProfileCard";

function UserProfileContainer() {
  const [todoTab, setTodoTab] = useState("challenge");

  const checkState = () => {
    return setTodoTab("challenge");
  };
  const checkState2 = () => {
    return setTodoTab("making");
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(getOthersTodoFetch(params));
  }, []);
  useEffect(() => {
    if (tokenChecker() === false) dispatch(getTodoListsFetch(false));
    else if (tokenChecker() === true) dispatch(getTodoListsFetch(true));
  }, []);
  const card = useSelector((state) => state.mytodos.data);

  const goFollow = () => {
    navigate("/follow");
  };

  const goFollowing = () => {
    navigate("/");
  };

  const [selectSort, setSelectSort] = useState(false);
  const [sortState, setSortState] = useState("최신순");
  useEffect(() => {
    if (tokenChecker() === false) dispatch(getTodoListsFetch(false));
    else if (tokenChecker() === true) dispatch(getTodoListsFetch(true));
  }, []);
  const toggleSortPopUp = (e) => {
    e.preventDefault();
    setSelectSort(!selectSort);
  };
  // 최신순
  const datebutton = () => {
    if (tokenChecker() === false){
    return dispatch(getTodoListsFetch(false)) 
    }
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
    else if (tokenChecker() === true)
      dispatch(getTodoListsChallengeFetch(true));
    // dispatch(getTodoListsChallengeFetch());
    // navigate("/todolists?filter=challengedCount");
    setSortState("도전순");
    setSelectSort(!selectSort);
  };

  return (
    <StTotalWrap>
      {Object.keys(card).length === 0 ? (
        <></>
      ) : (
        <>
          <StTopWrap>
            <ProfileCard profileData={card} />
          </StTopWrap>

          <StMiddleLine></StMiddleLine>
          <StTodoWrap>
            <StChallengeTodo onClick={checkState}>도전한 TO DO</StChallengeTodo>
            <StSuggestionTodo onClick={checkState2}>
              제안한 TO DO
            </StSuggestionTodo>
          </StTodoWrap>
          <StLineWrap>
            <StMiddleLeftLine></StMiddleLeftLine>
            <StMiddleRightLine></StMiddleRightLine>
          </StLineWrap>

          <StBottomWrap>
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
            <StToggle onClick={toggleSortPopUp}>{sortState}</StToggle>
            <StTodayMyCardWrap>
              {todoTab === "challenge" ? (
                card.challengedTodos?.map((it, idx) => (
                  <ChallengeCard
                    id={it.todoId}
                    data={it}
                    key={idx}
                  ></ChallengeCard>
                ))
              ) : todoTab === "making" ? (
                card.createdTodo?.map((it, idx) => (
                  <ChallengeCard
                    id={it.todoId}
                    data={it}
                    key={idx}
                  ></ChallengeCard>
                ))
              ) : (
                <>다시한번 시도해주세요</>
              )}
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
  cursor: pointer;
`;
const StSuggestionTodo = styled.div`
  width: 105px;
  display: flex;
  cursor: pointer;
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
// const StSort = styled.ul`
//   display: flex;
//   flex-direction: row-reverse;
//   margin: 16px 46px 18px;
// `;
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
const StDate = styled.div`
  /* background-color:red;
size: 80px;
width: 500px;
height: 555px; */
`;
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
const StToggle = styled.div`
  /* height: 315px; */
  display: flex;
  margin-right: 26px;
  justify-content: end;
`;
export default UserProfileContainer;
