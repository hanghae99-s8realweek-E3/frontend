import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getMyPageFollowFetch, putMyPageFollowFetch } from "../../../app/modules/followSlice";

function MyPageFollow() {
    const dispatch = useDispatch();
    const params = useParams();
    const followState = useSelector((state) => state.follow.data)


    const [followTab, setFollowTab] = useState(false)

    //삭제할 예정
//     const initialState = [{
//         profileImg:"https://develop-neoguri.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2facdb4c-2026-4411-b004-1eddb83f1051%2FP20200321_085229892_0D74E397-DC55-459E-8FB2-D5688E970AB4.jpg?table=block&id=d7677d1f-9d67-442f-8765-042730e36526&spaceId=c84d6d26-27db-41c4-97d3-b4249a4824d1&width=640&userId=&cache=v2",
//         nickname:"23아이덴티티",
//         mbti:"ENFP",
//         userId:"1",
//         isFollow:false,
//     },
//     {
//         profileImg:"https://develop-neoguri.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbfbd722b-07d1-4c3e-a847-a41051708e3f%2FIMG_8377.jpg?table=block&id=3d20997c-b170-4e04-bcbf-1be4f1459bad&spaceId=c84d6d26-27db-41c4-97d3-b4249a4824d1&width=960&userId=&cache=v2",
//         nickname:"피그마불도저",
//         mbti:"ESTJ",
//         userId:"2",
//         isFollow:false,
//     },{
//         profileImg:"https://develop-neoguri.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fdcd91388-5989-449f-b555-6eeaa90fb6c1%2FUntitled.png?table=block&id=0c302936-24c6-4798-a741-f35418b5bc60&spaceId=c84d6d26-27db-41c4-97d3-b4249a4824d1&width=2000&userId=&cache=v2",
//         nickname:"너구리사냥꾼",
//         mbti:"INTJ",
//         userId:"3",
//         isFollow:false,
//     },{
//         profileImg:"https://develop-neoguri.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fdef306e4-350b-4385-96af-c9fd32017cda%2FUntitled.png?table=block&id=6b0c111b-3b7b-4594-9c25-62d195dab828&spaceId=c84d6d26-27db-41c4-97d3-b4249a4824d1&width=460&userId=&cache=v2",
//         nickname:"켑초게",
//         mbti:"INFP",
//         userId:"4",
//         isFollow:false,
//     },{
//         profileImg:"https://develop-neoguri.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9ceaeab0-8fe4-4115-ad99-2f62c39d7f72%2FKakaoTalk_20220711_024016828.jpg?table=block&id=481bca60-8712-4be3-8eec-062b65269ce0&spaceId=c84d6d26-27db-41c4-97d3-b4249a4824d1&width=1880&userId=&cache=v2",
//         nickname:"미식가",
//         mbti:"ISFJ",
//         userId:"5",
//         isFollow:false,
//     },{
//         profileImg:"https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6da0360e-07a9-475f-9d98-278d314458bc/RtVB.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220902%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220902T125651Z&X-Amz-Expires=86400&X-Amz-Signature=2003e0b0a6215c444829003ca41c80986708d28161d697c321c0511265fe526c&X-Amz-SignedHeaders=host&x-id=GetObject",
//         nickname:"고장난8톤트럭",
//         mbti:"INFJ",
//         userId:"6",
//         isFollow:false,
//     }
// ]

//     // const initialState = {}
//     const[follow,setFollow] = useState(initialState);
    
//     const [following, setFollowing] = useState(initialState);


    useEffect(()=> {
        dispatch(getMyPageFollowFetch({userId:params.userId}))
        },[followState]);

    const onClick = (e)=> {
        e.preventDefault();
        if (followTab === false) {
            return setFollowTab(true)
        } else setFollowTab(false)
        
    }

    const onClickDelete = (e) => {
        // e.preventDefault();
        
        // const resetFollowing = followState.following.filter((x)=> {
        //     return x.userId !== e.target.id;
        // })
        // setFollowing(resetFollowing)//삭제 예정
        dispatch(putMyPageFollowFetch(e.target.id))
    }

    return (
    <StOutline>
    {followTab === false ? 
        <>
        <StContainer>
            <StWrapBtn>
                <StWrapBtnFollow>팔로우</StWrapBtnFollow>
                <StWrapBtnFollowing type="submit" onClick={onClick}>팔로잉</StWrapBtnFollowing>
            </StWrapBtn>
            <div>
                <StInput placeholder="닉네임을 입력해주세요"/>
            </div>
            <div>
                {followState.follower?.map((x,index)=> {
                return (<div key={index}>
                    <StProfileBox>
                            <StProfileImg height="200px" width="200px" src={x.profileImg}></StProfileImg>
                        <StWrapNicknameMbti>
                            <StNickname>{x.nickname}</StNickname>
                            <StMbti>{x.mbti}</StMbti>
                        </StWrapNicknameMbti>
                    </StProfileBox>
                        </div>)
            })}</div>
        </StContainer>
        </>
        : <>
        <StContainer>
            <StWrapBtn>
                <StWrapBtnFollowing type="submit" onClick={onClick}>팔로우</StWrapBtnFollowing>
                <StWrapBtnFollow>팔로잉</StWrapBtnFollow>
            </StWrapBtn>
            <div>
                <StInput placeholder="닉네임을 입력해주세요"/>
            </div>
            <div>
                {followState.following?.map((x,index)=> {
                return (<div key={index}>
                    <StProfileBox>
                        <StProfileImg height="200px" width="200px" src={x.profileImg}></StProfileImg>
                            <StWrapNicknameMbti>
                                <StNickname>{x.nickname}</StNickname>
                                <StMbti>{x.mbti}</StMbti>
                            </StWrapNicknameMbti>
                                <StDeleteFollowBtn type="submit" id={x.userId} onClick={onClickDelete}>언팔로우</StDeleteFollowBtn>
                    </StProfileBox>
                        </div>)
            })}</div>
        </StContainer>
        </>}
        
    </StOutline>
    )
}

