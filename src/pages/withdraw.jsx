import Footer from "../components/common/footer";
import Header from "../components/common/header";
import WithdrawContainer from "../components/features/withdraw/WithdrawContainer";
import Layout from "../layout/layout";

function Withdraw() {
  return (
    <Layout>
      <Header />
      <WithdrawContainer />
      <Footer />
    </Layout>
  );
}

export default Withdraw;
