import { StCommonColumnBox, StCommonRowBox } from "../interface/styledCommon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { tokenChecker } from "../../utils/token";

function ChallengeCard({ data }) {
  const navigate = useNavigate();
  // 상세 피드 페이지로 이동시켜줌.
  function moveToFeedDetail() {
    if (data.todoInfo.todoId !== "null" && data.todoInfo.todoId !== undefined) {
      if (tokenChecker() === true) {
        navigate(`/feeddetail/${data.todoInfo.todoId}`);
      } else if (tokenChecker() === false) {
        alert("로그인 후 이용해주세요.");
        navigate("/mypage");
        return;
      }
    }
  }

  // 이용 시, <ChallengeCard data={객체값} />로 작성해줄 것
  return (
    <StChallengeCardDiv
      background={data.isChallenged === true ? "#DDDDDD" : "#ffffff"}>
      <StCommonRowBox
        width="100%"
        height="100%"
        alignItems="center"
        style={{ textAlign: "left" }}
        onClick={moveToFeedDetail}>
        <StChallengeNameSpan
          color={data.isChallenged === true ? "#B8B8B8" : "#000000"}>
          {data.todoInfo.todo.length > 30
            ? `${data.todoInfo.todo.substring(0, 27)}...`
            : data.todoInfo.todo}
        </StChallengeNameSpan>

        <StCommonColumnBox height="100%">
          <StCommonRowBox alignItems="center" margin="auto 0 0 0">
            <StCommonRowBox
              alignItems="center"
              style={{
                marginRight: "5px",
                lineHeight: "32px",
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
                {data.todoInfo.commentCounts}
              </StCountSpan>
            </StCommonRowBox>
            <StCommonRowBox alignItems="center" style={{ marginLeft: "5px" }}>
              <StChallengeIcon
                aria-label="도전 수"
                color={data.isChallenged === true ? "#B8B8B8" : "#909090"}
                src={process.env.PUBLIC_URL + `/images/Challenge.svg`}
              />
              <StCountSpan
                color={data.isChallenged === true ? "#B8B8B8" : "#909090"}
                style={{ marginRight: "4px" }}>
                {data.todoInfo.challengedCounts}
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
  background: ${(props) => props.background};

  display: flex;
  flex-direction: row;
  align-items: center;

  width: 90%;
  height: 90px;
  border-radius: 6px;
  padding: 14px 20px;
  margin: 12px 25px;

  box-sizing: border-box;
  cursor: ${(props) => props.cursor || "pointer"};

  transition: ease 0.2s;

  &:hover {
    background: #ff6d53;
    color: #ffffff;
  }

  &:hover span {
    color: #ffffff;
  }

  &:hover svg {
    fill: #ffffff;
  }

  &:hover path {
    color: #ffffff;
  }

  @media screen and (max-width: 500px) {
    width: 94%;
    margin: 12px 3%;
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

const StChallengeIcon = styled.img`
  margin: 0;
  height: 17px;
  width: 17px;
  color: ${(props) => props.color};
`;
