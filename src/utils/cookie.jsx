
import jwtDecode from "jwt-decode";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

//content === value 쿠키에 값을 저장할때 
export const setCookie = (name, content, option) => {
    return cookies.set(name,content,{...option});
}

export const getCookie = (name) => {
    return cookies.get(name);
}
//쿠키를 지울때 
export const removeCookies = (name) => {
    return cookies.remove(name);
}
