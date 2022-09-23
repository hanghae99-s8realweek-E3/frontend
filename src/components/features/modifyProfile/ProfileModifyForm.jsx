import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AWS from "aws-sdk";
import LoadingContainer from "../../../utils/loadingState";
import instance from "../../../app/modules/instance";
import { tokenChecker, decodeMyTokenData } from "../../../utils/token";

function ProfileModifyForm() {
  const myData = decodeMyTokenData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 변경할 프로필의 내용들을 설정하는 상태
  const [changeProfile, setChangeProfile] = useState({
    profile:
      myData.profile === "none"
        ? "https://mimicimagestorage.s3.ap-northeast-2.amazonaws.com/profile/placeHolderImage.jpg"
        : myData.profile,
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
        alert(error.response.data.errorMessage);
      }
    };
    modifyConnect();
  }

  // 아마존 설정 사항

  // Bucket 설정, 버킷 이름과 리전 정보를 가진 AWS의 S3를 객체로 생성
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  });

  // 이미지를 업로드할 내 버킷 설정
  const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME },
    region: process.env.REACT_APP_AWS_REGION,
  });

  // input을 통해 이미지 데이터 불러오기
  function changeImageFiles(event) {
    const imageFile = event.target.files[0];
    // .을 기준으로 자르고, 그 뒤에 있는 pop() 메소드를 이용해 그 뒤에 있는
    // 확장자를 체크
    const imageExtention = imageFile.name.split(".").pop();
    if (
      imageFile.type !== "image/jpeg" ||
      imageExtention !== "jpg" ||
      imageExtention !== "JPG"
    ) {
      alert("이미지 파일은 JPG 확장자인 파일만 업로드하실 수 있습니다.");
      return;
    }
    // 이후, 업로드할 파일을 state에 저장
    setLoading(true);
    const params = {
      ACL: "public-read",
      Body: imageFile,
      Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
      ContentType: "image/jpg",
      Key:
        process.env.REACT_APP_AWS_S3_FOLDER_NAME +
        `${new Date().getTime()}.jpg`,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", () => {
        const modifyConnect = async () => {
          try {
            const response = await instance.put("/accounts", {
              ...changeProfile,
              profile: process.env.REACT_APP_AWS_S3_BUCKET_ROUTE + params.Key,
            });
            if (response.data.message === "success") {
              window.localStorage.setItem("token", response.data.token);
              alert(
                "프로필 이미지가 변경됐습니다. 내 정보 화면으로 이동합니다."
              );
              navigate("/mypage");
              setLoading(false);
            }
          } catch (error) {
            alert(error.response.data.errorMessage);
          }
        };
        modifyConnect();
      })
      .send((error) => {
        if (error) {
          console.log(error);
        }
      });
  }

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
      <StContainer>
        <StMyProfileSec>
          <StMyImageBox>
            <StMyImagePreview
              src={
                changeProfile.profile === ""
                  ? "https://mimicimagestorage.s3.ap-northeast-2.amazonaws.com/profile/placeHolderImage.jpg"
                  : `${changeProfile.profile}`
              }
              htmlFor="inputImage"
              style={{ pointerEvents: "none" }}
            />
            <StMyImageInput
              id="inputImage"
              type="file"
              onChange={changeImageFiles}
            />
          </StMyImageBox>
          <StChangeImageBtn htmlFor="inputImage">이미지 변경</StChangeImageBtn>
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
        <StCommonButton margin="54px auto" onClick={submitModifyMyProfileData}>
          확인
        </StCommonButton>
      </StContainer>
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
`;

const StMyProfileSec = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 1rem 0;
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
  /* background-image: ${(props) =>
    props.src ||
    "url(https://mimicimagestorage.s3.ap-northeast-2.amazonaws.com/profile/placeHolderImage.jpg)"};
  background-repeat: no-repeat;
  background-size: 144px 144px;
  background-position: center;
  height: 144px;
  width: 144px; */
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
`;

const StCommonBorder = styled.div`
  height: 1px;
  background: #c7c7c7;
  margin: 0 13px;
`;

const StInputSettingBox = styled.div`
  padding: 25px 25px;
`;

const StCommonLabel = styled.label`
  color: #313131;
  font-size: 18px;
  font-weight: 500;
  line-height: 32px;

  margin: 20px 0;
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

  width: 450px;
  height: 70px;

  cursor: pointer;
`;
