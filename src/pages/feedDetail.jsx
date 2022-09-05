import Footer from "../components/common/footer";
import Header from "../components/common/header";
import FeedDetailContainer from "../components/features/feedDetail/FeedDetailContainer";
import Layout from "../layout/layout";

function FeedDetail() {

  return (
    <Layout>
      {/* <Header /> */}
      <FeedDetailContainer/>
      <Footer />
    </Layout>
  )
}

export default FeedDetail;