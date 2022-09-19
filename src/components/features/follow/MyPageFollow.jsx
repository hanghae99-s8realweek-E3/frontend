import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getMyPageFollowFetch } from "../../../app/modules/followSlice";
import instance from "../../../app/modules/instance"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


function MyPageFollow() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const followState = useSelector((state) => state.follow.data)
    const [followTab, setFollowTab] = useState(true)
    const {state} = useLocation();
    console.log(state)

    useEffect(()=> {
        dispatch(getMyPageFollowFetch({userId:params.userId}))
        state === true ? setFollowTab(state) : setFollowTab(false)
        },[]); //followState 삭제이유: 리덕스를 사용하지않기때문에 값을 갱신시켜줄필요가없다 (아래 함수자체애서 값을 갱신시켜주고있기때문)
    console.log(followTab)

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

                    <StSearchBarBox>
                        <StInput placeholder="검색"/>
                        <StSearchBtn><FontAwesomeIcon icon={faMagnifyingGlass}/></StSearchBtn>
                    </StSearchBarBox>

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
                    
                    <StSearchBarBox>
                        <StInput placeholder="검색"/>
                        <StSearchBtn><FontAwesomeIcon icon={faMagnifyingGlass}/></StSearchBtn>
                    </StSearchBarBox>
                    
                    <div>
                        {followState.following?.map((x,index)=> {
                        return (<div key={index}>
                            <StProfileBox id={x.userId} onClick={onClickGoToOthersPage}>
                                <StProfileImg height="200px" width="200px" src={x.profileImg}></StProfileImg>
                                    <StWrapNicknameMbti>
                                        <StNickname >{x.nickname}</StNickname>
                                        <StMbti>{x.mbti}</StMbti>
                                    </StWrapNicknameMbti>
                                        <StDeleteFollowBtn id={x.userId} onClick={changeMyUnFollowState}>삭제</StDeleteFollowBtn>
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
    height:55px;
    padding-top:20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top:60px;
    cursor: pointer;

`
const StWrapBtnFollow = styled.div`
    /* border-style: inset; */
    background: none;
    /* font-size: 18px; */
    font-weight: 500;
    color:#FF6D53;
    border: none;
    border-bottom: 2px solid #FF6D53;
    outline: none;

`

const StWrapBtnFollowing = styled.div`
    /* border-style: outset; */
`

const StSearchBarBox = styled.div`
/* background-color:blue; */
    display:flex;
    z-index: 1;
    opacity: 1;
    width:99%;
    border: 2px solid #979797;
    border-radius: 3px;


`

const StInput = styled.input`
    padding-left: 20px;
    border:none;
    width: 400px;
    height:55px;
    z-index: -1;
    outline: none;
    overflow: auto; //검색어가 길어졌을때 오른쪽으로 자연스럽게 검색되도록 하기 위해
`

const StSearchBtn = styled.button`
    background-color:white;
    margin:auto;
    border:none;
    text-align:center;
    outline:none;
    cursor: pointer;
`
const StProfileBox = styled.div`
    background:none;
    border:none;
    outline:none;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    height:100px;
    width: 99%;
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
    margin:auto;

`
const StWrapNicknameMbti=styled.div`
    pointer-events:none;
    margin-left:10px;
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