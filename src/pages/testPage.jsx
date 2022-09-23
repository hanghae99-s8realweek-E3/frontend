import Footer from "../components/common/footer";
import Header from "../components/common/header";
import TestForm from "../components/features/test/TestForm";
import Layout from "../layout/layout";

function TestPage() {
  return (
    <Layout>
      <Header />
      <TestForm />
      <Footer />
    </Layout>
  );
}

export default TestPage;
