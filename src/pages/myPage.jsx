import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import LoginSelect from "../components/features/myPage/LoginSelect";
import MyPageContainer from "../components/features/myPage/MyPageContainer";
import Layout from "../layout/layout";
import { cookieChecker } from "../utils/cookie";

function MyPage () {
  const [loginState, setLoginState] = useState(false)

  // 쿠키 체커를 통해 현재 쿠키가 있으면 로그인 상태를 true로 변환.
  useEffect(() => {
    if (cookieChecker() === true) {
      setLoginState(true)
    }
  }, [])

  return (
    <Layout>
      <Header />
        {loginState === false ? <LoginSelect /> : <MyPageContainer /> }
      <Footer />
    </Layout>
  )
}

export default MyPage;