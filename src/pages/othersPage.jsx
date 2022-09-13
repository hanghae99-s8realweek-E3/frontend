
import Layout from "../layout/layout";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import UserProfileContainer from "../components/features/ohters/UserProfileContainer";

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
