import React from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import HelpDeskContainer from "../components/features/helpdesk/HelpDeskContainer";
import Layout from "../layout/layout";

const HelpDesk = () => {

  return (
    <Layout>
      <Header />
        <HelpDeskContainer />
      <Footer />
    </Layout>
  )
}

export default HelpDesk;