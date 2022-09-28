import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingContainer from "../../../utils/loadingState";
import instance from "../../../app/modules/instance";
import { tokenChecker, decodeMyTokenData } from "../../../utils/token";
import { getOthersTodoFetch } from "../../../app/modules/mytodosSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function ProfileModifyForm() {
  const myData = decodeMyTokenData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOthersTodoFetch({ userId: myData.userId }));
  }, []);

  const userState = useSelector((state) => state.mytodos.data);

  // 변경할 프로필의 내용들을 설정하는 상태
  const [changeProfile, setChangeProfile] = useState({
    nickname: myData.nickname,
    mbti: myData.mbti,
  });
  // 내 MBTI를 수정하기 위해 팝업을 띄워야하는지를 설정하는 상태
  const [selectMBTI, setSelectMBTI] = useState(false);
  // mbti 16개 리스트
  const mbtiList = [
    "ISTJ",
    "ISFJ",
    "INFJ",
    "INTJ",
    "ISTP",
    "ISFP",
    "INFP",
    "INTP",
    "ESTP",
    "ESFP",
    "ENFP",
    "ENTP",
    "ESTJ",
    "ESFJ",
    "ENFJ",
    "ENTJ",
  ];

  if (tokenChecker() === false) {
    alert("로그인 후 이용해주세요.");
    navigate("/mypage");
  }

  // 작성한 닉네임의 값으로 상태를 변경
  function changeInputData(event) {
    setChangeProfile({ ...changeProfile, nickname: event.target.value });
  }

  // 선택한 MBTI의 값으로 상태를 변경
  function changeMBTIProfile(event) {
    setChangeProfile({ ...changeProfile, mbti: event.target.value });
  }

  // MBTI 선택창을 띄울지 말지 설정
  function toggleMBTISelectPopUp(event) {
    event.preventDefault();
    setSelectMBTI(!selectMBTI);
  }

  // 프로필 정보를 업로드
  function submitModifyMyProfileData(event) {
    event.preventDefault();
    setLoading(true);
    const modifyConnect = async () => {
      try {
        const response = await instance.put("/accounts", changeProfile);
        if (response.data.message === "success") {
          window.localStorage.setItem("token", response.data.token);
          setLoading(false);
          alert("프로필이 변경됐습니다. 내 정보 화면으로 이동합니다.");
          navigate("/mypage");
        }
      } catch (error) {
        setLoading(false);
        alert("프로필 변경에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    };
    modifyConnect();
  }

  // 아마존 설정 사항

  // input을 통해 이미지 데이터 불러오기
  const changeImageFiles = async (event) => {
    event.preventDefault();
    setLoading(true);
    const requestImageData = async () => {
      let formData = new FormData();
      formData.append("profile", event.target.files[0]);
      try {
        const response = await instance.put(`/accounts/profile`, formData);
        if (response.data.message === "success") {
          window.localStorage.setItem("token", response.data.token);
          alert("프로필 이미지가 변경됐습니다. 내 정보 화면으로 이동합니다.");
          navigate("/mypage");
          setLoading(false);
        }
      } catch (error) {
        alert("프로필 이미지 변경에 실패했습니다. 잠시 후 다시 시도해주세요.");
        setLoading(false);
      }
    };
    requestImageData();
  };

  return (
    <>
      {loading === true ? <LoadingContainer /> : <></>}
      {selectMBTI === true ? (
        <StPopupBox>
          <StSlideDiv />
          {mbtiList.map((elem, idx) => (
            <StMBTIBtn
              key={idx}
              color={changeProfile.mbti === elem ? "#ffffff" : "#909090"}
              background={changeProfile.mbti === elem ? "#ff6d53" : "#ffffff"}
              border={
                changeProfile.mbti === elem
                  ? "1px solid #ff6d53"
                  : "1px solid #979797"
              }
              onClick={changeMBTIProfile}
              value={elem}>
              {elem}
            </StMBTIBtn>
          ))}
          <StCommonButton onClick={toggleMBTISelectPopUp}>확인</StCommonButton>
        </StPopupBox>
      ) : (
        <></>
      )}
      {Object.keys(userState).length === 0 ? (
        <LoadingContainer />
      ) : (
        <StContainer>
          <StMyProfileSec>
            <StMyImageBox>
              <StMyImagePreview
                src={
                  userState.userInfo.profile === "none"
                    ? "https://mimicimagestorage.s3.ap-northeast-2.amazonaws.com/profile/placeHolderImage.jpg"
                    : `${userState.userInfo.profile}`
                }
                htmlFor="inputImage"
                style={{ pointerEvents: "none" }}
              />
              <StMyImageInput
                id="inputImage"
                type="file"
                name="profile"
                accept="image/*"
                encType="multipart/form-data"
                onChange={changeImageFiles}
              />
            </StMyImageBox>
            <StChangeImageBtn htmlFor="inputImage">
              이미지 변경
            </StChangeImageBtn>
          </StMyProfileSec>
          <StCommonBorder />
          <StInputSettingBox>
            <StCommonLabel>나의 정보</StCommonLabel>
            <StCommonInput
              type="text"
              value={changeProfile.nickname}
              onChange={changeInputData}
            />
          </StInputSettingBox>
          <StCommonBorder />
          <StInputSettingBox>
            <StCommonLabel>나의 MBTI</StCommonLabel>
            <StSelectMBTIBtn onClick={toggleMBTISelectPopUp}>
              {changeProfile.mbti === "" || changeProfile.mbti === null
                ? "선택하기"
                : changeProfile.mbti}
            </StSelectMBTIBtn>
          </StInputSettingBox>
          <StCommonBorder />
          <StCommonButton
            margin="54px auto"
            onClick={submitModifyMyProfileData}>
            확인
          </StCommonButton>
        </StContainer>
      )}
    </>
  );
}

export default ProfileModifyForm;

const StContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;

  text-align: left;

  margin: 80px auto;
  padding: 0 12px;

  width: 500px;
  box-sizing: border-box;
  @media screen and (max-width: 500px) {
    width: 360px;
  }
`;

const StMyProfileSec = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 1rem 0;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

const StMyImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 50%;
  margin: 18px;

  height: 135px;
  width: 135px;
  overflow: hidden;
  @media screen and (max-width: 500px) {
    margin: 0px;
  }
`;

const StMyImagePreview = styled.label`
  background-image: ${(props) =>
    `url(${props.src})` ||
    `url("https://mimicimagestorage.s3.ap-northeast-2.amazonaws.com/profile/placeHolderImage.jpg")`};
  background-repeat: no-repeat;
  background-size: auto 144px;
  background-position: center;
  height: 144px;
  width: 144px;
  cursor: pointer;
`;

const StMyImageInput = styled.input`
  display: none;
`;

const StChangeImageBtn = styled.label`
  background: none;

  font-size: 18px;
  color: #ff6d53;
  font-weight: 500;

  border: none;
  outline: none;
  margin-bottom: 69px;

  cursor: pointer;
  transition: ease 0.1s;
  &:hover {
    color: #ffa595;
  }
  @media screen and (max-width: 500px) {
    margin-top: 15px;
    margin-bottom: 30px;
  }
`;

const StCommonBorder = styled.div`
  height: 1px;
  background: #c7c7c7;
  margin: 0 13px;
`;

const StInputSettingBox = styled.div`
  padding: 25px;
  @media screen and (max-width: 500px) {
    padding: 20px;
  }
`;

const StCommonLabel = styled.label`
  color: #313131;
  font-size: 18px;
  font-weight: 500;
  line-height: 32px;

  margin: 20px 0;
  @media screen and (max-width: 500px) {
    font-size: 16px;
    margin: 0;
  }
`;

const StCommonInput = styled.input`
  color: #313131;
  font-size: 18px;
  font-weight: 500;
  line-height: 32px;

  border: none;
  outline: none;

  margin-left: 104px;
  padding: 0;
  width: 234px;
  @media screen and (max-width: 500px) {
    font-size: 16px;
    width: 180px;
    margin-left: 30px;
  }
`;

const StMBTIBtn = styled.button`
  background: ${(props) => props.background};

  color: ${(props) => props.color};
  font-weight: 500;
  font-size: 18px;

  border: ${(props) => props.border || "1px solid #979797"};
  border-radius: 6px;
  margin: 6px;

  height: 105px;
  width: 105px;
  box-sizing: border-box;
  cursor: pointer;
  transition: ease 0.1s;
  &:hover {
    transform: scale(1.03);
  }

  @media screen and (max-width: 500px) {
    height: 75px;
    width: 75px;
    font-size: 14px;
  }
`;

const StSelectMBTIBtn = styled.button`
  background: none;

  text-align: left;
  color: #ff6d53;
  font-size: 18px;
  font-weight: 500;
  line-height: 32px;

  border: none;
  outline: none;

  margin-left: 92px;
  padding: 0;
  width: 200px;

  cursor: pointer;
  transition: ease 0.1s;
  &:hover {
    color: #ffa595;
  }

  @media screen and (max-width: 500px) {
    font-size: 16px;
    width: 180px;
    margin-left: 20px;
  }
`;

const StPopupBox = styled.div`
  background: #ffffff;

  position: absolute;
  width: 500px;
  height: 683px;

  box-shadow: 0px 2.66667px 26.6667px rgba(0, 0, 0, 0.25);
  border-radius: 21.3333px 21.3333px 0px 0px;

  z-index: 10;
  bottom: 0;

  @media screen and (max-width: 500px) {
    width: 360px;
    height: 500px;
  }
`;

const StSlideDiv = styled.div`
  background: #e8e8e8;

  width: 42.67px;
  height: 5.33px;

  border-radius: 133.333px;
  margin: 21px auto 28px auto;
`;

const StCommonButton = styled.div`
  background: #ff6d53;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  color: #ffffff;

  border-radius: 6px;
  margin: ${(props) => props.margin || "25px"};

  width: 90%;
  height: 70px;

  cursor: pointer;
  transition: ease 0.1s;
  &:hover {
    background: #ffa595;
  }

  @media screen and (max-width: 500px) {
    font-size: 18px;
    height: 50px;
    margin: 18px;
  }
`;
