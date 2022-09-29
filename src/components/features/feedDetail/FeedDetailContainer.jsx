import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { getFeedDetailFetch } from "../../../app/modules/detailSlice";
import { decodeMyTokenData, tokenChecker } from "../../../utils/token";
import instance from "../../../app/modules/instance";
import DetailCard from "./DetailCard";
import { faEllipsisVertical, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  StBackGroundCloseDiv,
  StShadowBackgroundDiv,
} from "../../interface/styledCommon";
import LoadingContainer from "../../../utils/loadingState";

function FeedDetailContainer() {
  const inputRef = useRef();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [gradeModalState, setGradeModalState] = useState(false);
  const gradeList = ["미돌", "미알", "미콩", "미킹"];
  const [gradeState, setGradeState] = useState(gradeList[0]);
  const gradeWordList = ["Lv.1 미돌", "Lv.2 미알", "Lv.3 미콩", "Lv.4 미킹"];
  const [gradeWordState, setGradeeWordState] = useState(gradeWordList[0]);
  const detailState = useSelector((state) => state.detail);
  console.log(detailState);
  console.log(detailState.data.comments?.map((x) => x.challengeCounts));
  console.log(detailState.data.comments?.map((x) => x.todoCounts));
  const arrA = detailState.data.comments?.map((x) => x.challengeCounts);
  const arrB = detailState.data.comments?.map((x) => x.todoCounts);
  console.log(arrA);
  console.log(arrB);
  console.log(arrA?.map((x, y) => x + arrB[y])); // [6, 8, 10, 12,]
  const cardImg =
    detailState.data.todoInfo?.challengeCounts +
    detailState.data.todoInfo?.todoCounts;
  const comment = arrA?.map((x, y) => x + arrB[y]);
  console.log(comment);
  console.log(comment?.map((x, idx) => x));
  console.log(cardImg);
  // const cardImg = detailState.data.todoInfo?.challengeCounts + detailState.data.todoInfo?.todoCounts
  // const comment =  detailState.data.comments?.map((x) => x.challengeCounts) + detailState.data.comments?.map((x) => x.todoCounts)
  //옵셔널 체이닝 해제했을 때
  //console.log(detailState)의 값을 확인하면 좋아요
  //https://velog.io/@yiseul/Cannot-read-properties-of-undefined-%EC%97%90%EB%9F%AC

  //useEffect의 위치 선정 중요.
  useEffect(() => {
    //토큰체크 후 없으면 로그인페이지 이동
    if (tokenChecker() === false) {
      alert("로그인 후 이용해주세요.");
      navigate("/mypage");
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    async function feedLoading() {
      await dispatch(getFeedDetailFetch({ todoId: params.todoId }));
      setLoading(false);
    }
    feedLoading();
    // setTimeout(()=> {
    //   setLoading(false)
    // },500)
  }, []);

  // 대연 -> 일단 주석 처리했습니다
  // useEffect(() => {
  //   if (loading === true) {
  //     if (detailState.data.length === 0) {
  //       navigate("/todolists");
  //     }
  //   }
  // }, []);
  // useEffect(() => {
  //   if (
  //     detailState.errorMessage !== undefined &&
  //     detailState.errorMessage !== ""
  //   ) {
  //     alert(detailState.errorMessage);
  //     navigate("/todolists");
  //   }
  // }, [detailState]);

  const onClickGoToOtherspage = (e) => {
    e.preventDefault();
    navigate(`/otherspage/${e.target.id}`);
  };

  const onClickCommentGoToOtherspage = (e) => {
    e.preventDefault();
    navigate(`/otherspage/${e.target.id}`);
  };

  const onClickDeleteComment = (e) => {
    e.preventDefault();
    const deleteCommentFetch = async () => {
      try {
        const response = await instance.delete(`/comments/${commentId}`);
        if (response.data.message === "success") {
          dispatch(getFeedDetailFetch({ todoId: params.todoId }));
          setCommentId("");
          setMenuModal(false);
        }
      } catch (error) {
        return alert("댓글 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    };
    deleteCommentFetch();
  };

  const setMyTodayChallenge = (e) => {
    e.preventDefault();
    const postFeedDetailFetch = async () => {
      try {
        const response = await instance.post(
          `/mytodos/${e.target.id}/challenged`
        );
        if (response.data.message === "success") {
          return navigate("/setuptodo");
        }
      } catch (error) {
        return alert(
          "도전하기 설정에 실패했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    };
    postFeedDetailFetch();
    // dispatch(postFeedDetailFetch(e.target.id))
  };

  const upLoadCommentData = (e) => {
    e.preventDefault();
    if (inputRef.current.value === "") {
      return alert("댓글을 입력해주세요");
    }
    if (inputRef.current.value.trim().length === 0) {
      return alert("댓글을 입력해주세요");
    }
    const postCommentFetch = async () => {
      try {
        const response = await instance.post(`/comments/${params.todoId}`, {
          comment: inputRef.current.value.trim(),
        });
        if (response.data.message === "success") {
          return dispatch(getFeedDetailFetch({ todoId: params.todoId }));
        }
      } catch (error) {
        return alert("댓글 등록에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    };
    postCommentFetch();
    // dispatch(postCommentFetch({comment:inputRef.current.value, todoId:params.todoId }))
    inputRef.current.value = "";
  };

  const changeFollowState = (e) => {
    const putMyPageFollowFetch = async () => {
      try {
        const response = await instance.put(`/follows/${e.target.id}`);
        if (response.data.message === "success") {
          return dispatch(getFeedDetailFetch({ todoId: params.todoId }));
        }
      } catch (error) {
        return alert("처리에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    };
    putMyPageFollowFetch();
    // dispatch(putMyPageFollowFetch(e.target.id))
  };

  const myData = decodeMyTokenData();

  function displayCardMenu(event) {
    setCommentId(event.target.id);
    event.stopPropagation();
    setMenuModal(!menuModal);
    setCommentId(event.target.id);
  }

  function closeToPopUp() {
    setMenuModal(!menuModal);
  }

  const gradeChangeModalState = () => {
    setGradeModalState(!gradeModalState);
  };
  return (
    <>
      {loading === true ? <LoadingContainer /> : <></>}
      <StTotalWrap>
        {menuModal === true ? (
          <StShadowBackgroundDiv>
            <StBackGroundCloseDiv onClick={closeToPopUp} />
            <StPopUpWhiteButton
              onClick={onClickDeleteComment}
              transform="translateY(68vh)"
            >
              삭제
            </StPopUpWhiteButton>
            <StPopUpWhiteButton
              onClick={displayCardMenu}
              transform="translateY(77vh)"
            >
              닫기
            </StPopUpWhiteButton>
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
                  <StIcon src={process.env.PUBLIC_URL + `/images/미콩.png`} />
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
                  <StIcon src={process.env.PUBLIC_URL + `/images/미알.png`} />
                  <StExplain>
                    <StExplainName>미알</StExplainName>
                    <StExplainContent>
                      <span style={{ fontWeight: 700 }}>월4~5회</span>
                    </StExplainContent>
                    <StExplainContent>
                      미믹 도전완료 + 미믹 제안
                    </StExplainContent>
                  </StExplain>
                </StIconExplainWrap>

                <StIconExplainWrap>
                  <StIcon src={process.env.PUBLIC_URL + `/images/미돌.png`} />
                  <StExplain>
                    <StExplainName>미돌</StExplainName>
                    <StExplainContent>
                      <span style={{ fontWeight: 700 }}>월6~7회</span> 미믹 도전
                    </StExplainContent>
                    <StExplainContent>
                      미믹 도전완료 + 미믹 제안
                    </StExplainContent>
                    <StExplainContent>
                      {/* 명예의 전당<span style={{ fontWeight: 700 }}>1회 등극</span> */}
                    </StExplainContent>
                  </StExplain>
                </StIconExplainWrap>

                <StIconExplainWrap>
                  <StIcon src={process.env.PUBLIC_URL + `/images/미킹.png`} />
                  <StExplain>
                    <StExplainName>미킹</StExplainName>
                    <StExplainContent>
                      <span style={{ fontWeight: 700 }}>월8회 이상</span> 미믹
                      도전
                    </StExplainContent>
                    <StExplainContent>
                      미믹 도전완료 + 미믹 제안
                    </StExplainContent>
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

        {Object.keys(detailState.data).length === 0 ? (
          <></>
        ) : (
          <div style={{background:"white"}}>
            <StProfilWrap>
              <StUserIdBox>
                <StProfileBox>
                  <StProfileImg
                    src={
                      detailState.data.todoInfo.profile !== "none"
                        ? detailState.data.todoInfo.profile
                        : "https://mimicimagestorage.s3.ap-northeast-2.amazonaws.com/profile/placeHolderImage.jpg"
                    }
                  />
                </StProfileBox>
                <StNickMBTIWarp>
                  <StNickname
                    id={detailState.data.todoInfo.userId}
                    onClick={onClickGoToOtherspage}
                  >
                    {detailState.data.todoInfo.nickname}
                  </StNickname>
                  <StMBTI>{detailState.data.todoInfo.mbti}</StMBTI>
                </StNickMBTIWarp>

                <StGradeImageBox>
                  {cardImg < 3 ? (
                    <StImage
                      src={process.env.PUBLIC_URL + `/images/미콩.png`}
                      width="59.38"
                      height="71"
                    />
                  ) : cardImg < 5 ? (
                    <StImage
                      src={process.env.PUBLIC_URL + `/images/미알.png`}
                      width="59.38"
                      height="71"
                    />
                  ) : cardImg < 7 ? (
                    <StImage
                      src={process.env.PUBLIC_URL + `/images/미돌.png`}
                      width="59.38"
                      height="71"
                    />
                  ) : cardImg < 9 ? (
                    <StImage
                      src={process.env.PUBLIC_URL + `/images/미킹.png`}
                      width="59.38"
                      height="71"
                    />
                  ) : (
                    <></>
                  )}
                </StGradeImageBox>

                {/* {myData.userId === detailState.data.todoInfo.userId ? (
                  <></>
                ) : detailState.data.isFollowed === false ? (
                  <StFollowBtn
                    id={detailState.data.todoInfo.userId}
                    onClick={changeFollowState}>
                    팔로우
                  </StFollowBtn>
                ) : (
                  <StFollowBtn
                    id={detailState.data.todoInfo.userId}
                    onClick={changeFollowState}>
                    언팔로우
                  </StFollowBtn>
                )} */}
                <StGradeWrap>
                  <StGradeWrod>
                    {" "}
                    {cardImg < 3 ? (
                      gradeList[0]
                    ) : cardImg < 5 ? (
                      gradeList[1]
                    ) : cardImg < 7 ? (
                      gradeList[2]
                    ) : cardImg < 9 ? (
                      gradeList[3]
                    ) : (
                      <></>
                    )}
                  </StGradeWrod>
                  <StGradeExplain onClick={gradeChangeModalState}>
                    미믹등급
                  </StGradeExplain>
                </StGradeWrap>
              </StUserIdBox>

              <StDetailCard>
                <DetailCard data={detailState.data.todoInfo} />
              </StDetailCard>
              {detailState.data.isTodayDone === true ? (
                <StBtnNowChallenged>
                  이미 오늘의 도전이 진행중입니다.
                </StBtnNowChallenged>
              ) : (
                <StBtnGoToChallenge
                  onClick={setMyTodayChallenge}
                  id={detailState.data.todoInfo.todoId}
                >
                  도전할래요!
                </StBtnGoToChallenge>
              )}
            </StProfilWrap>
            <StCommentWrap
            >
            
              {detailState.data.comments?.map((x, index) => {
                return (
                  <StWhite>
                  <div key={index} style={{background:"white"}}>
                    <StCommentBox>
                      <StImgNickname>
                        <StProfileBox width="32px" height="32px">
                          <StProfileImg
                            width="auto"
                            height="32px"
                            borderRadius="16px"
                            src={
                              x.profile !== "none"
                                ? x.profile
                                : "https://mimicimagestorage.s3.ap-northeast-2.amazonaws.com/profile/placeHolderImage.jpg"
                            }
                          />
                        </StProfileBox>

                        <StNicknameComment
                          id={x.userId}
                          onClick={onClickCommentGoToOtherspage}
                        >
                          {x.nickname}
                        </StNicknameComment>
                        <div id={x.userId}></div>
                        <StCommentGrade>
                          {x.challengeCounts + x.todoCounts < 3 ? (
                            gradeWordList[0]
                          ) : x.challengeCounts + x.todoCounts < 5 ? (
                            gradeWordList[1]
                          ) : x.challengeCounts + x.todoCounts < 7 ? (
                            gradeWordList[2]
                          ) : x.challengeCounts + x.todoCounts < 9 ? (
                            gradeWordList[3]
                          ) : (
                            <></>
                          )}
                        </StCommentGrade>

                        <StChangeDeleteBtn>
                          {myData.userId === x.userId ? (
                            <StMenuBtn
                              id={x.commentId}
                              onClick={displayCardMenu}
                            >
                              <FontAwesomeIcon
                                style={{ pointerEvents: "none" }}
                                icon={faEllipsisVertical}
                              />
                            </StMenuBtn>
                          ) : (
                            <></>
                          )}
                        </StChangeDeleteBtn>
                      </StImgNickname>
                      <StComment>{x.comment}</StComment>
                    </StCommentBox>
                  </div>
                  </StWhite>
                );
                
              })}
            </StCommentWrap>

            <StWriteComment onSubmit={upLoadCommentData}>
              <StProfileBox>
                <StProfileImg
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                  src={
                    detailState.data.loginUserProfile !== "none"
                      ? detailState.data.loginUserProfile
                      : "https://mimicimagestorage.s3.ap-northeast-2.amazonaws.com/profile/placeHolderImage.jpg"
                  }
                />
              </StProfileBox>
              <StInput
                type="text"
                name="comment"
                placeholder="댓글 내용"
                ref={inputRef} //!ref를 참고하겠다.
                maxLength="159"
              />
              <StCommentBtn type="submit">작성</StCommentBtn>
            </StWriteComment>
          </div>
        )}
      </StTotalWrap>
    </>
  );
}

export default FeedDetailContainer;
const StWhite =styled.div`
  /* display: flex; */
  background-color: yellow;
`
const StTotalWrap = styled.div`
  display: flex;
  margin-top: 60px;
  width: 500px;

  margin-bottom: 60px;
  
  @media only screen and (max-width: 500px) {
    width: 360px;
    margin-top: 60px;
  }
`;
const StCommentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-bottom:20px;
  margin-left: 20px;
  -webkit-tap-highlight-color: transparent;
  /* margin: 0px auto 20px 20px; */
  /* -webkit-tap-highlight-color: transparent; */
  @media only screen and (max-width: 500px) {
    margin:0px 0px 14.4px 14.4px;
  }
`;

const StUserIdBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
  margin-left: 20px;
  align-items: center;
  @media only screen and (max-width: 500px) {
    /* width: 90%; */
    margin: 0px;
  }
`;

const StProfilWrap = styled.div`
  width: 500px;
  background-color: #edecec;
  padding-top: 20px;
  padding-bottom: 10px;
  @media only screen and (max-width: 500px) {
    width: 360px;
    padding-top: 14.4px;
  padding-bottom: 7.2px;
  }
`;
const StCommentWrap =styled.div`
  width: 500px;
  background: white;
  padding: 30px 0px;
  @media only screen and (max-width: 500px) {
    width: 360px;

    padding-top:21.6px;
  }
  
`
const StImgNickname = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  @media only screen and (max-width: 500px) {
    width: 90%;
    height: 27px;
  }
`;

const StProfileBox = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: arrow;
  ${({ width, height }) => {
    return css`
      width: ${width || "50px"};
      height: ${height || "50px"};

    `;
  }}
  /* width:50px;
  height:50px; */
  border-radius:50%;
  overflow: hidden;
  margin: 10px;
  @media only screen and (max-width: 500px) {
    margin-left: 8.64px;
  }
`;
const StProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: arrow;
  @media only screen and (max-width: 500px) {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

const StNickMBTIWarp = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 16px;
  @media only screen and (max-width: 500px) {
    margin-left: 0px;
  }
`;

const StNickname = styled.div`
  text-align: start;
  font-weight: 500;
  font-size: 22px;
  cursor: pointer;
  width: 260px;
  transition: ease 0.1s;
  &:hover {
    color: #5e5c5c;
  }
  -webkit-tap-highlight-color: transparent;
  @media only screen and (max-width: 500px) {
    font-size: 17px;
    margin-right: 10px;
    width: 185px;
  }
`;

const StMBTI = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #5e5c5c;

  text-align: start;

  @media only screen and (max-width: 500px) {
    font-size: 12px;
    margin-left: 1px;
  }
`;
const StFollowBtn = styled.button`
  background: none;
  border: none;
  margin-left: auto;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #ff6d53;
  transition: ease 0.1s;
  :hover {
    color: #ffafa1;
  }
  cursor: pointer;
  @media only screen and (max-width: 500px) {
    font-size: 14px;
    -webkit-tap-highlight-color: transparent;
  }
`;

const StDetailCard = styled.div`

  margin: auto;
  margin-top: 15px;
  @media only screen and (max-width: 500px) {
    width: 345px;
    margin-left: 5px;
    margin-top: 20px;
    text-align: center;
    align-items: center;
  }
`;
const StNicknameComment = styled.div`
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  cursor: pointer;
  transition: ease 0.1s;
  &:hover {
    color: #5e5c5c;
  }
  @media only screen and (max-width: 500px) {
    font-size: 14px;
  }
`;
const StCommentGrade = styled.div`
  display: flex;
  margin-left: 12px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  color: #ff6d53;
  height: 18px;
  @media only screen and (max-width: 500px) {
    font-size: 11px;
  }
`;
const StComment = styled.div`
  align-items: flex-start;
  text-align: start;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  margin-left: 50px;
  margin-right: 50px;
  word-wrap: break-word;
  @media only screen and (max-width: 500px) {
    margin-left: 50px;
    font-size: 12px;
  }
`;

const StChangeDeleteBtn = styled.div`
  text-align: right;
  margin-left: auto;
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

const StWriteComment = styled.form`
  background-color: white;
  border-top: 1px solid #c7c7c7;
  position: fixed;
  display: flex;
  align-items: center;
  width: 500px;
  height: 70px;
  bottom: 0;
  z-index: 7;
  padding: 4px 0;
  -webkit-tap-highlight-color: transparent;
  @media only screen and (max-width: 500px) {
    width: 360px;
  }
`;

const StInput = styled.input`
  margin-left: auto;
  margin-right: 15px;
  border: 1px solid #979797;
  border-radius: 6px;
  width: 70%;
  max-width: 320px;
  height: 55px;
  padding-left: 20px;
  padding-right: 70px;
  font-weight: 500;
  font-size: 18px;
  ::placeholder {
    font-weight: 500;
    font-size: 18px;
  }
`;

const StCommentBtn = styled.button`
  color: #ff6d53;
  z-index: 8;
  width: 60px;
  height: 32px;
  font-weight: 500;
  position: absolute;
  font-size: 18px;
  background-color: white;
  border: none;
  margin-top: 5px;
  padding: 0;
  right: 0;
  transform: translateX(-40%) translateY(-10%);
  cursor: pointer;

  transition: ease 0.1s;
  :hover {
    color: #ffafa1;
    transform: translateX(-40%) translateY(-10%);
  }
`;
const StBtnGoToChallenge = styled.button`
  background: #ff6d53;
  border-radius: 6px;
  border: none;
  width: 90%;
  height: 60px;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  margin: 10px;
  -webkit-tap-highlight-color: transparent;
  @media only screen and (max-width: 500px) {
    font-size: 18px;
    height: 50px;
  }

  transition: ease 0.05s;
  &:hover {
    background: #ffa595;
  }
`;

const StBtnNowChallenged = styled.button`
  background: #979797;
  border-radius: 6px;
  border: none;
  width: 90%;
  height: 60px;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  color: #ffffff;
  text-align: center;
  cursor: arrow;
  margin: 10px;
  -webkit-tap-highlight-color: transparent;

  transition: ease 0.05s;
  @media only screen and (max-width: 500px) {
    font-size: 18px;
    height: 50px;
  }
`;

const StPopUpWhiteButton = styled.button`
  background: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  font-size: 22px;
  font-weight: 500;
  color: #979797;

  border: none;
  outline: none;
  margin: 0 25px;
  border-radius: 6px;

  width: 90%;
  height: 70px;
  z-index: 11;
  transform: ${(props) => props.transform};
  cursor: pointer;
  @media only screen and (max-width: 500px) {
    width: 90%;
    margin: -50px 20px 50px 20px;
  }
`;

const StGradeImageBox = styled.div`
  display: flex;
`;
const StImage = styled.img`
  display: flex;
  width: 46px;
  height: 55px;
  @media only screen and (max-width: 500px) {
    width: 33px;
    height: 40px;
  }
`;

const StGradeModalContainer = styled.div`
  background: white;
  border-radius: 6px;
  padding: 25px;
  margin: 10vh auto;
  width: 450px;
  height: 750px;
  box-sizing: border-box;
  @media screen and (max-width: 500px) {
    width: 324px;
    margin: 18px;
    height: 660px;
  }
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

const StGradeModalTotalWrap = styled.div`
  flex-direction: column;
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
`;
const StText = styled.p`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #919191;
  margin: 0;
  margin-bottom: 42px;
  @media screen and (max-width: 500px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;
const StIconExplainWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  text-align: start;
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
  }
`;
const StExplain = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  margin-left: 42px;
`;
const StExplainName = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #ff6d53;
`;
const StExplainContentWrap = styled.div`
  display: flex;
  margin-top: 8px;
  flex-direction: column;
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
const StGradeWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  margin-left: 11px;
`;
const StGradeWrod = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #ff6d53;
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;
const StGradeExplain = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  text-decoration-line: underline;
  color: #919191;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 8px;
  }
`;
