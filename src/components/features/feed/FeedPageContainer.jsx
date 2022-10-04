//대연  주석은 아직 비교해볼게 많아서 안지워놨습니다
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMbtiTodoListsChallengeFetch,
  getMbtiTodoListsCommentFetch,
  getMbtiTodoListsFetch,
  getTodoListsChallengeFetch,
  getTodoListsCommentFetch,
  getTodoListsFetch,
} from "../../../app/modules/todolistsSlice";
import ChallengeCard from "../../common/ChallengeCard";
import { tokenChecker } from "../../../utils/token";
import LoadingContainer from "../../../utils/loadingState";
import detailSlice, {
  resetFeedDetailData,
} from "../../../app/modules/detailSlice";
// check uncheck

function FeedPageContainer() {
  const [selectSort, setSelectSort] = useState(false);
  const [sortState, setSortState] = useState("최신순");
  const [inputContext, setInputContext] = useState("");
  const [searchList, setSearchList] = useState([]);
  // 스토어에서 todolists리듀서 호출
  const feedCard = useSelector((state) => state.todolists.data);
  const [loading, setLoading] = useState(false);
  // mbti선택하기를 했을때 mbti를 불러옴
  const { mbti } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(detailSlice.actions.resetFeedDetailData());
  }, []);

  //처음 로딩될때 로그인/미로로그인 mbti의 유무에 따라서 렌더링
  useEffect(() => {
    setLoading(true);
    async function loading() {
      if (tokenChecker() === false && mbti === undefined) {
        await dispatch(getTodoListsFetch(false));
        setSortState("최신순");
      } else if (tokenChecker() === false && mbti !== undefined) {
        await dispatch(getMbtiTodoListsFetch({ login: false, mbti: mbti }));
        setSortState("최신순");
      } else if (tokenChecker() === true && mbti === undefined) {
        await dispatch(getTodoListsFetch(true));
        setSortState("최신순");
      } else if (tokenChecker() === true && mbti !== undefined) {
        await dispatch(getMbtiTodoListsFetch({ login: true, mbti: mbti }));
        setSortState("최신순");
      }
      setLoading(false);
    }
    loading();
  }, []);

  // 처음에 화면 렌더링될 때는 의미없는 렌더링, mbti 선택후 렌더링될 때 유효함
  useEffect(() => {
    setLoading(true);
    async function loading() {
      if (mbti === undefined) {
        await dispatch(getTodoListsFetch(false));
        setSortState("최신순");
        // dispatch(getMbtiTodoListsFetch({ login: false, mbti: mbti }));
      } else if (mbti === undefined) {
        await dispatch(getTodoListsFetch(true));
        setSortState("최신순");
      } else if (mbti !== undefined)
        await dispatch(getMbtiTodoListsFetch({ login: true, mbti: mbti }));
      setSortState("최신순");
      setLoading(false);
    }
    loading();
  }, [mbti]);

  //checkOn의  초기값은 false로 설정
  const [checkOn, checkOff] = useState(false);
  // 도전완료 클릭시 로그인 유무에따라서 1차적으로 거르고 아니면  기본/체크 이미지 변화
  const checkState = () => {
    if (tokenChecker() === false) {
      alert("로그인 후 이용해주세요");
      return;
    } else return checkOff(!checkOn);
  };

  // 최신순 클릭 후 클릭한 값에 따라 변화
  const toggleSortPopUp = (e) => {
    setSelectSort(!selectSort);
  };

  //최신순 댓글순 도전순 이미지 및 커서 클릭시 선택한 값에 따라 값 출력  토큰유무-> mbti유무
  // 1. 로그인을 했는지 안했는지 2.로그인을했으면 mbti를 설정했는지 안했는지
  const sortDate = (e) => {
    if (tokenChecker() === false) {
      if (mbti === undefined) {
        dispatch(getTodoListsFetch(false));
      } else if (mbti !== undefined) {
        dispatch(getMbtiTodoListsFetch({ login: false, mbti: mbti }));
      }
    } else {
      if (tokenChecker() === true) {
        if (mbti === undefined) {
          dispatch(getTodoListsFetch(true));
        } else if (mbti !== undefined) {
          dispatch(getMbtiTodoListsFetch({ login: true, mbti: mbti }));
        }
      }
    }
    setSortState("최신순");
    setSelectSort(!selectSort);
  };
  //댓글순 정렬
  const sortComment = (e) => {
    if (tokenChecker() === false) {
      if (mbti === undefined) {
        dispatch(getTodoListsCommentFetch(false));
      } else if (mbti !== undefined) {
        dispatch(getMbtiTodoListsCommentFetch({ login: false, mbti: mbti }));
      }
    } else {
      if (tokenChecker() === true) {
        if (mbti === undefined) {
          dispatch(getTodoListsCommentFetch(true));
        } else if (mbti !== undefined) {
          dispatch(getMbtiTodoListsCommentFetch({ login: true, mbti: mbti }));
        }
      }
    }
    setSortState("댓글순");
    setSelectSort(!selectSort);
  };
  //도전순 정렬
  const sortChallenge = (e) => {
    if (tokenChecker() === false) {
      if (mbti === undefined) {
        dispatch(getTodoListsChallengeFetch(false));
      } else if (mbti !== undefined) {
        dispatch(getMbtiTodoListsChallengeFetch({ login: false, mbti: mbti }));
      }
    } else {
      if (tokenChecker() === true) {
        if (mbti === undefined) {
          dispatch(getTodoListsChallengeFetch(true));
        } else if (mbti !== undefined) {
          dispatch(getMbtiTodoListsChallengeFetch({ login: true, mbti: mbti }));
        }
      }
    }
    setSortState("도전순");
    setSelectSort(!selectSort);
  };
  // MBTI 선택 버튼 클릭시
  const moveToSelectMBTI = () => {
    navigate("/selectmbtifeed");
  };

  return (
    <>
      {loading === true ? <LoadingContainer /> : <></>}
      <StTotalWrap>
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
                  onClick={sortDate}
                  aria-label="누르면 최신순으로 피드를 정렬합니다"
                >
                  최신순
                </StDate>
                <StDateLine />
                <StComment
                  style={{
                    color: sortState === "댓글순" ? "#ff6d53" : "#8d8d8d",
                  }}
                  onClick={sortComment}
                  aria-label="누르면 댓글순으로 피드를 정렬합니다"
                >
                  댓글순
                </StComment>
                <StCommentLine />
                <StChallenge
                  style={{
                    color: sortState === "도전순" ? "#ff6d53" : "#8d8d8d",
                  }}
                  onClick={sortChallenge}
                  aria-label="누르면 도전순으로 피드를 정렬합니다"
                >
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
        <StTopWrap>
          <StWrap>
            <StChallengeWrap>
              {/* 거짓이면 체크안한거 참이면 체크한거 */}
              {checkOn === false ? (
                <StChallengeImg
                  onClick={checkState}
                  src={process.env.PUBLIC_URL + `/images/unCheck.png`}
                  width="17"
                  height="17"
                  alt="누르면 도전완료된 피드는 나타나지 않습니다"
                  tabIndex={0}
                />
              ) : (
                <StChallengeImg
                  onClick={checkState}
                  src={process.env.PUBLIC_URL + `/images/check.png`}
                  width="17"
                  height="17"
                  alt="누르면 현재 보이지않는 도전완료된 피드가 나타납니다"
                  tabIndex={0}
                />
              )}
              <StChallengeWord aria-hidden="true">
                도전완료 가리기
              </StChallengeWord>
            </StChallengeWrap>
            <StToggleImgWrap>
              {/* 최신순 클릭시 아래에 정렬 bar 나옴 */}
              <StToggle onClick={toggleSortPopUp} aria-hidden="true">
                {sortState}
              </StToggle>
              <StToggleImg
                onClick={toggleSortPopUp}
                src={process.env.PUBLIC_URL + `/images/Toggle.png`}
                width="12"
                height="6"
                alt="최신순 댓글순 도전순 정렬 토글입니다"
                tabIndex={0}
              />
            </StToggleImgWrap>
          </StWrap>
        </StTopWrap>
        <>
          <StTodayMyCardWrap>
            {checkOn === true
              ? feedCard
                  ?.filter((elem) => elem.isChallenged === false)
                  .map((it, idx) => (
                    <ChallengeCard
                      id={it.todoId}
                      data={it}
                      key={idx}
                      tabIndex={1}
                    />
                  ))
              : feedCard?.map((it, idx) => (
                  <ChallengeCard
                    id={it.todoId}
                    data={it}
                    key={idx}
                    tabIndex={1}
                  />
                ))}
            <div className="hi" style={{ height: 80 }}></div>
          </StTodayMyCardWrap>
          : (
          <StTodayMyCardWrap>
            {checkOn === true
              ? searchList
                  ?.filter((elem) => elem.isChallenged === false)
                  .map((it, idx) => (
                    <ChallengeCard
                      id={it.todoId}
                      data={it}
                      key={idx}
                      tabIndex={1}
                    />
                  ))
              : searchList?.map((it, idx) => (
                  <ChallengeCard
                    id={it.todoId}
                    data={it}
                    key={idx}
                    tabIndex={1}
                  />
                ))}
            <div className="hi" style={{ height: 80 }}></div>
          </StTodayMyCardWrap>
          )
        </>
        <StSelectMbti
          tabIndex={0}
          aria-label="버튼을 누르면 MBTI를 선택하는 페이지로 이동합니다."
          onClick={moveToSelectMBTI}
        >
          MBTI 선택
        </StSelectMbti>
      </StTotalWrap>
    </>
  );
}
const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const StTopWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  margin: 45px 0px 0px;
  background-color: none;
  width: 500px;
  position: fixed;
  @media screen and (max-width: 500px) {
    width: 360px;
  }
