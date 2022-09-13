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
  // // 최신순
  // const datebutton = () => {
  //   if (tokenChecker() === false) {
  //     return dispatch(getTodoListsFetch(false));
  //   } else if (tokenChecker() === true) dispatch(getTodoListsFetch(true));
  //   setSortState("최신순");
  //   setSelectSort(!selectSort);
  // };
  // //댓글순
  // const commentbutton = () => {
  //   if (tokenChecker() === false) dispatch(getTodoListsCommentFetch(false));
  //   else if (tokenChecker() === true) dispatch(getTodoListsCommentFetch(true));
  //   // dispatch(getTodoListsCommentFetch());
  //   // navigate("/todolists?filter=commentsCounts");
  //   setSortState("댓글순");
  //   setSelectSort(!selectSort);
  // };

  // //도전순
  // const challengebutton = () => {
  //   if (tokenChecker() === false) dispatch(getTodoListsChallengeFetch(false));
  //   else if (tokenChecker() === true)
  //     dispatch(getTodoListsChallengeFetch(true));
  //   // dispatch(getTodoListsChallengeFetch());
  //   // navigate("/todolists?filter=challengedCount");
  //   setSortState("도전순");
  //   setSelectSort(!selectSort);
  // };

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
                  {/* <StDate onClick={datebutton}>최신순</StDate>
                  <StComment onClick={commentbutton}>댓글순</StComment>
                  <StChallenge onClick={challengebutton}>도전순</StChallenge> */}
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
const StTopWrap = styled.div`
  display: flex;
  flex-direction: row;
  /* margin-top: 170.67px; */
  margin-top: 80px;
  margin-bottom: 48.33px;
  /* width: 380px; */
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
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #000000;
`;
const StSuggestionTodo = styled.div`
  width: 105px;
  display: flex;
  cursor: pointer;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #000000;
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
const StPopupBox = styled.div`
  background: #ffffff;
  position: absolute;
  width: 500px;
  /* height: 683px; */
  height:335px;
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
  margin-top: 200px;
  height: 6.65px;
  left: calc(50% - 178.23px / 2 - 1.33px);
  background: red;
  border-radius: 133.005px;
`;
const StToggle = styled.div`
  /* height: 315px; */
  display: flex;
  margin-right: 26px;
  justify-content: end;
`;
export default UserProfileContainer;
