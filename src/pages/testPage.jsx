import { useEffect } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import TestForm from "../components/features/test/TestForm";
import Layout from "../layout/layout";

function TestPage() {

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Layout>
      <Header />
      <TestForm />
      <Footer />
    </Layout>
  );
}

export default TestPage;
