//대연
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "../../app/modules/instance";
import { getOthersTodoFetch } from "../../app/modules/mytodosSlice";
import { decodeMyTokenData } from "../../utils/token";
import {
  StBackGroundCloseDiv,
  StShadowBackgroundDiv,
} from "../interface/styledCommon";
import * as Sentry from "@sentry/react";

// 컴포넌트 다른곳에서 가져다 쓸 수 있게

function ProfileCard({ profileData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const myData = decodeMyTokenData();
  const [modalState, setModalState] = useState(false);
  const [gradeModalState, setGradeModalState] = useState(false);
  const gradeWordList = ["Lv.1 미콩", "Lv.2 미알", "Lv.3 미돌", "Lv.4 미킹"];

  // const [gradeWordState, setGradeeWordState] = useState(gradeWordList[0]);

  // 팔로우 버튼을 클릭했을 때 현재 ProfileCard.jsx 컴포넌트가 적용되어있는 위치에 따라서 다르게 작동
  const goFollow = () => {
    navigate(`/follows/${profileData.userInfo.userId}`, { state: false });
  };
  // 팔로잉 버튼을 클릭했을 때 현재 ProfileCard.jsx 컴포넌트가 적용되어있는 위치에 따라서 다르게 작동
  const goFollowing = () => {
    navigate(`/follows/${profileData.userInfo.userId}`, { state: true });
  };

  const [, setFollow] = useState("팔로우");

  // 다른 유저 프로필 정보 페이지에서 팔로우/언팔로우  및 피드를 불러야하고
  // instance 통신 후 만약 내가 현재 이 유저를 팔로우하고 있다면 state를 이용해 언팔로우, 언팔로우 하고있다면 state를 이용해 팔로우로 바꿔야한다.
  const changeFollowState = async () => {
    try {
      const response = await instance.put(`/follows/${params.userId}`);
      if (response.data.message === "success") {
        if (profileData.userInfo.isFollowed === false) {
          dispatch(getOthersTodoFetch(params));
          setFollow("언팔로우");
        } else if (profileData.userInfo.isFollowed === true)
          dispatch(getOthersTodoFetch(params));
        setFollow("팔로우");
      }
    } catch (error) {
      Sentry.captureException(error.response.data);
      return alert("처리에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const changeModalState = () => {
    setModalState(!modalState);
  };

  const gradeChangeModalState = () => {
    setGradeModalState(!gradeModalState);
  };
  // 이미지영역/이미지없는영역 묶음    이미지없는영역 -> 닉네임 / [   [mbti (팔로우 팔로우 숫자)]  or  [mbti(팔로잉 팔로잉 숫자)]  ] 묶음
  // onError={
  //   (this.src = this.src.replace(/\/resizingMimic\//, "/mimic"))
  // }
  const changeMyOriginalImage = (event) => {
    event.target.src = event.target.src.replace(/\/resizingMimic\//, "/mimic/");
  };

  return (
    <>
      {modalState === true ? (
        <StShadowBackgroundDiv>
          <StBackGroundCloseDiv onClick={changeModalState} />
          {/* {/* //e.stopPropagation() 는 배경만 눌렀을때 모달이 꺼지게한다 (모달창눌럿을때는 변화없음) */}
          <StModalContainer onClick={(e) => e.stopPropagation()}>
            <StCloseButton type="button" onClick={changeModalState}>
              <FontAwesomeIcon
                icon={faXmark}
                style={{
                  fontSize: "24px",
                  color: "#151522",
                  pointerEvents: "none",
                }}
              />
            </StCloseButton>
            <StContent>
              <h2>MBTI 궁합</h2>
              <StText>
                나와 천생연분인 MBTI와
                <br />
                나와 전혀 다른 MBTI를 확인 후<br />
                미믹에 도전해보세요!
                <br />
                색다른 재미를 느끼실 수 있을거에요!
              </StText>
              <StMBTIBoardImg
                src={process.env.PUBLIC_URL + `/images/matchingBoard.svg`}
                alt="MBTI matching List Images입니다"
              />
            </StContent>
          </StModalContainer>
        </StShadowBackgroundDiv>
      ) : (
        <></>
      )}

      {gradeModalState === true ? (
        <StShadowBackgroundDiv>
          {/* //e.stopPropagation() 는 배경만 눌렀을때 모달이 꺼지게한다 (모달창눌럿을때는 변화없음) */}
          <StGradeModalContainer onClick={(e) => e.stopPropagation()}>
            <StGradeCloseButton type="button" onClick={gradeChangeModalState}>
              <FontAwesomeIcon
                icon={faXmark}
                style={{
                  fontSize: "18px",
                  color: "black",
                  pointerEvents: "none",
                }}
              />
            </StGradeCloseButton>
            <StGradeModalTotalWrap>
              <StTitle>미믹 성장 등급</StTitle>
              <StText>즐겁게 따라하고 미콩이를 성장시켜주세요!</StText>
              <StIconExplainWrap>
                <StIcon
                  src={process.env.PUBLIC_URL + `/images/미콩.png`}
                  alt="미콩 이미지"
                />
                <StExplain>
                  <StExplainName>미콩</StExplainName>
                  <StExplainContentWrap>
                    <StExplainContent>
                      <span style={{ fontWeight: 700 }}>월 0~3회</span>
                    </StExplainContent>
                    <StExplainContent>
                      미믹 도전완료 + 미믹 제안
                    </StExplainContent>
                  </StExplainContentWrap>
                </StExplain>
              </StIconExplainWrap>

              <StIconExplainWrap>
                <StIcon
                  src={process.env.PUBLIC_URL + `/images/미알.png`}
                  alt="미알 이미지"
                />
                <StExplain>
                  <StExplainName>미알</StExplainName>
                  <StExplainContent>
                    <span style={{ fontWeight: 700 }}>월4~5회</span>
                  </StExplainContent>
                  <StExplainContent>미믹 도전완료 + 미믹 제안</StExplainContent>
                </StExplain>
              </StIconExplainWrap>

              <StIconExplainWrap>
                <StIcon
                  src={process.env.PUBLIC_URL + `/images/미돌.png`}
                  alt="미돌 이미지"
                />
                <StExplain>
                  <StExplainName>미돌</StExplainName>
                  <StExplainContent>
                    <span style={{ fontWeight: 700 }}>월6~7회</span> 미믹 도전
                  </StExplainContent>
                  <StExplainContent>미믹 도전완료 + 미믹 제안</StExplainContent>
                  <StExplainContent>
                    {/* 명예의 전당<span style={{ fontWeight: 700 }}>1회 등극</span> */}
                  </StExplainContent>
                </StExplain>
              </StIconExplainWrap>

              <StIconExplainWrap>
                <StIcon
                  src={process.env.PUBLIC_URL + `/images/미킹.png`}
                  alt="미킹 이미지"
                />
                <StExplain>
                  <StExplainName>미킹</StExplainName>
                  <StExplainContent>
                    <span style={{ fontWeight: 700 }}>월8회 이상</span> 미믹
                    도전
                  </StExplainContent>
                  <StExplainContent>미믹 도전완료 + 미믹 제안</StExplainContent>
                  <StExplainContent>
                    {/* 명예의 전당<span style={{ fontWeight: 700 }}>3회 등극</span> */}
                  </StExplainContent>
                </StExplain>
              </StIconExplainWrap>
            </StGradeModalTotalWrap>
          </StGradeModalContainer>
        </StShadowBackgroundDiv>
      ) : (
        <></>
      )}

      <StTotalWrap>
        <StImageBox>
          <StProfileImg
            src={
              profileData.userInfo.profile !== "none"
                ? profileData.userInfo.profile
                : process.env.PUBLIC_URL + "/images/Placeholder.svg"
            }
            onError={changeMyOriginalImage}
            alt="사용자가 등록한 프로필 이미지, 등록하지 않았다면 일반 이미지가 나타납니다"
            tabIndex={1}
          />
        </StImageBox>
        <StNoImageWrap>
          <StNickName tabIndex={2}>{profileData.userInfo.nickname}</StNickName>
          <StMmtiFollowWrap>
            <StMbti tabIndex={3}>{profileData.userInfo.mbti}</StMbti>
            {window.location.pathname === `/otherspage/${params.userId}` &&
            myData.userId !== params.userId ? (
              <StFollowBtn
                aria-label="버튼을 누르면 팔로우 또는 언팔로우를 할 수 있습니다"
                onClick={changeFollowState}
                tabIndex={5}
              >
                {/* 현재 내가 이 유저를 팔로우 한 상태가 아니라면 팔로우 버튼 / 아니면 언팔로우 버튼 */}
                {profileData.userInfo.isFollowed === false
                  ? "팔로우"
                  : "언팔로우"}
              </StFollowBtn>
            ) : (
              <StInfo tabIndex={4}aria-label="버튼을 누르면 궁합 알아보기 창이 나타납니다" onClick={changeModalState}>궁합 알아보기</StInfo>
            )}
          </StMmtiFollowWrap>
        </StNoImageWrap>
        <StGradeImageBox>
          {profileData.userInfo?.mimicCounts < 4 ? (
            <StImage
              src={process.env.PUBLIC_URL + `/images/미콩.png`}
              alt="미콩 이미지"
              width="59.38"
              height="71"
              tabIndex={6}
            />
          ) : profileData.userInfo?.mimicCounts < 6 ? (
            <StImage
              src={process.env.PUBLIC_URL + `/images/미알.png`}
              alt="미알 이미지"
              width="59.38"
              height="71"
              tabIndex={6}
            />
          ) : profileData.userInfo?.mimicCounts < 8 ? (
            <StImage
              src={process.env.PUBLIC_URL + `/images/미돌.png`}
              alt="미돌 이미지"
              width="59.38"
              height="71"
              tabIndex={6}
            />
          ) : (
            <StImage
              src={process.env.PUBLIC_URL + `/images/미킹.png`}
              alt="미킹 이미지"
              width="59.38"
              height="71"
              tabIndex={6}
            />
          )}
        </StGradeImageBox>
      </StTotalWrap>
      <StFollowGradeWrap>
        {/* <StMbtiFollowFollowingWrap> */}
        <StFollowWrap onClick={goFollow}>
          <StFollowWord tabIndex={7} aria-label="누르면 팔로워 페이지로 이동합니다">
            팔로워
          </StFollowWord>
          <StFollowNumber>
            {window.location.pathname === "/mypage"
              ? profileData.userInfo.follower
              : profileData.userInfo.followerCount}
          </StFollowNumber>
        </StFollowWrap>
        <StFollowingWrap onClick={goFollowing}>
          <StFollowingWord tabIndex={8}aria-label="누르면 팔로잉 페이지로 이동합니다">
            팔로잉
          </StFollowingWord>
          <StFollowingNumber>
            {window.location.pathname === "/mypage"
              ? profileData.userInfo.following
              : profileData.userInfo.followingCount}
          </StFollowingNumber>
        </StFollowingWrap>
        <StGradeWrap onClick={gradeChangeModalState}>
          {/* <Grade></Grade> */}
          <StGradebox>
            <StGradeWord>등급</StGradeWord>
            <StWhatGrade
              src={process.env.PUBLIC_URL + `/images/grade.png`}
              alt="누르면 등급 설명창이 나옵니다"
              tabIndex={9}
            />
          </StGradebox>
          <StGradeNumber>
            {profileData.userInfo.mimicCounts < 4
              ? gradeWordList[0]
              : profileData.userInfo.mimicCounts < 6
              ? gradeWordList[1]
              : profileData.userInfo.mimicCounts < 8
              ? gradeWordList[2]
              : gradeWordList[3]}
          </StGradeNumber>
        </StGradeWrap>
        {/* </StMbtiFollowFollowingWrap> */}
      </StFollowGradeWrap>
    </>
  );
}

export default ProfileCard;

// 프로필 카드 변경
const StTotalWrap = styled.div`
  background-color: white;
  width: 100%;
  margin-top: 31.5px;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 360px;
    margin: 0px;
    background-color: white;
    margin-top: 22.68px;
  }
`;
const StGradeImageBox = styled.div`
  display: flex;
`;
const StImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  overflow: hidden;
  margin-left: 35px;
  border-radius: 50%;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 57.6px;
    height: 57.6px;
    margin-left: 20px;
  }
`;
const StImage = styled.img`
  display: flex;
  transform: scaleX(-1);
  margin-left: 15px;
  border-radius: 9999px;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 43.2px;
    height: 50px;
    margin-left: 5px;
  }
`;

const StProfileImg = styled.img`
  height: 80px;
  width: 80px;

  @media screen and (max-width: 500px) {
    align-items: center;
    width: 57.6px;
    height: 57.6px;
  }
`;
const StNoImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  @media screen and (max-width: 500px) {
    gap: 0px;
  }
`;
const StMmtiFollowWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const StNickName = styled.div`
  flex-direction: row;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: #000000;
  margin-left: 16px;
  text-align: left;
  width: 256.91px;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 200px;
    margin-left: 13.68px;
    font-size: 17px;
  }
`;
const StMbtiFollowFollowingWrap = styled.div`
  display: flex;
  margin-left: 20px;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 230px;
    font-size: 5px;
    margin: 0px;
  }
`;
const StFollowGradeWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 30px;
  margin-bottom: 23px;
  @media screen and (max-width: 500px) {
    align-items: center;
    margin-top: 25px;
    margin-bottom: 17px;
  }
`;
const StMbti = styled.div`
  display: flex;
  /* flex-direction: column; */
  width: 42px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  /* line-height: 32px; */
  text-align: left;
  color: #979797;
  margin-left: 16px;
  @media screen and (max-width: 500px) {
    /* align-items: flex-start; */
    text-align: left;
    margin-left: 13.68px;
    font-size: 15px;
  }
`;
const StFollowWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-left: 100px; */

  cursor: pointer;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 100%;
    /* margin-left: 50px; */
  }
  transition: ease 0.1s;
  &:hover div {
    color: #8e8e8e;
  }
`;
const StFollowNumber = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 32px;
  text-align: center;
  color: #5E5C5C;
  margin-top: 3px;
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;
const StFollowWord = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  color: #000000;
`;
const StFollowingWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 55px;

  cursor: pointer;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 100%;
    margin: 0px;
  }
  transition: ease 0.1s;
  &:hover div {
    color: #8e8e8e;
  }
`;

const StGradeWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 55px;

  cursor: pointer;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 100%;
    margin: 0px;
  }
  transition: ease 0.1s;
  &:hover div {
    color: #8e8e8e;
  }
`;

const StGradebox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const StGradeWord = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  color: #000000;
`;
const StWhatGrade = styled.img`
  width: 18px;
  height: 18px;
`;
const StGradeNumber = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 32px;
  text-align: center;
  color: #5E5C5C;
  margin-top: 3px;
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;
const StFollowingNumber = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 32px;
  text-align: center;
  color: #5E5C5C;
  margin-top: 3px;
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;
const StFollowingWord = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  color: #000000;
  transition: ease 0.05s;
`;
const StFollowBtn = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #ff6d53;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 20px;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  @media screen and (max-width: 500px) {
    align-items: center;
    margin-left: 9px;
    font-size: 12px;
  }
`;
const StInfo = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #ff6d53;
  background: none;
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  margin: auto;
  margin-left: 20px;
  @media screen and (max-width: 500px) {
    align-items: center;
    margin-left: 14.4px;
    font-size: 11px;
  }
`;

const StCloseButton = styled.button`
  background: none;
  display: block;
  border: none;
  border-radius: none;
  margin: 0;
  margin-left: auto;
  padding: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;
const StContent = styled.div`
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  bottom: 0;
  height: 90%;
  box-sizing: border-box;
  & > h2 {
    font-size: 32px;
    line-height: 34px;
    font-weight: 700;
    color: #313131;
    margin: 17px auto;
  }
  @media screen and (max-width: 500px) {
    & > h2 {
      font-size: 24px;
      margin-top: 8px;
      margin-bottom: 9px;
        }
  }
`;
const StText = styled.p`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #919191;
  margin: 0;
  margin-bottom: 51px;
  @media screen and (max-width: 500px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const StModalContainer = styled.div`
  background: #ffffff;
  border-radius: 6px;
  position: absolute;
  padding: 25px;
  margin: 10vh 5%;
  width: 90%;
  height: auto;
  box-sizing: border-box;
  z-index: 11;
  @media screen and (max-width: 500px) {
    width: 324px;
    height:auto;
  }
`;
const StTitle = styled.div`
  text-align: center;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 34px;
  color: #313131;
  margin-bottom: 6px;
  @media screen and (max-width: 500px) {
    font-size: 24px;
  }
`;
const StIconExplainWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  @media screen and (max-width: 500px) {
    margin: 0 0 0 25px;
  }
`;
const StIcon = styled.img`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 500px) {
    align-items: center;
    margin-left: 7px;
    height: 84.24px;
    width: 72px;
  }
`;
const StExplain = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  margin-left: 42px;
  text-align: start;
  @media screen and (max-width: 500px) {
    margin-left: 30px;
    margin-top: 5px;
  }
`;
const StExplainName = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #ff6d53;
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;
const StExplainContentWrap = styled.div`
  display: flex;
  margin-top: 8px;
  flex-direction: column;
  @media screen and (max-width: 500px) {
    margin: 0px;
  }
`;
const StExplainContent = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 23px;
  letter-spacing: -0.05em;
  color: #313131;
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;
const StContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 500px) {
    width: 360px;
    align-items: center;
  }
`;
const StContainerIcon = styled.img`
  display: flex;
  width: 80px;
  height: 80px;
  margin: 18px 18px 18px 35px;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 500px) {
    align-items: center;
    margin-left: 20px;
    width: 57.9px;
    height: 57.9px;
  }
`;
const StName = styled.div`
  display: flex;
  margin: 39.5px 0px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  color: #000000;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 500px) {
    width: 40px;
  }
`;
const StGradeBtn = styled.button`
  display: flex;
  width: 130px;
  height: 36px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  background: none;
  border: 1px solid black;
  border-radius: 9999px;
  margin: 40px 0px 40px 160px;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 50px auto;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    width: 111px;
    align-items: center;
    margin-left: 90px;
  }
`;
const StCommonBorder = styled.div`
  height: 1px;
  background: #bdc5cd;
  @media screen and (max-width: 500px) {
    width: 360px;
    align-items: center;
  }
`;
const StGradeModalTotalWrap = styled.div`
  flex-direction: column;
`;

const StGradeCloseButton = styled.button`
  background: none;
  display: block;
  border: none;
  border-radius: none;
  margin: 0;
  margin-left: auto;
  padding: 0;
  cursor: pointer;
`;
const StGradeModalContainer = styled.div`
  background: white;
  border-radius: 6px;
  padding: 25px;
  margin: auto;
  width: 450px;
  height: auto;
  margin-top: 12.5vh;
  box-sizing: border-box;
  @media screen and (max-width: 500px) {
    width: 324px;
  }
`;

const StMBTIBoardImg = styled.img`
  width: 400px;
  margin: 5px 0;
  @media screen and (max-width: 500px) {
    width: 288px;
    height: 266px;
  }
`;
