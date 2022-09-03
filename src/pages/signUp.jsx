import React from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import SignUpForm from "../components/features/signUp/SignUpForm";
import Layout from "../layout/layout";

const SignUp = () => {

    return (
        <Layout>
            <Header />
            <SignUpForm/>
            <Footer />
        </Layout>
    )
}

export default SignUp;