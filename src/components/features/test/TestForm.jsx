import { useState } from "react";
import styled from "styled-components";

function TestForm() {
  const [questionState, setQuestionState] = useState(0);
  const [btnValue, setBtnValue] = useState("");
  const randomNumber = Math.floor(Math.random() * 3);

  const listMBTI = {
    one: [
      {
        title: "문제1번-1:길가다가 모르는 사람이 갑자기 말을 걸며 다가온다",
        type: "EvsI",
        sortA: "E → (음 무슨일이시지?) 대화를 나눈다",
        sortB: "I → (저 사람 뭐지?) 무시하고 간다",
      },
      {
        title:
          "문제1번-2:테마파크에서 친구들과 신나게 하루종일 놀고 나온 당신. 이제 뭘 할까?",
        type: "EvsI",
        sortA: "E → 아, 잘 놀았다~ 야, 2차 가야지, 2차! 더 놀자!",
        sortB: "I → 아, 잘 놀았다~ 이제 집가서 혼자 쉬어야지~",
      },
      {
        title: "문제1번-3:곧 있을 할로윈, 친구가 이태원에 가자고 하는데?",
        type: "EvsI",
        sortA:
          "E → 일단 분장부터 장소랑 놀 곳까지 다 정해서 그날 하루 날잡을 각오한다.",
        sortB:
          "I → 야, 코로나 아직 안 끝났어.. 집에서 조촐하게 파티하자고 한다.",
      },
    ],
    two: [
      {
        title: "문제2번-1:비행기 타기 전 드는 생각?",
        type: "SvsN",
        sortA: "S -> 우왕 기내식 맛있겠다~",
        sortB: "N -> 아 비행기 떨어지면 어떡하냐^^",
      },
      {
        title: "문제2번-2:한강에서 멍때리기 대회에 참가했다.",
        type: "SvsN",
        sortA: "S -> 크러시 급의 멍때리기를 시전한다.",
        sortB: "N -> 아, 나는 무리. 계속 온갖 생각이 든다.",
      },
      {
        title: "문제2번-3:모르는 번호에서 '자니...?'라는 문자가 왔을 때?",
        type: "SvsN",
        sortA: "S -> 일단 차단부터 박고 간다.",
        sortB:
          "N -> 그동안 스쳐왔던 전남친/전여친의 전화번호를 떠올리다 전화를 걸어본다.",
      },
    ],
    three: [
      {
        title: "문제3번-1:나 차 사고 났어...",
        type: "FvsT",
        sortA: "F → 진짜? 다친 데는 없고? 괜찮아?",
        sortB: "T → 보험은 들었어? 사고 보장은 돼?",
      },
      {
        title: "문제3번-2:사람들이 너 싫어해!",
        type: "FvsT",
        sortA: "F → 왜 날 싫어하지? 내가 뭘 잘못했나..ㅠㅠ",
        sortB: "T → 알바 아님 어쩔티비? 내 탓이야?",
      },
      {
        title:
          "문제3번-3:정말 잘한 것 같아! 열심히 안 한 것 같으면서도 다 했네? 재능 있네!",
        type: "FvsT",
        sortA: "F → 아니 재능이라니.. 열심히 안했다고? 아닌데ㅠㅠ",
        sortB: "T → 아, 그치, 열심히 했지.. (하, 겁나 열심히 했다..)",
      },
    ],
    four: [
      {
        title:
          "문제4번-1:곧 규제가 풀리는 해외 여행! 슬슬 계획을 세워보려는데..",
        type: "PvsJ",
        sortA:
          "P → 아, 믿을 건 내 머리지! 대충 이러면 되겠지 머릿 속으로만 구상한다.",
        sortB:
          "J → 일단 구글 지도, 어스토리 등등 온갖 도구와 정보를 수집해서 나만의 계획을 완성한다.",
      },
      {
        title: "문제4번-2:친구에게 온 카톡, '우리 지금 보자..'라는 내용.",
        type: "PvsJ",
        sortA: "P → '헐, 너무 좋지! 지금 갈게~!' 하고 바로 나갈 준비를 한다.",
        sortB: "J → 카톡 소리를 들었지만 그런 거 없다. 쿨하게 무시한다.",
      },
      {
        title: "문제4번-3:작업해야할 사항이 있는데, 마감이 2주 정도 남아있다.",
        type: "PvsJ",
        sortA: "P → 아, 뭐, 2주나 남았네? 아휴~ 널널하지~ 놀자, 놀아~~",
        sortB: "J → 아, 완전... 2주 밖에 안 남았네; 언제 다하냐;",
      },
    ],
  };

  const resultMBTI = [
    {
      number: 1,
      mbti: "ISFJ",
      mbtiTitle:"용감한 수호자",
      content: "주변 사람을 보호할 준비가 되어 있는 헌신적이고 따뜻한 수호자입니다.",
      image:process.env.PUBLIC_URL + `/images/testImages/ISFJ.svg`
    },
    {
      number: 2,
      mbti: "ISTJ",
      mbtiTitle:"현실주의자",
      content: "사실을 중시하는 믿음직한 현실주의자입니다.",
      image:process.env.PUBLIC_URL + `/images/testImages/ISTJ.svg`    
    },
    {
      number: 3,
      mbti: "INFJ",
      mbtiTitle:"옹호자",
      content: "차분하고 신비한 분위기를 풍기는 성격으로, 다른 사람에게 의욕을 불어넣는 이상주의자입니다.",
      image:process.env.PUBLIC_URL + `/images/testImages/INFJ.svg`
    },
    {
      number: 4,
      mbti: "INTJ",
      mbtiTitle:"전략가",
      content: "모든 일에 대해 계획을 세우며 상상력이 풍부한 전략가입니다.",
      image:process.env.PUBLIC_URL + `/images/testImages/INTJ.svg`
    },
    {
      number: 5,
      mbti: "ISTP",
      mbtiTitle:"장인",
      content: "대담하면서도 현실적인 성격으로, 모든 종류의 도구를 자유자재로 다루는 장인입니다.",
      image:process.env.PUBLIC_URL + `/images/testImages/ISTP.svg`
    },
    {
      number: 6,
      mbti: "ISFP",
      mbtiTitle:"모험가",
      content: "항상 새로운 경험을 추구하는 유연하고 매력 넘치는 예술가입니다.",
      image:process.env.PUBLIC_URL + `/images/testImages/ISFP.svg`
    },
    {
      number: 7,
      mbti: "INFP",
      mbtiTitle:"중재자",
      content: "항상 선을 행할 준비가 되어 있는 부드럽고 친절한 이타주의자입니다.",
      image:process.env.PUBLIC_URL + `/images/testImages/INFP.svg`
    },
    {
      number: 8,
      mbti: "INTP",
      mbtiTitle:"논리술사",
      content: "지식을 끝없이 갈망하는 혁신적인 발명가입니다.",
      image:process.env.PUBLIC_URL + `/images/testImages/INTP.svg`
    },
    {
      number: 9,
      mbti: "ESTP",
      mbtiTitle:"사업가",
      content: "위험을 기꺼이 감수하는 성격으로, 영리하고 에너지 넘치며 관찰력이 뛰어난 사업가입니다.",
      image:process.env.PUBLIC_URL + `/images/testImages/ESTP.svg`
    },
    {
      number: 10,
      mbti: "ESFP",
      mbtiTitle:"연예인",
      content: "즉흥적이고 넘치는 에너지와 열정으로 주변 사람을 즐겁게 하는 연예인입니다.",
      image:process.env.PUBLIC_URL + `/images/testImages/ESFP.svg`
    },
    {
      number: 11,
      mbti: "ENFP",
      mbtiTitle:"활동가",
      content: "열정적이고 창의적인 성격으로, 긍정적으로 삶을 바라보는 사교적이면서도 자유로운 영혼입니다.",
      image:process.env.PUBLIC_URL + `/images/testImages/ENFP.svg`
    },
    {
      number: 12,
      mbti: "ENTP",
      mbtiTitle:"변론가",
      content: "지적 도전을 즐기는 영리하고 호기심이 많은 사색가입니다.",
      image:process.env.PUBLIC_URL + `/images/testImages/ENTP.svg`
    },
    {
      number: 13,
      mbti: "ESTJ",
      mbtiTitle:"경영자",
      content: "사물과 사람을 관리하는 데 뛰어난 능력을 지닌 경영자입니다.",
      image:process.env.PUBLIC_URL + `/images/testImages/ESTJ.svg`
    },
    { number: 14, 
      mbti: "ESFJ", 
      mbtiTitle:"집정관",
      content: "배려심이 넘치고 항상 다른 사람을 도울 준비가 되어 있는 성격으로, 인기가 많고 사교성 높은 마당발입니다.", 
      image:process.env.PUBLIC_URL + `/images/testImages/ESFJ.svg`
    },
    {
      number: 15,
      mbti: "ENFJ",
      mbtiTitle:"선도자",
      content: "청중을 사로잡고 의욕을 불어넣는 카리스마 넘치는 지도자입니다.",
      image:process.env.PUBLIC_URL + `/images/testImages/ENFJ.svg`
    },
    {
      number: 16,
      mbti: "ENTJ",
      mbtiTitle:"통솔자",
      content: "항상 문제 해결 방법을 찾아내는 성격으로, 대담하고 상상력이 풍부하며 의지가 강력한 지도자입니다.",
      image:process.env.PUBLIC_URL + `/images/testImages/ENTJ.svg`
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
          <img src={process.env.PUBLIC_URL + `/images/TestThumbnail.svg`} />
          <StTextWarpB>
            <StTextB>5초만에 알아보는 나의 성향!</StTextB>
            <StTextC>과연 내 MBTI는 무엇일까?</StTextC>
          </StTextWarpB>
          <StButtonA onClick={GoToFirstQ}>시작하기</StButtonA>
        </div>
      ) : (
        <div>
          {questionState === 1 ? (
            <StQuestionContainer>
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
                  return  <div key={index}>
                            <img src={elem.image}/>
                            <Stmbti>{elem.mbti}</Stmbti>
                            <StmbtiTitle>{elem.mbtiTitle}</StmbtiTitle>
                            <StLine></StLine>
                            <StContent  >{elem.content}</StContent>
                          </div>;
                  })}
              </h3>
              <StLastBtnWarp>
                <StLastBtn onClick={onClickGoToMain}>테스트 공유하기</StLastBtn>
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
  margin-bottom: 150px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StChoiceBtnDiv = styled.div`
  /* background-color:yellow; */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StQuestionContainer = styled.div``;

const StButtonA = styled.button`
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
`;

const StTextA = styled.div`
  /* background-color:green; */
  font-weight: 400;
  font-size: 47px;
  line-height: 64px;
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
  margin: 100px auto 30px auto;
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
  height: 150px;
`;

const StWarpStChoiceBtn = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
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
`;

const StChoiceText = styled.div`
  /* background-color:darkblue; */
  height: 120px;
  font-weight: 300;
  font-size: 20px;
  line-height: 30px;
  margin: 20px auto 70px auto;
  pointer-events: none;
`;

const Stmbti = styled.div`
  font-family: 'Gmarket Sans';
  font-style: normal;
  font-weight: 800;
  font-size: 52px;
  line-height: 52px;
  color: #FF6D53;
  margin: auto;

`
const StmbtiTitle = styled.div`
  font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 500;
font-size: 25px;
line-height: 38px;
margin :auto;

`

const StLine = styled.hr`
width: 400px;
height: 1px;
left: 24px;
right: 26px;
top: 655px;
background: #C7C7C7;
transform: matrix(1, 0, 0, -1, 0, 0);
`


const StContent = styled.div`
font-family: 'IBM Plex Sans KR';
font-style: normal;
font-weight: 400;
font-size: 21px;
line-height: 32px;
letter-spacing: -0.05em;
width:310px;
margin:auto;
`

const StLastBtnWarp = styled.div`
  width:400px;
  display:flex;
  flex-direction:row;
  margin: auto;
  justify-content: space-evenly;

  
`

const StLastBtn = styled.button`
box-sizing: border-box;

justify-content: center;
align-items: center;
padding: 7.12291px 28.4916px;
gap: 14.25px;

  background: #FFFFFF;
/* Scarlet */

border: 2px solid #FF6D53;
border-radius: 56.9832px;
flex: none;
order: 0;
flex-grow: 0;
cursor: pointer;
transition: ease 0.2s;
  :hover {
    background-color: #ff6d53;
    & > div {
      color: white;
    }
  }
`


