import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { getMyPageFollowFetch } from "../../../app/modules/followSlice";
import instance from "../../../app/modules/instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { decodeMyTokenData } from "../../../utils/token";

function MyPageFollow() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const followState = useSelector((state) => state.follow.data);
  const [followTab, setFollowTab] = useState(true);
  const { state } = useLocation();
  const [inputContext, setInputContext] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    if (Object.keys(followState).length !== 0) {
      if (followTab === true) {
        setSearchList(followState.follower);
      } else if (followTab === false) {
        setSearchList(followState.following);
      }
    }
  }, [followTab, followState]);

  useEffect(() => {
    dispatch(getMyPageFollowFetch({ userId: params.userId }));
    state === true ? setFollowTab(false) : setFollowTab(true);
  }, []); //followState 삭제이유: 리덕스를 사용하지않기때문에 값을 갱신시켜줄필요가없다 (아래 함수자체애서 값을 갱신시켜주고있기때문)
  // console.log(followTab)
  // console.log(Object.keys(followState).length)

  const onClick = (e) => {
    e.preventDefault();
    if (followTab === false) {
      return setFollowTab(true);
    } else setFollowTab(false);
  };

  const onClickGoToOthersPage = (e) => {
    e.preventDefault();
    navigate(`/otherspage/${e.target.id}`);
  };

  const changeMyUnFollowState = (e) => {
    e.stopPropagation();
    const putMyPageFollowFetch = async () => {
      try {
        const response = await instance.put(`/follows/${e.target.id}`);
        if (response.data.message === "success") {
          dispatch(getMyPageFollowFetch({ userId: params.userId }));
          setInputContext("");
          setSearchList([]);
        }
      } catch (error) {
        return alert(error.response.data.errorMessage);
      }
    };
    putMyPageFollowFetch();
  };

  const inputSearch = (e) => {
    setInputContext(e.target.value);
  };

  const searchData = (e) => {
    e.preventDefault();
    let followData;
    if (followTab === true) followData = followState.follower;
    else if (followTab === false) followData = followState.following;
    // 1. 검색어가 빈 값일 때? 그러면 어떻게 처리할 것인가? = 아니면 다 노출시킬 것인지?
    // console.log(followData)
    setSearchList(
      followData.filter((elem) => elem.nickname.indexOf(inputContext) !== -1)
    );
    // console.log(searchList)

    // inputContext === "" ? setPostLIst(data)
  };
  // console.log(searchList.length)

  const myData = decodeMyTokenData();

  return (
    <StOutline>
      {followTab === true ? (
        <>
          <StContainer>
            <StWrapBtn>
              <StWrapBtnFollow>팔로워</StWrapBtnFollow>
              <StWrapBtnFollowing type="submit" onClick={onClick}>
                팔로잉
              </StWrapBtnFollowing>
            </StWrapBtn>

            <StSearchBarBox>
              <form onSubmit={searchData}>
                <StInput
                  placeholder="검색"
                  onChange={inputSearch}
                  value={inputContext}
                />
                <StSearchBtn type="submit">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ width: "23px", height: "23px", color: "#919191" }}
                  />
                </StSearchBtn>
              </form>
            </StSearchBarBox>

            <div>
              <>
                {searchList.length !== 0
                  ? searchList?.map((x, index) => {
                      console.log(x.profileImg);
                      return (
                        <div key={index}>
                          <StProfileContainer
                            id={x.userId}
                            onClick={onClickGoToOthersPage}
                          >
                            <StProfileBox>
                              <StProfileImg
                                src={
                                  x.profile === "none"
                                    ? "https://mimicimagestorage.s3.ap-northeast-2.amazonaws.com/profile/placeHolderImage.jpg"
                                    : x.profile
                                }
                              />
                            </StProfileBox>
                            <StWrapNicknameMbti>
                              <StNickname>{x.nickname}</StNickname>
                              <StMbti>{x.mbti}</StMbti>
                            </StWrapNicknameMbti>
                            {/* <StDeleteFollowBtn id={x.userId} onClick={changeMyUnFollowState}>삭제</StDeleteFollowBtn> */}
                          </StProfileContainer>
                        </div>
                      );
                    })
                  : followState.follower?.map((x, index) => {
                      console.log(x.profileImg);
                      return (
                        <div key={index}>
                          <StProfileContainer
                            id={x.userId}
                            onClick={onClickGoToOthersPage}
                          >
                            <StProfileBox>
                              <StProfileImg
                                src={
                                  x.profile === "none"
                                    ? "https://mimicimagestorage.s3.ap-northeast-2.amazonaws.com/profile/placeHolderImage.jpg"
                                    : x.profile
                                }
                              />
                            </StProfileBox>
                            <StWrapNicknameMbti>
                              <StNickname>{x.nickname}</StNickname>
                              <StMbti>{x.mbti}</StMbti>
                            </StWrapNicknameMbti>
                            {/* <StDeleteFollowBtn id={x.userId} onClick={changeMyUnFollowState}>삭제</StDeleteFollowBtn> */}
                          </StProfileContainer>
                        </div>
                      );
                    })}
              </>
            </div>
          </StContainer>
        </>
      ) : (
        <>
          <StContainer>
            <StWrapBtn>
              <StWrapBtnFollowing type="submit" onClick={onClick}>
                팔로워
              </StWrapBtnFollowing>
              <StWrapBtnFollow>팔로잉</StWrapBtnFollow>
            </StWrapBtn>

            <StSearchBarBox>
              <form onSubmit={searchData}>
                <StInput
                  placeholder="검색"
                  onChange={inputSearch}
                  value={inputContext}
                />
                <StSearchBtn type="submit">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ width: "23px", height: "23px", color: "#919191" }}
                  />
                </StSearchBtn>
              </form>
            </StSearchBarBox>

            <div>
              <>
                {searchList.length !== 0
                  ? searchList?.map((x, index) => {
                      console.log(x.profileImg);
                      return (
                        <div key={index}>
                          <StProfileContainer
                            id={x.userId}
                            onClick={onClickGoToOthersPage}
                          >
                            <StProfileBox>
                              <StProfileImg
                                src={
                                  x.profile === "none"
                                    ? "https://mimicimagestorage.s3.ap-northeast-2.amazonaws.com/profile/placeHolderImage.jpg"
                                    : x.profile
                                }
                              />
                            </StProfileBox>
                            <StWrapNicknameMbti>
                              <StNickname>{x.nickname}</StNickname>
                              <StMbti>{x.mbti}</StMbti>
                            </StWrapNicknameMbti>
                            {myData.userId !== parseInt(params.userId) ? (
                              <></>
                            ) : (
                              <StDeleteFollowBtn
                                id={x.userId}
                                onClick={changeMyUnFollowState}
                              >
                                삭제
                              </StDeleteFollowBtn>
                            )}
                          </StProfileContainer>
                        </div>
                      );
                    })
                  : followState.following?.map((x, index) => {
                      console.log(x.profileImg);
                      return (
                        <div key={index}>
                          <StProfileContainer
                            id={x.userId}
                            onClick={onClickGoToOthersPage}
                          >
                            <StProfileBox>
                              <StProfileImg
                                src={
                                  x.profile === "none"
                                    ? "https://mimicimagestorage.s3.ap-northeast-2.amazonaws.com/profile/placeHolderImage.jpg"
                                    : x.profile
                                }
                              />
                            </StProfileBox>
                            <StWrapNicknameMbti>
                              <StNickname>{x.nickname}</StNickname>
                              <StMbti>{x.mbti}</StMbti>
                            </StWrapNicknameMbti>
                            {myData.userId !== parseInt(params.userId) ? (
                              <></>
                            ) : (
                              <StDeleteFollowBtn
                                id={x.userId}
                                onClick={changeMyUnFollowState}
                              >
                                삭제
                              </StDeleteFollowBtn>
                            )}
                          </StProfileContainer>
                        </div>
                      );
                    })}
              </>
            </div>
          </StContainer>
        </>
      )}
    </StOutline>
  );
}

