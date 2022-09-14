import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import SetToDoContainer from "../components/features/setToDo/SetToDoContainer";
import Layout from "../layout/layout";
import { tokenChecker } from "../utils/token";

function SetUpTodo() {
  const navigate = useNavigate();

  // 현재 쿠키가 없는 상태라면 mypage로 이동시켜 바로 로그인하게 만들도록 적용.
  useEffect(() => {
    if (tokenChecker() === false) {
      alert("로그인 후 이용해주세요.");
      navigate("/mypage");
    }
  }, []);

  return (
    <Layout>
      <Header />
      <SetToDoContainer />
      <Footer />
    </Layout>
  );
}

export default SetUpTodo;
