import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getOthersTodoFetch } from "../../../app/modules/mytodosSlice";
import { decodeMyTokenData } from "../../../utils/token";
import ChallengeCard from "../../common/ChallengeCard";
import { StCommonBorder } from "../../interface/styledCommon";

function ActivityContainer() {
  const sortList = ["최신순", "댓글순", "도전순"];
  const [popUpState, setPopUpState] = useState(false);
  const [sortState, setSortState] = useState(sortList[0]);
  const [selectTab, setSelectTab] = useState("challenge");
  const myData = decodeMyTokenData();
  const myTodosState = useSelector((state) => state.mytodos.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (myData !== null && myData !== undefined)
      dispatch(getOthersTodoFetch({ userId: myData.userId }));
  }, []);

  function selectTabMenu(event) {
    if (event.target.value === "challenge") setSelectTab("challenge");
    else if (event.target.value === "making") setSelectTab("making");
  }

  function changeFeedListSort(event) {
    setSortState(sortList[event.target.value]);
    setPopUpState(!popUpState);
  }

  function changePopUpState() {
    setPopUpState(!popUpState);
  }

  return (
    <StContainer>
      {Object.keys(myTodosState).length !== 0 ? (
        <>
          {popUpState === true ? (
            <StShadowBackgroundDiv>
              <StPopupBox>
                <StSlideDiv />
                {sortList?.map((elem, index) => (
                  <div key={index} style={{ margin: "0", padding: "0" }}>
                    <StSortListBtn
                      onClick={changeFeedListSort}
                      value={index}
                      fontWeight={sortState === elem ? "600" : "500"}>
                      {elem}
                    </StSortListBtn>
                    <StCommonBorder margin="0 25px" width="90%" />
                  </div>
                ))}
                <StFooterBar />
                {/* <StCommonButton  onClick={toggleSortPopUp}>선택하기</StCommonButton> */}
              </StPopupBox>
            </StShadowBackgroundDiv>
          ) : (
            <></>
          )}

          {selectTab === "challenge" ? (
            <>
              <StTapBox>
                <StActiveTapButton value="challenge" onClick={selectTabMenu}>
                  도전한 미믹
                </StActiveTapButton>
                <StTapButton value="making" onClick={selectTabMenu}>
                  제안한 미믹
                </StTapButton>
              </StTapBox>
              <StSortBtn type="button" onClick={changePopUpState}>
                <div style={{ fontSize: "18px" }}>{sortState}</div>
                <img
                  src={process.env.PUBLIC_URL + `/images/Toggle.png`}
                  alt="sort list button"
                  style={{ height: "8px", margin: "0 0 0 8px" }}
                />
              </StSortBtn>

              <StMyCardListDiv>
                {sortState === sortList[0] ? (
                  myTodosState.challengedTodos?.map((elem, index) => (
                    <ChallengeCard id={elem.todoId} data={elem} key={index} />
                  ))
                ) : sortState === sortList[1] ? (
                  myTodosState.challengedTodos
                    .slice()
                    .sort((a, b) => b.commentCounts - a.commentCounts)
                    ?.map((elem, index) => (
                      <ChallengeCard id={elem.todoId} data={elem} key={index} />
                    ))
                ) : sortState === sortList[2] ? (
                  myTodosState.challengedTodos
                    .slice()
                    .sort((a, b) => b.challengedCounts - a.challengedCounts)
                    ?.map((elem, index) => (
                      <ChallengeCard id={elem.todoId} data={elem} key={index} />
                    ))
                ) : (
                  <></>
                )}
              </StMyCardListDiv>
            </>
          ) : selectTab === "making" ? (
            <>
              <StTapBox>
                <StTapButton value="challenge" onClick={selectTabMenu}>
                  도전한 미믹
                </StTapButton>
                <StActiveTapButton value="making" onClick={selectTabMenu}>
                  제안한 미믹
                </StActiveTapButton>
              </StTapBox>
              <StSortBtn type="button" onClick={changePopUpState}>
                <div style={{ fontSize: "18px" }}>{sortState}</div>
                <img
                  src={process.env.PUBLIC_URL + `/images/Toggle.png`}
                  alt="sort list button"
                  style={{ height: "8px", margin: "0 0 0 8px" }}
                />
              </StSortBtn>

              <StMyCardListDiv>
                {sortState === sortList[0] ? (
                  myTodosState.createdTodo?.map((elem, index) => (
                    <ChallengeCard id={elem.todoId} data={elem} key={index} />
                  ))
                ) : sortState === sortList[1] ? (
                  myTodosState.createdTodo
                    .slice()
                    .sort((a, b) => b.commentCounts - a.commentCounts)
                    ?.map((elem, index) => (
                      <ChallengeCard id={elem.todoId} data={elem} key={index} />
                    ))
                ) : sortState === sortList[2] ? (
                  myTodosState.createdTodo
                    .slice()
                    .sort((a, b) => b.challengedCounts - a.challengedCounts)
                    ?.map((elem, index) => (
                      <ChallengeCard id={elem.todoId} data={elem} key={index} />
                    ))
                ) : (
                  <></>
                )}
              </StMyCardListDiv>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div>로딩중입니다.</div>
      )}
    </StContainer>
  );
}

export default ActivityContainer;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;

  margin: 80px 0;

  box-sizing: border-box;
`;

const StTapBox = styled.div`
  display: flex;

  flex-direction: row;

  margin: 0 25px;

  width: 90%;
  height: 50px;
`;

const StActiveTapButton = styled.button`
  background: none;

  font-size: 18px;
  font-weight: 500;

  border: none;
  border-bottom: 2px solid black;
  outline: none;
  padding-bottom: 10px;
  margin-bottom: 5px;

  width: 100%;

  cursor: pointer;
`;

const StTapButton = styled.button`
  background: none;

  font-size: 18px;
  font-weight: 500;

  border: none;
  border-bottom: 2px solid gray;
  outline: none;
  padding-bottom: 10px;
  margin-bottom: 5px;

  width: 100%;

  cursor: pointer;
`;

const StPopupBox = styled.div`
  background: #ffffff;
  position: absolute;
  width: 100%;
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

const StSortBtn = styled.button`
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

const StMyCardListDiv = styled.div`
  display: flex;
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

const StSortListBtn = styled.button`
  background: none;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  font-weight: ${(props) => props.fontWeight || "500"};

  border: none;
  outline: none;
  margin: 20px auto;

  cursor: pointer;
`;

const StFooterBar = styled.div`
  background: #000000;

  margin: 30px auto 0 auto;
  border-radius: 133.005px;

  width: 178.23px;
  height: 6.65px;
`;
