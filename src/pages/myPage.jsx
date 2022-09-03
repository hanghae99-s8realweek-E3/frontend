import Footer from "../components/common/footer";
import Header from "../components/common/header";
import LoginSelect from "../components/features/myPage/LoginSelect";
import Layout from "../layout/layout";
import UserProfileContainer from "../components/features/myPage/UserProfileContainer";

function MyPage() {
  return (
    <Layout>
      <Header />
      <UserProfileContainer />
      <LoginSelect />
      <Footer />
    </Layout>
  );
}

export default MyPage;
