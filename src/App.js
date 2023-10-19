import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Sub from "./Sub";

function App() {
  const [users, setUsers] = useState([{ id: 5, name: "기존배열" }]);

  const download = () => {
    let sample = [
      { id: 1, name: "배열1" },
      { id: 2, name: "배열2" },
      { id: 3, name: "배열3" },
      { id: 4, name: "배열4" },
    ];
  };

  setUsers([...users, ...sample]);

  return (
    <div className="App">
      <div></div>
    </div>
  );
}

export default App;
