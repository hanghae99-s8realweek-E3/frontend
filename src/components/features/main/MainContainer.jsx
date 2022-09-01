import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from "swiper";

function MainContainer () {
  const bannerSlide = [
    "https://cdn.class101.net/images/ed70fb92-b8fb-42cd-83d0-db0761a60f37/1920xauto.webp",
    "https://cdn.class101.net/images/367bcbd9-1311-405f-bb5f-5737e4f9b43a",
    "https://cdn.class101.net/images/070f5c4e-031b-41b9-9d2b-be4bee95c031/1920xauto.webp",
    "https://cdn.class101.net/images/12783d2d-308a-49fd-8d5c-096ec8e05c9b/1920xauto.webp",
    "https://cdn.class101.net/images/63be45f8-20fa-47e4-b503-d2445799ddba/1920xauto.webp",
    "https://cdn.class101.net/images/dfb0bc2d-5a8a-4adc-9c44-6d5425c18a9d/1920xauto.webp"
  ]
  
  function moveToPage0 () {
    window.location.assign('https://github.com/hanghae99-s8realweek-E3/frontend')
  }

  function moveToPage1 () {
    window.location.assign('https://develop-neoguri.notion.site/99-8-E-3-eb0b2d4f20354b90b1dc014867f3fd7a')
  }

  return (
    <StContainer>
      <BannerSlideBox>
        <Swiper modules={[Pagination, Navigation, Autoplay]} spaceBetween={0} slidesPerView={1} speed={500} scrollbar={{ draggable: true }} allowTouchMove autoplay={{ delay: 3000 }} navigation={true} pagination={{ clickable: true }}>
          {bannerSlide.map((elem, idx) =>
            <SwiperSlide key={idx} style={SwiperImageCSSData}>
              <SildeImage width="500px" src={elem} />
            </SwiperSlide>)}
        </Swiper>
      </BannerSlideBox>
      <InfomationSlideBox>
        <SildeTitle>알려드릴 것이 있어요!</SildeTitle>

        {/* 슬라이드 목록 구간 */}
        {/* 해결 과제로서... 기능 구현 문제 찾기, 빈 슬라이드를 어떻게 해결할지?*/}
        {/* 문제는 해결했는데 왜 해결된건지 모르겠다. width를 정밀하게 주니까 해결. */}
        <Swiper width={250} slidesPerView={2} spaceBetween={10} style={{margin:"0.5rem 0"}} scrollbar={{ draggable: true }}>
          <SwiperSlide onClick={moveToPage0} style={SwiperPostCSSData}>
            <PostImageBox width="120px" height="80px">
              <SildeImage width="140px" src={bannerSlide[0]} />
            </PostImageBox>
            <PostText>테스트 1</PostText>
          </SwiperSlide>

          <SwiperSlide onClick={moveToPage1} style={SwiperPostCSSData}>
            <PostImageBox width="120px" height="80px">
              <SildeImage width="140px" src={bannerSlide[1]} />
            </PostImageBox>
            <PostText>테스트 2</PostText>
          </SwiperSlide>

          <SwiperSlide onClick={moveToPage0} style={SwiperPostCSSData}>
            <PostImageBox width="120px" height="80px">
              <SildeImage width="140px" src={bannerSlide[2]} />
            </PostImageBox>
            <PostText>테스트 3</PostText>
          </SwiperSlide>

          <SwiperSlide onClick={moveToPage1} style={SwiperPostCSSData}>
            <PostImageBox width="120px" height="80px">
              <SildeImage width="140px" src={bannerSlide[3]} />
            </PostImageBox>
            <PostText>테스트 4</PostText>
          </SwiperSlide>

          <SwiperSlide onClick={moveToPage0} style={SwiperPostCSSData}>
            <PostImageBox width="120px" height="80px">
              <SildeImage width="140px" src={bannerSlide[4]} />
            </PostImageBox>
            <PostText>테스트 5</PostText>
          </SwiperSlide>
        </Swiper>

      </InfomationSlideBox>
      <InfomationSlideBox>
        <SildeTitle>한 주 간의 레포트!</SildeTitle>

        {/* 슬라이드 목록 구간 */}
        <Swiper width={250} slidesPerView={2} spaceBetween={10} style={{margin:"0.5rem 0"}}>
          <SwiperSlide style={SwiperPostCSSData}>
            <PostImageBox width="120px" height="80px">
              <SildeImage width="140px" src={bannerSlide[0]} />
            </PostImageBox>
            <PostText>테스트 1</PostText>
          </SwiperSlide>

          <SwiperSlide style={SwiperPostCSSData}>
            <PostImageBox width="120px" height="80px">
              <SildeImage width="140px" src={bannerSlide[1]} />
            </PostImageBox>
            <PostText>테스트 2</PostText>
          </SwiperSlide>

          <SwiperSlide style={SwiperPostCSSData}>
            <PostImageBox width="120px" height="80px">
              <SildeImage width="140px" src={bannerSlide[2]} />
            </PostImageBox>
            <PostText>테스트 3</PostText>
          </SwiperSlide>

          <SwiperSlide style={SwiperPostCSSData}>
            <PostImageBox width="120px" height="80px">
              <SildeImage width="140px" src={bannerSlide[3]} />
            </PostImageBox>
            <PostText>테스트 4</PostText>
          </SwiperSlide>

          <SwiperSlide style={SwiperPostCSSData}>
            <PostImageBox width="120px" height="80px">
              <SildeImage width="140px" src={bannerSlide[4]} />
            </PostImageBox>
            <PostText>테스트 5</PostText>
          </SwiperSlide>
        </Swiper>

      </InfomationSlideBox>
    </StContainer>
  )
}

export default MainContainer;


const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 500px;
  overflow: hidden;

  margin:80px 0;
  box-sizing: border-box;
`

const BannerSlideBox = styled.div`
  display: flex;
  flex-direction: row;

  width: 500px;
  height: 300px;
  
  border: 1px solid blue;
  margin-bottom: 30px;
  
  overflow: hidden;
  box-sizing: border-box;
`

const InfomationSlideBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 160px;
  
  margin: 10px 0;
  overflow:hidden;
`

const SildeImage = styled.img`
  width: ${props => props.width};

`

const SildeTitle = styled.h4`
  font-size: 16px;
  text-align: left;

  margin:0;
  margin-left: 1rem;
`

const PostImageBox = styled.div`
  background-color: gray;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: ${props => props.width};
  height: ${props => props.height};

  border-radius: 5px 5px 0 0;
  margin:0;
  padding:0;
  overflow: hidden;
`

const PostText = styled.p`
  font-size: 16px;
  text-align: left;
  margin:0.3rem 0;
  padding-left: 0.3rem;
  width: 120px;
`

const SwiperImageCSSData = {
  backgroundColor: "gray",
  display:"flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  width: "500px",
  height: "300px"
}

const SwiperPostCSSData = {
  display: "flex",
  flexDirection: "column",
  margin: "0.5rem",
  marginBottom: "0.7rem",

  height: "110px",
  width: "120px",

  border: "2px solid gray",
  borderRadius: "5px",
  cursor:"pointer"
}

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