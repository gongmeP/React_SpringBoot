import "./App.css";
import { useState } from "react";
import Sub from "./Sub";

function App() {
  const sample = [
    { id: 1, name: "배열1" },
    { id: 2, name: "배열2" },
    { id: 3, name: "배열3" },
    { id: 4, name: "배열4" },
  ];

  const [num, setNum] = useState(5);

  const [users, setUsers] = useState(sample);

  const download = () => {
    setUsers([...users, { id: num, name: "배열" + num + "" }]);
    setNum(num + 1);
  };

  return (
    <div className="App">
      <button onClick={download}>다운로드</button>
      {users.map((u) => (
        <h1>
          {u.id},{u.name}
        </h1>
      ))}
      <Sub />
    </div>
  );
}

export default App;
