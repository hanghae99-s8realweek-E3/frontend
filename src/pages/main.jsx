import Footer from "../components/common/footer";
import Header from "../components/common/header";
import MainContainer from "../components/features/main/MainContainer";
import Layout from "../layout/layout";


function Main () {
  return (
    <Layout>
      <Header />
      <MainContainer />
      <Footer />
    </Layout>
  )
}

export default Main;