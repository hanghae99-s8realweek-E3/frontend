import React,{useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteCommentFetch, getComment, postComment, postCommentFetch } from "../../../app/modules/commentsSlice";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getFeedDetailFetch, postFeedDetailFetch } from "../../../app/modules/detailSlice";
import {decodeMyTokenData} from "../../../utils/token"
import ChallengeCard from "../../common/ChallengeCard";

function FeedDetailContainer () {

  //!강제렌더링 - 주석으로 메모 사용은 안함
  // const [refresh, setRefresh] = useState(false);

    const initialState = { 
    comment: "",
}

    const[feedComment, setFeedComment] =useState(initialState);

    const params=useParams();

    const dispatch=useDispatch();

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
        dispatch(deleteCommentFetch(e.target.id))
        // setRefresh(true);
    }

    const setMyTodayChallenge = (e)=> {
      dispatch(postFeedDetailFetch(e.target.id))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(postCommentFetch({...feedComment , todoId:params.todoId }))
        setFeedComment();
        // setRefresh(true);
    } 

    const myData= decodeMyTokenData()

    return (
    <div>
      {Object.keys(detailState.data).length === 0 ? <></> :  
      <div>
        <ChallengeCard id={detailState.data.userId} data={detailState.data} hideState="true"></ChallengeCard>
        <div>
        {detailState.data.comment.length ===0? <></> : detailState.data.comment.map((x,index)=> {
            console.log(myData.userId,x.userId)
            return  <div key={index}>
                    <StCommentBox>
                      <StImgNickname>
                        <StProfileImg src={x.profileImg}/>
                        <StNickname>{x.nickname}</StNickname></StImgNickname>
                          <StComment>{x.comment}</StComment>
                            <StChangeDeleteBtn>
                              {/* <StChangeBtn>수정</StChangeBtn> */}
                                {myData.userId === x.userId ? <StDeleteBtn type="submit" id={x.commentId} onClick={onClickDeleteComment}>삭제</StDeleteBtn> : <></>}
                            </StChangeDeleteBtn>
                    </StCommentBox>
                    </div>

        })}
        </div>
          <StWriteComment onSubmit={onSubmit}>
            <StItem>
              <StInputWrap>
                <StProfileImg></StProfileImg>
                  <StInput
                  type="text"
                  name="comment"
                  placeholder="댓글 입력"
                  onChange={onChange}/>
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
/* background-color:gray; */
display: flex;
flex-direction: column;
margin:20px auto 20px 20px;

`

const StProfileImg = styled.img`
background-color:gray;
  /* border:1px solid black; */
border-radius:15px;
width:30px;
height:30px;
margin:10px;
`

const StImgNickname = styled.div`
/* background-color:red; */
display: flex;
flex-direction: row;

`

const StNickname = styled.div`
margin-top:5px;
/* border:1px solid; */
`

const StComment = styled.div`
align-items:flex-start;
text-align: start;
font-size:15px;
margin-left:10px;
`

const StChangeDeleteBtn=styled.div`
/* background-color:blue; */
text-align: right;
margin-right: 20px;
`

const StChangeBtn = styled.button`
border:none;
background-color:white;
margin-right:20px;
:hover{
       
    }
    cursor: pointer;
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
position:relative;
display: grid;
    display: inline-grid;

`

const StInputWrap = styled.div`
margin-top: 5px;
    margin-bottom:80px;
`
const StInput = styled.input`
border: 1px solid #979797;
border-radius: 6px;
    width: 378px;
    height:55px;
    position: absolute;
    padding-left:10px;
`

const StCommentBtn = styled.button`
position: absolute;
margin-top :10px;
width: 80px;
height: 32px;
left: 351px;
z-index: 1;
background-color:white;
border:none;
`