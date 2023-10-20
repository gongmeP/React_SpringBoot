import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../components/Home/Home";

function HomePage() {
  //http 요청은 페이지에서 하는거 권장
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    let data = [
      { id: 1, title: "제목1", contents: "내용2" },
      { id: 2, title: "제목2", contents: "내용2" },
      { id: 3, title: "제목3", contents: "내용3" },
    ];

    setBoards([...data]);
  }, []);

  return (
    <>
      <Header />
      <Home boards={boards} />
      <Footer />
    </>
  );
}

export default HomePage;
