import jwtDecode from "jwt-decode";

export function tokenChecker() {
  const myToken = window.localStorage.getItem("token");
  if (myToken === null || myToken === undefined) {
    return false;
  }
  return true;
}

// 각 페이지에서 유저의 데이터를 가져와야할 때 쓰도록 하는 함수
export function decodeMyTokenData() {
  const myToken = window.localStorage.getItem("token");
  if (myToken !== null && myToken !== undefined) {
    const myData = jwtDecode(myToken);
    return myData;
  }
}
