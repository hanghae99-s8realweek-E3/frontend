import React from "react";
import { useNavigate } from "react-router-dom";
import StartContainer from "../components/features/welcomePage/StartContainer";
import Layout from "../layout/layout";

function WelcomePage() {
  const firstEnterCheck = window.localStorage.getItem("firstEnter");
  const navigate = useNavigate();

  if (firstEnterCheck !== null) {
    navigate("/");
  }

  return (
    <Layout>
      <StartContainer />
    </Layout>
  );
}

export default WelcomePage;
