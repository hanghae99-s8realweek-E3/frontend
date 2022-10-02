//대연
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
import LoadingContainer from "../../../utils/loadingState";
import ProfileCard from "../../common/ProfileCard";
import { StBackGroundCloseDiv } from "../../interface/styledCommon";
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 탈퇴한 회원 피드 페이지로 이동
  useEffect(() => {
    if (params.userId === "none") {
      alert("탈퇴한 회원입니다.");
      navigate("/todolists");
    }
  }, []);

  // 첫 렌더링 일때 userId 인자로 parmas사용

  // useEffect(() => {
  //   dispatch(getOthersTodoFetch(params));
  // }, []);
  useEffect(() => {
    setLoading(true);
    async function loading() {
      await dispatch(getOthersTodoFetch(params));
      setLoading(false);
    }
    loading();
  }, []);

  // 탭을 할 때마다 혅재 누른 탭의 글씨와 밑줄 색상은 ff6d53로 변하고 전의 탭은 글씨 색상 balck 밑줄 gray로 나타난다.
  useEffect(() => {
    let current = document.getElementById(todoTab);
    if (current !== null) {
      current.style.color = "#ff6d53";
      current.style.borderBottom = "2px solid";
      current.style.borderBottomColor = "#ff6d53";
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
    <>
      {loading === true ? <LoadingContainer /> : <></>}
      <StTotalWrap>
        {Object.keys(card).length === 0 ? (
          // <LoadingContainer />
          <></>
        ) : (
          <>
            <StTopWrap>
              <ProfileCard profileData={card} />
            </StTopWrap>
            <StTodoTopLine></StTodoTopLine>
            <StTodoWrap>
              <StChallengeTodo id="도전" onClick={ChallengeState}>
                도전한 미믹
              </StChallengeTodo>
              <StSuggestionTodo id="제안" onClick={SuggestState}>
                제안한 미믹
              </StSuggestionTodo>
            </StTodoWrap>
            {/* <StLineWrap>
            <StMiddleLeftLine></StMiddleLeftLine>
            <StMiddleRightLine></StMiddleRightLine>
          </StLineWrap> */}

            <StBottomWrap>
              {selectSort === true ? (
                <StShadowBackgroundDiv>
                  <StBackGroundCloseDiv onClick={toggleSortPopUp} />
                  <StPopupBox>
                    <StSlideDiv />
                    <StSort>
                      <StDate
                        style={{
                          color: sortState === "최신순" ? "#ff6d53" : "#8d8d8d",
                        }}
                        onClick={sortDate}>
                        최신순
                      </StDate>
                      <StDateLine />
                      <StComment
                        style={{
                          color: sortState === "댓글순" ? "#ff6d53" : "#8d8d8d",
                        }}
                        onClick={sortComment}>
                        댓글순
                      </StComment>
                      <StCommentLine />
                      <StChallenge
                        style={{
                          color: sortState === "도전순" ? "#ff6d53" : "#8d8d8d",
                        }}
                        onClick={sortChallenge}>
                        도전순
                      </StChallenge>
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
                    card.createdTodos?.map((elem, index) => (
                      <OthersCard data={elem} key={index} />
                    ))
                  ) : sortState === sortList[1] ? (
                    card.createdTodos
                      ?.slice()
                      .sort((a, b) => b.commentCounts - a.commentCounts)
                      .map((elem, index) => (
                        <OthersCard data={elem} key={index} />
                      ))
                  ) : sortState === sortList[2] ? (
                    card.createdTodos
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
    </>
  );
}

const StTotalWrap = styled.div`
  display: flex;
  /* width: 500px; */
  flex-direction: column;
  justify-content: flex-start;
  @media screen and (max-width: 500px) {
    display: flex;
    width: 360px;
    /* height: auto; */
  }
`;
const StTopWrap = styled.div`
  /* display: flex; */
  flex-direction: column;
  margin-top: 60px;
  /* padding-bottom: 31.5px; */
  background-color: #ffffff;
`;
const StTodoTopLine = styled.div`
  display: flex;
  height: 2px;
  background: #bdc5cd;
  transform: matrix(1, 0, 0, -1, 0, 0);
  width: 500px;
  @media screen and (max-width: 500px) {
    width: 360px;
    /* margin-bottom: 20px; */
  }
`;
const StTodoWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  background: white;
  padding-top: 10px;
`;
const StChallengeTodo = styled.div`
  background: none;
  justify-content: center;
  display: flex;
  width: 225px;
  border-bottom: 2px solid #ff6d53;
  /* width: 105px; */
  cursor: pointer;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #ff6d53;
  padding-bottom: 9px;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  @media screen and (max-width: 500px) {
    font-size: 17px;
    background: none;
  }
`;
const StSuggestionTodo = styled.div`
  background: none;
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
  /* color: #000000; */
  padding-bottom: 9px;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  @media screen and (max-width: 500px) {
    font-size: 17px;
  }
`;
const StBottomWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const StTodayMyCardWrap = styled.div`
  display: block;
  align-items: start;
  flex-direction: column;
  padding-bottom: 71px;
`;
const StShadowBackgroundDiv = styled.div`
  background: rgba(0, 0, 0, 0.3);

  position: fixed;
  display: block;

  top: 0;
  width: 500px;
  height: 100%;
  z-index: 10;
  @media screen and (max-width: 500px) {
    width: 360px;
    text-align: center;
  }
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
  @media screen and (max-width: 500px) {
    width: 360px;
    text-align: center;
  }
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
  @media screen and (max-width: 500px) {
    margin: auto;
  }
`;
const StDate = styled.div`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;
const StDateLine = styled.div`
  display: flex;
  width: 450px;
  height: 1px;
  background: #c7c7c7;
  @media screen and (max-width: 500px) {
    width: 324px;
  }
`;
const StComment = styled.div`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;
const StCommentLine = styled.div`
  background: #c7c7c7;
  width: 450px;
  height: 1px;
  @media screen and (max-width: 500px) {
    width: 324px;
  }
`;
const StChallenge = styled.div`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;
const StChallengeLine = styled.div`
  width: 450px;
  height: 1px;
  background: #c7c7c7;
  @media screen and (max-width: 500px) {
    width: 324px;
  }
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
  margin: 0px 25px 6px auto;
  height: 32px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  @media screen and (max-width: 500px) {
    margin-top: auto;
    margin-left: auto;
    font-size: 16px;
  }
`;
export default UserProfileContainer;
