import React from "react";
import { useSelector } from "react-redux";

function Top() {
  const { number, user } = useSelector((store) => store);

  return (
    <div className="sub_container">
      <h1>Top</h1>
      번호 : {number}
      이름 : {user.username}
    </div>
  );
}

export default Top;