`;
const StWrap = styled.div`
  display: flex;
  flex-direction: row;
  background: none;
`;
const StChallengeWrap = styled.div`
  display: flex;
`;
const StChallengeImg = styled.img`
  justify-content: left;
  margin: 8px 8px 8px 25px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  @media screen and (max-width: 500px) {
    margin: 8px 8px 8px 15px;
    width: 15px;
    height: 15px;
  }
`;
const StChallengeWord = styled.div`
  display: flex;
  margin-right: 235px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #313131;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 175px;
    margin: 0px;
    font-size: 14px;
  }
`;
const StToggleImgWrap = styled.div`
  display: flex;
  -webkit-tap-highlight-color: transparent;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 100%;
    margin-left: 12px;
  }
`;
const StToggle = styled.div`
  margin-right: 8px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #313131;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 100.09px;
    margin: 0px 8px 0px 0px;
    text-align: end;
    font-size: 14px;
  }
`;
const StToggleImg = styled.img`
  margin: 13px 0px 13px 0px;
  cursor: pointer;
  align-items: center;
`;
const StTodayMyCardWrap = styled.div`
  flex-direction: column;
  margin-top: 110px;
  margin-bottom: 110.06px;
`;
const StSelectMbti = styled.button`
  display: flex;
  width: 200px;
  position: fixed;
  height: 60px;
  bottom: 110.06px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  margin-left: 150px;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 999px;
  border: 0px;
  background: #ff6d53;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 500px) {
    width: 180px;
    margin: 0 90px;
    font-size: 18px;
    height: 50px;
  }
  transition: ease 0.2s;
  &:hover {
    background: #ffafa1;
    transform: scale(1.03);
  }
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
  height: 335px;
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
export const StBackGroundCloseDiv = styled.button`
  background: none;
  display: block;
  position: fixed;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  top: 0;
  width: 500px;
  height: 100%;
  z-index: 10;
  @media only screen and (max-width: 500px) {
    width: 360px;
  }
`;
export default FeedPageContainer;
