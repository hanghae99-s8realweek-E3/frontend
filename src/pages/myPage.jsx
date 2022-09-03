import { useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import LoginSelect from "../components/features/myPage/LoginSelect";
import MyPageContainer from "../components/features/myPage/MyPageContainer";
import Layout from "../layout/layout";

function MyPage () {
    const [loginState, setLoginState] = useState(false)
    // state 정리
    // 현재 로그인이 안 된 상태: basic
    // 현재 로그인이 된 상태: myPage
    // 정보 수정 화면: modify
    // 팔로잉, 팔로워: following
    // 내 댓글, 내 정보: activity

  return (
    <Layout>
      <Header />
        {loginState === false ? <LoginSelect /> : <MyPageContainer /> }
      <Footer />
    </Layout>
  )
}

export default MyPage;