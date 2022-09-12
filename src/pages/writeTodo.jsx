import React from "react";
import Layout from "../layout/layout";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import WriteTodoForm from "../components/features/todo/WriteTodoForm";

const WriteTodo = () => {
  return (
    <Layout>
      <Header />
      <WriteTodoForm/>
      <Footer />
    </Layout>
  );
};

export default WriteTodo;