export default MyPageFollow;

const StOutline = styled.div`
  display: flex;
  margin-top: 0px;
  div {
    justify-content: unset;
  }
  justify-content: flex-start;
  -webkit-tap-highlight-color: transparent;

`;

const StContainer = styled.div`
  /* background-color: beige; */
  width: 500px;
  height: 100%;
  display: grid;
  display: inline-grid;
  column-gap: 20px;
  row-gap: 20px;
  margin-bottom: 100px;
  /* overflow:scroll; */
  -webkit-tap-highlight-color: transparent;
`;
const StWrapBtn = styled.div`
  /* background-color: black; */
  /* border-bottom: 1px solid #919191; */
  width: 500px;
  height: 45px;
  padding-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 60px;
  justify-content: center;
  cursor: pointer;

  @media only screen and (max-width: 500px) {
    width: 360px;
  }
`;
const StWrapBtnFollow = styled.div`
  /* border-style: inset; */
  background: none;
  /* font-size: 18px; */
  font-weight: 500;
  color: #ff6d53;
  border-bottom: 3px solid #ff6d53;
  outline: none;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
`;

const StWrapBtnFollowing = styled.div`
  /* border-style: outset; */
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  border-bottom: 1px solid #919191;
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
`;

const StSearchBarBox = styled.div`
  /* background-color: blue; */
  display: flex;
  position: relative;
  align-items: center;
  opacity: 1;
  width: 450px;
  height: 55px;
  margin: auto;
  border: 1px solid #919191;
  border-radius: 6px;

  @media only screen and (max-width: 500px) {
    width: 330px;
    margin-left: 15px;
    margin-right: 15px;
  }
`;

