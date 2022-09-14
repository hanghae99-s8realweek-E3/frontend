import React from "react";
import { useNavigate } from "react-router-dom";
import StartContainer from "../components/features/welcomePage/StartContainer";
import Layout from "../layout/layout";
import { getCookie } from "../utils/cookie";

function WelcomePage() {
  const firstEnterCheck = getCookie("firstEnter");
  const navigate = useNavigate();

  if (firstEnterCheck !== undefined) {
    navigate("/");
  }

  return (
    <Layout>
      <StartContainer />
    </Layout>
  );
}

export default WelcomePage;
