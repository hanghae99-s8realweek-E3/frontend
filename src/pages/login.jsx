import Header from "../components/common/header";
import LoginForm from "../components/features/login/LoginForm";
import Layout from "../layout/layout";

function Login() {
  return (
    <Layout>
      <Header />
        <LoginForm />
    </Layout>
    
  );
}

export default Login;
