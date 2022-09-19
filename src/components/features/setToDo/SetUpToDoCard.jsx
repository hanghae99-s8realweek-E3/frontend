import {
  StCommonColumnBox,
  StCommonRowBox,
  StShadowBackgroundDiv,
} from "../../interface/styledCommon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleCheck,
  faMessage,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { decodeMyTokenData } from "../../../utils/token";
import instance from "../../../app/modules/instance";
import { useDispatch } from "react-redux";
import { getSetUpMyTodoFetch } from "../../../app/modules/setUpTodoSlice";
import { settingTodayDate } from "../../../utils/commonFunc";

function SetUpToDoCard({ id, data, hideState, isTodayChallenge }) {
  const [menuModal, setMenuModal] = useState(false);
  const params = useParams();
  const myData = decodeMyTokenData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 상세 피드 페이지로 이동시켜줌.
  function moveToFeedDetail() {
    if (id !== "null" && id !== undefined) navigate(`/feeddetail/${id}`);
  }

  // 오늘의 챌린지 완료/진행중 상태를 바꿔주도록 함.
  function changeStateChallenge(event) {
    event.stopPropagation();
    const stateChallenge = async () => {
      try {
        const response = await instance.put(`/mytodos/${id}/challenged`, {
          date: settingTodayDate(),
        });
        if (response.data.message === "success") {
          dispatch(getSetUpMyTodoFetch({ date: settingTodayDate() }));
        }
      } catch (error) {
        alert(error.response.data.errorMessage);
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
        const response = await instance.delete(
          `/mytodos/${data.todoId}/challenged`,
          { data: { date: settingTodayDate() } }
        );
        if (response.data.message === "success") {
          window.location.reload();
        }
      } catch (error) {
        alert(error.response.data.errorMessage);
      }
    };
    cancelApply();
  }

  // 내가 제안한 미믹을 삭제함.
  function deleteMyTodayMakingChallenge(event) {
    event.stopPropagation();
    const deleteApply = async () => {
      try {
        const response = await instance.delete(`mytodos/${data.todoId}`);
        if (response.data.message === "success") {
          window.location.reload();
        }
      } catch (error) {
        alert(error.response.data.errorMessage);
      }
    };
    deleteApply();
  }

  console.log(isTodayChallenge);

  // 이용 시, <ChallengeCard id={todoId} data={객체값} key={idx} hideState={true/false} isTodayChallenge={true/false} />로 작성해줄 것
  // map을 쓰지 않는 경우, key는 예외.
  return (
    <>
      {menuModal === true ? (
        <StShadowBackgroundDiv>
          {isTodayChallenge === true ? (
            <StPopUpWhiteButton
              onClick={cancelTodayChallenge}
              transform="translateY(76vh)">
              등록 취소
            </StPopUpWhiteButton>
          ) : (
            <StPopUpWhiteButton
              onClick={deleteMyTodayMakingChallenge}
              transform="translateY(76vh)">
              삭제
            </StPopUpWhiteButton>
          )}
          <StPopUpWhiteButton
            onClick={displayCardMenu}
            transform="translateY(77vh)">
            닫기
          </StPopUpWhiteButton>
        </StShadowBackgroundDiv>
      ) : (
        <></>
      )}

      {/* 진행중 완료 버튼 출현 여부 결정 */}
      <StChallengeCardDiv
        width="90%"
        id={data.todoId}
        onClick={moveToFeedDetail}
        background={
          myData.userId === data.userId
            ? "#ffffff"
            : data.isCompleted === 0
            ? "#ffffff"
            : "#FF6D53"
        }
        cursor="pointer">
        {hideState === true ? (
          <></>
        ) : (
          <StChallengeStateBtn
            onClick={isTodayChallenge === true ? changeStateChallenge : null}>
            <StTodoStateImage
              src={
                data.isCompleted === 0
                  ? process.env.PUBLIC_URL + `/images/Progress.png`
                  : process.env.PUBLIC_URL + `/images/Complete.png`
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
            color={
              myData.userId === data.userId
                ? "#979797"
                : data.isCompleted === 0
                ? "#979797"
                : "#ffffff"
            }>
            {data.todo.length > 30
              ? `${data.todo.substring(0, 27)}...`
              : data.todo}
          </StChallengeNameSpan>

          {/* 상세 메뉴 출력 여부 표시 */}

          <StCommonColumnBox style={{ height: "100%", width: "50%" }}>
            {isTodayChallenge === true ? (
              <StMenuBtn
                color={data.isCompleted === 0 ? "#979797" : "#ffffff"}
                onClick={displayCardMenu}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </StMenuBtn>
            ) : myData.userId === data.userId ? (
              <StMenuBtn color="#979797" onClick={displayCardMenu}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </StMenuBtn>
            ) : (
              <div>　</div>
            )}
            {/* <StCommonRowBox alignItems="center" margin="auto 0 0 0">
              <StCommonRowBox
                alignItems="center"
                style={{ marginRight: "5px", lineHeight: "32px" }}>
                <FontAwesomeIcon
                  style={{ color: "#979797", margin: "0 4px" }}
                  icon={faMessage}
                />
                <StCountSpan>{data.commentCounts}</StCountSpan>
              </StCommonRowBox>
              <StCommonRowBox alignItems="center" style={{ marginLeft: "5px" }}>
                <FontAwesomeIcon
                  style={{ color: "#979797", margin: "0 0 0 0" }}
                  icon={faStar}
                />
                <StCountSpan style={{ marginRight: "4px" }}>
                  {data.challengedCounts}
                </StCountSpan>
              </StCommonRowBox>
            </StCommonRowBox> */}
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

  width: ${(props) => props.width || "100%"};
  height: 102px;
  border: 1px solid gray;
  border-radius: 6px;
  padding: 16px 18px;
  margin: 5px 25px;

  box-sizing: border-box;
  cursor: ${(props) => props.cursor || "pointer"};
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
`;

const StChallengeNameSpan = styled.span`
  font-size: 22px;
  font-weight: 400;
  color: ${(props) => props.color};
  line-height: 32px;

  margin-right: auto;
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
  margin: 0 25px;
  border-radius: 6px;

  width: 90%;
  height: 70px;
  transform: ${(props) => props.transform};
  cursor: pointer;
`;
