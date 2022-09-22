//대연 참고할만한 주석은 남겨두었습니다.
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { tokenChecker, decodeMyTokenData } from "../../../utils/token";
import instance from "../../../app/modules/instance";
import LoadingContainer from "../../../utils/loadingState";

function WriteTodoForm() {
  const navigate = useNavigate();
  //mbti를 찾기위해 decodeMyTokenData() 사용
  const getMbti = decodeMyTokenData();
  const [todo, setTodo] = useState({
    todo: "",
  });
  const [loading, setLoading] = useState(false);
  if (tokenChecker() === false) {
    alert("로그인 후 이용해주세요.");
    navigate("/mypage");
  }

  // 구조 분해 할당
  const onChange = (event) => {
    const { name, value } = event.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  // state와 ref의 차이 state는 값이 바뀔 때마다 렌더링 ref는 값은 바뀌고 있으나 렌더링을 직접해주지 않으면 값이 나타나지 않음 *별코딩 youtube https://www.youtube.com/watch?v=VxqZrL4FLz8&t=0s 7분~*
  // 변화는 방지해야하지만 그 변화가 렌더링을 발생시키면 안되는 어떤 값을 다룰 때 정말 유용
  const todoRef = useRef();

  useEffect(() => {
    // 페이지 첫 렌더링 시 mbti가 없을경우 mbti등록으로 이동
    if (
      getMbti.mbti === null ||
      getMbti.mbti === undefined ||
      getMbti.mbti === ""
    ) {
      alert("mbti를 등록해주세요!");
      navigate("/modifyprofile");
    }
    //페이지 렌더링 시 textarea안에 커서가 가게끔하기 위하여
    todoRef.current.focus();
  }, []);

  // 글자칠때마다 줄 늘어남
  // const todoRef = useRef();
  // const handleResizeHeight = useCallback(()=> {
  //   todoRef.current.style.height=todoRef.current.scrollHeight +"px" ;
  // },[]);

  // 등록하기 버튼클릭시 실행
  const submitTodoData = (e) => {
    if (todo.todo.length < 10) {
      return alert("10자 이상 작성해 주세요.");
    }
    // 새로고침 이벤트 막기
    else e.preventDefault();
    setLoading(true);
    // instance통신 선언
    const TodoDateFetchCheck = async () => {
      try {
        const response = await instance.post("/mytodos", todo);
        console.log(response);
        if (response.data.message === "success") {
          setLoading(false);
          navigate("/setuptodo");
        }
      } catch (error) {
        setLoading(false);
        return alert(error.response.data.errorMessage);
      }
    };
    // 실행
    TodoDateFetchCheck();
  };

  return (
    <>
      {loading === true ? <LoadingContainer /> : <></>}
      <StTotalWrap>
        <StMbti>{getMbti.mbti}</StMbti>
        <StLine></StLine>
        <StWriteTodoForm onSubmit={submitTodoData}>
          <StWriteTodoTextArea
            // onInput={handleResizeHeight}
            ref={todoRef}
            placeholder="내가만드는 TO DO내용"
            maxLength={30}
            name="todo"
            value={todo.todo}
            onChange={onChange}
          />
          {/* 글자수가 200제한인데 10자 이하로 남았을 때 빨간색으로 알려줌
        <span>
          입력할 수 있는 글자 수 :{" "}
          <StTextCount color={200 - todo.todo.length < 10 ? "red" : "black"}>
            {200 - todo.todo.length}
          </StTextCount>
        </span> */}
          <Stbutton type="submit">등록하기</Stbutton>
        </StWriteTodoForm>
      </StTotalWrap>
    </>
  );
}

const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const StMbti = styled.span`
  display: flex;
  margin: 108.33px 0px 9px 27px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #979797;
`;
const StLine = styled.div`
  display: flex;
  margin: 0px 25px 17px 25px;
  background-color: #bdc5cd;
  transform: matrix(1, 0, 0, -1, 0, 0);
  height: 1px;
`;
const StWriteTodoForm = styled.form`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  height: 70vh;
`;

const StWriteTodoTextArea = styled.textarea`
  resize: none; // 크기 조절하는 커서 안뜨게할려고
  height: 150px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #979797;
  border: none;
  outline: none;
  margin-left: 27px;
`;

const Stbutton = styled.button`
  /* width: 450px; */
  height: 70px;
  margin: auto 25px 80px 25px;
  cursor: pointer;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
  border: 0px;
  background: #ff6d53;
  border-radius: 6px;
`;

export default WriteTodoForm;
