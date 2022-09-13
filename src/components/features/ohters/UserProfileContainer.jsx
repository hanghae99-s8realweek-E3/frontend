//대연
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getOthersTodoFetch } from "../../../app/modules/mytodosSlice";
import {getTodoListsFetch} from "../../../app/modules/todolistsSlice";
import { tokenChecker } from "../../../utils/token";
import ChallengeCard from "../../common/ChallengeCard";
import ProfileCard from "../../common/ProfileCard";

function UserProfileContainer() {
  const card = useSelector((state) => state.mytodos.data);
  const [todoTab, setTodoTab] = useState("challenge");
  const sortList = ["최신순", "댓글순", "도전순"];
  const [sortState, setSortState] = useState(sortList[0]);
  const [selectSort, setSelectSort] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  console.log(card);

  const checkState = () => {
    return setTodoTab("challenge");
  };
  const checkState2 = () => {
    return setTodoTab("making");
  };

  useEffect(() => {
    dispatch(getOthersTodoFetch(params));
  }, []);

  function changeFeedListSort (event) {
    setSortState(sortList[event.target.value])
    setSelectSort(!selectSort)
  }
  const toggleSortPopUp = (e) => {
    e.preventDefault();
    setSelectSort(!selectSort);
  };

  // useEffect(() => {
  //   if (tokenChecker() === false) dispatch(getTodoListsFetch(false));
  //   else if (tokenChecker() === true) dispatch(getTodoListsFetch(true));
  // }, []);

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
                {/* <StSort>
                  <StDate onClick={datebutton}>최신순</StDate>
                  <StComment onClick={commentbutton}>댓글순</StComment>
                  <StChallenge onClick={challengebutton}>도전순</StChallenge> 
                </StSort> */}
                        {sortList.map((elem, index) =>
                <div key={index} style={{margin:"0", padding:"0"}}>
                  <StSortListBtn onClick={changeFeedListSort} value={index} fontWeight={sortState === elem ? "600" : "500"}>
                    {elem}
                  </StSortListBtn>
                <StCommonBar />
                </div>
                        )}
                <StFooterBar />
                {/* <StCommonButton  onClick={toggleSortPopUp}>선택하기</StCommonButton> */}
              </StPopupBox>
            ) : (
              <></>
            )}
            <StToggle onClick={toggleSortPopUp}>{sortState}
            <img src={process.env.PUBLIC_URL + `/images/Toggle.png`} alt="sort list button" style={{height:"8px", margin:"0 0 0 8px"}}/>
            </StToggle>
            
            <StTodayMyCardWrap>
              {todoTab === "challenge" ? 
              (
                // card.challengedTodos?.map((it, idx) => (
                //   <ChallengeCard
                //     id={it.todoId}
                //     data={it}
                //     key={idx}
                //   ></ChallengeCard>
                // ))
                sortState === sortList[0] ?
                card.challengedTodos.map((elem, index) => 
                  <ChallengeCard id={elem.todoId} data={elem} key={index} />
                )
              : sortState === sortList[1] ?
                card.challengedTodos.slice().sort((a, b) =>  b.commentCounts - a.commentCounts).map((elem, index) => 
                  <ChallengeCard id={elem.todoId} data={elem} key={index} />
                )
              : sortState === sortList[2] ?
                card.challengedTodos.slice().sort((a, b) => b.challengedCounts - a.challengedCounts).map((elem, index) => 
                  <ChallengeCard id={elem.todoId} data={elem} key={index} />
                )
              : <></>
              ) 
              : todoTab === "making" ? 
              (
                sortState === sortList[0] ?
                card.createdTodo.map((elem, index) => 
                  <ChallengeCard id={elem.todoId} data={elem} key={index} />
                )
              : sortState === sortList[1] ?
                card.createdTodo.slice().sort((a, b) =>  b.commentCounts - a.commentCounts).map((elem, index) => 
                  <ChallengeCard id={elem.todoId} data={elem} key={index} />
                )
              : sortState === sortList[2] ?
                card.createdTodo.slice().sort((a, b) => b.challengedCounts - a.challengedCounts).map((elem, index) => 
                  <ChallengeCard id={elem.todoId} data={elem} key={index} />
                )
              : <></>
                // card.createdTodo?.map((it, idx) => (
                //   <ChallengeCard
                //     id={it.todoId}
                //     data={it}
                //     key={idx}
                //   ></ChallengeCard>
                // ))
              ) 
              : (
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
const StCommonBar = styled.div`
  position: absolute;
  width: 178.23px;
  /* margin-top: 200px; 이거 200줬을때 스크롤생겼음 */
  height: 6.65px;
  left: calc(50% - 178.23px / 2 - 1.33px);
  /* background: red; */
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

cursor:pointer;
`;
const StSortListBtn = styled.button`
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: ${props => props.fontWeight || "500"};
  border: none;
  outline: none;
  margin: 20px auto;
  cursor:pointer;
`
const StFooterBar = styled.div`
  background: #000000;
  margin: 30px auto 0 auto;
  border-radius: 133.005px;
  width: 178.23px;
  height: 6.65px;
`
export default UserProfileContainer;
