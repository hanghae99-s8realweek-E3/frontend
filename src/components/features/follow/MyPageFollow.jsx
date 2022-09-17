import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getMyPageFollowFetch } from "../../../app/modules/followSlice";
import instance from "../../../app/modules/instance"

function MyPageFollow() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const followState = useSelector((state) => state.follow.data)
    const [followTab, setFollowTab] = useState(false)

    useEffect(()=> {
        dispatch(getMyPageFollowFetch({userId:params.userId}))
        },[]); //followState 삭제이유: 리덕스를 사용하지않기때문에 값을 갱신시켜줄필요가없다 (아래 함수자체애서 값을 갱신시켜주고있기때문)
    console.log(followState)

    const onClick = (e)=> {
        e.preventDefault();
        if (followTab === false) {
            return setFollowTab(true)
        } else setFollowTab(false)
    }

    const onClickGoToOthersPage = (e) => {
        e.preventDefault();
        navigate(`/otherspage/${e.target.id}`)
    }

    const changeMyUnFollowState = (e) => {
        e.stopPropagation();
        const putMyPageFollowFetch = async () => {
            try {
                const response = await instance.put(`/follows/${e.target.id}`)
                if (response.data.message === "success") {
                    dispatch(getMyPageFollowFetch({userId:params.userId}))
                }
            } catch (error) {
                return alert(error.response.data.errorMessage)
                }
            }
            putMyPageFollowFetch();
        }

    return (
        <StOutline>
            {followTab === false ? 
                <>
                <StContainer>
                    <StWrapBtn>
                        <StWrapBtnFollow>팔로워</StWrapBtnFollow>
                        <StWrapBtnFollowing type="submit" onClick={onClick}>팔로잉</StWrapBtnFollowing>
                    </StWrapBtn>
                    <div>
                        <StInput placeholder="닉네임을 입력해주세요"/>
                    </div>
                    <div>
                        {followState.follower?.map((x,index)=> {
                        return (<div key={index}>
                            <StProfileBox id={x.userId} onClick={onClickGoToOthersPage}>
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
                        <StWrapBtnFollowing type="submit" onClick={onClick}>팔로워</StWrapBtnFollowing>
                        <StWrapBtnFollow>팔로잉</StWrapBtnFollow>
                    </StWrapBtn>
                    <div>
                        <StInput placeholder="닉네임을 입력해주세요"/>
                    </div>
                    <div>
                        {followState.following?.map((x,index)=> {
                        return (<div key={index}>
                            <StProfileBox id={x.userId} onClick={onClickGoToOthersPage}>
                                <StProfileImg height="200px" width="200px" src={x.profileImg}></StProfileImg>
                                    <StWrapNicknameMbti>
                                        <StNickname >{x.nickname}</StNickname>
                                        <StMbti>{x.mbti}</StMbti>
                                    </StWrapNicknameMbti>
                                        <StDeleteFollowBtn id={x.userId} onClick={changeMyUnFollowState}>언팔로우</StDeleteFollowBtn>
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
    background:none;
    border:none;
    outline:none;
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
    pointer-events:none;
    border:1px solid black;
    border-radius:30px;
    width:60px;
    height:60px;
    margin:20px;

`
const StWrapNicknameMbti=styled.div`
    pointer-events:none;
    margin-left:0px;
`
const StNickname = styled.h4`
    pointer-events:none;
    left:0;
    display:grid;
    justify-content:left;
    height: 32px;
    margin-bottom: 0px;
`

const StMbti = styled.h6`
    pointer-events:none;
    color: gray;
    text-align: left;
    margin-top:0px;
`
const StDeleteFollowBtn = styled.button`
    width: 85px;
    height:35px;
    border-radius:50px;
    background-color:white;
    margin:auto 10px;
    :hover{
        background-color:gray;
    }
    cursor: pointer;

`