import React,{useEffect, useRef, useState} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { getFeedDetailFetch } from "../../../app/modules/detailSlice";
import {decodeMyTokenData, tokenChecker} from "../../../utils/token"
import ChallengeCard from "../../common/ChallengeCard";
import instance from "../../../app/modules/instance";

function FeedDetailContainer () {
    const inputRef = useRef();
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const comm = useSelector((state)=> state.comments) ///삭제한다!!!
    
    //useEffect의 위치 선정 중요.
    useEffect(()=> {
      //토큰체크 후 없으면 로그인페이지 이동  
      if (tokenChecker() === false){
        alert("로그인 후 이용해주세요.");
        navigate('/mypage');
        }
      },[])

    const detailState = useSelector((state) =>  state.detail)
    
    //삭제한다!!! 
    // const initialState = { 
    //       comment: "",
    //     }
    // const[feedComment, setFeedComment] =useState(initialState);

    useEffect(() => {
        dispatch(getFeedDetailFetch({todoId:params.todoId}));
      },[]);

    // const onChangeInputComment = (e)=> {
    //     // setFeedComment({...feedComment, comment:e.target.value}) //삭제한다!!!
    // }

    const onClickDeleteComment = (e) => {
      e.preventDefault();
      const deleteCommentFetch = async () => {
        const response = await instance.delete(`/comments/${e.target.id}`)
        if (response.data.message === "success") {
          return dispatch(getFeedDetailFetch({todoId:params.todoId}));
        } else {
          return alert(response.response.data.errorMessage)
        }
      }
      deleteCommentFetch();
        // dispatch(deleteCommentFetch(e.target.id))
    }

    const setMyTodayChallenge = (e)=> {
      e.preventDefault();
      //payload
      //통신
      const postFeedDetailFetch = async () => {
        const response = await instance.post(`/mytodos/${e.target.id}/challenged`);
        if (response.data.message === "success") {
          return navigate('/setuptodo')
        } else {
          return alert(response.response.data.errorMessage)
        }
      }
      postFeedDetailFetch()
      // dispatch(postFeedDetailFetch(e.target.id))
    }

    const upLoadCommentData = (e) => {
        e.preventDefault();
        const postCommentFetch = async () => {
          const response = await instance.post(`/comments/${params.todoId }`,{comment:inputRef.current.value});
          if (response.data.message === "success") {
            return dispatch(getFeedDetailFetch({todoId:params.todoId}));
          } else {
            return alert(response.response.data.errorMessage)
          }
        }
        postCommentFetch();
        // dispatch(postCommentFetch({comment:inputRef.current.value, todoId:params.todoId }))
        inputRef.current.value="";
    } 

    const changeFollowState = (e) => {
      const putMyPageFollowFetch = async () => {
        const response = await instance.put(`/follows/${e.target.id}`);
        if (response.data.message === "success") {
          return dispatch(getFeedDetailFetch({todoId:params.todoId}));
        } else {
          return alert(response.response.data.errorMessage);
        }
      }
      putMyPageFollowFetch();
      // dispatch(putMyPageFollowFetch(e.target.id))
    }

    const myData = decodeMyTokenData()
    
    return (
    <div style={{marginTop:"80px", marginBottom:"140px"}}>
      {Object.keys(detailState.data).length === 0 ? <></> :  
      <div>
        <StUserIdBox>
          <StProfileImg src={detailState.data.profileImg}/>
          <StNickname>{detailState.data.nickname}</StNickname>
            {(detailState.data.isFollowed) === false ? <StFollowBtn id={detailState.data.userId} onClick={changeFollowState}>팔로우</StFollowBtn> : <StFollowBtn id={detailState.data.userId} onClick={changeFollowState}>언팔로우</StFollowBtn>}
        </StUserIdBox>
          <ChallengeCard id={detailState.data.userId} data={detailState.data} hideState="true"></ChallengeCard>
        <div>
          {detailState.data.comment.length ===0? <></> : detailState.data.comment.map((x,index)=> {
            return  <div key={index}>
                    <StCommentBox>
                      <StImgNickname>
                        <StProfileImg src={x.profileImg}/>
                        <StNickname>{x.nickname}</StNickname>
                      </StImgNickname>
                          <StComment>{x.comment}</StComment>
                            <StChangeDeleteBtn>
                                {myData.userId === x.userId ? <StDeleteBtn type="submit" id={x.commentId} onClick={onClickDeleteComment}>삭제</StDeleteBtn> : <></>}
                            </StChangeDeleteBtn>
                    </StCommentBox>
                    </div>

          })}
        </div>
          <StWriteComment onSubmit={upLoadCommentData}>
            <StItem>
              <StInputWrap>
                <StProfileImg></StProfileImg>
                  <StInput
                  type="text"
                  name="comment"
                  placeholder="댓글 입력"
                  ref={inputRef} //!ref를 참고하겠다.
                  />
                  <StCommentBtn type="submit">작성</StCommentBtn>
                </StInputWrap>
              </StItem>
          </StWriteComment>
        <button onClick={setMyTodayChallenge} id={detailState.data.todoId}>오늘의 도전!</button>
      </div>}
    </div>
    )
}

export default FeedDetailContainer;

const StCommentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin:20px auto 20px 20px;
`
const StUserIdBox = styled.div`
  display: flex;
  flex-direction: row;
  width:100%;
  margin:0px auto 10px 20px;
  align-items: center;
`

const StImgNickname = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width:100%;
`

const StProfileImg = styled.img`
  background-color:gray;
  border-radius:15px;
  width:30px;
  height:30px;
  margin:10px;
`
const StNickname = styled.div`
/* margin-top:5px; */
/* border:1px solid; */
`
const StFollowBtn = styled.button`
  border:none;
  background-color:white;
  margin-left:250px;
  :hover{
      }
      cursor: pointer;
`
const StComment = styled.div`
  align-items:flex-start;
  text-align: start;
  font-size:15px;
  margin-left:10px;
`

const StChangeDeleteBtn=styled.div`
  text-align: right;
  margin-right: 20px;
`

const StDeleteBtn = styled.button`
  font-size: 15px;
  color:gray;
  margin-right: 50px;
  border:none;
  background-color:white;
  :hover{
        }
        cursor: pointer;  
`

const StWriteComment = styled.form`
  margin:20px ;
  display:flex;

`
const StItem = styled.div`
  display: grid;
  display: inline-grid;

`

const StInputWrap = styled.div`
  margin-top: 5px;
  margin-bottom:80px;
`

const StInput = styled.input`
  position:relative;
  border: 1px solid #979797;
  border-radius: 6px;
  width: 90%;
  max-width: 320px;
  height:55px;
  position: absolute;
  padding-left:10px;
  padding-right:70px;
`

const StCommentBtn = styled.button`
  position: absolute;
  z-index: 2;
  width: 60px;
  height: 32px;
  background-color:white;
  border:none;
  margin:0;
  padding:0;
  right:0;
  transform: translateX(-60%) translateY(40%);
`