const StInput = styled.input`
  /* background-color: burlywood; */
  padding-left: 20px;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  width: 370px;
  height: 50px;
  z-index: -1;
  outline: none;
  overflow: auto; //검색어가 길어졌을때 오른쪽으로 자연스럽게 검색되도록 하기 위해
  ::placeholder {
    font-weight: 500;
    font-size: 18px;
    line-height: 18px;
  }

  @media only screen and (max-width: 500px) {
    width: 270px;
    height: 30px;
  }
`;

const StSearchBtn = styled.button`
  /* background-color: blue; */
  background: none;
  margin: auto;
  border: none;
  text-align: center;
  outline: none;
  cursor: pointer;
  width: 33px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  transform: translateX(-60%) translateY(-130%);
  @media screen and (max-width: 500px) {
    transform: translateX(-20%) translateY(-100%);
  }
`;
const StProfileContainer = styled.div`
  /* background: none; */
  border: none;
  outline: none;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;
  height: 100px;
  width: 450px;
  margin: auto;
  :hover {
    background-color: gainsboro;
  }
  cursor: pointer;
  @media only screen and (max-width: 500px) {
    grid-template-columns: 42px 4fr 1fr;
    width: 350px;
    height: 80px;
  }
`;

const StProfileBox = styled.div`
/* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ width, height }) => {
    return css`
      width: ${width || "60px"};
      height: ${height || "60px"};
    `;
  }}
  /* width:50px;
  height:50px; */
  border:none;
  outline: none;
  border-radius: 50%;
  overflow: hidden;
  @media only screen and (max-width: 500px) {
    width: 40px;
    height: 40px;
    margin-top: 0px;
    transform: translateX(0%) translateY(-15%);
  }
`;

const StProfileImg = styled.img`
  pointer-events: none;
  width: 60px;
  height: auto;
  margin: 0;
  @media only screen and (max-width: 500px) {
    width: 40px;
    height: auto;
  }
`;
const StWrapNicknameMbti = styled.div`
  pointer-events: none;
  margin-left: 10px;
`;
const StNickname = styled.h4`
  /* background-color:yellowgreen; */
  pointer-events: none;
  left: 0;
  display: grid;
  justify-content: left;
  height: 32px;
  margin-bottom: 0px;
  @media only screen and (max-width: 500px) {
    font-size:16px;
  }
`;

const StMbti = styled.h6`
  pointer-events: none;
  color: gray;
  text-align: left;
  margin-top: 0px;
`;
const StDeleteFollowBtn = styled.button`
  color: black;
  width: 65px;
  height: 35px;
  border-radius: 50px;
  background-color: white;
  border: 1px solid black;
  margin: auto 10px;
  :hover {
    background-color: gray;
  }
  cursor: pointer;
  @media only screen and (max-width: 500px) {
    font-size:16px;
  }
`;
