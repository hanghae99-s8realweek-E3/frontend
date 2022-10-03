import { useState } from "react";
import styled from "styled-components";

function TestForm() {
  const [questionState, setQuestionState] = useState(0);
  const [btnValue, setBtnValue] = useState("");
  const randomNumber = Math.floor(Math.random() * 3);

  const listMBTI = {
    one: [
      {
        title:
          "길을 걷던 당신, 그런데 모르는 사람이 갑자기 다가와 “저기요..”라고 말하는데…",
        type: "EvsI",
        sortA: "(뭔가 곤란한 일이 있으신가..?) 네! 하며 대화를 나눈다.",
        sortB: "(왜 나한테 말을 걸어..) 그냥 무시하고 내 갈 길을 간다.",
      },
      {
        title:
          "테마파크에서 친구들과 신나게 하루종일 놀고 나온 당신! 이제 뭘 할까?",
        type: "EvsI",
        sortA: "아, 잘 놀았다~ 야, 2차 가야지, 2차! 더 놀자!",
        sortB: "아, 잘 놀았다~ 이제 집가서 혼자 쉬어야지~",
      },
      {
        title:
          "곧 다가오는 두근두근한 할로윈, 그러던 중 친구에게서 할로윈데이에 이태원에 가자는 전화!",
        type: "EvsI",
        sortA:
          "아, 가야지! 일단 분장부터 장소랑 놀 곳까지 다 정해서 하루 날잡을 각오를 한다.",
        sortB: "야, 코로나 아직 안 끝났어.. 집에서 조촐하게 파티하자고 한다.",
      },
    ],
    two: [
      {
        title:
          "비행기를 타고 여행을 가게 된 당신, 비행기 타기 전에 어떤 생각이 스쳐 지나갔다면..?",
        type: "SvsN",
        sortA: "아, 여기 항공사 기내식이 엄청 맛있다는 데 기대된다!",
        sortB: "이야.. 이거.. 운항 도중에 비행기 떨어지면 스릴 넘치겠는데..?",
      },
      {
        title: "우연히 알게 된 한강에서 멍때리기 대회에 참가한 당신.",
        type: "SvsN",
        sortA: "나는 무념무상. 크러시 급의 멍때리기를 시전한다.",
        sortB: "으아악! 나는 무리, 계속 온갖 생각이 들며 포기, 포기!",
      },
      {
        title:
          "한밤 중에 들린 알림음, 모르는 번호에게서 '자니...?'라는 문자가 왔을 때?",
        type: "SvsN",
        sortA: "아, 이건 또 뭐야.. 바로 번호를 차단해버린다.",
        sortB:
          "누구지..? 그동안 스쳐왔던 이전 애인의 번호를 떠올려보다 전화를 걸어본다.",
      },
    ],
    three: [
      {
        title:
          "전화로 들려오는 갑작스런 친구의 교통사고 소식, 어떤 말을 해야 좋을까?",
        type: "FvsT",
        sortA: "헉, 교통사고라고? 괜찮아? 어디 다친 데는 없어??",
        sortB: "아이고, 세상에.. 보험은 들었어? 사고 보장은 된대??",
      },
      {
        title:
          "친한 친구로부터, 주변 사람들이 나를 뒷담화했다는 이야기를 접했는데..",
        type: "FvsT",
        sortA: "정말?! 왜지… 내가 뭐 잘못한 거 있나…? 뭐지...?",
        sortB: "야, 걔네가 쪼잔해서 그런거야. 알 게 뭐야, 밥이나 먹으러 가자~",
      },
      {
        title:
          "주변 친구에게서 ‘열심히 안 한 것 같더니, 꽤 하네? 재능이 있나봐!’라는 말을 들었는데..",
        type: "FvsT",
        sortA:
          "아, 무슨 소리야! 하면서 서운하듯 열심히 해 온 것들을 털어놓는다.",
        sortB:
          "내가 생각해도 좀 그래~ 하면서 최대한 열심히 해 온 티를 내지 않는다.",
      },
    ],
    four: [
      {
        title: "곧 조건들이 풀리는 해외 여행! 슬슬 계획을 세워보려는데..",
        type: "PvsJ",
        sortA:
          "아, 믿을 건 내 머리지! 대충 이러면 되겠지 머릿 속으로만 구상한다.",
        sortB:
          "일단 구글 지도, 어스토리 등 온갖 도구와 정보를 수집해서 나만의 계획을 완성한다.",
      },
      {
        title: "친구에게 온 카톡, '우리 지금 보자..'라는 내용.",
        type: "PvsJ",
        sortA: "'헐, 너무 좋지! 지금 갈게~!' 하고 바로 나갈 준비를 한다.",
        sortB: "카톡 소리를 들었지만 그런 거 없다. 쿨하게 무시한다.",
      },
      {
        title: "작업해야 할 사항이 있는데, 마감이 2주 정도 남아있다면?",
        type: "PvsJ",
        sortA:
          "세상에나, 2주나 남았네? 아휴~ 시간 많네, 널널하지~ 놀자, 놀아~~",
        sortB: "아, 완전... 2주 밖에 안 남았네; 언제 다하냐;",
      },
    ],
  };

  const resultMBTI = [
    {
      number: 1,
      mbti: "ISFJ",
      mbtiTitle: "용감한 수호자",
      content:
        "주변 사람을 보호할 준비가 되어 있는 헌신적이고 따뜻한 수호자입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ISFJ.svg`,
    },
    {
      number: 2,
      mbti: "ISTJ",
      mbtiTitle: "현실주의자",
      content: "사실을 중시하는 믿음직한 현실주의자입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ISTJ.svg`,
    },
    {
      number: 3,
      mbti: "INFJ",
      mbtiTitle: "옹호자",
      content:
        "차분하고 신비한 분위기를 풍기는 성격으로, 다른 사람에게 의욕을 불어넣는 이상주의자입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/INFJ.svg`,
    },
    {
      number: 4,
      mbti: "INTJ",
      mbtiTitle: "전략가",
      content: "모든 일에 대해 계획을 세우며 상상력이 풍부한 전략가입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/INTJ.svg`,
    },
    {
      number: 5,
      mbti: "ISTP",
      mbtiTitle: "장인",
      content:
        "대담하면서도 현실적인 성격으로, 모든 종류의 도구를 자유자재로 다루는 장인입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ISTP.svg`,
    },
    {
      number: 6,
      mbti: "ISFP",
      mbtiTitle: "모험가",
      content: "항상 새로운 경험을 추구하는 유연하고 매력 넘치는 예술가입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ISFP.svg`,
    },
    {
      number: 7,
      mbti: "INFP",
      mbtiTitle: "중재자",
      content:
        "항상 선을 행할 준비가 되어 있는 부드럽고 친절한 이타주의자입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/INFP.svg`,
    },
    {
      number: 8,
      mbti: "INTP",
      mbtiTitle: "논리술사",
      content: "지식을 끝없이 갈망하는 혁신적인 발명가입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/INTP.svg`,
    },
    {
      number: 9,
      mbti: "ESTP",
      mbtiTitle: "사업가",
      content:
        "위험을 기꺼이 감수하는 성격으로, 영리하고 에너지 넘치며 관찰력이 뛰어난 사업가입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ESTP.svg`,
    },
    {
      number: 10,
      mbti: "ESFP",
      mbtiTitle: "연예인",
      content:
        "즉흥적이고 넘치는 에너지와 열정으로 주변 사람을 즐겁게 하는 연예인입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ESFP.svg`,
    },
    {
      number: 11,
      mbti: "ENFP",
      mbtiTitle: "활동가",
      content:
        "열정적이고 창의적인 성격으로, 긍정적으로 삶을 바라보는 사교적이면서도 자유로운 영혼입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ENFP.svg`,
    },
    {
      number: 12,
      mbti: "ENTP",
      mbtiTitle: "변론가",
      content: "지적 도전을 즐기는 영리하고 호기심이 많은 사색가입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ENTP.svg`,
    },
    {
      number: 13,
      mbti: "ESTJ",
      mbtiTitle: "경영자",
      content: "사물과 사람을 관리하는 데 뛰어난 능력을 지닌 경영자입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ESTJ.svg`,
    },
    {
      number: 14,
      mbti: "ESFJ",
      mbtiTitle: "집정관",
      content:
        "배려심이 넘치고 항상 다른 사람을 도울 준비가 되어 있는 성격으로, 인기가 많고 사교성 높은 마당발입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ESFJ.svg`,
    },
    {
      number: 15,
      mbti: "ENFJ",
      mbtiTitle: "선도자",
      content: "청중을 사로잡고 의욕을 불어넣는 카리스마 넘치는 지도자입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ENFJ.svg`,
    },
    {
      number: 16,
      mbti: "ENTJ",
      mbtiTitle: "통솔자",
      content:
        "항상 문제 해결 방법을 찾아내는 성격으로, 대담하고 상상력이 풍부하며 의지가 강력한 지도자입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ENTJ.svg`,
    },
  ];
  // console.log(resultMBTI.mbti);

  const GoToFirstQ = (e) => {
    e.preventDefault();
    if (questionState !== 0) {
      return setQuestionState(0);
    } else {
      return setQuestionState(1);
    }
  };
  // console.log(questionState);

  const onClickSaveValue = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    const { value } = e.target;
    setBtnValue(btnValue + value);
    setQuestionState(questionState + 1);
  };

  // process.env.PUBLIC_URL + `/images/TestThumbnail.svg`

  const onClickShared = () => {
    navigator.share({
      title: "mbti",
      url: "",
    });
  };

  const onClickGoToMain = (e) => {
    setQuestionState(0);
    setBtnValue("");
  };

  // const onSubmitGoToNextQuestion = (e) => {
  //   e.preventDefault();
  //   if (questionState === 1) {
  //     return setQuestionState(2);
  //   } else if (questionState === 2") {
  //     return setQuestionState("3");
  //   } else if (questionState === "3") {
  //     return setQuestionState("4");
  //   } else if (questionState === "4") {
  //     return setQuestionState("5");
  //   } else if (questionState === "5") {
  //     return setQuestionState("0");
  //   }
  // };
  console.log(questionState);
  // console.log(btnValue);
  // console.log(resultMBTI.filter((x) => x.mbti === btnValue));

  return (
    <StOutLineDiv>
      {questionState === 0 ? (
        <div>
          <StTextWarpA>
            <div>
              <StTextA>초간단</StTextA>
            </div>
            <StTextAAA>
              <StTextAA>MBTI </StTextAA>테스트
            </StTextAAA>
          </StTextWarpA>
          <StStartImage
            src={process.env.PUBLIC_URL + `/images/TestThumbnail.svg`}
            alt="초간단 MBTI 테스트! 5초만에 알아보는 나의 성향! 과연 내 MBTI는 무엇일까?"
          />
          <StTextWarpB>
            <StTextB>5초만에 알아보는 나의 성향!</StTextB>
            <StTextC>과연 내 MBTI는 무엇일까?</StTextC>
          </StTextWarpB>
          <StStartBtn onClick={GoToFirstQ}>시작하기</StStartBtn>
        </div>
      ) : (
        <div>
          {questionState === 1 ? (
            <StQuestionContainer>
              <StProgressBar>
                <StProgressGauge
                  style={{ width: `${25 * (questionState - 1)}%` }}>
                  <StProgressIcon
                    src={process.env.PUBLIC_URL + `/images/Placeholder.svg`}
                    transform="translateX(-30%) translateY(-45%)"
                  />
                </StProgressGauge>
              </StProgressBar>
              <StChoiceBtnDiv>
                <StQ>Q</StQ>
                <StQuestionText>
                  {listMBTI.one[randomNumber].title}
                </StQuestionText>
                <StWarpStChoiceBtn>
                  <StChoiceBtn value="E" onClick={onClickSaveValue}>
                    <StChoice>A</StChoice>
                    <StChoiceText>
                      {listMBTI.one[randomNumber].sortA}
                    </StChoiceText>
                  </StChoiceBtn>

                  <StChoiceBtn value="I" onClick={onClickSaveValue}>
                    <StChoice>B</StChoice>
                    <StChoiceText>
                      {listMBTI.one[randomNumber].sortB}
                    </StChoiceText>
                  </StChoiceBtn>
                </StWarpStChoiceBtn>
              </StChoiceBtnDiv>
            </StQuestionContainer>
          ) : questionState === 2 ? (
            <StQuestionContainer>
              <StProgressBar>
                <StProgressGauge
                  style={{ width: `${25 * (questionState - 1)}%` }}>
                  <StProgressIcon
                    src={process.env.PUBLIC_URL + `/images/Placeholder.svg`}
                    transform="translateX(50%) translateY(-45%)"
                  />
                </StProgressGauge>
              </StProgressBar>
              <StChoiceBtnDiv>
                <StQ>Q</StQ>
                <StQuestionText>
                  {listMBTI.two[randomNumber].title}
                </StQuestionText>
                <StWarpStChoiceBtn>
                  <StChoiceBtn value="S" onClick={onClickSaveValue}>
                    <StChoice>A</StChoice>
                    <StChoiceText>
                      {listMBTI.two[randomNumber].sortA}
                    </StChoiceText>
                  </StChoiceBtn>

                  <StChoiceBtn value="N" onClick={onClickSaveValue}>
                    <StChoice>B</StChoice>
                    <StChoiceText>
                      {listMBTI.two[randomNumber].sortB}
                    </StChoiceText>
                  </StChoiceBtn>
                </StWarpStChoiceBtn>
              </StChoiceBtnDiv>
            </StQuestionContainer>
          ) : questionState === 3 ? (
            <StQuestionContainer>
              <StProgressBar>
                <StProgressGauge
                  style={{ width: `${25 * (questionState - 1)}%` }}>
                  <StProgressIcon
                    src={process.env.PUBLIC_URL + `/images/Placeholder.svg`}
                    transform="translateX(180%) translateY(-45%)"
                  />
                </StProgressGauge>
              </StProgressBar>
              <StChoiceBtnDiv>
                <StQ>Q</StQ>
                <StQuestionText>
                  {listMBTI.three[randomNumber].title}
                </StQuestionText>
                <StWarpStChoiceBtn>
                  <StChoiceBtn value="F" onClick={onClickSaveValue}>
                    <StChoice>A</StChoice>
                    <StChoiceText>
                      {listMBTI.three[randomNumber].sortA}
                    </StChoiceText>
                  </StChoiceBtn>

                  <StChoiceBtn value="T" onClick={onClickSaveValue}>
                    <StChoice>B</StChoice>
                    <StChoiceText>
                      {listMBTI.three[randomNumber].sortB}
                    </StChoiceText>
                  </StChoiceBtn>
                </StWarpStChoiceBtn>
              </StChoiceBtnDiv>
            </StQuestionContainer>
          ) : questionState === 4 ? (
            <StQuestionContainer>
              <StProgressBar>
                <StProgressGauge
                  style={{ width: `${25 * (questionState - 1)}%` }}>
                  <StProgressIcon
                    src={process.env.PUBLIC_URL + `/images/Placeholder.svg`}
                    transform={
                      window.innerWidth < 500
                        ? "translate(260%) translateY(-45%)"
                        : "translate(330%) translateY(-45%)"
                    }
                  />
                </StProgressGauge>
              </StProgressBar>
              <StChoiceBtnDiv>
                <StQ>Q</StQ>
                <StQuestionText>
                  {listMBTI.four[randomNumber].title}
                </StQuestionText>
                <StWarpStChoiceBtn>
                  <StChoiceBtn value="P" onClick={onClickSaveValue}>
                    <StChoice>A</StChoice>
                    <StChoiceText>
                      {listMBTI.four[randomNumber].sortA}
                    </StChoiceText>
                  </StChoiceBtn>

                  <StChoiceBtn value="J" onClick={onClickSaveValue}>
                    <StChoice>B</StChoice>
                    <StChoiceText>
                      {listMBTI.four[randomNumber].sortB}
                    </StChoiceText>
                  </StChoiceBtn>
                </StWarpStChoiceBtn>
              </StChoiceBtnDiv>
            </StQuestionContainer>
          ) : questionState === 5 ? (
            <div>
              {/* <h2>{btnValue}</h2> */}
              <h3>
                {resultMBTI
                  .filter((x) => x.mbti === btnValue)
                  .slice()
                  .map((elem, index) => {
                    return (
                      <div key={index}>
                        <StmbtiImage src={elem.image} />
                        <Stmbti>{elem.mbti}</Stmbti>
                        <StmbtiTitle>{elem.mbtiTitle}</StmbtiTitle>
                        <StLine></StLine>
                        <StContent>{elem.content}</StContent>
                      </div>
                    );
                  })}
              </h3>
              <StLastBtnWarp>
                <StLastBtn>테스트 공유하기</StLastBtn>
                <StLastBtn onClick={onClickGoToMain}>테스트 다시하기</StLastBtn>
              </StLastBtnWarp>
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
  background-color: #ffffff;
  margin-top: 60px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 500px) {
    width: 360px;
  }
`;

const StChoiceBtnDiv = styled.div`
  /* background-color:yellow; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: 500px) {
    width: 360px;
  }
`;
const StQuestionContainer = styled.div`
  /* background-color:tomato; */
`;

const StStartImage = styled.img`
  @media only screen and (max-width: 500px) {
    width: 300px;
  }
`;

const StStartBtn = styled.button`
  background: #ff6d53;
  border-radius: 6px;
  border: none;
  width: 450px;
  height: 70px;
  margin-top: 30px;
  color: #ffffff;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  cursor: pointer;
  @media only screen and (max-width: 500px) {
    width: 330px;
  }
`;

const StTextA = styled.div`
  /* background-color:green; */
  font-weight: 400;
  font-size: 47px;
  line-height: 64px;
  @media only screen and (max-width: 500px) {
  }
`;
const StTextAA = styled.span`
  color: #ff6d53;
  font-weight: 600;
  font-size: 47px;
  line-height: 64px;
`;

const StTextAAA = styled.div`
  /* background-color:green; */
  font-weight: 400;
  font-size: 47px;
  line-height: 64px;
`;

const StTextB = styled.div`
  /* background-color:green; */
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
`;
const StTextC = styled.div`
  /* background-color:yellow; */
  font-weight: 300;
  font-size: 24px;
  line-height: 36px;
`;

const StTextWarpA = styled.div`
  margin: 20px auto 20px auto;
`;

const StTextWarpB = styled.div`
  margin: 20px auto 20px auto;
`;

const StQ = styled.div`
  /* background-color:skyblue; */
  width: 135px;
  height: 72px;
  font-weight: 700;
  font-size: 72px;
  line-height: 72px;
  font-family: "GmarketSans";
  font-style: normal;
  margin: 20px auto 30px auto;
  color: #ff6d53;
`;

const StQuestionText = styled.div`
  /* background-color:green; */
  width: 360px;
  /* height: 72px; */
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  margin: 10px auto 50px auto;
  height: 130px;
  @media only screen and (max-width: 500px) {
    font-size: 20px;
    width: 300px;
    height: 100px;
  }
`;

const StWarpStChoiceBtn = styled.div`
  /* background-color:green; */
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  @media only screen and (max-width: 500px) {
  }
`;

const StChoiceBtn = styled.button`
  width: 217px;
  height: 344px;
  border-radius: 10px;
  background: none;
  margin: auto;
  cursor: pointer;
  transition: ease 0.2s;
  :hover {
    background-color: #ff6d53;
    & > div {
      color: white;
    }
  }
  @media only screen and (max-width: 500px) {
    width: 150px;
    height: 280px;
    :hover {
      color: none;
    }
  }
`;

const StChoice = styled.div`
  /* background-color: blue; */
  width: 127px;
  height: 42px;
  font-weight: 600;
  font-family: "GmarketSans";
  font-size: 42px;
  line-height: 42px;
  margin: 20px auto 70px auto;
  color: #ff6d53;
  pointer-events: none;
  @media only screen and (max-width: 500px) {
    margin: 20px auto 40px auto;
  }
`;

const StChoiceText = styled.div`
  /* background-color:darkblue; */
  height: 120px;
  font-weight: 300;
  font-size: 20px;
  line-height: 30px;
  margin: 20px auto 70px auto;
  pointer-events: none;
  @media only screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const Stmbti = styled.div`
  font-family: "GmarketSans";
  font-style: normal;
  font-weight: 800;
  font-size: 52px;
  line-height: 52px;
  color: #ff6d53;
  margin: auto;
  margin-bottom: 18px;
  @media only screen and (max-width: 500px) {
    font-size: 40px;
  }
`;
const StmbtiTitle = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 38px;
  margin: auto;
  @media only screen and (max-width: 500px) {
    font-size: 20px;
  }
`;

const StLine = styled.div`
  width: 400px;
  height: 1px;
  left: 24px;
  right: 26px;
  top: 655px;
  margin: 30px auto;
  background: #c7c7c7;
  transform: matrix(1, 0, 0, -1, 0, 0);
  @media only screen and (max-width: 500px) {
    width: 300px;
  }
`;

const StContent = styled.div`
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 21px;
  line-height: 32px;
  letter-spacing: -0.05em;
  width: 310px;
  margin: auto;
  @media only screen and (max-width: 500px) {
    font-size: 16px;
    line-height: 20px;
    width: 280px;
  }
`;

const StLastBtnWarp = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin: auto;
  margin-top: 60px;
  justify-content: space-evenly;
  @media only screen and (max-width: 500px) {
    width: 200px;
    gap: 20px;
  }
`;

const StLastBtn = styled.button`
  box-sizing: border-box;
  font-size: 22px;
  font-weight: 600;
  color: #ff6d53;
  justify-content: center;
  align-items: center;
  padding: 7.12291px 28.4916px;
  gap: 14.25px;

  background: #ffffff;
  /* Scarlet */

  border: 2px solid #ff6d53;
  border-radius: 56.9832px;
  flex: none;

  cursor: pointer;
  transition: ease 0.2s;
  :hover {
    background-color: #ff6d53;
    color: white;
    & > div {
      color: white;
    }
  }
  @media only screen and (max-width: 500px) {
    padding: 8px;
  }
`;

const StmbtiImage = styled.img`
  width: 70%;
  height: 70%;
  @media only screen and (max-width: 500px) {
  }
`;
const StProgressBar = styled.div`
  background: #d9d9d9;

  display: flex;

  border-radius: 999px;

  width: 90%;
  height: 4px;
  margin: 8vh auto;
`;

const StProgressGauge = styled.div`
  background: #ff6d53;
  position: relative;

  border-radius: 999px;

  width: ${(props) => props.width};
  height: 4px;
  z-index: 4;
`;

const StProgressIcon = styled.img`
  position: absolute;
  height: 45px;

  transform: ${(props) => props.transform};
`;
