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
import ModifyProfile from "../pages/modifyProfile";
import ChangePW from "../pages/changePW";
import HelpDesk from "../pages/helpDesk";




function Router () {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/activity" element={<Activity/>}/>
        <Route path="/errorpage" element={<ErrorPage/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/feeddetail/:todoId" element={<FeedDetail/>}/>
        <Route path="/follow" element={<Follow/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/mbti" element={<Mbti/>}/>
        <Route path="/mypage" element={<MyPage/>} />
        <Route path="/otherspage/:userId" element={<OthersPage/>} />
        <Route path="/selectmbtifeed" element={<SelectMBTIFeed/>} />
        <Route path="/setuptodo" element={<SetUpTodo/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/teaser" element={<Teaser/>} />
        <Route path="/welcomepage" element={<WelcomePage/>} />
        <Route path="/mytodos" element={<WriteTodo/>} />
        <Route path="/modifyprofile" element={<ModifyProfile/>} />
        <Route path="/changepw" element={<ChangePW/>} />
        <Route path="/helpdesk" element={<HelpDesk/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
