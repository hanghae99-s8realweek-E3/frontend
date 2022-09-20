//대연
import { current } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getOthersTodoFetch } from "../../../app/modules/mytodosSlice";
import {
  getMbtiTodoListsChallengeFetch,
  getMbtiTodoListsCommentFetch,
  getTodoListsChallengeFetch,
  getTodoListsCommentFetch,
  getTodoListsFetch,
} from "../../../app/modules/todolistsSlice";
import { tokenChecker } from "../../../utils/token";
import ChallengeCard from "../../common/ChallengeCard";
import ProfileCard from "../../common/ProfileCard";
import OthersCard from "./OthersCard";

function UserProfileContainer() {
  const card = useSelector((state) => state.mytodos.data);
  // 첫 화면 진입시 challenge로 값을 지정
  const [todoTab, setTodoTab] = useState("도전");
  const [prevClick, setPrevClick] = useState(null);
  // 정렬 버튼의 값을 배열로 지정
  const sortList = ["최신순", "댓글순", "도전순"];
  // 정렬 버튼의 초기값을 최신순으로 지정
  const [sortState, setSortState] = useState(sortList[0]);
  const [selectSort, setSelectSort] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  // 첫 렌더링 일때 userId 인자로 parmas사용

  // useEffect(() => {
  //   dispatch(getOthersTodoFetch(params));
  // }, []);
  console.log(todoTab);
  useEffect(() => {
    dispatch(getOthersTodoFetch(params));
  }, []);
  console.log(document.getElementById(todoTab));

  useEffect(() => {
    let current = document.getElementById(todoTab);
    if (current !== null) {
      current.style.color = "black";
      current.style.borderBottom = "2px solid";
      current.style.borderBottomColor = "black";
    }

    if (prevClick !== null) {
      let prev = document.getElementById(prevClick);
      prev.style.color = "black";
      prev.style.borderBottomColor = "gray";
    }
    setPrevClick(todoTab);
  }, [todoTab]);

  // 도전한 TO DO 누를때
  const ChallengeState = (e) => {
    return setTodoTab(e.target.id);
  };

  // 제안한 TO DO 누를때
  const SuggestState = (e) => {
    return setTodoTab(e.target.id);
  };

  // 최신순 정렬
  const sortDate = () => {
    dispatch(getTodoListsFetch());
    setSortState("최신순");
    setSelectSort(!selectSort);
  };
  //댓글순 정렬
  const sortComment = () => {
    dispatch(getTodoListsCommentFetch());
    setSortState("댓글순");
    setSelectSort(!selectSort);
  };
  // 도전순 정렬
  const sortChallenge = () => {
    dispatch(getTodoListsChallengeFetch());
    setSortState("도전순");
    setSelectSort(!selectSort);
  };
  //정렬 버튼 클릭시
  const toggleSortPopUp = () => {
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
          <StTodoTopLine></StTodoTopLine>
          <StTodoWrap>
            <StChallengeTodo id="도전" onClick={ChallengeState}>
              도전한 TO DO
            </StChallengeTodo>
            <StSuggestionTodo id="제안" onClick={SuggestState}>
              제안한 TO DO
            </StSuggestionTodo>
          </StTodoWrap>
          {/* <StLineWrap>
            <StMiddleLeftLine></StMiddleLeftLine>
            <StMiddleRightLine></StMiddleRightLine>
          </StLineWrap> */}

          <StBottomWrap>
            {selectSort === true ? (
              <StShadowBackgroundDiv onClick={toggleSortPopUp}>
                <StPopupBox>
                  <StSlideDiv />
                  <StSort>
                    <StDate onClick={sortDate}>최신순</StDate>
                    <StDateLine />
                    <StComment onClick={sortComment}>댓글순</StComment>
                    <StCommentLine />
                    <StChallenge onClick={sortChallenge}>도전순</StChallenge>
                    <StChallengeLine />
                    <StCommonBar />
                  </StSort>
                </StPopupBox>
              </StShadowBackgroundDiv>
            ) : (
              <></>
            )}
            <StToggle onClick={toggleSortPopUp}>
              {sortState}
              <img
                src={process.env.PUBLIC_URL + `/images/Toggle.png`}
                alt="sort list button"
                style={{ height: "8px", margin: "0 0 0 8px" }}
              />
            </StToggle>

            <StTodayMyCardWrap>
              {todoTab === "도전" ? (
                // card.challengedTodos?.map((it, idx) => (
                //   <ChallengeCard
                //     id={it.todoId}
                //     data={it}
                //     key={idx}
                //   ></ChallengeCard>
                // ))
                sortState === sortList[0] ? (
                  card.challengedTodos?.map((elem, index) => (
                    <OthersCard data={elem} key={index} />
                  ))
                ) : sortState === sortList[1] ? (
                  card.challengedTodos
                    ?.slice()
                    .sort((a, b) => b.commentCounts - a.commentCounts)
                    .map((elem, index) => (
                      <OthersCard data={elem} key={index} />
                    ))
                ) : sortState === sortList[2] ? (
                  card.challengedTodos
                    ?.slice()
                    .sort((a, b) => b.challengedCounts - a.challengedCounts)
                    .map((elem, index) => (
                      <OthersCard data={elem} key={index} />
                    ))
                ) : (
                  <></>
                )
              ) : todoTab === "제안" ? (
                sortState === sortList[0] ? (
                  card.createdTodo?.map((elem, index) => (
                    <OthersCard data={elem} key={index} />
                  ))
                ) : sortState === sortList[1] ? (
                  card.createdTodo
                    ?.slice()
                    .sort((a, b) => b.commentCounts - a.commentCounts)
                    .map((elem, index) => (
                      <OthersCard data={elem} key={index} />
                    ))
                ) : sortState === sortList[2] ? (
                  card.createdTodo
                    ?.slice()
                    .sort((a, b) => b.challengedCounts - a.challengedCounts)
                    .map((elem, index) => (
                      <OthersCard data={elem} key={index} />
                    ))
                ) : (
                  <></>
                )
              ) : (
                // card.createdTodo?.map((it, idx) => (
                //   <ChallengeCard
                //     id={it.todoId}
                //     data={it}
                //     key={idx}
                //   ></ChallengeCard>
                // ))
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
  margin-top: 80px;
  margin-bottom: 48.33px;
`;
const StTodoTopLine = styled.div`
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
  margin-bottom: 10px;
`;
const StChallengeTodo = styled.div`
  justify-content: center;
  display: flex;
  width: 225px;
  border-bottom: 2px solid black;
  /* width: 105px; */
  cursor: pointer;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #000000;
  padding-bottom: 9px;
`;
const StSuggestionTodo = styled.div`
  justify-content: center;
  display: flex;
  width: 225px;
  border-bottom: 2px solid #bdc5cd;
  cursor: pointer;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #000000;
  padding-bottom: 9px;
`;
const StBottomWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const StTodayMyCardWrap = styled.div`
  display: flex;
  /* align-items: start; */
  flex-direction: column;
`;
const StShadowBackgroundDiv = styled.div`
  background: rgba(0, 0, 0, 0.3);

  position: fixed;
  display: block;

  top: 0;
  width: 500px;
  height: 100%;
  z-index: 10;
`;

const StPopupBox = styled.div`
  background: #ffffff;
  position: absolute;
  width: 500px;
  /* height: 683px; */
  height: 335px;
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
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 65px;
  text-align: center;
  color: #000000;
  margin-left: 220px;
  align-items: center;
`;
const StDate = styled.div``;
const StDateLine = styled.div`
  display: flex;
  width: 450px;
  height: 1px;
  background: #c7c7c7;
`;
const StComment = styled.div``;
const StCommentLine = styled.div`
  background: #c7c7c7;
  width: 450px;
  height: 1px;
`;
const StChallenge = styled.div``;
const StChallengeLine = styled.div`
  width: 450px;
  height: 1px;
  background: #c7c7c7;
`;
const StCommonBar = styled.div`
  position: absolute;
  width: 178.23px;
  margin-top: 250px;
  height: 6.65px;
  left: calc(50% - 178.23px / 2 - 1.33px);
  background: #000000;
  border-radius: 133.005px;
`;
const StToggle = styled.div`
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border: none;
  outline: none;
  margin: 16px 25px 16px auto;
  height: 32px;
  cursor: pointer;
`;
export default UserProfileContainer;
