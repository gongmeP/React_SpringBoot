import React from "react";

//props 받음
function Home(props) {
  console.log(props);
  const boards = props.boards;
  console.log(boards);
  return (
    <>
      <h1>홈페이지 입니다.</h1>
    </>
  );
}

export default Home;
