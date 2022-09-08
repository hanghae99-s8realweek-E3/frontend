import React,{useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteCommentFetch, getComment, postComment, postCommentFetch } from "../../../app/modules/commentsSlice";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getFeedDetailFetch } from "../../../app/modules/detailSlice";
import {decodeMyTokenData} from "../../../utils/token"

function FeedDetailContainer () {

  //!강제렌더링 - 주석으로 메모 사용은 안함
  // const [refresh, setRefresh] = useState(false);


   const initialState = { 
    comment: "",
}

    //인풋(댓글)담을 그릇
    const[feedComment, setFeedComment] =useState(initialState);
    console.log(feedComment)


  const params=useParams();

   const dispatch=useDispatch();
  //  const comment = useSelector((state) => state.comments);
  const comm= useSelector((state)=> state.comments)

  const detailState = useSelector((state) =>  state.detail)

  useEffect(() => {
    dispatch(getFeedDetailFetch({todoId:params.todoId}));
            // setRefresh(false)
  }, [comm]);

    const onChange = (e)=> {
        setFeedComment({...feedComment, comment:e.target.value})
    }

    const onClickDeleteComment = (e) => {
      console.log(e.target.id)
      // console.log(e)
        // const newComment = sampleComment.filter((x)=> {
        //     return x.userId !== e;
        // });
        // setSampleComment(newComment)
        dispatch(deleteCommentFetch(e.target.id))
        // setRefresh(true);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(postCommentFetch({...feedComment , todoId:params.todoId }))
        setFeedComment();
        // setRefresh(true);
        // const newComment = { commentId ,}
    } 

      const myData= decodeMyTokenData()
        console.log(myData.userId)

    return (
    <div>
      {Object.keys(detailState.data).length === 0 ? <></> :  
      <div>    
        <StCardSmallWrap>
          <StNameCounterBox>
              <StName>{detailState.data.nickname}</StName>
              <StCommentCount></StCommentCount>
              <StChallengeCount></StChallengeCount>
          </StNameCounterBox>
        </StCardSmallWrap>
        <div>
        {detailState.data.comment.length ===0? <></> : detailState.data.comment.map((x,index)=> {
            console.log(myData.userId,x.userId)
            return  <div key={index}>
                      {x.nickname}{x.comment}
                      {myData.userId === x.userId ? <button type="submit" id={x.commentId} onClick={onClickDeleteComment}>삭제하기</button> : <></>}
                    </div>
        })}
        </div>
        <form onSubmit={onSubmit}>
            <input
            type="text"
            name="comment"
            
            onChange={onChange}/>
            <button type="submit">댓글추가하기</button>
        </form>
      </div>}
    </div>
    )
}

export default FeedDetailContainer;

const StCardSmallWrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  margin: 18px 26px 14px 24px;
  border: 1px solid #979797;
  border-radius: 6px;
`;
const StCard = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #979797;
  margin: 16px 0px 11px 24px;
`;
const StNameCounterBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const StName = styled.div`
  display: flex;
  margin: 11px 0px 11px 25px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: #979797;
`;
const StCommentCount = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
  margin: 11px 25px 11px 0px;
  color: #979797;
  text-align: end;
`;
const StChallengeCount = styled.div`
  display: flex;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
  margin: 11px 25px 11px 25px;
  color: #979797;
`;