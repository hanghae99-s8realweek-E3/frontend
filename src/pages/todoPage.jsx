import React from "react";
import WriteTodo from "../components/features/todo/WriteTodo";
import Layout from "../layout/layout";
import Footer from "../components/common/footer";
import Header from "../components/common/header";

const TodoPage = () => {
  return (
    <Layout>
      <Header />
      <WriteTodo/>
      <Footer />
    </Layout>
  );
};

export default TodoPage;
