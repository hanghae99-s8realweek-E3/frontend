import {
  StBackGroundCloseDiv,
  StCommonColumnBox,
  StCommonRowBox,
  StShadowBackgroundDiv,
} from "../../interface/styledCommon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../app/modules/instance";
import { useDispatch } from "react-redux";
import { getSetUpMyTodoFetch } from "../../../app/modules/setUpTodoSlice";
import { settingTodayDate } from "../../../utils/commonFunc";
import LoadingContainer from "../../../utils/loadingState";

function SetUpToDoCard({ data, hideState, isTodayChallenge }) {
  const [menuModal, setMenuModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 상세 피드 페이지로 이동시켜줌.
  function moveToFeedDetail() {
    if (data.challengedTodo !== undefined) {
      if (data.originTodoId !== "null" && data.originTodoId !== undefined) {
        navigate(`/feeddetail/${data.originTodoId}`);
      }
    }
    if (data.todo !== undefined) {
      if (data.todoId !== "null" && data.todoId !== undefined) {
        navigate(`/feeddetail/${data.todoId}`);
      }
    }
  }

  // 오늘의 챌린지 완료/진행중 상태를 바꿔주도록 함.
  function changeStateChallenge(event) {
    event.stopPropagation();
    const stateChallenge = async () => {
      try {
        setLoading(true);
        const response = await instance.put(
          `/mytodos/${data.challengedTodoId}/challenged`
        );
        if (response.data.message === "success") {
          dispatch(getSetUpMyTodoFetch({ date: settingTodayDate() }));
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        alert("댓글 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    };
    stateChallenge();
  }

  // 팝업창 열고 닫기 위한 코드
  function displayCardMenu(event) {
    event.stopPropagation();
    setMenuModal(!menuModal);
  }

  // 오늘 도전하기 위해 등록한 미믹을 취소함.
  function cancelTodayChallenge(event) {
    event.stopPropagation();
    const cancelApply = async () => {
      try {
        setLoading(true);
        const response = await instance.delete(
          `/mytodos/${data.challengedTodoId}/challenged`,
          { data: { date: settingTodayDate() } }
        );
        if (response.data.message === "success") {
          dispatch(getSetUpMyTodoFetch({ date: settingTodayDate() }));
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        alert(
          "미믹 도전을 취소하는 데에 실패했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    };
    cancelApply();
  }

  // 내가 제안한 미믹을 삭제함.
  function deleteMyTodayMakingChallenge(event) {
    event.stopPropagation();
    const deleteApply = async () => {
      try {
        setLoading(true);
        const response = await instance.delete(`mytodos/${data.todoId}`);
        if (response.data.message === "success") {
          dispatch(getSetUpMyTodoFetch({ date: settingTodayDate() }));
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        alert(
          "제안한 미믹을 삭제하는 데에 실패했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    };
    deleteApply();
  }

  // 이용 시, <ChallengeCard id={todoId} data={객체값} key={idx} hideState={true/false} isTodayChallenge={true/false} />로 작성해줄 것
  // map을 쓰지 않는 경우, key는 예외.
  return (
    <>
      {loading === true ? <LoadingContainer /> : <></>}
      {menuModal === true ? (
        <StShadowBackgroundDiv>
          <StBackGroundCloseDiv onClick={displayCardMenu} />
          <StButtonBox>
            {isTodayChallenge === true ? (
              <StPopUpWhiteButton onClick={cancelTodayChallenge}>
                등록 취소
              </StPopUpWhiteButton>
            ) : (
              <StPopUpWhiteButton onClick={deleteMyTodayMakingChallenge}>
                삭제
              </StPopUpWhiteButton>
            )}
            <StPopUpWhiteButton onClick={displayCardMenu}>
              닫기
            </StPopUpWhiteButton>
          </StButtonBox>
        </StShadowBackgroundDiv>
      ) : (
        <></>
      )}

      {/* 진행중 완료 버튼 출현 여부 결정 */}
      <StChallengeCardDiv
        id={data.todoId}
        onClick={moveToFeedDetail}
        background={data.isCompleted === true ? "#FF6D53" : "#ffffff"}
        border={
          data.isCompleted === true ? "1px solid #FF6D53" : "1px solid #909090"
        }
        cursor="pointer">
        {hideState === true ? (
          <></>
        ) : (
          <StChallengeStateBtn
            onClick={isTodayChallenge === true ? changeStateChallenge : null}>
            <StTodoStateImage
              src={
                data.isCompleted === true
                  ? process.env.PUBLIC_URL + `/images/Complete.png`
                  : process.env.PUBLIC_URL + `/images/Progress.png`
              }
            />
          </StChallengeStateBtn>
        )}

        <StCommonRowBox
          width="100%"
          height="100%"
          alignItems="center"
          style={{ textAlign: "left" }}>
          <StChallengeNameSpan
            color={data.isCompleted === true ? "#ffffff" : "#979797"}>
            {data.challengedTodo !== undefined
              ? data.challengedTodo.length > 30
                ? `${data.challengedTodo.substring(0, 27)}...`
                : data.challengedTodo
              : data.todo !== undefined
              ? data.todo.length > 30
                ? `${data.todo.substring(0, 27)}...`
                : data.todo
              : ""}
          </StChallengeNameSpan>

          {/* 상세 메뉴 출력 여부 표시 */}

          <StCommonColumnBox style={{ height: "100%" }}>
            {isTodayChallenge === true ? (
              <StMenuBtn
                color={data.isCompleted === true ? "#ffffff" : "#979797"}
                onClick={displayCardMenu}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </StMenuBtn>
            ) : data.todo !== undefined ? (
              <StMenuBtn color="#979797" onClick={displayCardMenu}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </StMenuBtn>
            ) : (
              <div>　</div>
            )}
          </StCommonColumnBox>
        </StCommonRowBox>
      </StChallengeCardDiv>
    </>
  );
}

export default SetUpToDoCard;

const StChallengeCardDiv = styled.div`
  background: ${(props) => props.background || "#ffffff"};

  display: flex;
  flex-direction: row;
  align-items: center;

  width: 90%;
  height: 102px;
  border: ${(props) => props.border};
  border-radius: 6px;
  padding: 16px 18px;
  margin: 5px 25px;

  box-sizing: border-box;
  cursor: ${(props) => props.cursor || "pointer"};
  transition: ease 0.1s;
  &:hover {
    transform: scale(1.02);
  }
  @media screen and (max-width: 500px) {
    width: 90%;
    margin: 5px 5%;
    height: 80px;
  }
`;

const StChallengeStateBtn = styled.button`
  background: none;
  display: flex;
  align-items: center;

  border: none;
  outline: none;

  cursor: pointer;
`;

const StTodoStateImage = styled.img`
  width: 46px;
  height: 46px;
  margin-right: 19px;
  pointer-events: none;
  @media screen and (max-width: 500px) {
    width: 38px;
    height: 38px;
    margin-right: 9px;
  }
`;

const StChallengeNameSpan = styled.span`
  font-size: 22px;
  font-weight: 400;
  color: ${(props) => props.color};
  line-height: 32px;

  margin-right: auto;
  word-wrap: break-word;
  word-break: break-all;
  @media screen and (max-width: 500px) {
    font-size: 16px;
    line-height: 26px;
    font-weight: 400;
  }
`;

const StMenuBtn = styled.button`
  background: none;
  font-size: 16px;
  line-height: 32px;
  color: ${(props) => props.color};

  border: none;
  outline: none;
  margin-left: auto;

  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const StPopUpWhiteButton = styled.button`
  background: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  font-weight: 500;
  color: #979797;

  border: none;
  outline: none;
  margin: 0 5%;
  border-radius: 6px;
  z-index: 11;
  width: 450px;
  height: 70px;
  transform: ${(props) => props.transform};
  cursor: pointer;
  @media screen and (max-width: 500px) {
    width: 324px;
    margin: 0 18px;
    height: 60px;
    font-size: 18px;
  }
`;

const StButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  bottom: 0;
  z-index: 11;
  transform: translateY(-5vh);
`;
