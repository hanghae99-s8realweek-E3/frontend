import { StCommonColumnBox, StCommonRowBox } from "../interface/styledCommon";
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
import { decodeMyTokenData } from "../../utils/token";
import instance from "../../app/modules/instance";
import { useDispatch } from "react-redux";
import { getSetUpMyTodoFetch } from "../../app/modules/setUpTodoSlice";
import { settingTodayDate } from "../../utils/commonFunc";

function ChallengeCard({ id, data }) {
  const navigate = useNavigate();

  // 상세 피드 페이지로 이동시켜줌.
  function moveToFeedDetail() {
    if (id !== "null" && id !== undefined) navigate(`/feeddetail/${id}`);
  }

  // 이용 시, <ChallengeCard id={todoId} data={객체값} key={idx} hideState={true/false} isTodayChallenge={true/false} />로 작성해줄 것
  // map을 쓰지 않는 경우, key는 예외.
  return (
    <StChallengeCardDiv>
      <StCommonRowBox
        width="100%"
        height="100%"
        alignItems="center"
        style={{ textAlign: "left" }}
        onClick={moveToFeedDetail}>
        <StChallengeNameSpan>
          {data.todo.length > 30
            ? `${data.todo.substring(0, 27)}...`
            : data.todo}
        </StChallengeNameSpan>

        <StCommonColumnBox style={{ height: "100%" }}>
          <StCommonRowBox alignItems="center" margin="auto 0 0 0">
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
          </StCommonRowBox>
        </StCommonColumnBox>
      </StCommonRowBox>
    </StChallengeCardDiv>
  );
}

export default ChallengeCard;

const StChallengeCardDiv = styled.div`
  background: #ffffff;

  display: flex;
  flex-direction: row;
  align-items: center;

  width: 90%;
  height: 102px;
  border: 1px solid gray;
  border-radius: 6px;
  padding: 14px 20px;
  margin: 5px 25px;

  box-sizing: border-box;
  cursor: ${(props) => props.cursor || "pointer"};
`;

const StChallengeNameSpan = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: #979797;
  line-height: 32px;

  margin-right: auto;
`;

const StCountSpan = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #979797;

  margin: 0 8px;
`;
