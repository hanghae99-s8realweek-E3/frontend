import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postmytodosFetch } from "../../../app/modules/mytodosSlice";
import { cookieChecker, decodeMyCookieData } from "../../../utils/cookie";

// 나중에 코드 추가정리 필요!
function WriteTodoForm() {

  const navigate = useNavigate();

  if (cookieChecker() === false){
    alert("로그인 후 이용해주세요.");
    navigate("/mypage");
  }
  //mbti를 찾기위해 decodeMyCookieData() 사용
  const getMbti = decodeMyCookieData();
  console.log(getMbti);

  const dispatch = useDispatch();
  const [todo, setTodo] = useState({
    todo: "",
  });

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
    //새로고침시 textarea안에 커서가 가게끔하기 위하여
    todoRef.current.focus();
  }, []);

  // 글자칠때마다 줄 늘어남
  // const todoRef = useRef();
  // const handleResizeHeight = useCallback(()=> {
  //   todoRef.current.style.height=todoRef.current.scrollHeight +"px" ;
  // },[]);


  // 스타일드 컴포넌트 프롭스 활용해보자
  // suggestion finish go todopage
  const submitTodoData = (e) => {
    e.preventDefault();
    dispatch(postmytodosFetch(todo));
    // navigate("/todoList?date=");
  };

  return (
    <StTotalWrap>
      <StMbti>mbti들어가야함{getMbti.mbti}</StMbti>
      <StLine></StLine>
      <StWriteTodoForm onSubmit={submitTodoData}>
        <StWriteTodoTextArea
          // onInput={handleResizeHeight}
          ref={todoRef}
          placeholder="내가만드는 TO DO내용"
          maxLength={200}
          name="todo"
          value={todo.todo}
          onChange={onChange}
        />
        {/* 글자수가 200제한인데 10자 이하로 남았을 때 빨간색으로 알려줌 */}
        <span>
          입력할 수 있는 글자 수 :{" "}
          <StTextCount color={200 - todo.todo.length < 10 ? "red" : "black"}>
            {200 - todo.todo.length}
          </StTextCount>
        </span>

        <Stbutton type="submit">등록하기</Stbutton>
      </StWriteTodoForm>
    </StTotalWrap>
  );
}

const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const StMbti = styled.span`
  display: flex;
  margin: 177px 0px 9px 27px;
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
  align-items: center;
`;

const StWriteTodoTextArea = styled.textarea`
  display: flex;
  resize: none; // 크기 조절하는 커서 안뜨게할려고
  height: 150px;
  width: 450px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #979797;
`;

const StTextCount = styled.span`
  color: ${(props) => props.color};
`;
const Stbutton = styled.button`
  width: 450px;
  height: 70px;
  background: #979797;
  border-radius: 6px;
  margin: 565px 25px 177px 25px;
  cursor: pointer;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
`;

export default WriteTodoForm;
