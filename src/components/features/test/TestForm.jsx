import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function TestForm() {
  const [questionState, setQuestionState] = useState(0);
  const [btnValue, setBtnValue] = useState("");
  const randomNumber = Math.floor(Math.random() * 3);
  const navigate = useNavigate();

  useEffect(() => {
    if (questionState === 5) {
      setTimeout(() => setQuestionState(6), 2000);
    }
  }, [questionState]);

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
      mbtiTitle: "수호자",
      content:
        "수호자형 사람은 무엇을 받으면 몇 배로 베푸는 진정한 이타주의자로 열정과 자애로움으로 일단 믿는 이들이라면 타인과도 잘 어울려 일에 정진합니다.\n\n수호자형 사람은 조용하고 차분하며 따뜻하고 친근합니다.\n책임감과 인내력 또한 매우 강하며, 본인의 친한 친구나 가족에게 애정이 가득합니다.\n\n이들은 언제나 진솔하려 노력하고 가볍지 않기 때문에 관계를 맺기에 가장 믿음직스러운 유형입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ISFJ.svg`,
    },
    {
      number: 2,
      mbti: "ISTJ",
      mbtiTitle: "현실주의자",
      content:
        "청렴결백하면서도 실용적인 논리력과 헌신적으로 임무를 수행하는 성격으로 묘사되기도 하는 현질주의자형 사람들은 자신이 맡은 바 책임을 다하며 그들이 하는 일에 큰 자부심을 가지고 있습니다.\n\n또한, 목표를 달성하기 위해 시간과 에너지를 허투루 쓰지 않으며, 이에 필요한 업무를 정확하고 신중하게 처리합니다.\n\n뭐든 쉽게 가정하여 결론 내리지 않는 이들은, 주변을 객관적으로 분석하고 사실에 입각하여 현실적으로 실행 가능한 계획을 세우는 것을 선호합니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ISTJ.svg`,
    },
    {
      number: 3,
      mbti: "INFJ",
      mbtiTitle: "옹호자",
      content:
        "옹호자형 사람들은 인내심이 많고 통찰력과 직관력이 뛰어나며 화합을 추구합니다.\n\n창의력이 좋으며, 성숙한 경우엔 강한 직관력으로 타인에게 말없이 영향력을 끼칩니다.\n독창성과 내적 독립심이 강하며, 확고한 신념과 열정으로 자신의 영감을 구현시켜 나갑니다.\n\n아울러 나무보다 숲을 보는 편이며, 한곳에 몰두하는 경향으로 목적 달성에 필요한 주변적인 조건들을 경시하기 쉽고, 자기 내부의 갈등이 많고 복잡합니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/INFJ.svg`,
    },
    {
      number: 4,
      mbti: "INTJ",
      mbtiTitle: "전략가",
      content:
        "전략가형 사람은 상상력이 풍부하면서도 결단력이 있으며, 야망이 있지만 대외적으로 표현하지 않으며, 놀랄 만큼 호기심이 많지만 쓸데없는 데 에너지를 낭비하는 법이 없습니다.\n\n이들은 관심 있는 특정 분야에 대한 그들의 방대한 지식을 다른 이들과 공유하고 싶어 하기도 합니다.\n\n반면, 일명 가십거리와 같이 별 볼 일 없는 주제에 대한 잡담거리보다는 그들 나름의 분야에서 용의주도하게 전략을 세우거나 이를 실행해 옮기는 일을 선호합니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/INTJ.svg`,
    },
    {
      number: 5,
      mbti: "ISTP",
      mbtiTitle: "장인",
      content:
        "장인형 사람은 창조와 문제 해결을 위한 이해, 그리고 실행 착오와 실질적인 경험을 통해 아이디어를 탐색합니다.\n\n다른 이들이 그들의 과제에 흥미를 보이는 것을 좋아하며, 간혹 다른 이들로 하여금 작업 중인 과제에 참여하도록 유도하기도 합니다.\n\n단, 그들만의 원리원칙이나 자유를 침범하지 않는 범위에 한해서 진행합니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ISTP.svg`,
    },
    {
      number: 6,
      mbti: "ISFP",
      mbtiTitle: "모험가",
      content:
        "모험가형 사람은 말없이 다정하고 온화하며 사람들에게 친절하고 상대방을 잘 알게 될 때까지 내면의 모습을 잘 보여주지 않습니다.\n\n의견 충돌을 피하고, 인화를 중시하며 인간과 관계되는 일을 할 때 자신의 감정과 타인의 감정에 지나치게 민감한 경향이 있습니다.\n이들은 결정력과 추진력을 기를 필요가 있습니다.\n\n눈치가 빠르며, 조용히 자기 일만 하고 있는 것처럼 보이지만 사실 주변 상황 파악도 다 하고 있습니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ISFP.svg`,
    },
    {
      number: 7,
      mbti: "INFP",
      mbtiTitle: "중재자",
      content:
        "중재자형 사람은 최악의 상황이나 악한 사람에게서도 좋은 면만을 바라보며 긍정적이고 더 나은 상황을 만들고자 노력하는 진정한 이상주의자입니다.\n\n간혹 침착하고 내성적이며 심지어는 수줍음이 많은 사람처럼 비추어지기도 하지만, 이들 안에는 불만 지피면 활활 타오를 수 있는 열정의 불꽃이 숨어있습니다.\n\n이들은 성취에 따르는 보상이나 그렇지 못할 경우에 생길 수 있는 불이익 여부에 상관없이 순수한 의도로 인생의 아름다움이나 명예 그리고 도덕적 양심과 미덕을 좇으며 나름의 인생을 설계해 나갑니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/INFP.svg`,
    },
    {
      number: 8,
      mbti: "INTP",
      mbtiTitle: "논리술사",
      content:
        "논리술사형 사람들은 그들이 가진 독창성과 창의력, 그리고 그들만의 독특한 관점과 왕성한 지적 호기심에 나름의 자부심을 가지고 있습니다.\n보통 철학자나 사색가, 혹은 몽상에 빠진 천재 교수로도 많이 알려진 이들은 역사적으로 수많은 과학적 발전을 이끌어 내기도 하였습니다.\n또한 그들은 조용하고 과묵하며 논리와 분석으로 문제를 해결하기를 좋아합니다.\n이해가 빠르고 직관력으로 통찰하는 능력이 있으며 지적 호기심이 많아, 분석적이고 논리적입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/INTP.svg`,
    },
    {
      number: 9,
      mbti: "ESTP",
      mbtiTitle: "사업가",
      content:
        "사업가형 사람은 직설적이면서도 친근한 농담으로 주변 사람을 웃게 만드는 이들은 주변의 이목을 끄는 것을 좋아합니다.\n\n이들은 치는 에너지와 어느 정도의 지식으로 대화에 무리 없이 참여하기는 하나, 이들이 더 역점을 두는 것은 앉아서 말로만 하는 논의가 아닌 직접 나가 몸으로 부딪히는 것입니다.\n\n행동이 먼저 앞서기도 하는 이들은 이로 인해 가끔 실수를 범하기도 하지만 이들은 단순히 턱 괴고 앉아 지켜만 보고 있느니 만약의 사태를 대비해 만반의 준비를 한 뒤라면 직접 나가 몸으로 부딪혀 문제를 해결해 나가는 것을 선호합니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ESTP.svg`,
    },
    {
      number: 10,
      mbti: "ESFP",
      mbtiTitle: "연예인",
      content:
        "연예인형 사람은 이들은 순간의 흥분되는 감정이나 상황에 쉽게 빠져들며, 주위 사람들 역시 그런 느낌을 만끽하기를 원합니다.\n\n또한, 사교적이고 활동적이며 수용력이 강하고 친절하며 낙천적입니다. 어떤 상황이든 잘 적응하고 현실적이고 실제적인 유형입니다.\n\n주위의 사람이나 일어나는 일에 대하여 관심이 많으며 사람이나 사물을 다루는 사실적인 상식이 풍부합니다.\n\n때로는 수다스럽고, 진지함이 결여되거나 마무리를 등한시하는 경향이 있으나, 어떤 조직체나 공동체에서 밝고 재미있는 분위기 조성 역할을 잘합니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ESFP.svg`,
    },
    {
      number: 11,
      mbti: "ENFP",
      mbtiTitle: "활동가",
      content:
        "활동가형 사람은 자유로운 사고의 소유자입니다.\n\n종종 분위기 메이커 역할을 하기도 하는 이들은 단순한 인생의 즐거움이나 그때그때 상황에서 주는 일시적인 만족이 아닌 타인과 사회적, 정서적으로 깊은 유대 관계를 맺음으로써 행복을 느낍니다.\n\n활동가형 사람들은 매력적이며 독립적인 성격으로 활발하면서도 인정이 많은 편입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ENFP.svg`,
    },
    {
      number: 12,
      mbti: "ENTP",
      mbtiTitle: "변론가",
      content:
        "변론가형 사람은 타인이 믿는 이념이나 논쟁에 반향을 일으킴으로써 군중을 선동하는 일명 선의의 비판자입니다.\n\n결단력 있는 성격 유형이 논쟁 안에 깊이 내재한 숨은 의미나 상대의 전략적 목표를 꼬집기 위해 논쟁을 벌인다고 한다면, 변론가형 사람은 단순히 재미를 이유로 비판을 일삼습니다.\n\n본인이 구상하는 바를 실현시키고 싶어 하는 기질이 강하며, 여기에 특유의 아웃사이더적인 성격까지 겹쳐 말 그대로 혁명가의 기질을 띠고 있습니다.\n\n모든 분야에 있어서, 기존의 체제 자체를 뒤집어 버리거나 분야 전체의 도약을 이루어내는 인물들이 많습니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ENTP.svg`,
    },
    {
      number: 13,
      mbti: "ESTJ",
      mbtiTitle: "경영자",
      content:
        "경영자형 사람은 정직하고 헌신적이며 위풍당당한 이들은 비록 험난한 가시밭길이라도 조언을 통하여 그들이 옳다고 생각하는 길로 사람들을 인도합니다.\n\n이들은 주변 상황을 잘 판단하여 명확하고 증명이 가능한 확실한 사실에 근거하여 사고하는 경향이 있습니다.\n\n사람들과의 약속을 충실히 이행하는 이들의 기본 성향 때문에 함께 일하는 동업자나 부하의 무능력함, 태만, 심지어는 부정직함으로 이들을 시험에 들게 하는 경우 심한 불호령도 마다하지 않습니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ESTJ.svg`,
    },
    {
      number: 14,
      mbti: "ESFJ",
      mbtiTitle: "집정관",
      content:
        "집정관형 사람은 분위기를 좌지우지하며 여러 사람의 스포트라이트를 받거나 학교에 승리와 명예를 불러오도록 팀을 이끄는 역할을 합니다.\n\n이들은 또한 훗날 다양한 사교 모임이나 어울림을 통해 주위 사람들에게 끊임없는 관심과 애정을 보임으로써 다른 이들을 행복하고 즐겁게 해주고자 노력합니다.\n\n동정심이 많고 다른 사람에게 관심을 쏟으며 인화를 중시합니다.\n\n이들은 타고난 협력자로서 동료애가 많고 친절하며 능동적인 구성원입니다.\n이야기 하기를 즐기며 정리정돈을 잘하고, 참을성이 많고 다른 사람들을 잘 도와줍니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ESFJ.svg`,
    },
    {
      number: 15,
      mbti: "ENFJ",
      mbtiTitle: "선도자",
      content:
        "선도자형 사람은 상당히 이타적이고 민첩하고 인화를 중요시하며 참을성이 많으며, 다른 사람들의 생각이나 의견에 진지한 관심을 가지고 공동선을 위하여 다른 사람의 의견에 대체로 동의합니다.\n\n미래의 가능성을 추구하며 편안하고 능란하게 계획을 제시하고 집단을 이끌어가는 능력이 있습니다.\n\n모임을 좋아하며 대화를 적극적으로 이끌어나가지만, 타인의 반응에 대해서 더 예민하고, 말을 할 때도 다른 사람한테 어려움이 될 수 있는 말은 꺼내지 않는 편입니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ENFJ.svg`,
    },
    {
      number: 16,
      mbti: "ENTJ",
      mbtiTitle: "통솔자",
      content:
        "통솔자형 사람은 천성적으로 타고난 리더입니다.\n\n이들은 진취적인 생각과 결정력, 그리고 냉철한 판단력으로 그들이 세운 목표 달성을 위해 가끔은 무모하리만치 이성적 사고를 하는 것이 특징입니다.\n\n이들은 충분한 시간과 자원만 있으면 그 어떤 것도 실현 가능하다고 믿습니다.\n보통의 사람이라면 포기하고 말 일들도 대단한 의지력으로 꾸준히 밀어붙이는데, 이는 이들에게 있어 자아실현을 위한 자기 암시이기도 합니다.",
      image: process.env.PUBLIC_URL + `/images/testImages/ENTJ.svg`,
    },
  ];

  const GoToFirstQ = (e) => {
    e.preventDefault();
    if (questionState !== 0) {
      return setQuestionState(0);
    } else {
      return setQuestionState(1);
    }
  };

  const onClickSaveValue = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setBtnValue(btnValue + value);
    setQuestionState(questionState + 1);
  };

  const onClickShared = () => {
    if (
      window.navigator.platform.indexOf("Mac") !== -1 ||
      (window.navigator.platform.indexOf("Android") !== -1 &&
        window.navigator.userAgent.indexOf("KAKAO") !== -1)
    ) {
      return window.navigator.clipboard
        .writeText("https://todaysmimic.today/test")
        .then(() => alert("주소가 클립보드에 복사됐습니다!"))
        .catch(() =>
          alert("죄송합니다, 해당 플랫폼은 공유 기능을 지원하지 않습니다.")
        );
    } else {
      return window.navigator.share({
        title: "초간단 MBTI 테스트!",
        text: "5초만에 알아보는 나의 성향! 과연 내 MBTI는 무엇일까?",
        url: "",
      });
    }
  };

  const onClickGoToMain = (e) => {
    setQuestionState(0);
    setBtnValue("");
  };

  const moveToMainPage = () => {
    navigate("/");
  };

  return (
    <StOutLineDiv>
      {questionState === 0 ? (
        <div style={{ height: "100%" }}>
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
          <p
            style={{
              fontSize: "11px",
              marginBottom: "30px",
              color: "#979797",
            }}>
            본 테스트의 결과 내용은
            뚝딱뉴스(https://ddnews.co.kr/category/mbti/)에서 발췌했습니다.
          </p>
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
            <StWaitingDiv>
              <div
                style={{
                  margin: "30vh auto",
                  paddingBottom: "60px",
                }}>
                <div
                  style={{
                    display: "block",
                    position: "relative",
                    margin: "5vh auto",
                  }}>
                  <img
                    src={process.env.PUBLIC_URL + `/images/Face.svg`}
                    alt="MBTI 테스트 결과를 받아오고 있습니다."
                  />
                  <img
                    style={{
                      position: "absolute",
                      transform: "translateX(30%)translateY(-60%)",
                    }}
                    src={process.env.PUBLIC_URL + `/images/QuestionMark.svg`}
                    alt=""
                  />
                </div>
                <p
                  style={{
                    fontSize: window.innerWidth < 500 ? "24px" : "28px",
                    fontWeight: "500",
                    color: "#ffffff",
                    margin: "0 auto",
                  }}>
                  빠르게 알아본 당신의 MBTI는!
                </p>
              </div>
            </StWaitingDiv>
          ) : questionState === 6 ? (
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
                <StLastBtn onClick={onClickShared}>테스트 공유하기</StLastBtn>
                <StLastBtn onClick={onClickGoToMain}>테스트 다시하기</StLastBtn>
              </StLastBtnWarp>
              <StLastBtn
                style={{ marginBottom: "40px" }}
                onClick={moveToMainPage}
                aria-label="메인으로 이동 버튼, 누르면 메인 화면으로 이동합니다.">
                메인 화면으로 이동
              </StLastBtn>
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
  height: auto;
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
  width: 90%;
  height: 70px;
  margin-top: 30px;
  color: #ffffff;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  margin-bottom: 10px;
  cursor: pointer;
  @media only screen and (max-width: 500px) {
    width: 90%;
    font-size: 18px;
    height: 50px;
  }
`;

const StTextA = styled.div`
  /* background-color:green; */
  font-weight: 400;
  font-size: 47px;
  line-height: 64px;
  @media only screen and (max-width: 500px) {
    font-size: 32px;
    line-height: 50px;
  }
`;
const StTextAA = styled.span`
  color: #ff6d53;
  font-weight: 600;
  font-size: 47px;
  line-height: 64px;
  @media only screen and (max-width: 500px) {
    font-size: 32px;
    line-height: 50px;
  }
`;

const StTextAAA = styled.div`
  /* background-color:green; */
  font-weight: 400;
  font-size: 47px;
  line-height: 64px;
  @media only screen and (max-width: 500px) {
    font-size: 32px;
    line-height: 50px;
  }
`;

const StTextB = styled.div`
  /* background-color:green; */
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  @media only screen and (max-width: 500px) {
    font-size: 18px;
    line-height: 24px;
  }
`;
const StTextC = styled.div`
  /* background-color:yellow; */
  font-weight: 300;
  font-size: 24px;
  line-height: 36px;
  @media only screen and (max-width: 500px) {
    font-size: 18px;
    line-height: 24px;
  }
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
  margin-bottom: 40px;
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
  text-align: left;
  letter-spacing: -0.05em;
  margin: auto 10%;
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
  margin-bottom: 20px;
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
    font-size: 18px;
    padding: 5px 12px;
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

const StWaitingDiv = styled.div`
  background-color: #ff6d53;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 500px) {
    width: 360px;
  }
`;

const StCommonButton = styled.div`
  background: #ff6d53;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  font-weight: 500;
  color: #ffffff;

  border-radius: 6px;
  margin: ${(props) => props.margin || "25px"};

  width: 90%;
  height: 60px;

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
