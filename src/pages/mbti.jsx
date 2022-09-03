import Footer from "../components/common/footer";
import Header from "../components/common/header";
import MbtiForm from "../components/features/mbti/MbtiForm";
import Layout from "../layout/layout";

const Mbti = () => {

    return (
        <Layout>
            <Header />
            <MbtiForm/>
            <Footer />
        </Layout>
    )
}

export default Mbti;