export default MyPageFollow;

const StOutline=styled.div`
    display:flex;
    margin-top:0px;
    div {
        justify-content: unset;
    }
    justify-content:flex-start;

`

const StContainer=styled.div`
/* background-color:beige; */
    width: 500px;
    height:100%;
    display: grid;
    display: inline-grid;
    column-gap: 20px;
    row-gap: 20px;
    overflow:scroll;

`
const StWrapBtn = styled.div`
    /* background-color:black; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top:60px;
    cursor: pointer;
`
const StWrapBtnFollow = styled.div`
    border-style: inset;
`

const StWrapBtnFollowing = styled.div`
    border-style: outset;
`

const StInput = styled.input`
    border: 2px solid #979797;
    border-radius: 3px;
    padding-left: 10px;
    width: 450px;
    height:55px;
    
`

const StProfileBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    height:100px;
    width: 450px;
    margin:auto;
    :hover{
        background-color:gainsboro;
    }
    cursor: pointer;

`

const StProfileImg = styled.img`
/* background-color:greenyellow; */
border:1px solid black;
border-radius:30px;
width:60px;
height:60px;
margin:20px;
/* position: fixed; */

`
const StWrapNicknameMbti=styled.div`
    margin-left:0px;
`
const StNickname = styled.h4`
    left:0;
    display:grid;
    justify-content:left;
    height: 32px;
    margin-bottom: 0px;
`

const StMbti = styled.h6`
    color: gray;
    /* justify-content:left; */
    /* align-items:left; */
    text-align: left;
    margin-top:0px;
`
const StDeleteFollowBtn = styled.button`
    width: 65px;
    height:35px;
    border-radius:50px;
    background-color:white;
    margin:auto 10px;
    :hover{
        background-color:red;
    }
    cursor: pointer;

`