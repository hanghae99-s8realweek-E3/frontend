//대연
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "../../app/modules/instance";
import { getOthersTodoFetch } from "../../app/modules/mytodosSlice";
import { decodeMyTokenData } from "../../utils/token";
import { StShadowBackgroundDiv } from "../interface/styledCommon";

// 컴포넌트 다른곳에서 가져다 쓸 수 있게

function ProfileCard({ profileData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const myData = decodeMyTokenData();
  const [modalState, setModalState] = useState(false);

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

  const changeModalState = () => {
    setModalState(!modalState);
  };

  // 이미지영역/이미지없는영역 묶음    이미지없는영역 -> 닉네임 / [   [mbti (팔로우 팔로우 숫자)]  or  [mbti(팔로잉 팔로잉 숫자)]  ] 묶음
  return (
    <>
      {modalState === true ? (
        <StShadowBackgroundDiv>
          {/* //e.stopPropagation() 는 배경만 눌렀을때 모달이 꺼지게한다 (모달창눌럿을때는 변화없음) */}
          <StModalContainer onClick={(e) => e.stopPropagation()}>
            <StCloseButton type="button" onClick={changeModalState}>
              <FontAwesomeIcon
                icon={faXmark}
                style={{
                  fontSize: "24px",
                  color: "#151522",
                  pointerEvents: "none",
                }}
              />
            </StCloseButton>
            <StContent>
              <h2>MBTI 궁합</h2>
              <StText>
                나와 천생연분인 MBTI와
                <br />
                나와 전혀 다른 MBTI를 확인 후<br />
                미믹에 도전해보세요!
                <br />
                색다른 재미를 느끼실 수 있을거에요!
              </StText>
              <img
                src={process.env.PUBLIC_URL + `/images/matchingBoard.png`}
                alt="MBTI matching List Images"
                style={{ width: "324px", margin: "5px 0" }}
              />
            </StContent>
          </StModalContainer>
        </StShadowBackgroundDiv>
      ) : (
        <></>
      )}

      <StTotalWrap>
        <StImageBox>
          <StProfileImg
            src={
              profileData.userInfo.profile !== "none"
                ? profileData.userInfo.profile
                : "https://mimicimagestorage.s3.ap-northeast-2.amazonaws.com/profile/placeHolderImage.jpg"
            }
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

      {window.location.pathname === `/otherspage/${params.userId}` ? (
        <StFollowBtn onClick={changeFollowState}>
          {/* 현재 내가 이 유저를 팔로우 한 상태가 아니라면 팔로우 버튼 / 아니면 언팔로우 버튼 */}
          {profileData.userInfo.isFollowed === false ? "팔로우" : "언팔로우"}
        </StFollowBtn>
      ) : (
        <StInfo onClick={changeModalState}>궁합 알아보기</StInfo>
      )}
    </>
  );
}

// 프로필카드 변경
// {/* <StTotalWrap>
//         <StImageBox>
//           <StProfileImg
//             src={
//               profileData.userInfo.profile !== "none"
//                 ? profileData.userInfo.profile
//                 : "https://mimicimagestorage.s3.ap-northeast-2.amazonaws.com/profile/placeHolderImage.jpg"
//             }
//             alt="dy"
//           />
//         </StImageBox>
//         <StNoImageWrap>
//           <StNickName>{profileData.userInfo.nickname}</StNickName>
//           <StMbtiFollowFollowingWrap>
//             <StMbti>{profileData.userInfo.mbti}</StMbti>
//             <StFollowWrap onClick={goFollow}>
//               <StFollowWord>팔로워</StFollowWord>
//               <StFollowNumber>
//                 {window.location.pathname === "/mypage"
//                   ? profileData.userInfo.follower
//                   : profileData.userInfo.followerCount}
//               </StFollowNumber>
//             </StFollowWrap>
//             <StFollowingWrap onClick={goFollowing}>
//               <StFollowingWord>팔로잉</StFollowingWord>
//               <StFollowingNumber>
//                 {window.location.pathname === "/mypage"
//                   ? profileData.userInfo.following
//                   : profileData.userInfo.followingCount}
//               </StFollowingNumber>
//             </StFollowingWrap>
//           </StMbtiFollowFollowingWrap>
//         </StNoImageWrap>
//       </StTotalWrap>

//       {window.location.pathname === `/otherspage/${params.userId}` ? (
//         <StFollowBtn onClick={changeFollowState}>

//           {profileData.userInfo.isFollowed === false ? "팔로우" : "언팔로우"}
//         </StFollowBtn>
//       ) : (
//         <StInfo onClick={changeModalState}>궁합 알아보기</StInfo>
//       )}
//     </>
//   );
// }
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
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 57.6px;
    height: 57.6px;
    margin: 0 0 0 25.2px;
  }
