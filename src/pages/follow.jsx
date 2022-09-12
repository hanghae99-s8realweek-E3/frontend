import Footer from "../components/common/footer";
import Header from "../components/common/header";
import MyPageFollow from "../components/features/follow/MyPageFollow";
import Layout from "../layout/layout";


function Follow() {

  return (
    <Layout>
      <Header />
      <MyPageFollow/>
      <Footer />
    </Layout>
  )
}

export default Follow;