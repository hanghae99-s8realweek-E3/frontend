import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper";
import WelcomeForm from "./WelcomeForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainFetch } from "../../../app/modules/mainSlice";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { decodeMyTokenData, tokenChecker } from "../../../utils/token";
import { ReactComponent as Challenge } from "../../../images/Challenge.svg";

function MainContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mainState = useSelector((state) => state.main);
  const myData = decodeMyTokenData();

  useEffect(() => {
    dispatch(getMainFetch());
  }, []);

  const firstLoginCheck = window.localStorage.getItem("firstLogin");
  const bannerSlide = [
    {
      src: process.env.PUBLIC_URL + `/images/banner1.png`,
      alt: "배너 1 미믹 사용 설명서 탭하면 해당 페이지로 이동합니다.",
    },
    {
      src: process.env.PUBLIC_URL + `/images/banner2.png`,
      alt: "배너 2 미믹 설문조사 참여하기 탭하면 해당 페이지로 이동합니다.",
    },
  ];
  const locationLink = [
    "https://www.16personalities.com/ko",
    "https://poomang.com/t/promiseworld?from_detail=True",
    "http://16types.glam.am/intro",
    "https://ktestone.com/kapable.github.io/personalColor2022/",
    "https://doda.app/quiz/l2hrXtybhV",
  ];

  function moveToFeedPage(event) {
    if (tokenChecker() === false) {
      alert("로그인 후 이용해주세요.");
      navigate("/mypage");
    } else if (tokenChecker() === true) {
      navigate(`/feeddetail/${event.target.id}`);
    }
  }

  function moveToPageNewTab(event) {
    window.open(locationLink[event.target.id]);
  }

  function moveToBannerPage(idx) {
    if (idx === 0) {
      window.open(
        "https://develop-neoguri.notion.site/MIMIC-010c6fa8f221425db53abdbb216f7cd6"
      );
    } else if (idx === 1) {
      window.open("https://forms.gle/ByMhVrN7Gr9pUuBZ9");
    }
  }

  function moveToTestPage() {
    navigate("/test");
  }

  return (
    <>
      {firstLoginCheck !== null ? <WelcomeForm /> : <></>}

      <StContainer>
        <StHeadTitle tabIndex="0">
          {myData !== undefined ? myData.nickname : "미믹"} 님!
          <br />
          오늘은 누구를 따라해볼까요?
        </StHeadTitle>
        <BannerSlideBox>
          {/* Pagination과 Navigation, Autoplay를 이용하고 싶아면 반드시 modules 속에 이용할 기능을 배치해주자. */}
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            speed={500}
            scrollbar={{ draggable: true }}
            allowTouchMove
            autoplay={{ delay: 3000 }}
            navigation={true}
            pagination={{ clickable: true }}
            height={200}>
            {bannerSlide.map((elem, idx) => (
              <SwiperSlide tabIndex="0" key={idx} style={SwiperImageCSSData}>
                <SildeBannerImage
                  src={elem.src}
                  onClick={() => moveToBannerPage(idx)}
                  alt={elem.alt}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </BannerSlideBox>
        <PostSlideBox>
          <SildeTitle tabIndex="0">오늘의 베스트 미믹!</SildeTitle>

          {/* 슬라이드 목록 구간 */}
          {/* 해결 과제로서... 기능 구현 문제 찾기, 빈 슬라이드를 어떻게 해결할지?*/}
          {/* 문제는 해결했는데 왜 해결된건지 모르겠다. width를 정밀하게 주니까 해결. */}
          {Object.keys(mainState.data).length !== 0 ? (
            <Swiper
              width={150}
              slidesPerView={1}
              spaceBetween={12}
              style={{
                padding: "5px",
                height: window.innerWidth < 500 ? "270px" : "300px",
              }}
              scrollbar={{ draggable: true }}>
              {mainState.data?.challenge.map((elem, idx) => (
                <SwiperSlide
                  tabIndex="0"
                  key={idx}
                  style={SwiperPostCSSData}
                  id={elem.todoId}
                  onClick={moveToFeedPage}
                  aria-label={
                    elem.todo + ", 탭하면 상세 피드 페이지로 이동합니다."
                  }>
                  <span
                    style={{
                      fontSize: "46px",
                      color: "#FF6D53",
                      textAlign: "left",
                      pointerEvents: "none",
                    }}>
                    ❝
                  </span>
                  <div
                    style={{
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                      marginRight: "10%",
                      height: "14vh",
                      pointerEvents: "none",
                    }}
                    aria-hidden="true">
                    {elem.todo}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      pointerEvents: "none",
                    }}>
                    <div>
                      <div
                        aria-hidden="true"
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "15px",
                          color: "#919191",
                          pointerEvents: "none",
                        }}>
                        {elem.mbti}
                      </div>
                    </div>
                    <StStatusBox>
                      <label aria-label="댓글 수">
                        <FontAwesomeIcon
                          style={{
                            margin: "0 4px",
                            color: "#919191",
                            fontSize: "12px",
                            pointerEvents: "none",
                          }}
                          icon={faMessage}
                        />
                      </label>
                      <StCountSpan
                        color={"#919191"}
                        style={{ marginRight: "10px" }}>
                        {elem.commentCounts}
                      </StCountSpan>
                      <label
                        aria-label="도전 수"
                        style={{ height: "18px", width: "18px" }}>
                        <Challenge />
                      </label>
                      <StCountSpan color={"#919191"}>
                        {elem.challengedCounts}
                      </StCountSpan>
                    </StStatusBox>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <></>
          )}
        </PostSlideBox>

        <StCommonButton
          onClick={moveToTestPage}
          tabIndex="0"
          aria-label="MBTI 테스트 버튼, 누르면 MBTI 테스트 화면으로 이동합니다.">
          <img
            src={process.env.PUBLIC_URL + "/images/TestBanner.svg"}
            alt=""
            aria-hidden="true"
            style={{ borderRadius: "6px", pointerEvents: "none" }}
          />
        </StCommonButton>

        <InfomationSlideBox>
          <SildeTitle tabIndex="0">
            심심풀이에 이런 테스트들은 어때요?
          </SildeTitle>

          {/* 슬라이드 목록 구간 */}
          <Swiper
            modules={[Navigation]}
            width={350}
            slidesPerView={2}
            spaceBetween={12}
            navigation={true}
            style={{ margin: "0.5rem 0" }}
            scrollbar={{ draggable: true }}>
            <SwiperSlide
              id="0"
              onClick={moveToPageNewTab}
              style={SwiperTestCardCSSData}
              tabIndex="0"
              aria-label={
                "[16 Personalities] MBTI 검사의 근본!, 탭 하면 해당 테스트 페이지로 이동합니다."
              }>
              <PostImageBox width="170px" height="110px">
                <SildeImage
                  width="300px"
                  src={process.env.PUBLIC_URL + `/images/testImage0.jpg`}
                  aria-hidden="true"
                />
              </PostImageBox>
              <PostText aria-hidden="true">
                <span style={{ fontWeight: "700", pointerEvents: "none" }}>
                  [16 Personalities]
                </span>{" "}
                MBTI 검사의 근본!
              </PostText>
            </SwiperSlide>

            <SwiperSlide
              id="1"
              onClick={moveToPageNewTab}
              style={SwiperTestCardCSSData}
              tabIndex="0"
              aria-label={
                "[푸망XDB손해보험] 약속BTI 테스트, 탭 하면 해당 테스트 페이지로 이동합니다."
              }>
              <PostImageBox width="170px" height="110px">
                <SildeImage
                  width="190px"
                  src={process.env.PUBLIC_URL + `/images/testImage1.jpg`}
                  aria-hidden="true"
                />
              </PostImageBox>
              <PostText aria-hidden="true">
                <span style={{ fontWeight: "700", pointerEvents: "none" }}>
                  [푸망XDB손해보험]
                </span>{" "}
                약속BTI 테스트
              </PostText>
            </SwiperSlide>

            <SwiperSlide
              id="2"
              onClick={moveToPageNewTab}
              style={SwiperTestCardCSSData}
              tabIndex="0"
              aria-label={
                "[glam] 연애 능력치 테스트, 탭 하면 해당 테스트 페이지로 이동합니다."
              }>
              <PostImageBox width="170px" height="110px">
                <SildeImage
                  width="250px"
                  src={process.env.PUBLIC_URL + `/images/testImage2.jpg`}
                  aria-hidden="true"
                />
              </PostImageBox>
              <PostText aria-hidden="true">
                <span style={{ fontWeight: "700", pointerEvents: "none" }}>
                  [glam]
                </span>{" "}
                연애 능력치 테스트
              </PostText>
            </SwiperSlide>

            <SwiperSlide
              id="3"
              onClick={moveToPageNewTab}
              style={SwiperTestCardCSSData}
              tabIndex="0"
              aria-label={
                "[케이테스트] 2022 버전 퍼스널 컬러 테스트, 탭 하면 해당 테스트 페이지로 이동합니다."
              }>
              <PostImageBox width="170px" height="110px">
                <SildeImage
                  width="210px"
                  src={process.env.PUBLIC_URL + `/images/testImage3.jpg`}
                  aria-hidden="true"
                />
              </PostImageBox>
              <PostText aria-hidden="true">
                <span style={{ fontWeight: "700", pointerEvents: "none" }}>
                  [케이테스트]
                </span>{" "}
                2022 버전 퍼스널 컬러 테스트
              </PostText>
            </SwiperSlide>

            <SwiperSlide
              id="4"
              onClick={moveToPageNewTab}
              style={SwiperTestCardCSSData}
              tabIndex="0"
              aria-label={
                "[Doda] 수랑의 성향 검사, 탭 하면 해당 테스트 페이지로 이동합니다."
              }>
              <PostImageBox width="170px" height="110px">
                <SildeImage
                  width="180px"
                  src={process.env.PUBLIC_URL + `/images/testImage4.jpg`}
                  aria-hidden="true"
                />
              </PostImageBox>
              <PostText aria-hidden="true">
                <span style={{ fontWeight: "700", pointerEvents: "none" }}>
                  [Doda]
                </span>{" "}
                수랑의 성향 검사
              </PostText>
            </SwiperSlide>
          </Swiper>
        </InfomationSlideBox>
      </StContainer>
    </>
  );
}

export default MainContainer;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 500px;
  overflow: hidden;

  margin: 80px 0 120px 0;
  padding: 0 25px;
  box-sizing: border-box;

  @media screen and (max-width: 500px) {
    align-items: center;
    width: 360px;
  }
`;

const StHeadTitle = styled.h1`
  text-align: left;
  font-size: 24px;
  font-weight: 500;
  margin: 0 auto 5px 0;
  @media screen and (max-width: 500px) {
    font-size: 18px;
  }
`;

const BannerSlideBox = styled.div`
  display: flex;
  flex-direction: row;

  width: 450px;
  height: 250px;

  border-radius: 6px;

  overflow: hidden;
  box-sizing: border-box;

  @media screen and (max-width: 500px) {
    width: 324px;
    height: auto;
  }
`;

const PostSlideBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;

  /* margin: 10px 0; */
  overflow: hidden;
  @media screen and (max-width: 500px) {
    width: 324px;
  }
`;

const InfomationSlideBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 280px;

  /* margin: 10px 0; */
  overflow: hidden;
  @media screen and (max-width: 500px) {
    width: 324px;
  }
`;

const SildeBannerImage = styled.img`
  width: 450px;

  @media screen and (max-width: 500px) {
    width: 324px;
    height: auto;
  }
`;

const SildeImage = styled.img`
  width: ${(props) => props.width};
  pointer-events: none;
`;

const SildeTitle = styled.label`
  font-size: 20px;
  text-align: left;

  margin: 32px 0 5px 0;
`;

const PostImageBox = styled.div`
  background-color: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 170px;
  height: 110px;

  border-radius: 6px;
  margin: 0;
  padding: 0;
  overflow: hidden;

  pointer-events: none;
`;

const PostText = styled.p`
  font-size: 16px;
  text-align: left;
  margin-top: 20px;
  /* padding-left: 0.3rem; */
  width: 170px;
  height: 32px;
`;

const StStatusBox = styled.div`
  display: flex;
  align-items: center;

  margin-top: auto;
  margin-left: auto;
  margin-right: 0;

  pointer-events: none;
`;

const SwiperImageCSSData = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  width: "450px",
  height: window.innerWidth > 500 ? "260px" : "170px",
  cursor: "pointer",
};

const SwiperTestCardCSSData = {
  background: "#ffffff",
  display: "flex",
  flexDirection: "column",
  margin: "0 0.5rem",

  width: "170px",
  height: "170px",
  wordBreak: "break-all",

  borderRadius: "5px",
  cursor: "pointer",
};

const SwiperPostCSSData = {
  background: "#ffffff",
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  padding: "4%",
  borderRadius: "6px",
  height: "70%",
  cursor: "pointer",
  boxShadow: "0px 0px 10px 0px rgba(220, 220, 220, 0.6)",
  marginTop: "10px",
};

const StCountSpan = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.color};
  pointer-events: none;
  margin: 0 4px;
`;

const StCommonButton = styled.div`
  display: block;

  font-weight: 500;

  margin: 0 auto 10px auto;

  width: 100%;
  height: 100px;

  cursor: pointer;

  @media screen and (max-width: 500px) {
    font-size: 18px;
    height: 50px;
  }
`;

// legacy - 이런 것을 사용해본 적도 있었다거나, 참고할 만했던 내용들 기록.

// const [currentSlide, setCurrentSlide] = useState(0);
// Slide를 자동으로 움직이게 해줌.
// useEffect를 통해서 setTimeout 설정
// useEffect(()=> {
//   setTimeout(
//     // setCurrentSlide를 통해서 현재 보여줄 슬라이드의
//     () => setCurrentSlide(currentSlide !== 2 ? currentSlide+1 : 0), 3000
//   )
// },[currentSlide])

// <BannerSlideBox>
//   음수를 곱해주는 이유는 왼쪽으로 이동할 것이기 때문.
//   currentSlide의 순서에 맞춰 곱해줌으로서 이동시켜준다.
//   <SlideList height="300px" style={{transform : `translateX(${- currentSlide * 100}%)`, transition: "ease 500ms", whiteSpace: "nowrap"}}>
//     <SlideImageBox width="500px" height="300px">
//       <SildeImage width="500px" src={bannerSlide[0]} />
//     </SlideImageBox>
//     <SlideImageBox width="500px" height="300px">
//       <SildeImage width="500px" src={bannerSlide[1]} />
//     </SlideImageBox>
//     <SlideImageBox width="500px" height="300px">
//       <SildeImage width="500px" src={bannerSlide[2]} />
//     </SlideImageBox>
//       </SlideList>
// </BannerSlideBox>

// const SlideList = styled.div`
//   display: flex;
//   flex-direction: row;

//   height: ${props => props.height};
//   width: 100%;
// `
//     // /* transform: translateX(${(-100 / SlideImageBox.length) * (0.5 + currentIndex)}%); */

// const SlideImageBox = styled.div`
//   background-color: gray;
//   display:flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   width: ${props => props.width};
//   height: ${props => props.height};
// `
