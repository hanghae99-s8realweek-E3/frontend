import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../utils/button";

function TestForm() {
  const [questionState, setQuestionState] = useState("0");
  const [btnValue, setBtnValue] = useState("");
  const randomNumber = Math.floor(Math.random() * 3);

  const listMBTI = {
    one: [
      { title: "문제1번-1:길가다가 모르는 사람이 갑자기 말을 걸며 다가온다", type: "EvsI", sortA: "E → (음 무슨일이시지?) 대화를 나눈다", sortB: "I → (저 사람 뭐지?) 무시하고 간다" },
      { title: "문제1번-2:테마파크에서 친구들과 신나게 하루종일 놀고 나온 당신. 이제 뭘 할까?", type: "EvsI", sortA: "E → 아, 잘 놀았다~ 야, 2차 가야지, 2차! 더 놀자!", sortB: "I → 아, 잘 놀았다~ 이제 집가서 혼자 쉬어야지~" },
      { title: "문제1번-3:곧 있을 할로윈, 친구가 이태원에 가자고 하는데?", type: "EvsI", sortA: "E → 일단 분장부터 장소랑 놀 곳까지 다 정해서 그날 하루 날잡을 각오한다.", sortB: "I → 야, 코로나 아직 안 끝났어.. 집에서 조촐하게 파티하자고 한다." },
    ],
    two: [
      { title: "문제2번-1:비행기 타기 전 드는 생각?", type: "SvsN", sortA: "S -> 우왕 기내식 맛있겠다~", sortB: "N -> 아 비행기 떨어지면 어떡하냐^^" },
      { title: "문제2번-2:한강에서 멍때리기 대회에 참가했다.", type: "SvsN", sortA: "S -> 크러시 급의 멍때리기를 시전한다.", sortB: "N -> 아, 나는 무리. 계속 온갖 생각이 든다." },
      { title: "문제2번-3:모르는 번호에서 '자니...?'라는 문자가 왔을 때?", type: "SvsN", sortA: "S -> 일단 차단부터 박고 간다.", sortB: "N -> 그동안 스쳐왔던 전남친/전여친의 전화번호를 떠올리다 전화를 걸어본다." },
    ],
    three: [
      { title: "문제3번-1:나 차 사고 났어...", type: "FvsT", sortA: "F → 진짜? 다친 데는 없고? 괜찮아?", sortB: "T → 보험은 들었어? 사고 보장은 돼?" },
      { title: "문제3번-2:사람들이 너 싫어해!", type: "FvsT", sortA: "F → 왜 날 싫어하지? 내가 뭘 잘못했나..ㅠㅠ", sortB: "T → 알바 아님 어쩔티비? 내 탓이야?" },
      { title: "문제3번-3:정말 잘한 것 같아! 열심히 안 한 것 같으면서도 다 했네? 재능 있네!", type: "FvsT", sortA: "F → 아니 재능이라니.. 열심히 안했다고? 아닌데ㅠㅠ", sortB: "T → 아, 그치, 열심히 했지.. (하, 겁나 열심히 했다..)" },
    ],
    four: [
      { title: "문제4번-1:곧 규제가 풀리는 해외 여행! 슬슬 계획을 세워보려는데..", type: "PvsJ", sortA: "P → 아, 믿을 건 내 머리지! 대충 이러면 되겠지 머릿 속으로만 구상한다.", sortB: "J → 일단 구글 지도, 어스토리 등등 온갖 도구와 정보를 수집해서 나만의 계획을 완성한다." },
      { title: "문제4번-2:친구에게 온 카톡, '우리 지금 보자..'라는 내용.", type: "PvsJ", sortA: "P → '헐, 너무 좋지! 지금 갈게~!' 하고 바로 나갈 준비를 한다.", sortB: "J → 카톡 소리를 들었지만 그런 거 없다. 쿨하게 무시한다." },
      { title: "문제4번-3:작업해야할 사항이 있는데, 마감이 2주 정도 남아있다.", type: "PvsJ", sortA: "P → 아, 뭐, 2주나 남았네? 아휴~ 널널하지~ 놀자, 놀아~~", sortB: "J → 아, 완전... 2주 밖에 안 남았네; 언제 다하냐;" },
    ],
  };

  const resultMBTI = [
    {
      number: 1,
      mbti: "ISFJ",
      content: "설명\n설명\n설명\n설명",
    },
    {
      number: 2,
      mbti: "ISTJ",
      content: "설명\n설명\n설명\n설명",
    },
    {
      number: 3,
      mbti: "INFJ",
      content: "설명\n설명\n설명\n설명",
    },
    {
      number: 4,
      mbti: "INTJ",
      content: "설명\n설명\n설명\n설명",
    },
    {
      number: 5,
      mbti: "ISTP",
      content: "설명\n설명\n설명\n설명",
    },
    {
      number: 6,
      mbti: "ISFP",
      content: "설명\n설명\n설명\n설명",
    },
    {
      number: 7,
      mbti: "INFP",
      content: "설명\n설명\n설명\n설명",
    },
    {
      number: 8,
      mbti: "INTP",
      content: "설명\n설명\n설명\n설명",
    },
    {
      number: 9,
      mbti: "ESTP",
      content: "설명\n설명\n설명\n설명",
    },
    {
      number: 10,
      mbti: "ESFP",
      content: "설명\n설명\n설명\n설명",
    },
    {
      number: 11,
      mbti: "ENFP",
      content: "설명\n설명\n설명\n설명",
    },
    {
      number: 12,
      mbti: "ENTP",
      content: "설명\n설명\n설명\n설명",
    },
    {
      number: 13,
      mbti: "ESTJ",
      content: "설명\n설명\n설명\n설명",
    },
    { number: 14, mbti: "ESFJ", content: "설명\n설명\n설명\n설명" },
    {
      number: 15,
      mbti: "ENFJ",
      content: "설명\n설명\n설명\n설명",
    },
    {
      number: 16,
      mbti: "ENTJ",
      content: "설명\n설명\n설명\n설명",
    },
  ];
  console.log(resultMBTI.mbti);

  const GoToFirstQ = (e) => {
    e.preventDefault();
    if (questionState !== "0") {
      return setQuestionState("0");
    } else {
      return setQuestionState("1");
    }
  };
  console.log(questionState);

  const onClickSaveValue = (e) => {
    const { value } = e.target;
    setBtnValue(btnValue + value);
  };

  const onClickGoToMain = (e) => {
    setQuestionState("0");
    setBtnValue("");
  };

  const onSubmitGoToNextQuestion = (e) => {
    e.preventDefault();
    if (questionState === "1") {
      return setQuestionState("2");
    } else if (questionState === "2") {
      return setQuestionState("3");
    } else if (questionState === "3") {
      return setQuestionState("4");
    } else if (questionState === "4") {
      return setQuestionState("5");
    } else if (questionState === "5") {
      return setQuestionState("0");
    }
  };

  console.log(btnValue);
  console.log(resultMBTI.filter((x) => x.mbti === btnValue));

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    createKakaoButton();
  }, []);

  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;

      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }

      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "타이틀",
          description: "#리액트 #카카오 #공유버튼",
          imageUrl: "IMAGE_URL", // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        social: {
          likeCount: 77,
          commentCount: 55,
          sharedCount: 333,
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
          {
            title: "앱으로 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };

  return (
    <StOutLineDiv>
      {questionState === "0" ? (<div>
        <text>
          <p>초간단</p> 
              MBTI 테스트
        </text>

        <text>5초만에 알아보는 나의 성향! 과연 내 MBTI는 무엇일까?</text>
        <Button _onClick={GoToFirstQ} _bgColor="#ff6d53">테스트 시작</Button>
        </div>) : (
        <div>
          {questionState === "1" ? (
            <StQuestionContainer>
            
                <StChoiceBtnDiv>
                  <div>{listMBTI.one[randomNumber].title}</div>
                  <div>{listMBTI.one[randomNumber].type}</div>
                  <form onSubmit={onSubmitGoToNextQuestion}>
                    <Button _onClick={onClickSaveValue}>{listMBTI.one[randomNumber].sortA}</Button>
                    <Button>{listMBTI.one[randomNumber].sortB}</Button>
                  </form>
                </StChoiceBtnDiv>
              
            </StQuestionContainer>
          ) : questionState === "2" ? (
            <StChoiceBtnDiv>
                  <div>{listMBTI.two[randomNumber].title}</div>
                  <div>{listMBTI.two[randomNumber].type}</div>
                  <form onSubmit={onSubmitGoToNextQuestion}>
                    <button onClick={onClickSaveValue}>{listMBTI.two[randomNumber].sortA}</button>
                    <button>{listMBTI.two[randomNumber].sortB}</button>
                  </form>
                </StChoiceBtnDiv>
          ) : questionState === "3" ? (
            <StChoiceBtnDiv>
                  <div>{listMBTI.three[randomNumber].title}</div>
                  <div>{listMBTI.three[randomNumber].type}</div>
                  <form onSubmit={onSubmitGoToNextQuestion}>
                    <button onClick={onClickSaveValue}>{listMBTI.three[randomNumber].sortA}</button>
                    <button>{listMBTI.three[randomNumber].sortB}</button>
                  </form>
                </StChoiceBtnDiv>
          ) : questionState === "4" ? (
            <StChoiceBtnDiv>
                  <div>{listMBTI.four[randomNumber].title}</div>
                  <div>{listMBTI.four[randomNumber].type}</div>
                  <form onSubmit={onSubmitGoToNextQuestion}>
                    <button onClick={onClickSaveValue}>{listMBTI.four[randomNumber].sortA}</button>
                    <button>{listMBTI.four[randomNumber].sortB}</button>
                  </form>
                </StChoiceBtnDiv>
          ) : questionState === "5" ? (
            <div>
              <h1>당신의 MBTI는</h1>
              <h2>{btnValue}</h2>
              <h3>
                {resultMBTI
                  .filter((x) => x.mbti === btnValue)
                  .slice()
                  .map((elem) => {
                    return <div>{elem.content}</div>;
                  })}
              </h3>
              <button onClick={onClickGoToMain}>다시하기</button>
              <div>
                {/* Kakao share button */}
                <button id="kakao-link-btn">
                  <img src="/icons/kakao.png" alt="kakao-share-icon" />
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </StOutLineDiv>
  );
}

export default TestForm;

const StOutLineDiv = styled.div`
  background-color: #919191;
  margin-top: 60px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StChoiceBtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
`;
const StQuestionContainer = styled.div``;

