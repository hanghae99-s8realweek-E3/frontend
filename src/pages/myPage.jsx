import { useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import LoginSelect from "../components/features/myPage/LoginSelect";
import MyPageContainer from "../components/features/myPage/MyPageContainer";
import Layout from "../layout/layout";

function MyPage () {
  const [loginState, setLoginState] = useState(true)

  return (
    <Layout>
      <Header />
        {loginState === false ? <LoginSelect /> : <MyPageContainer /> }
      <Footer />
    </Layout>
  )
}

export default MyPage;