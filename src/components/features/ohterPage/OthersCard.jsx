import {
  StBackGroundCloseDiv,
  StCommonRowBox,
  StShadowBackgroundDiv,
} from "../../interface/styledCommon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faStar } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import instance from "../../../app/modules/instance";
import { useDispatch } from "react-redux";
import { getOthersTodoFetch } from "../../../app/modules/mytodosSlice";
import { decodeMyTokenData } from "../../../utils/token";

function OthersCard({ data }) {
  const navigate = useNavigate();
  const [menuModal, setMenuModal] = useState(false);
  const dispatch = useDispatch();
  const myData = decodeMyTokenData();

  // 상세 피드 페이지로 이동시켜줌.
  function moveToFeedDetail() {
    if (data.challengedTodo !== "null" && data.challengedTodo !== undefined) {
      navigate(`/feeddetail/${data.originTodoId}`);
    } else if (data.todoId !== "null" && data.todoId !== undefined) {
      navigate(`/feeddetail/${data.todoId}`);
    }
  }

  // 팝업창 열고 닫기 위한 코드
  function displayCardMenu(event) {
    event.stopPropagation();
    setMenuModal(!menuModal);
  }

  // 내가 만든 미믹 삭제
  function deleteMyTodayMakingChallenge(event) {
    event.stopPropagation();
    const deleteApply = async () => {
      try {
        const response = await instance.delete(`mytodos/${data.todoId}`);
        if (response.data.message === "success") {
          dispatch(getOthersTodoFetch({ userId: data.userId }));
        }
      } catch (error) {
        alert("미믹 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    };
    deleteApply();
  }

  // 이용 시, <ChallengeCard id={todoId} data={객체값} key={idx} hideState={true/false} isTodayChallenge={true/false} />로 작성해줄 것
  // map을 쓰지 않는 경우, key는 예외.
  return (
    <>
      {menuModal === true ? (
        <StShadowBackgroundDiv>
          <StBackGroundCloseDiv onClick={displayCardMenu} />
          <StButtonBox>
            <StPopUpWhiteButton onClick={deleteMyTodayMakingChallenge}>
              삭제
            </StPopUpWhiteButton>
            <StPopUpWhiteButton onClick={displayCardMenu}>
              닫기
            </StPopUpWhiteButton>
          </StButtonBox>
        </StShadowBackgroundDiv>
      ) : (
        <></>
      )}
      <StChallengeCardDiv
        background={data.isCompleted === true ? "#FF6D53" : "#ffffff"}>
        <StCommonRowBox
          width="100%"
          height="100%"
          alignItems="center"
          style={{ textAlign: "left" }}
          onClick={moveToFeedDetail}>
          <StChallengeNameSpan
            color={data.isCompleted === true ? "#ffffff" : "#000000"}>
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

          <StCommonStatusBox>
            {data.challengedTodo === undefined ? (
              myData.userId === data.userId ? (
                <StMenuBtn
                  color={data.isCompleted === true ? "#ffffff" : "#979797"}
                  onClick={displayCardMenu}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </StMenuBtn>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            <StCommonRowBox margin="auto 0 0 0">
              <StCommonRowBox
                alignItems="center"
                style={{
                  marginRight: "5px",
                }}>
                <FontAwesomeIcon
                  style={{
                    margin: "0 4px",
                    color: data.isChallenged === true ? "#B8B8B8" : "#909090",
                  }}
                  icon={faMessage}
                />
                <StCountSpan
                  color={data.isChallenged === true ? "#B8B8B8" : "#909090"}>
                  {data.commentCounts}
                </StCountSpan>
              </StCommonRowBox>
              <StCommonRowBox alignItems="center" style={{ marginLeft: "5px" }}>
                <FontAwesomeIcon
                  style={{
                    margin: "0",
                    color: data.isChallenged === true ? "#B8B8B8" : "#909090",
                  }}
                  icon={faStar}
                />
                <StCountSpan
                  color={data.isChallenged === true ? "#B8B8B8" : "#909090"}
                  style={{ marginRight: "4px" }}>
                  {data.challengedCounts}
                </StCountSpan>
              </StCommonRowBox>
            </StCommonRowBox>
          </StCommonStatusBox>
        </StCommonRowBox>
      </StChallengeCardDiv>
    </>
  );
}

export default OthersCard;

const StChallengeCardDiv = styled.div`
  background: ${(props) => props.background};

  display: flex;
  flex-direction: row;
  align-items: center;

  width: 90%;
  height: 90px;
  border-radius: 6px;
  padding: 14px 20px;
  margin: 6px 25px;

  box-sizing: border-box;
  cursor: ${(props) => props.cursor || "pointer"};
  transition: ease 0.1s;
  &:hover {
    transform: scale(1.01);
  }
  @media screen and (max-width: 500px) {
    width: 94%;
    margin: 6px 3%;
    height: 80px;
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

const StCountSpan = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => props.color};

  margin: 0 8px;
`;

const StMenuBtn = styled.button`
  background: none;
  font-size: 16px;
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

  width: 450px;
  height: 70px;
  transform: ${(props) => props.transform};
  cursor: pointer;

  @media screen and (max-width: 500px) {
    margin: 0 18px;
    height: 60px;
    font-size: 18px;
  }
`;

const StCommonStatusBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media screen and (max-width: 500px) {
    & svg {
      font-size: 12px;
    }
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
