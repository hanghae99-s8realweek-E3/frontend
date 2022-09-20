import {
  StCommonColumnBox,
  StCommonRowBox,
} from "../../interface/styledCommon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faStar } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function OthersCard({ data }) {
  const navigate = useNavigate();
  const [menuModal, setMenuModal] = useState(false);

  // 상세 피드 페이지로 이동시켜줌.
  function moveToFeedDetail() {
    if (data.todoInfo.todoId !== "null" && data.todoInfo.todoId !== undefined)
      navigate(`/feeddetail/${data.todoInfo.todoId}`);
  }

  // 팝업창 열고 닫기 위한 코드
  function displayCardMenu(event) {
    event.stopPropagation();
    setMenuModal(!menuModal);
  }

  // 이용 시, <ChallengeCard id={todoId} data={객체값} key={idx} hideState={true/false} isTodayChallenge={true/false} />로 작성해줄 것
  // map을 쓰지 않는 경우, key는 예외.
  return (
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

        <StCommonColumnBox style={{ height: "100%" }}>
          <StMenuBtn
            color={data.isCompleted === true ? "#ffffff" : "#979797"}
            onClick={displayCardMenu}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </StMenuBtn>
        </StCommonColumnBox>
      </StCommonRowBox>
    </StChallengeCardDiv>
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
`;

const StChallengeNameSpan = styled.span`
  font-size: 22px;
  font-weight: 400;
  color: ${(props) => props.color};
  line-height: 32px;

  margin-right: auto;
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
  line-height: 32px;
  color: ${(props) => props.color};

  border: none;
  outline: none;
  margin-left: auto;

  cursor: pointer;
`;

// <StCommonColumnBox height="100%">
//   <StCommonRowBox alignItems="center" margin="auto 0 0 0">
//     <StCommonRowBox
//       alignItems="center"
//       style={{
//         marginRight: "5px",
//         lineHeight: "32px",
//       }}>
//       <FontAwesomeIcon
//         style={{
//           margin: "0 4px",
//           color: data.isChallenged === true ? "#B8B8B8" : "#909090",
//         }}
//         icon={faMessage}
//       />
//       <StCountSpan
//         color={data.isChallenged === true ? "#B8B8B8" : "#909090"}>
//         {data.todoInfo.commentCounts}
//       </StCountSpan>
//     </StCommonRowBox>
//     <StCommonRowBox alignItems="center" style={{ marginLeft: "5px" }}>
//       <FontAwesomeIcon
//         style={{
//           margin: "0 0 0 0",
//           color: data.isChallenged === true ? "#B8B8B8" : "#909090",
//         }}
//         icon={faStar}
//       />
//       <StCountSpan
//         color={data.isChallenged === true ? "#B8B8B8" : "#909090"}
//         style={{ marginRight: "4px" }}>
//         {data.todoInfo.challengedCounts}
//       </StCountSpan>
//     </StCommonRowBox>
//   </StCommonRowBox>
// </StCommonColumnBox>
