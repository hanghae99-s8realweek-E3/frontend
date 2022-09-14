import Layout from "../layout/layout";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import SelectMBTIFeedContainer from "../components/features/selectMBTIFeed/SelectMBTIFeedContainer";

function selectMBTIFeed() {
  return (
    <Layout>
      <Header />
      <SelectMBTIFeedContainer />
      <Footer />
    </Layout>
  );
}

export default selectMBTIFeed;