`;

const StProfileImg = styled.img`
  height: 80px;
  width: auto;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 57.6px;
    height: 57.6px;
  }
`;
const StNoImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 500px) {
    align-items: center;
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
    font-size: 18px;
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
  margin-left: 19px;
  @media screen and (max-width: 500px) {
    align-items: flex-start;
    text-align: left;
    width: 100%;
    margin-left: 2px;
    font-size: 16px;
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
    margin-left: 50px;
  }
  transition: ease 0.1s;
  &:hover div {
    color: #8e8e8e;
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
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
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
  transition: ease 0.1s;
  &:hover div {
    color: #8e8e8e;
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
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;
const StFollowingWord = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 32px;
  text-align: center;
  color: #000000;
  transition: ease 0.05s;
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
  margin: 1.5px 0 22px 127px;
  border: 0px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  @media screen and (max-width: 500px) {
    align-items: center;
    margin-left: 95px;
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
  background: none;
  border: none;
  margin: 1.5px 0 22px 125px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  @media screen and (max-width: 500px) {
    align-items: center;
    margin-left: 95px;
  }
`;

const StCloseButton = styled.button`
  background: none;
  display: block;
  border: none;
  border-radius: none;
  margin: 0;
  margin-left: auto;
  padding: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;
const StContent = styled.div`
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  bottom: 0;
  height: 90%;
  box-sizing: border-box;
  & > h2 {
    font-size: 32px;
    line-height: 34px;
    font-weight: 700;
    color: #313131;
    margin: 17px auto;
  }
  @media screen and (max-width: 500px) {
    & > h2 {
      font-size: 24px;
      line-height: 30px;
    }
  }
