//대연
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "../../app/modules/instance";
import { getOthersTodoFetch } from "../../app/modules/mytodosSlice";
import { decodeMyTokenData } from "../../utils/token";

// 컴포넌트 다른곳에서 가져다 쓸 수 있게

function ProfileCard({ profileData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const myData = decodeMyTokenData();
  console.log(myData)
  console.log(params);


  // 팔로우 버튼을 클릭했을 때 현재 ProfileCard.jsx 컴포넌트가 적용되어있는 위치에 따라서 다르게 작동
  const goFollow = () => {
    // window.location.pathname === "/otherspage" ?
    // navigate(`/follows/${params.userId}`)
    // :
    navigate(`/follows/${profileData.userInfo.userId}`, { state: false });
  };
  // 팔로잉 버튼을 클릭했을 때 현재 ProfileCard.jsx 컴포넌트가 적용되어있는 위치에 따라서 다르게 작동
  const goFollowing = () => {
    // window.location.pathname === "/otherspage" ?
    // navigate(`/follows/${params.userId}`)
    // :
    navigate(`/follows/${profileData.userInfo.userId}`, { state: true });
  };

  const [, setFollow] = useState("팔로우");

  // 다른 유저 프로필 정보 페이지에서 팔로우/언팔로우  및 피드를 불러야하고
  // instance 통신 후 만약 내가 현재 이 유저를 팔로우하고 있다면 state를 이용해 언팔로우, 언팔로우 하고있다면 state를 이용해 팔로우로 바꿔야한다. 
  const changeFollowState = async () => {
    try {
      const response = await instance.put(`/follows/${params.userId}`);
      if (response.data.message === "success") {
        console.log(profileData.userInfo.isFollowed)
        if (profileData.userInfo.isFollowed === false) {
        dispatch(getOthersTodoFetch(params));
        setFollow("언팔로우");
        } else if (profileData.userInfo.isFollowed === true)
        dispatch(getOthersTodoFetch(params));
        setFollow("팔로우");
      } 
    } catch (error) {
      return alert(error.response.data.errorMessage);
    }
  };

  // console.log(params.userId)
  // console.log(myData.userId)
  // console.log(profileData.userInfo.userId)

  // 이미지영역/이미지없는영역 묶음    이미지없는영역 -> 닉네임 / [   [mbti (팔로우 팔로우 숫자)]  or  [mbti(팔로잉 팔로잉 숫자)]  ] 묶음
  return (
    <>
      <StTotalWrap>
        <StImageBox>
        <StProfileImg
          src={profileData.userInfo.profile !== "" ? profileData.userInfo.profile : "https://mimicimagestorage.s3.ap-northeast-2.amazonaws.com/profile/placeHolderImage.jpg"}
          alt="dy"
        />
        </StImageBox>
        <StNoImageWrap>
          <StNickName>{profileData.userInfo.nickname}</StNickName>
          <StMbtiFollowFollowingWrap>
            <StMbti>{profileData.userInfo.mbti}</StMbti>
            <StFollowWrap onClick={goFollow}>
              <StFollowWord>팔로워</StFollowWord>
              <StFollowNumber>
                {window.location.pathname === "/mypage"
                  ? profileData.userInfo.follower
                  : profileData.userInfo.followerCount}
              </StFollowNumber>
            </StFollowWrap>
            <StFollowingWrap onClick={goFollowing}>
              <StFollowingWord>팔로잉</StFollowingWord>
              <StFollowingNumber>
                {window.location.pathname === "/mypage"
                  ? profileData.userInfo.following
                  : profileData.userInfo.followingCount}
              </StFollowingNumber>
            </StFollowingWrap>
          </StMbtiFollowFollowingWrap>
        </StNoImageWrap>
      </StTotalWrap>
      
      {window.location.pathname === `/otherspage/${params.userId}` ?
      <StFollowBtn onClick={changeFollowState} >
        {/* 현재 내가 이 유저를 팔로우 한 상태가 아니라면 팔로우 버튼 / 아니면 언팔로우 버튼 */}
        {profileData.userInfo.isFollowed === false ? "팔로우" : "언팔로우" }
      </StFollowBtn>
      :      
      <StInfo>
        궁합 알아보기 
      </StInfo>}
    </>
  );
}

export default ProfileCard;

const StTotalWrap = styled.div`
  background-color: white;
  width: 100%;
  margin-top: 31.5px;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 360px;
    margin: 0px;
    background-color: white;
    margin-top: 22.68px;
  }
`;
const StImageBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 80px;
width: 80px;
overflow: hidden;
margin-left: 35px;
border-radius: 50%;
`
const StProfileImg = styled.img`
  /* border-radius: 9999px; */
  height: 80px;
  width: auto;
  /* @media screen and (max-width: 500px) {
    align-items: center;
    width: 57.6px;
    height: 57.6px;
    margin:0px;
  } */
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 80px;
    margin: 0 0 0 25.2px;
  }
`;
const StNoImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 500px) {
    align-items: center;
    /* width: 100%; */
    margin: 0 0 0 16px;
  }
`;
const StNickName = styled.div`
  flex-direction: row;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #000000;
  margin-left: 16px;
  text-align: left;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 100%;
    margin: 0px;
  }
`;
const StMbtiFollowFollowingWrap = styled.div`
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 230px;
    font-size: 5px;
    margin: 0px;
  }
  display: flex;
`;
const StMbti = styled.div`
  display: flex;
  flex-direction: column;
  width: 42px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  text-align: left;
  color: #979797;
  margin-left: 16px;
  @media screen and (max-width: 500px) {
    align-items: flex-start;
    text-align: left;
    width: 100%;
    margin: 0px;
  }
`;
const StFollowWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 100px;
  gap: 7px;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 100%;
    margin: 0px;
  }
`;
const StFollowNumber = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  color: #000000;
`;
const StFollowWord = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
  text-align: center;
  color: #000000;
`;
const StFollowingWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 55px;
  gap: 7px;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 100%;
    margin: 0px;
  }
`;
const StFollowingNumber = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  color: #000000;
`;
const StFollowingWord = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
  text-align: center;
  color: #000000;
`;
const StFollowBtn = styled.button`
  display: flex;
  width: 60px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  text-align: center;
  color: #ff6d53;
  background-color: white;
  margin : 1.5px 0 22px 125px ;
  border: 0px;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    align-items: center;
    margin-left: 115px;
  }
`;
const StInfo = styled.div`
  /* display: flex; */
  width: 84.66px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  text-align: center;
  color: #ff6d53;
  background-color: white;

  border: 0px;
  margin : 1.5px 0 22px 125px ;
  @media screen and (max-width: 500px) {
    align-items: center;
    margin-left: 115px;
  }
  `;
