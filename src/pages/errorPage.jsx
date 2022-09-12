import Layout from "../layout/layout";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import ErrorPageContainer from "../components/features/error/ErrorPageContainer";

function ErrorPage() {
  return (
    <Layout>
      <Header />
      <ErrorPageContainer />
      <Footer />
    </Layout>
  );
}

export default ErrorPage;
