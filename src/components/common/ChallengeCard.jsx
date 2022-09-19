import { StCommonColumnBox, StCommonRowBox } from "../interface/styledCommon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faStar } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function ChallengeCard({ id, data }) {
  const navigate = useNavigate();

  // 상세 피드 페이지로 이동시켜줌.
  function moveToFeedDetail() {
    if (id !== "null" && id !== undefined) navigate(`/feeddetail/${id}`);
  }

  // 이용 시, <ChallengeCard id={todoId} data={객체값} key={idx} hideState={true/false} isTodayChallenge={true/false} />로 작성해줄 것
  // map을 쓰지 않는 경우, key는 예외.
  return (
    <StChallengeCardDiv
      background={data.isCompleted === 1 ? "#DDDDDD" : "#ffffff"}>
      <StCommonRowBox
        width="100%"
        height="100%"
        alignItems="center"
        style={{ textAlign: "left" }}
        onClick={moveToFeedDetail}>
        <StChallengeNameSpan
          color={data.isCompleted === 1 ? "#B8B8B8" : "#000000"}>
          {data.todo.length > 30
            ? `${data.todo.substring(0, 27)}...`
            : data.todo}
        </StChallengeNameSpan>

        <StStaticBox color={data.isCompleted === 1 ? "#B8B8B8" : "#909090"}>
          <StCommonRowBox alignItems="center" margin="auto 0 0 0">
            <StCommonRowBox
              alignItems="center"
              style={{
                marginRight: "5px",
                lineHeight: "32px",
                color: data.isCompleted === 1 ? "#B8B8B8" : "#909090",
              }}>
              <FontAwesomeIcon style={{ margin: "0 4px" }} icon={faMessage} />
              <StCountSpan>{data.commentCounts}</StCountSpan>
            </StCommonRowBox>
            <StCommonRowBox
              alignItems="center"
              style={{
                marginLeft: "5px",
                color: data.isCompleted === 1 ? "#B8B8B8" : "#909090",
              }}>
              <FontAwesomeIcon style={{ margin: "0 0 0 0" }} icon={faStar} />
              <StCountSpan style={{ marginRight: "4px" }}>
                {data.challengedCounts}
              </StCountSpan>
            </StCommonRowBox>
          </StCommonRowBox>
        </StStaticBox>
      </StCommonRowBox>
    </StChallengeCardDiv>
  );
}

export default ChallengeCard;

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
  color: #979797;

  margin: 0 8px;
`;

const StStaticBox = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`;
