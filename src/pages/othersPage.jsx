
import UserProfileContainer from "../components/features/myPage/UserProfileContainer";
import Layout from "../layout/layout";
import Footer from "../components/common/footer";
import Header from "../components/common/header";

function OthersPage() {
  return (
    <Layout>
      <Header />
      <UserProfileContainer/>
      <Footer />
    </Layout>
  );
}

export default OthersPage;