`;
const StText = styled.p`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #919191;
  margin: 0;
  margin-bottom: 42px;
  @media screen and (max-width: 500px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const StModalContainer = styled.div`
  background: #ffffff;
  border-radius: 6px;
  padding: 25px;
  margin: 10vh auto;
  width: 90%;
  height: 620px;
  box-sizing: border-box;
  @media screen and (max-width: 500px) {
    width: 324px;
    margin: 18px;
    height: 540px;
    margin: 7vh auto;
  }
`;

// 프로필 카드 변경
// const StTotalWrap = styled.div`
//   background-color: white;
//   width: 100%;
//   margin-top: 31.5px;
//   display: flex;
//   flex-direction: row;
//   @media screen and (max-width: 500px) {
//     align-items: center;
//     width: 360px;
//     margin: 0px;
//     background-color: white;
//     margin-top: 22.68px;
//   }
// `;
// const StImageBox = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 80px;
//   width: 80px;
//   overflow: hidden;
//   margin-left: 35px;
//   border-radius: 50%;
//   @media screen and (max-width: 500px) {
//     align-items: center;
//     width: 57.6px;
//     height: 57.6px;
//     margin: 0 0 0 25.2px;
//   }
// `;

// const StProfileImg = styled.img`
//   height: 80px;
//   width: auto;
//   @media screen and (max-width: 500px) {
//     align-items: center;
//     width: 57.6px;
//     height: 57.6px;
//   }
// `;
// const StNoImageWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   @media screen and (max-width: 500px) {
//     align-items: center;
//     margin: 0 0 0 16px;
//   }
// `;
// const StNickName = styled.div`
//   flex-direction: row;
//   font-family: "IBM Plex Sans KR";
//   font-style: normal;
//   font-weight: 500;
//   font-size: 24px;
//   line-height: 32px;
//   color: #000000;
//   margin-left: 16px;
//   text-align: left;
//   @media screen and (max-width: 500px) {
//     align-items: center;
//     width: 100%;
//     margin: 0px;
//     font-size: 18px;
//   }
// `;
// const StMbtiFollowFollowingWrap = styled.div`
//   @media screen and (max-width: 500px) {
//     align-items: center;
//     width: 230px;
//     font-size: 5px;
//     margin: 0px;
//   }
//   display: flex;
// `;
// const StMbti = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 42px;
//   font-family: "IBM Plex Sans KR";
//   font-style: normal;
//   font-weight: 500;
//   font-size: 18px;
//   line-height: 32px;
//   text-align: left;
//   color: #979797;
//   margin-left: 19px;
//   @media screen and (max-width: 500px) {
//     align-items: flex-start;
//     text-align: left;
//     width: 100%;
//     margin-left: 2px;
//     font-size: 16px;
//   }
// `;
// const StFollowWrap = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin-left: 100px;
//   gap: 7px;
//   cursor: pointer;
//   @media screen and (max-width: 500px) {
//     align-items: center;
//     width: 100%;
//     margin-left: 50px;
//   }
//   transition: ease 0.1s;
//   &:hover div {
//     color: #8e8e8e;
//   }
// `;
// const StFollowNumber = styled.div`
//   font-family: "IBM Plex Sans KR";
//   font-style: normal;
//   font-weight: 500;
//   font-size: 20px;
//   line-height: 32px;
//   text-align: center;
//   color: #000000;
//   @media screen and (max-width: 500px) {
//     font-size: 16px;
//   }
// `;
// const StFollowWord = styled.div`
//   font-family: "IBM Plex Sans KR";
//   font-style: normal;
//   font-weight: 500;
//   font-size: 13px;
//   line-height: 32px;
//   text-align: center;
//   color: #000000;
// `;
// const StFollowingWrap = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin-left: 55px;
//   gap: 7px;
//   cursor: pointer;
//   @media screen and (max-width: 500px) {
//     align-items: center;
//     width: 100%;
//     margin: 0px;
//   }
//   transition: ease 0.1s;
//   &:hover div {
//     color: #8e8e8e;
//   }
// `;
// const StFollowingNumber = styled.div`
//   font-family: "IBM Plex Sans KR";
//   font-style: normal;
//   font-weight: 500;
//   font-size: 20px;
//   line-height: 32px;
//   text-align: center;
//   color: #000000;
//   @media screen and (max-width: 500px) {
//     font-size: 16px;
//   }
// `;
// const StFollowingWord = styled.div`
//   font-family: "IBM Plex Sans KR";
//   font-style: normal;
//   font-weight: 500;
//   font-size: 13px;
//   line-height: 32px;
//   text-align: center;
//   color: #000000;
//   transition: ease 0.05s;
// `;
// const StFollowBtn = styled.button`
//   display: flex;
//   width: 60px;
//   font-family: "IBM Plex Sans KR";
//   font-style: normal;
//   font-weight: 500;
//   font-size: 13px;
//   text-align: center;
//   color: #ff6d53;
//   background-color: white;
//   margin: 1.5px 0 22px 127px;
//   border: 0px;
//   cursor: pointer;
//   -webkit-tap-highlight-color: transparent;
//   @media screen and (max-width: 500px) {
//     align-items: center;
//     margin-left: 95px;
//   }
// `;
// const StInfo = styled.div`
//   /* display: flex; */
//   width: 84.66px;
//   font-family: "IBM Plex Sans KR";
//   font-style: normal;
//   font-weight: 500;
//   font-size: 13px;
//   text-align: center;
//   color: #ff6d53;
//   background: none;
//   border: none;
//   margin: 1.5px 0 22px 125px;
//   cursor: pointer;
//   -webkit-tap-highlight-color: transparent;
//   @media screen and (max-width: 500px) {
//     align-items: center;
//     margin-left: 95px;
//   }
// `;

// const StCloseButton = styled.button`
//   background: none;
//   display: block;
//   border: none;
//   border-radius: none;
//   margin: 0;
//   margin-left: auto;
//   padding: 0;
//   cursor: pointer;
//   -webkit-tap-highlight-color: transparent;
// `;
// const StContent = styled.div`
//   color: #ffffff;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   text-align: left;
//   bottom: 0;
//   height: 90%;
//   box-sizing: border-box;
//   & > h2 {
//     font-size: 32px;
//     line-height: 34px;
//     font-weight: 700;
//     color: #313131;
//     margin: 17px auto;
//   }
//   @media screen and (max-width: 500px) {
//     & > h2 {
//       font-size: 24px;
//       line-height: 30px;
//     }
//   }
// `;
// const StText = styled.p`
//   text-align: center;
//   font-size: 16px;
//   font-weight: 500;
//   color: #919191;
//   margin: 0;
//   margin-bottom: 42px;
//   @media screen and (max-width: 500px) {
//     font-size: 14px;
//     margin-bottom: 20px;
//   }
// `;

// const StModalContainer = styled.div`
//   background: #ffffff;
//   border-radius: 6px;
//   padding: 25px;
//   margin: 10vh auto;
//   width: 90%;
//   height: 620px;
//   box-sizing: border-box;
//   @media screen and (max-width: 500px) {
//     width: 324px;
//     margin: 18px;
//     height: 540px;
//     margin: 7vh auto;
//   }
// `;
