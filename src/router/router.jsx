import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/main";
import Login from "../pages/login";
import SignUp from "../pages/signUp";
import Mbti from "../pages/mbti";
import MyPage from "../pages/myPage";
import ErrorPage from "../pages/errorPage";
import WelcomePage from "../pages/welcomePage";
import WriteTodo from "../pages/writeTodo";
import OthersPage from "../pages/othersPage";


function Router () {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/mbti" element={<Mbti />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/writetodo" element={<WriteTodo/>}/> 
        <Route path="/myPage" element={<MyPage/>}/>
        <Route path="/welcome" element={<WelcomePage/>}/>
        <Route path="/otherspage" element={<OthersPage/>}/>
        <Route path="/error" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
