import { Cookies } from "react-cookie";

const cookies = new Cookies();

//content === value 
export const setCookie = (name, content, option) => {
    return cookies.set(name,content,{...option});
};

export const getCookie = (name) => {
    return cookies.get(name);
} ;

export const removeCookies = (name) => {
    return cookies.remove(name)
;}