import { useNavigate } from "react-router-dom";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import MainContainer from "../components/features/main/MainContainer";
import Layout from "../layout/layout";
import { decodeMyTokenData } from "../utils/token";

function Main() {
  const myData = decodeMyTokenData();
  const navigate = useNavigate();
  if (myData !== undefined && myData.provider === "kakao") {
    if (myData.mbti === undefined) {
      return navigate("/mbti");
    }
  }

  return (
    <>
      <Layout>
        <Header />
        <MainContainer />
        <Footer />
      </Layout>
    </>
  );
}

export default Main;
