import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { getFeedDetailFetch } from "../../../app/modules/detailSlice";
import { decodeMyTokenData, tokenChecker } from "../../../utils/token";
import instance from "../../../app/modules/instance";
import DetailCard from "./DetailCard";

function FeedDetailContainer() {
  const inputRef = useRef();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //useEffect의 위치 선정 중요.
  useEffect(() => {
    //토큰체크 후 없으면 로그인페이지 이동
    if (tokenChecker() === false) {
      alert("로그인 후 이용해주세요.");
      navigate("/mypage");
    }
  }, []);

  const detailState = useSelector((state) => state.detail.data);
  console.log(detailState);

  useEffect(() => {
    dispatch(getFeedDetailFetch({ todoId: params.todoId }));
    setLoading(true);
  }, []);

  useEffect(() => {
    if (loading === true) {
      if (detailState.length === 0) {
        navigate("/todolists");
      }
    }
  });

  const onClickGoToOtherspage = (e) => {
    e.preventDefault();
    console.log(e.target.id);
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
        const response = await instance.delete(`/comments/${e.target.id}`);
        if (response.data.message === "success") {
          return dispatch(getFeedDetailFetch({ todoId: params.todoId }));
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

  return (
    <div style={{ marginTop: "80px", marginBottom: "220px" }}>
      {Object.keys(detailState).length === 0 ? (
        <></>
      ) : (
        <div>
          <StUserIdBox>
            <StProfileImg src={detailState.todoInfo.profileImg} />
            <StNickname
              id={detailState.todoInfo.userId}
              onClick={onClickGoToOtherspage}>
              {detailState.todoInfo.User.nickname}
            </StNickname>
            {detailState.isFollowed === false ? (
              <StFollowBtn
                id={detailState.todoInfo.userId}
                onClick={changeFollowState}>
                팔로우
              </StFollowBtn>
            ) : (
              <StFollowBtn
                id={detailState.todoInfo.userId}
                onClick={changeFollowState}>
                언팔로우
              </StFollowBtn>
            )}
          </StUserIdBox>
        
          <DetailCard data={detailState.todoInfo} />
          
          <div>
            {detailState.isTodayDone === "false" ? (
              <></>
            ) : (
              <StBtnGoToChallenge
                onClick={setMyTodayChallenge}
                id={detailState.todoInfo.todoId}>
                도전할래요!
              </StBtnGoToChallenge>
            )}
            <div
              style={{
                width: "100%",
                background: "white",
                padding: "10px 0",
                marginTop: "10px",
              }}>
              {detailState.todoInfo.Comments?.map((x, index) => {
                return (
                  <div key={index}>
                    <StCommentBox>
                      <StImgNickname>
                        <StProfileImg
                          width="20px"
                          height="20px"
                          borderRadius="10px"
                          src={x.User.profileImg}
                        />
                        <StNickname
                          id={x.userId}
                          onClick={onClickCommentGoToOtherspage}>
                          {x.User.nickname}
                        </StNickname>
                        <StChangeDeleteBtn>
                          {myData.userId === x.userId ? (
                            <StDeleteBtn
                              type="submit"
                              id={x.commentId}
                              onClick={onClickDeleteComment}>
                              삭제
                            </StDeleteBtn>
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
          </div>
          <StWriteComment onSubmit={upLoadCommentData}>
            <StItem>
              <StInputWrap>
                <StProfileImg />
                <StInput
                  type="text"
                  name="comment"
                  placeholder="댓글 내용"
                  ref={inputRef} //!ref를 참고하겠다.
                />
                <StCommentBtn type="submit">작성</StCommentBtn>
              </StInputWrap>
            </StItem>
          </StWriteComment>
        </div>
      )}
    </div>
  );
}

export default FeedDetailContainer;

const StCommentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 30px auto 30px 20px;
`;
const StUserIdBox = styled.div`
  /* background-color:yellow; */
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: 0px auto 10px 20px;
  align-items: center;
`;

const StImgNickname = styled.div`
  /* background-color:green; */
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const StProfileImg = styled.img`
  background-color: gray;
  border-radius: 15px;
  /* width:30px;
  height:30px;
  margin:10px; */
  ${({ width, height, margin, borderRadius }) => {
    return css`
      width: ${width || "30px"};
      height: ${height || "30px"};
      margin: ${margin || "10px"};
      border-radius: ${borderRadius || "15px"};
    `;
  }}
`;
const StNickname = styled.div`
  /* background-color:red; */
  width: 200px;
  /* margin-top:5px; */
  /* border:1px solid; */
`;
const StFollowBtn = styled.button`
  /* background-color:white; */
  border: none;
  margin-left: auto;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #ff6d53;
  :hover {
  }
  cursor: pointer;
`;
const StComment = styled.div`
  align-items: flex-start;
  text-align: start;
  font-size: 15px;
  margin-left: 40px;
  margin-right: 50px;
  word-wrap: break-word;
`;

const StChangeDeleteBtn = styled.div`
  text-align: right;
  margin-left: auto;
`;

const StDeleteBtn = styled.button`
  font-size: 15px;
  color: gray;
  margin-right: 10px;
  border: none;
  background-color: white;
  :hover {
  }
  cursor: pointer;
`;

const StWriteComment = styled.form`
  background-color: white;
  position: fixed;
  display: flex;
  width: 500px;
  bottom: 0;
  height: 216px;
  z-index: 6;
`;
const StItem = styled.div`
  /* background-color:blue; */
  display: grid;
  display: inline-grid;
`;

const StInputWrap = styled.div`
  margin-top: 5px;
  margin-bottom: 80px;
`;

const StInput = styled.input`
  /* background-color:red; */
  position: relative;
  border: 1px solid #979797;
  border-radius: 6px;
  width: 90%;
  max-width: 355px;
  height: 55px;
  position: absolute;
  padding-left: 10px;
  padding-right: 70px;
`;

const StCommentBtn = styled.button`
  color: #ff6d53;
  position: absolute;
  z-index: 2;
  width: 60px;
  height: 32px;
  background-color: white;
  border: none;
  margin: 0;
  padding: 0;
  right: 0;
  transform: translateX(-60%) translateY(40%);
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
`;
