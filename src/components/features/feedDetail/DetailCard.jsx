import {
  StBackGroundCloseDiv,
  StCommonColumnBox,
  StCommonRowBox,
} from "../../interface/styledCommon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeMyTokenData } from "../../../utils/token";
import instance from "../../../app/modules/instance";
import * as Sentry from "@sentry/react";
import { ReactComponent as Challenge } from "../../../images/Challenge.svg";

function DetailCard({ data }) {
  const [menuModal, setMenuModal] = useState(false);
  const myData = decodeMyTokenData();
  const navigate = useNavigate();
  // 팝업창 열고 닫기 위한 함수
  function displayCardMenu(event) {
    event.stopPropagation();
    setMenuModal(!menuModal);
  }

  // 내가 제안한 미믹을 삭제함.
  function deleteMyTodayMakingChallenge(event) {
    event.stopPropagation();
    const deleteApply = async () => {
      try {
        const response = await instance.delete(`mytodos/${data.todoId}`);
        if (response.data.message === "success") {
          navigate("/todolists");
        }
      } catch (error) {
        Sentry.captureException(error.response.data);
        alert("미믹을 삭제하는 데에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    };
    deleteApply();
  }

  // 이용 시, <DetailCard data={객체값} />로 작성해줄 것
  // map을 쓰지 않는 경우, key는 예외.
  return (
    <>
      {menuModal === true ? (
        <StShadowBackgroundDiv>
          <StBackGroundCloseDiv onClick={displayCardMenu} />
          {myData !== undefined && myData.userId === data.userId ? (
            <StButtonBox>
              <StPopUpWhiteButton onClick={deleteMyTodayMakingChallenge}>
                삭제
              </StPopUpWhiteButton>
              <StPopUpWhiteButton onClick={displayCardMenu}>
                닫기
              </StPopUpWhiteButton>
            </StButtonBox>
          ) : (
            <></>
          )}
        </StShadowBackgroundDiv>
      ) : (
        <></>
      )}
      <StChallengeCardDiv width="90%" id={data.todoId}>
        <StCommonRowBox width="100%" height="100%">
          {/* 내용 */}
          <StChallengeNameSpan>{data.todo}</StChallengeNameSpan>
          <StCommonColumnBox alignItems="center">
            {myData !== undefined ? (
              myData.userId === data.userId ? (
                <StMenuBtn onClick={displayCardMenu}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </StMenuBtn>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}

            <StCommonRowBox style={{ marginTop: "auto" }}>
              <StCommonRowBox
                alignItems="center"
                style={{ marginLeft: "auto", marginRight: "5px" }}
                aria-label="댓글 수">
                <FontAwesomeIcon
                  style={{ color: "#979797", margin: "0 4px" }}
                  icon={faMessage}
                />
                <StCountSpan>{data.commentCounts}</StCountSpan>
              </StCommonRowBox>

              <StCommonRowBox alignItems="center" style={{ marginLeft: "5px" }}>
                <label
                  aria-label="도전 수"
                  style={{ height: "18px", width: "18px" }}>
                  <Challenge />
                </label>
                <StCountSpan style={{ marginRight: "4px" }}>
                  {data.challengedCounts}
                </StCountSpan>
              </StCommonRowBox>
            </StCommonRowBox>
          </StCommonColumnBox>
        </StCommonRowBox>
      </StChallengeCardDiv>
    </>
  );
}

export default DetailCard;

const StChallengeCardDiv = styled.div`
  background: #ffffff;

  display: flex;
  flex-direction: row;
  align-items: center;

  width: ${(props) => props.width || "100%"};
  height: 90px;
  border-radius: 6px;
  padding: 14px 20px;
  margin: 6px 25px;

  box-sizing: border-box;
  box-shadow: 0px 0px 10px 0px rgba(220, 220, 220, 0.6);
  @media screen and (max-width: 500px) {
    width: 94%;
    margin: 12px 4%;
  }
`;

const StChallengeNameSpan = styled.span`
  display: flex;
  align-items: center;

  font-size: 20px;
  font-weight: 400;
  text-align: left;
  color: #000000;
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
  color: #979797;

  border: none;
  outline: none;
  margin-left: auto;
  margin-bottom: auto;
  & svg {
    pointer-events: none;
  }

  & path {
    pointer-events: none;
  }

  cursor: pointer;
`;

const StCountSpan = styled.span`
  font-size: 13px;
  font-weight: 500;
  line-height: 32px;
  color: #979797;

  margin: 0 8px;
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
  cursor: pointer;
  @media screen and (max-width: 500px) {
    width: 324px;
    margin: 0 18px;
    height: 60px;
    font-size: 18px;
  }
`;

export const StShadowBackgroundDiv = styled.div`
  background: rgba(0, 0, 0, 0.3);

  display: block;
  position: fixed;

  top: 0;
  width: 500px;
  height: 100%;
  z-index: 10;
  @media only screen and (max-width: 500px) {
    width: 360px;
    transform: translateX(-1.4%);
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
