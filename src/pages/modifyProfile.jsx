import React from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import ProfileModifyForm from "../components/features/myPage/ProfileModifyForm";
import Layout from "../layout/layout";

const ModifyProfile = () => {

  return (
    <Layout>
      <Header />
        <ProfileModifyForm />
      <Footer />
    </Layout>
  )
}

export default ModifyProfile;