import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/main";
import Login from "../pages/login";
import SignUp from "../pages/signUp";
import Mbti from "../pages/mbti";
import WriteTodo from "../components/features/todo/writeTodo";
import MyPage from "../pages/myPage";
import ErrorPage from "../pages/errorPage";
import UserProfile from "../pages/userProfile";
import WelcomePage from "../pages/welcomePage";


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
        <Route path="/welcome" element={<WelcomePage/>}/>
        <Route path="/userprofile" element={<UserProfile/>}/>
        <Route path="/error" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
