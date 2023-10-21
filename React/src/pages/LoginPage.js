import React from "react";
import Login from "../components/Login/Login";

import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const goBack = () => {
    // navigate(-1); // 뒤로가기
    navigate("/"); // 루트 경로로 이동
  };

  return (
    <>
      <button onClick={goBack}>뒤로가기</button>
      <Login />
    </>
  );
}

export default LoginPage;
