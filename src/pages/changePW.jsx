import React from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import ChangePWContainer from "../components/features/changePW/ChangePWContainer";
import Layout from "../layout/layout";

const ChangePW = () => {

  return (
    <Layout>
      <Header />
        <ChangePWContainer />
      <Footer />
    </Layout>
  )
}

export default ChangePW;