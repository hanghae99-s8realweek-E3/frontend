import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { getFeedDetailFetch } from "../../../app/modules/detailSlice";
import { decodeMyTokenData, tokenChecker } from "../../../utils/token";
import instance from "../../../app/modules/instance";
import DetailCard from "./DetailCard";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StShadowBackgroundDiv } from "../../interface/styledCommon";
import LoadingContainer from "../../../utils/loadingState";

function FeedDetailContainer() {
  const inputRef = useRef();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
  const [commentId, setCommentId] = useState("");

  //useEffect의 위치 선정 중요.
  useEffect(() => {
    //토큰체크 후 없으면 로그인페이지 이동
    if (tokenChecker() === false) {
      alert("로그인 후 이용해주세요.");
      navigate("/mypage");
    }
  }, []);

  const detailState = useSelector((state) => state.detail);

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

  useEffect(() => {
    if (loading === true) {
      if (detailState.data.length === 0) {
        navigate("/todolists");
      }
    }
  }, []);

  useEffect(() => {
    if (
      detailState.errorMessage !== undefined &&
      detailState.errorMessage !== ""
    ) {
      alert(detailState.errorMessage);
      navigate("/todolists");
    }
  }, [detailState]);

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
        return alert(error.response.data.errorMessage);
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
        return alert(error.response.data.errorMessage);
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
    const postCommentFetch = async () => {
      try {
        const response = await instance.post(`/comments/${params.todoId}`, {
          comment: inputRef.current.value,
        });
        if (response.data.message === "success") {
          return dispatch(getFeedDetailFetch({ todoId: params.todoId }));
        }
      } catch (error) {
        return alert(error.response.data.errorMessage);
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
        return alert(error.response.data.errorMessage);
      }
    };
    putMyPageFollowFetch();
    // dispatch(putMyPageFollowFetch(e.target.id))
  };

  

  const myData = decodeMyTokenData();

  function displayCardMenu(event) {
    event.stopPropagation();
    setMenuModal(!menuModal);
    setCommentId(event.target.id);
  }

  return (
    <>
      {loading === true ? <LoadingContainer /> : <></>}

      <div style={{ marginTop: "60px", marginBottom: "220px" }}>
        {menuModal === true ? (
          <StShadowBackgroundDiv>
            <StPopUpWhiteButton
              onClick={onClickDeleteComment}
              transform="translateY(76vh)">
              삭제
            </StPopUpWhiteButton>
            <StPopUpWhiteButton
              onClick={displayCardMenu}
              transform="translateY(77vh)">
              닫기
            </StPopUpWhiteButton>
          </StShadowBackgroundDiv>
        ) : (
          <></>
        )}

        {Object.keys(detailState.data).length === 0 ? (
          <></>
        ) : (
          <div>
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
                    onClick={onClickGoToOtherspage}>
                    {detailState.data.todoInfo.nickname}
                  </StNickname>
                  <StMBTI>{detailState.data.todoInfo.mbti}</StMBTI>
                </StNickMBTIWarp>
                {myData.userId === detailState.data.todoInfo.userId ? (
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
                )}
              </StUserIdBox>
              <StDetailCard>
                <DetailCard data={detailState.data.todoInfo} />
              </StDetailCard>
              {detailState.data.isTodayDone === "false" ? (
                <></>
              ) : (
                <StBtnGoToChallenge
                  onClick={setMyTodayChallenge}
                  id={detailState.data.todoInfo.todoId}>
                  도전할래요!
                </StBtnGoToChallenge>
              )}
            </StProfilWrap>
            <div
              style={{
                width: "100%",
                background: "white",
                padding: "10px 0",
              }}>
              {detailState.data.comments?.map((x, index) => {
                return (
                  <div key={index}>
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
                          onClick={onClickCommentGoToOtherspage}>
                          {x.nickname}
                        </StNicknameComment>
                        <StChangeDeleteBtn>
                          {myData.userId === x.userId ? (
                            <StMenuBtn
                              id={x.commentId}
                              onClick={displayCardMenu}>
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                            </StMenuBtn>
                          ) : (
                            <></>
                          )}
                        </StChangeDeleteBtn>
                      </StImgNickname>
                      <StComment>{x.comment}</StComment>
                    </StCommentBox>
                  </div>
                );
              })}
            </div>

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
              />
              <StCommentBtn type="submit">작성</StCommentBtn>
            </StWriteComment>
          </div>
        )}
      </div>
    </>
  );
}

