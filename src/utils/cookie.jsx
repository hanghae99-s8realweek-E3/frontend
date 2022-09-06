
import jwtDecode from "jwt-decode";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

//content === value 쿠키에 값을 저장할때 
export const setCookie = (name, content, option) => {
    return cookies.set(name,content,{...option});
};

export const getCookie = (name) => {
    return cookies.get(name);
} ;
//쿠키를 지울때 
export const removeCookies = (name) => {
    return cookies.remove(name)
;}


// 페이지별로 현재 로그인 상태인지를 체크하게 만들어주는 쿠키 체크 함수
export function cookieChecker() {
    const myCookie = getCookie("token");
    if (myCookie === null || myCookie === undefined) {
        return false
    }
    return true
}

// 각 페이지에서 유저의 데이터를 가져와야할 때 쓰도록 하는 함수
export function decodeMyCookieData() {
    const myCookie = getCookie("token");
    if (myCookie !== null && myCookie !== undefined) {
        const myData = jwtDecode(myCookie);
        return myData
    }

}