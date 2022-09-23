import { useState } from "react";
import styled from "styled-components";

function TestForm() {
  const [firstState, setFirstState] = useState();
  const [secondState, setSecondState] = useState();

  const GoToNextPage = (e) => {
    e.preventDefault();
  };

  return (
    <StOutLine>
      TestForm
      <div>
        <button onClick={() => GoToNextPage}>테스트 시작</button>
      </div>
    </StOutLine>
  );
}

export default TestForm;

const StOutLine = styled.div`
  background-color: #919191;
  margin-top: 60px;
  height: 100vh;
`;
