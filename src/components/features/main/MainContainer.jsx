import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper";
import { getCookie } from "../../../utils/cookie";
import WelcomeForm from "./WelcomeForm";

function MainContainer() {
  const firstLoginCheck = getCookie("firstLogin");
  const bannerSlide = [
    process.env.PUBLIC_URL + `/images/Banner1.jpg`,
    "https://cdn.class101.net/images/367bcbd9-1311-405f-bb5f-5737e4f9b43a",
    "https://cdn.class101.net/images/070f5c4e-031b-41b9-9d2b-be4bee95c031/1920xauto.webp",
    "https://cdn.class101.net/images/12783d2d-308a-49fd-8d5c-096ec8e05c9b/1920xauto.webp",
    "https://cdn.class101.net/images/63be45f8-20fa-47e4-b503-d2445799ddba/1920xauto.webp",
    "https://cdn.class101.net/images/dfb0bc2d-5a8a-4adc-9c44-6d5425c18a9d/1920xauto.webp",
  ];
  const locationLink = [
    "https://www.16personalities.com/ko",
    "https://poomang.com/t/promiseworld?from_detail=True",
    "http://16types.glam.am/intro",
    "https://ktestone.com/kapable.github.io/personalColor2022/",
    "https://doda.app/quiz/l2hrXtybhV",
  ];

  function moveToPage0() {
    window.location.assign(
      "https://github.com/hanghae99-s8realweek-E3/frontend"
    );
  }

  function moveToPage1() {
    window.location.assign(
      "https://develop-neoguri.notion.site/99-8-E-3-eb0b2d4f20354b90b1dc014867f3fd7a"
    );
  }

  function moveToPageNewTab(event) {
    console.log(event.target);
    window.open(locationLink[event.target.id]);
  }

  return (
    <>
      {firstLoginCheck !== undefined ? <WelcomeForm /> : <></>}
      <StContainer>
        <StHeadTitle>
          미믹님!
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
            pagination={{ clickable: true }}>
            {bannerSlide.map((elem, idx) => (
              <SwiperSlide key={idx} style={SwiperImageCSSData}>
                <SildeBannerImage width="450px" src={elem} />
              </SwiperSlide>
            ))}
          </Swiper>
        </BannerSlideBox>
        <InfomationSlideBox>
          <SildeTitle>알려드릴 것이 있어요!</SildeTitle>

          {/* 슬라이드 목록 구간 */}
          {/* 해결 과제로서... 기능 구현 문제 찾기, 빈 슬라이드를 어떻게 해결할지?*/}
          {/* 문제는 해결했는데 왜 해결된건지 모르겠다. width를 정밀하게 주니까 해결. */}
          <Swiper
            width={350}
            slidesPerView={2}
            spaceBetween={12}
            style={{ margin: "0.5rem 0" }}
            scrollbar={{ draggable: true }}>
            <SwiperSlide onClick={moveToPage0} style={SwiperPostCSSData}>
              <PostImageBox width="170px" height="110px">
                <SildeImage width="170px" src={bannerSlide[0]} />
              </PostImageBox>
              <PostText>Lorem ipsum dolor sit amet consectetur</PostText>
            </SwiperSlide>

            <SwiperSlide onClick={moveToPage1} style={SwiperPostCSSData}>
              <PostImageBox width="170px" height="110px">
                <SildeImage width="170px" src={bannerSlide[1]} />
              </PostImageBox>
              <PostText>Lorem ipsum dolor </PostText>
            </SwiperSlide>

            <SwiperSlide onClick={moveToPage0} style={SwiperPostCSSData}>
              <PostImageBox width="170px" height="110px">
                <SildeImage width="170px" src={bannerSlide[2]} />
              </PostImageBox>
              <PostText>Lorem ipsum dolor sit amet consectetur</PostText>
            </SwiperSlide>

            <SwiperSlide onClick={moveToPage1} style={SwiperPostCSSData}>
              <PostImageBox width="170px" height="110px">
                <SildeImage width="170px" src={bannerSlide[3]} />
              </PostImageBox>
              <PostText>Lorem ipsum dolor sit amet consectetur</PostText>
            </SwiperSlide>

            <SwiperSlide onClick={moveToPage0} style={SwiperPostCSSData}>
              <PostImageBox width="170px" height="110px">
                <SildeImage width="170px" src={bannerSlide[4]} />
              </PostImageBox>
              <PostText>Lorem ipsum dolor sit amet consectetur</PostText>
            </SwiperSlide>
          </Swiper>
        </InfomationSlideBox>
        <InfomationSlideBox>
          <SildeTitle>심심풀이에 이런 테스트들은 어때요?</SildeTitle>

          {/* 슬라이드 목록 구간 */}
          <Swiper
            width={350}
            slidesPerView={2}
            spaceBetween={12}
            style={{ margin: "0.5rem 0" }}
            scrollbar={{ draggable: true }}>
            <SwiperSlide
              id="0"
              onClick={moveToPageNewTab}
              style={SwiperPostCSSData}>
              <PostImageBox width="170px" height="110px">
                <SildeImage
                  width="300px"
                  src={process.env.PUBLIC_URL + `/images/testImage0.jpg`}
                />
              </PostImageBox>
              <PostText>
                <span style={{ fontWeight: "700" }}>[16 Personalities]</span>{" "}
                MBTI 검사의 근본!
              </PostText>
            </SwiperSlide>

            <SwiperSlide
              id="1"
              onClick={moveToPageNewTab}
              style={SwiperPostCSSData}>
              <PostImageBox width="170px" height="110px">
                <SildeImage
                  width="190px"
                  src={process.env.PUBLIC_URL + `/images/testImage1.jpg`}
                />
              </PostImageBox>
              <PostText>
                <span style={{ fontWeight: "700" }}>[푸망XDB손해보험]</span>{" "}
                약속BTI 테스트
              </PostText>
            </SwiperSlide>

            <SwiperSlide
              id="2"
              onClick={moveToPageNewTab}
              style={SwiperPostCSSData}>
              <PostImageBox width="170px" height="110px">
                <SildeImage
                  width="250px"
                  src={process.env.PUBLIC_URL + `/images/testImage2.jpg`}
                />
              </PostImageBox>
              <PostText>
                <span style={{ fontWeight: "700" }}>[glam]</span> 연애 능력치
                테스트
              </PostText>
            </SwiperSlide>

            <SwiperSlide
              id="3"
              onClick={moveToPageNewTab}
              style={SwiperPostCSSData}>
              <PostImageBox width="170px" height="110px">
                <SildeImage
                  width="210px"
                  src={process.env.PUBLIC_URL + `/images/testImage3.jpg`}
                />
              </PostImageBox>
              <PostText>
                <span style={{ fontWeight: "700" }}>[케이테스트]</span> 2022
                버전 퍼스널 컬러 테스트
              </PostText>
            </SwiperSlide>

            <SwiperSlide
              id="4"
              onClick={moveToPageNewTab}
              style={SwiperPostCSSData}>
              <PostImageBox width="170px" height="110px">
                <SildeImage
                  width="180px"
                  src={process.env.PUBLIC_URL + `/images/testImage4.jpg`}
                />
              </PostImageBox>
              <PostText>
                <span style={{ fontWeight: "700" }}>[Doda]</span> 수랑의 성향
                검사
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
`;

const StHeadTitle = styled.h1`
  text-align: left;
  font-size: 24px;
  font-weight: 500;
  margin: 0 auto 20px 0;
`;

const BannerSlideBox = styled.div`
  display: flex;
  flex-direction: row;

  width: 450px;
  height: 250px;

  border-radius: 6px;

  overflow: hidden;
  box-sizing: border-box;
`;

const InfomationSlideBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 280px;

  /* margin: 10px 0; */
  overflow: hidden;
`;

const SildeBannerImage = styled.img`
  width: ${(props) => props.width};
`;

const SildeImage = styled.img`
  width: ${(props) => props.width};
  pointer-events: none;
`;

const SildeTitle = styled.h4`
  font-size: 16px;
  text-align: left;

  margin: 32px 0 20px 0;
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

const SwiperImageCSSData = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  width: "450px",
  height: "260px",
};

const SwiperPostCSSData = {
  display: "flex",
  flexDirection: "column",
  margin: "0 0.5rem",

  width: "170px",
  height: "170px",

  borderRadius: "5px",
  cursor: "pointer",
};

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
