import React, { useEffect, useState } from "react";
import Home from "../components/Home/Home";

function HomePage() {
  //http 요청은 페이지에서 하는거 권장
  const [boards, setBoards] = useState([]);

  const [number, setNumber] = useState(0);

  const [user, setUser] = useState({});

  useEffect(() => {
    let data = [
      { id: 1, title: "제목1", contents: "내용2" },
      { id: 2, title: "제목2", contents: "내용2" },
      { id: 3, title: "제목3", contents: "내용3" },
    ];

    setBoards([...data]);
    setUser({ id: 1, username: `ssar` });
  }, []);

  return (
    <>
      <Home
        boards={boards}
        setBoards={setBoards}
        number={number}
        setNumber={setNumber}
        user={user}
      />
    </>
  );
}

export default HomePage;
