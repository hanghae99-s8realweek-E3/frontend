import Footer from "../components/common/footer";
import Header from "../components/common/header";
import LoginSelect from "../components/features/myPage/LoginSelect";
import MyPageContainer from "../components/features/myPage/MyPageContainer";
import Layout from "../layout/layout";
import { tokenChecker } from "../utils/token";

function MyPage() {
  return (
    <Layout>
      <Header />
      {tokenChecker() === false ? <LoginSelect /> : <MyPageContainer />}
      <Footer />
    </Layout>
  );
}

export default MyPage;
