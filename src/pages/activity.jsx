import Footer from "../components/common/footer";
import Header from "../components/common/header";
import ActivityContainer from "../components/features/activity/ActivityContainer";
import Layout from "../layout/layout";

function Activity() {
  return (
    <Layout>
      <Header />
      <ActivityContainer />
      <Footer />
    </Layout>
  );
}

export default Activity;
