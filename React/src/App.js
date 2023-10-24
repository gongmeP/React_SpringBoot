import React, { useState } from "react";
import Top from "./Redux/components/Top";
import "./App.css";
import Bottom from "./Redux/components/Bottom";

function App() {
  return (
    <div className="container">
      <h1>최상단 화면</h1>
      <Top></Top>
      <Bottom></Bottom>
    </div>
  );
}

export default App;
