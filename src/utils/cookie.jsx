import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, content, time) => {
    // const date = new Date()
    return cookies.set(name, content, { path: '/', maxAge: time});
}

export const getCookie = (name) => {
    return cookies.get(name);
}

export const removeCookies = (name) => {
    return cookies.remove(name);
}
