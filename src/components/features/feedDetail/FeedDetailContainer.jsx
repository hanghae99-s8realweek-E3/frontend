import React,{useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getComment, postComment } from "../../../app/modules/commentsSlice";
import styled from "styled-components";


function FeedDetailContainer () {

   const dispatch=useDispatch();
   const comment = useSelector((state) => state.comments.comm);
   console.log(comment)

   const cardList = [
    { todo: "밥먹기1", nickname: "kdy1", commentCounts: 1, challengeConts: 1 },
  ];

    
    const [sampleComment,  setSampleComment] = useState([{
        comment: "깔아두는댓글1-이거 없앨 수있나?",
        commentId: "1",
        userId:"10",
        nickname: "aaaaaaa",
    },{
        comment: "깔아두는댓글2-여기 사람있어요ㅠㅠ",
        commentId: "2",
        userId:"11",
        nickname: "gggggggg",
    }]);

   const initialState = [{ 
    comment: "",
    commentId: "",
    userId:"",
    nickname: "",
}]

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


    const onSubmit = (e) => {
        e.preventDefault();
        setSampleComment([...sampleComment, {...feedComment}])
        console.log(sampleComment)

        // const newComment = { commentId ,}
        // dispatch(postComment(newComment))
    }


    // useEffect(() => {
    //     dispatch(getComment());
    //   }, []);

return (
    <div>
            {cardList?.map((it, idx) => (
            <StCardSmallWrap key={idx} >
            <StCard>{it.todo}</StCard>
            <StNameCounterBox>
                <StName>{it.nickname}</StName>
                <StCommentCount>댓글{it.commentCounts}</StCommentCount>
                <StChallengeCount>도전{it.challengeConts}</StChallengeCount>
            </StNameCounterBox>
            </StCardSmallWrap>
            ))}
    <form onSubmit={onSubmit}>
    <input
        type="text"
        name="comment"
      
        onChange={onChange}
    /><button type="submit">댓글추가하기</button>
    </form>
    <div>
    {sampleComment&&sampleComment.map((x, index)=> {
        return <div key={index}>{x.comment}
                <button type="submit" onClick={()=>onClickDeleteComment(x.userId)}>삭제하기</button>
                </div>
    })}
    </div>
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