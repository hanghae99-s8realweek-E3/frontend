import Footer from "../components/common/footer";
import Header from "../components/common/header";
import FeedPageContainer from "../components/features/feed/FeedPageContainer";
import Layout from "../layout/layout";


function Feed() {

  return (
    <Layout>
      <Header />
      <FeedPageContainer/>
      <Footer />
    </Layout>
  )
}

export default Feed;