export default FeedDetailContainer;

const StCommentBox = styled.div`
  /* background-color:red; */
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 15px auto 15px 20px;
  -webkit-tap-highlight-color: transparent;
`;
const StUserIdBox = styled.div`
  /* background-color:yellow; */
  display: flex;
  flex-direction: row;
  width: 450px;
  margin: auto;
  /* margin: 0px auto 10px 20px; */
  /* margin-left: 21px; */
  align-items: center;
  /* cursor: pointer; */
  @media only screen and (max-width: 500px) {
    width: 90%;
  }
`;

const StProfilWrap = styled.div`
  /* background-color:yellow; */

  background-color: #edecec;
  padding-top: 20px;
  padding-bottom: 10px;
`;

const StImgNickname = styled.div`
  /* background-color:green; */
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  cursor: pointer;
  @media only screen and (max-width: 500px) {
    width: 90%;
    height: 50px;
  }
`;

const StProfileBox = styled.div`
  /* background-color:yellow; */

  display: flex;
  justify-content: center;
  align-items: center;
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
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 20px;
  }
`;

const StProfileImg = styled.img`
  /* background-color: gray; */
  /* border-radius: 15px; */
  /* cursor: pointer; */
  /* width:30px;
  height:30px;
  margin:10px; */
  ${({ width, height, margin, borderRadius }) => {
    return css`
      width: ${width || "auto"};
      height: ${height || "50px"};
      /* margin: ${margin || "10px"}; */
      /* border-radius: ${borderRadius || "25px"}; */
    `;
  }}
  @media only screen and (max-width: 500px) {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const StNickMBTIWarp = styled.div`
  display: flex;
  flex-direction: column;
`;

const StNickname = styled.div`
  /* background-color:red; */
  text-align: start;
  margin-right: 18px;
  font-weight: 500;
  font-size: 22px;
  cursor: pointer;
  /* margin-top:5px; */
  /* border:1px solid; */
  transition: ease 0.1s;
  &:hover {
    color: #5e5c5c;
  }
  -webkit-tap-highlight-color: transparent;
  @media only screen and (max-width: 500px) {
    font-size: 18px;
    margin-right: 10px;
  }
`;

const StMBTI = styled.div`
  /* background-color:red; */
  font-weight: 500;
  font-size: 18px;
  color: #5e5c5c;
  margin-left: 3px;
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
  /* background-color: red; */
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
    margin-left: 70px;
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
const StItem = styled.div`
  /* background-color:blue; */
  display: flex;
  flex-direction: row;
  border-radius: 1px solid red;
`;

const StInputWrap = styled.div`
  margin-top: 5px;
  margin-bottom: 75px;
`;

const StInput = styled.input`
  /* background-color:red; */
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
  width: 450px;
  height: 70px;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  margin: 10px;
  -webkit-tap-highlight-color: transparent;
  @media only screen and (max-width: 500px) {
    width: 90%;
  }

  transition: ease 0.05s;
  &:hover {
    background: #ffa595;
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
  margin: 0 25px;
  border-radius: 6px;

  width: 90%;
  height: 70px;
  transform: ${(props) => props.transform};
  cursor: pointer;
  @media only screen and (max-width: 500px) {
    width: 90%;
    margin: -50px 20px 50px 20px;
  }
`;
