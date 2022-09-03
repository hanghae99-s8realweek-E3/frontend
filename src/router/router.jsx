import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/main";
import Activity from "../pages/activity";
import Error from "../components/features/error/Error"
import FeedDetail from "../pages/feedDetail";
import Login from "../pages/login";
import Mbti from "../pages/mbti";
import Follow from "../pages/follow";
import Feed from "../pages/feed";




function Router () {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/activity" element={<Activity/>}/>
        <Route path="/error" element={<Error/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/feeddetail" element={<FeedDetail/>}/>
        <Route path="/follow" element={<Follow/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/mbti" element={<Mbti/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
