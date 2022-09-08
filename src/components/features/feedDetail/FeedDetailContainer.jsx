import React,{useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getComment, postComment, postCommentFetch } from "../../../app/modules/commentsSlice";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getFeedDetailFetch } from "../../../app/modules/detailSlice";

let number = 100;
function FeedDetailContainer () {

  const params=useParams();
  console.log(params)

   const dispatch=useDispatch();
   const comment = useSelector((state) => state.comments.comm);
   console.log(comment)

  const detailState = useSelector((state) =>  state.detail)
  console.log(detailState)
   const cardList = [
    { todo: "밥먹기1", nickname: "kdy1", commentCounts: 1, challengeConts: 1 },
  ];

  
  useEffect(() => {
    dispatch(getFeedDetailFetch({todoId:params.todoId}));
  }, []);

    
    const [sampleComment,  setSampleComment] = useState([]);  //[]배열 넣어야한다.(리액트에서 map 함수 사용시 배열이 초기값으로 존재해야한다)

   const initialState = { 
    comment: "",
}

    //인풋(댓글)담을 그릇
    const[feedComment, setFeedComment] =useState(initialState);

    
    const onChange = (e)=> {
        const {name, value} = e.target;
        setFeedComment({...feedComment, [name]:value})
        console.log(feedComment)
    }

    const onClickDeleteComment = (e) => {
        const newComment = sampleComment.filter((x)=> {
            return x.userId !== e;
        });
        setSampleComment(newComment)
        console.log(newComment)
    }

    console.log({...feedComment , todoId:params.todoId })
    const onSubmit = (e) => {
        e.preventDefault();
        // if(feedComment.comment.trim() === "") return;//빈칸입력막기-사용시 중복되는 코멘트입력시 오류
        setSampleComment([...sampleComment, {...feedComment, userId:number}])
        number++;//컴포넌트에 임포트된 number값에 1씩 더해준다.
        setFeedComment();
        dispatch(postCommentFetch({...feedComment , todoId:params.todoId }))
        // const newComment = { commentId ,}
    } 


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
        {sampleComment&&sampleComment.map((x,index)=> {
            return <div key={x.userId}>{x.comment}
                    <button type="submit" onClick={()=>onClickDeleteComment(x.userId)}>삭제하기</button>
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