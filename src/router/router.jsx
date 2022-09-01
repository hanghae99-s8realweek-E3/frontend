import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/main";
import Login from "../pages/login";
import SignUp from "../pages/signUp";
import Mbti from "../pages/mbti";
import WriteTodo from "../components/features/todo/writeTodo";
import MyPage from "../pages/myPage";

function Router () {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/mbti" element={<Mbti />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/todoLists" element={<WriteTodo/>}/>
        <Route path="/myPage" element={<MyPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
