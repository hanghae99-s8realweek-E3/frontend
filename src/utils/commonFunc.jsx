// 오늘 날짜를 yyyy-mm-dd로 반환해줌.
export function settingTodayDate() {
  const selectYear = new Date().getFullYear();
  const selectMonth =
    new Date().getMonth() < 9
      ? "0" + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1;
  const selectDay =
    new Date().getDate() < 10
      ? "0" + new Date().getDate()
      : new Date().getDate();
  return `${selectYear}-${selectMonth}-${selectDay}`;
}
