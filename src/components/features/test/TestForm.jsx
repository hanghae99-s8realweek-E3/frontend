import { useState } from "react";
import styled from "styled-components";

function TestForm() {
  const [startBtn, setStartBtn] = useState(false);
  const [firstState, setFirstState] = useState();
  const [secondState, setSecondState] = useState();

  const aClass = {
    E:""
  }

  const GoToFirstQ = (e) => {
    e.preventDefault();
    if (startBtn === false) {
      return setStartBtn(true)
    } else {
      return setStartBtn(false)
    }
  };
  console.log(startBtn)

  return (
    <StOutLineDiv>
    {startBtn === true ? <></> :<button onClick={GoToFirstQ}>테스트 시작</button>}
      <div>
      {startBtn !== true ? <></> : 
      <div>
      <h2>"첫번째 문제"</h2>
      <h3>"E"vs"I"</h3>
      <StChoiceBtnDiv>
      <button>E</button>
      <button>I</button>
      </StChoiceBtnDiv>
      
      </div>
      }
      </div>

      
      
      <div>

      </div>
    </StOutLineDiv>
  );
}

export default TestForm;

const StOutLineDiv = styled.div`
  background-color: #919191;
  margin-top: 60px;
  height: 100vh;
  display:flex;
  flex-direction:column;

`;

const StChoiceBtnDiv = styled.div`
  display:flex;
  flex-direction:column;
`
