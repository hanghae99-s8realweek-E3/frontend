import Footer from "../components/common/footer";
import Header from "../components/common/header";
import LoginForm from "../components/features/login/LoginForm";
import LoginSelect from "../components/features/myPage/LoginSelect";
import Layout from "../layout/layout";

function Login() {
  return (
    <Layout>
      <Header />
      <LoginSelect/>
      {/* <LoginForm /> */}
      <Footer />
    </Layout>
    
  );
}

export default Login;
