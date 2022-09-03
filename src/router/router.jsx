import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/main";
import Activity from "../pages/activity";
import ErrorPage from "../pages/errorPage";
import FeedDetail from "../pages/feedDetail";
import Login from "../pages/login";
import Mbti from "../pages/mbti";
import Follow from "../pages/follow";
import Feed from "../pages/feed";
import MyPage from "../pages/myPage";
import OthersPage from "../pages/othersPage";
import SelectMBTIFeed from "../pages/selectMBTIFeed";
import SetUpTodo from "../pages/setUpTodo";
import SignUp from "../pages/signUp";
import Teaser from "../pages/teaser";
import WelcomePage from "../pages/welcomePage";
import WriteTodo from "../pages/writeTodo";




function Router () {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/activity" element={<Activity/>}/>
        <Route path="/errorpage" element={<ErrorPage/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/feeddetail" element={<FeedDetail/>}/>
        <Route path="/follow" element={<Follow/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/mbti" element={<Mbti/>}/>
        <Route path="/mypage" element={<MyPage/>} />
        <Route path="/otherspage" element={<OthersPage/>} />
        <Route path="/selectmbtifeed" element={<SelectMBTIFeed/>} />
        <Route path="/setuptodo" element={<SetUpTodo/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/teaser" element={<Teaser/>} />
        <Route path="/welcomepage" element={<WelcomePage/>} />
        <Route path="/writetodo" element={<WriteTodo/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
