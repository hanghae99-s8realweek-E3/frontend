import React,{useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getComment, postComment } from "../../../app/modules/followCommentSlice";

function FeedDetailContainer () {

   const dispatch=useDispatch();
   const comment = useSelector((state) => state.comments.comm);
   console.log(comment)


   const initialState = [{ 
    "commentId": "",
    "userId":"",
    "comment": "", 
    "nickname": "",
}]

    //인풋(댓글)담을 그릇
    const[feedComment, setFeedComment] =useState(initialState);
   
    const onSubmit = (e) => {
        e.preventDefault();
        const newComment = {POST : feedComment}
        dispatch(postComment(newComment))
    }


    useEffect(() => {
        dispatch(getComment());
      }, []);

return (
<div>
    <form onSubmit={onSubmit}>
    <input
        type="text"
        name="comment"
        value={feedComment}
        onChange={(e)=> setFeedComment(e.target.value)}
    /><button type="submit">추가</button>
    </form>
    {/* <div>
        {feedComment&&feedComment.map((x)=> {
        return <div key={x.id}>{x.comment}</div>}
        )}
    </div> */}
    <div>
    {comment&&comment.map((x) => (
          <div key={x.userId}>{x.comment}</div>
        ))}
    </div>
    </div>
    )
}

export default FeedDetailContainer;