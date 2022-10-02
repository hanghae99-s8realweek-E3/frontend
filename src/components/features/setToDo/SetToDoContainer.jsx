import { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { StCommonRowBox, StCommonText } from "../../interface/styledCommon";
import ProfileCard from "../../common/ProfileCard";
import { useNavigate } from "react-router-dom";
import { getSetUpMyTodoFetch } from "../../../app/modules/setUpTodoSlice";
import SetUpToDoCard from "./SetUpToDoCard";
import LoadingContainer from "../../../utils/loadingState";

function SetToDoContainer() {
  // 선택된 달과 요일에 따라 값을 보여주기 위해 만든 배열
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekOfDayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const navigate = useNavigate();
  // 날짜를 적용해주는 상태
  const [calendar, setCalendar] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // 선택한 날짜에 따라 내용들을 다시 불러올 수 있도록 함.
  const myTodosState = useSelector((state) => state.setuptodos.data);

  // 기록 확인을 허용해주기 위해 필요한 3개월 전 날짜
  let mindate = new Date();
  mindate.setMonth(mindate.getMonth() - 3);
  // date:”yyyy-mm-dd”

  useEffect(() => {
    setLoading(true);
    const selectYear = calendar.getFullYear();
    const selectMonth =
      calendar.getMonth() < 9
        ? "0" + (calendar.getMonth() + 1)
        : calendar.getMonth() + 1;
    const selectDay =
      calendar.getDate() < 10 ? "0" + calendar.getDate() : calendar.getDate();
    const selectDate = { date: `${selectYear}-${selectMonth}-${selectDay}` };
    dispatch(getSetUpMyTodoFetch(selectDate));
    setLoading(false);
  }, [calendar]);

  // 도전하러 가기 클릭 시, 피드 선택 화면 출력
  function moveToSelectFeed() {
    navigate("/todolists");
  }

  // 작성하러 가기 클릭 시, TODO 작성 화면 출력
  function moveToWriteTodo() {
    navigate("/mytodos");
  }

  const selectingDate = `${calendar.getFullYear()}-${
    calendar.getMonth() < 9
      ? "0" + (calendar.getMonth() + 1)
      : calendar.getMonth() + 1
  }-${calendar.getDate() < 10 ? "0" + calendar.getDate() : calendar.getDate()}`;

  const nowDate = `${new Date().getFullYear()}-${
    new Date().getMonth() < 9
      ? "0" + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1
  }-${
    new Date().getDate() < 10
      ? "0" + new Date().getDate()
      : new Date().getDate()
  }`;

  return (
    <>
      {loading === true ? <LoadingContainer /> : <></>}
      <StCommonColumnContainer>
        {Object.keys(myTodosState).length !== 0 ? (
          <>
            {/* <ProfileCard profileData={myTodosState} /> */}
            <CalendarContainer>
              {/* onchange를 통해 선택한 날짜를 저장 -> value를 통해 선택한 날짜를 받아옴. */}
              {/* maxDate를 통해 선택할 수 있는 최대 날짜(금일), minDate를 통해 선택할 수 있는 최소 날짜 설정 가능 */}
              <Calendar
                value={calendar}
                onChange={setCalendar}
                maxDate={new Date()}
                minDate={mindate}
                locale="en"
              />
            </CalendarContainer>

            <StTodayBox>
              <StCommonRowBox>
                {/* getDay()는 배열인 관계로 0 = 일요일이기 때문에 앞서 weekOfDayList 배열을 만들어 이렇게 받아옴. */}
                <StDayWeekOfDaySpan>
                  {weekOfDayList[calendar.getDay()]}
                </StDayWeekOfDaySpan>
                <span
                  style={{
                    color: "#979797",
                    margin: "0 12px",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}>
                  ·
                </span>
                {/* 1~9는 숫자 앞에 0이 붙도록 설정 */}
                <StDayDateSpan>
                  {calendar.getDate() < 10
                    ? "0" + calendar.getDate()
                    : calendar.getDate()}
                </StDayDateSpan>
                {/* getMonth()는 배열인 관계로 0 = 1월이기 때문에 앞서 monthList 배열을 만들어 이렇게 받아옴. */}
                <StDayMonthSpan>
                  {monthList[calendar.getMonth()]}
                </StDayMonthSpan>
              </StCommonRowBox>
            </StTodayBox>

            <StCommonBorder />

            <StChallengeToDoBox>
              <StCommonText margin="0 auto 14px 25px" fontSize="18px">
                오늘의 미믹
              </StCommonText>
              {selectingDate !== nowDate ? (
                Array.isArray(myTodosState.challengedTodo) === true ? (
                  <StNotifyNoSettingBox>
                    진행한 도전이 없습니다.
                  </StNotifyNoSettingBox>
                ) : (
                  <SetUpToDoCard
                    id={myTodosState.challengedTodo.todoId}
                    data={myTodosState.challengedTodo}
                    hideState={false}
                    isTodayChallenge={false}
                  />
                )
              ) : Array.isArray(myTodosState.challengedTodo) === true ? (
                <StSetToDoBtn onClick={moveToSelectFeed}>
                  도전하러 가기
                </StSetToDoBtn>
              ) : (
                <SetUpToDoCard
                  id={myTodosState.challengedTodo.todoId}
                  data={myTodosState.challengedTodo}
                  hideState={false}
                  isTodayChallenge={true}
                />
              )}
            </StChallengeToDoBox>

            <StMakingToDoBox>
              <StCommonText margin="0 auto 14px 25px" fontSize="18px">
                내가 만든 미믹
              </StCommonText>
              {Array.isArray(myTodosState.createdTodo) === true ? (
                selectingDate !== nowDate ? (
                  <StNotifyNoSettingBox>
                    제안한 도전이 없습니다.
                  </StNotifyNoSettingBox>
                ) : (
                  <StSetToDoBtn onClick={moveToWriteTodo}>
                    제안하러 가기
                  </StSetToDoBtn>
                )
              ) : (
                <SetUpToDoCard
                  id={myTodosState.createdTodo.todoId}
                  data={myTodosState.createdTodo}
                  hideState={true}
                />
              )}
            </StMakingToDoBox>
          </>
        ) : (
          <></>
        )}
      </StCommonColumnContainer>
    </>
  );
}

export default SetToDoContainer;

const StCommonColumnContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 500px;

  margin: 60px auto;

  width: 500px;
  box-sizing: border-box;
  @media screen and (max-width: 500px) {
    width: 360px;
  }
`;

const CalendarContainer = styled.div`
  .react-calendar {
    width: 500px;
    /* max-width: 100%; */
    background: #f4f3f3;
    /* border: 1px solid #a0a096; */
    font-family: "IBM Plex Sans KR", sans-serif;
    line-height: 1.125em;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    display: flex;
    align-items: center;
    height: 44px;
    padding-top: 10px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:disabled {
    background-color: #f4f3f3;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f4f3f3;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    font-family: "IBM Plex Sans KR";
    font-size: 13px;
    font-weight: 400;
    color: #5e5c5c;
    padding: 0.5em;
  }
  .react-calendar__month-view__weekdays__weekday > abbr[title] {
    text-decoration: none;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #5e5c5c;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
  }
  .react-calendar__tile:disabled {
    background-color: #f4f3f3;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
    border-radius: 50%;
  }
  .react-calendar__tile--now {
    background: #ffff76;
    border-radius: 50%;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  }
  .react-calendar__tile--hasActive {
    background: #76baff;
    border-radius: 0;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
    border-radius: 0;
  }
  .react-calendar__tile--active {
    background: #ff6d53;
    border-radius: 50%;
    & > abbr {
      color: white;
    }
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #ff6d53;
    color: white;
    border-radius: 50%;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f4f3f3;
  }
  .react-calendar__navigation__arrow.react-calendar__navigation__prev2-button,
  .react-calendar__navigation__arrow.react-calendar__navigation__next2-button {
    display: none;
  }
  .react-calendar__navigation__arrow.react-calendar__navigation__prev-button {
    display: flex;
    justify-content: flex-end;
    margin-left: 50px;
    font-size: 30px;
    color: #909090;
  }
  .react-calendar__navigation__arrow.react-calendar__navigation__next-button {
    display: flex;
    margin-right: 50px;
    font-size: 30px;
    color: #909090;
  }
  .react-calendar__navigation__label {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 24px;
  }
  .react-calendar__tile.react-calendar__month-view__days__day {
    font-size: 18px;
    font-weight: 400;
    line-height: 36px;
    color: "#313131";

    padding: 0;

    height: 72px;
    width: 72px;
  }
  .react-calendar__tile.react-calendar__tile--now.react-calendar__tile--hasActive.react-calendar__year-view__months__month,
  .react-calendar__tile.react-calendar__tile--now.react-calendar__tile--hasActive.react-calendar__century-view__decades__decade,
  .react-calendar__tile.react-calendar__tile--now.react-calendar__tile--hasActive.react-calendar__decade-view__years__year,
  .react-calendar__tile.react-calendar__tile--now.react-calendar__year-view__months__month {
    border-radius: 0;
  }
  .react-calendar__tile.react-calendar__tile--now.react-calendar__year-view__months__month
    > abbr,
  .react-calendar__tile.react-calendar__year-view__months__month > abbr {
    font-size: 18px;
    font-weight: 400;
    line-height: 36px;
    color: #313131;
  }
  .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__month-view__days__day--neighboringMonth {
    color: gray;
  }
  @media screen and (max-width: 500px) {
    .react-calendar {
      width: 360px;
    }
    .react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
      font-size: 18px;
    }
    .react-calendar__tile.react-calendar__month-view__days__day {
      font-size: 18px;
      font-weight: 400;
      line-height: 36px;
      color: #313131;

      padding: 0;

      height: 50px;
      width: 36px;
    }
  }
`;

const StTodayBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  margin-top: 26px;
  margin-left: 25px;
  margin-bottom: 10px;
`;

const StDayWeekOfDaySpan = styled.span`
  display: inline-block;

  font-size: 20px;
  font-weight: 600;
  color: #979797;

  height: 32px;
  @media screen and (max-width: 500px) {
    font-size: 18px;
    height: 26px;
  }
`;

const StDayDateSpan = styled.span`
  display: inline-block;

  font-size: 20px;
  font-weight: 300;
  color: #979797;

  margin-right: 12px;

  height: 32px;
  @media screen and (max-width: 500px) {
    font-size: 18px;
    height: 26px;
  }
`;

const StDayMonthSpan = styled.span`
  display: inline-block;

  font-size: 20px;
  font-weight: 300;
  color: #979797;

  height: 32px;
  @media screen and (max-width: 500px) {
    font-size: 18px;
    height: 26px;
  }
`;

const StCommonBorder = styled.div`
  height: 1px;
  background: gray;
  margin: 0 25px;
  @media screen and (max-width: 500px) {
    margin: 0 15px;
  }
`;

const StChallengeToDoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 20px 0 15px 0;
`;

const StMakingToDoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 20px 0 15px 0;
`;

const StSetToDoBtn = styled.button`
  background: none;

  display: block;

  font-size: 24px;
  font-weight: 600;
  color: #979797;

  border: 1px solid #979797;
  border-radius: 6px;
  outline: none;

  width: 90%;
  height: 102px;

  margin: 5px 20px;

  cursor: pointer;
  transition: ease 0.1s;
  &:hover {
    transform: scale(1.02);
  }
  @media screen and (max-width: 500px) {
    width: 90%;
    height: 80px;
    font-size: 18px;
  }
`;

const StNotifyNoSettingBox = styled.div`
  background: none;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 24px;
  font-weight: 600;
  color: #979797;

  border: 1px solid #979797;
  border-radius: 6px;
  outline: none;

  width: 90%;
  height: 102px;

  margin: 5px 20px;

  @media screen and (max-width: 500px) {
    width: 90%;
    height: 80px;
    font-size: 18px;
  }
`;
