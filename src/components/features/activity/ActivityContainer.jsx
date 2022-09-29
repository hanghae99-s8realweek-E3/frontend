import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getOthersTodoFetch } from "../../../app/modules/mytodosSlice";
import LoadingContainer from "../../../utils/loadingState";
import { decodeMyTokenData } from "../../../utils/token";
import {
  StBackGroundCloseDiv,
  StCommonBorder,
  StShadowBackgroundDiv,
} from "../../interface/styledCommon";
import OthersCard from "../ohterPage/OthersCard";

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
              <StBackGroundCloseDiv onClick={changePopUpState} />
              <StPopupBox>
                <StSlideDiv />
                {sortList?.map((elem, index) => (
                  <div key={index} style={{ margin: "0", padding: "0" }}>
                    <StSortListBtn
                      onClick={changeFeedListSort}
                      value={index}
                      color={sortState === elem ? "#FF6D53" : "#909090"}>
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
                <div>{sortState}</div>
                <img
                  src={process.env.PUBLIC_URL + `/images/Toggle.png`}
                  alt="sort list button"
                  style={{ margin: "0 0 0 8px" }}
                />
              </StSortBtn>

              <StMyCardListDiv>
                {sortState === sortList[0] ? (
                  myTodosState.challengedTodos?.map((elem, index) => (
                    <OthersCard data={elem} key={index} />
                  ))
                ) : sortState === sortList[1] ? (
                  myTodosState.challengedTodos
                    .slice()
                    .sort((a, b) => b.commentCounts - a.commentCounts)
                    ?.map((elem, index) => (
                      <OthersCard data={elem} key={index} />
                    ))
                ) : sortState === sortList[2] ? (
                  myTodosState.challengedTodos
                    .slice()
                    .sort((a, b) => b.challengedCounts - a.challengedCounts)
                    ?.map((elem, index) => (
                      <OthersCard data={elem} key={index} />
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
                <div>{sortState}</div>
                <img
                  src={process.env.PUBLIC_URL + `/images/Toggle.png`}
                  alt="sort list button"
                  style={{ margin: "0 0 0 8px" }}
                />
              </StSortBtn>

              <StMyCardListDiv>
                {sortState === sortList[0] ? (
                  myTodosState.createdTodos?.map((elem, index) => (
                    <OthersCard data={elem} key={index} />
                  ))
                ) : sortState === sortList[1] ? (
                  myTodosState.createdTodos
                    .slice()
                    .sort((a, b) => b.commentCounts - a.commentCounts)
                    ?.map((elem, index) => (
                      <OthersCard data={elem} key={index} />
                    ))
                ) : sortState === sortList[2] ? (
                  myTodosState.createdTodos
                    .slice()
                    .sort((a, b) => b.challengedCounts - a.challengedCounts)
                    ?.map((elem, index) => (
                      <OthersCard data={elem} key={index} />
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
        <LoadingContainer />
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

  margin: 60px 0 80px 0;

  box-sizing: border-box;
`;

const StTapBox = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: row;

  padding: 10px 5% 0 5%;

  width: 90%;
  height: 40px;
`;

const StActiveTapButton = styled.button`
  background: none;

  font-size: 18px;
  font-weight: 500;
  color: #ff6d53;

  border: none;
  border-bottom: 3px solid #ff6d53;
  outline: none;
  padding-bottom: 10px;

  width: 100%;

  cursor: pointer;
`;

const StTapButton = styled.button`
  background: none;

  font-size: 18px;
  font-weight: 500;
  color: #313131;

  border: none;
  border-bottom: 1px solid #909090;
  outline: none;
  padding-bottom: 10px;

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

  border: none;
  outline: none;
  margin: 16px 25px 16px auto;

  height: 32px;

  font-size: 18px;

  & img {
    height: 8px;
  }
  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 14px;
    margin: 8px 25px 8px auto;
    & img {
      height: 6px;
    }
  }
`;

const StMyCardListDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StSortListBtn = styled.button`
  background: none;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  font-weight: 600;
  color: ${(props) => props.color};

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
