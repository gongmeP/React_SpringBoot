import React, { useMemo, useState } from "react";

//useMoemo

function App() {
  const [list, setList] = useState([1, 2, 3, 4]);
  const [str, setStr] = useState("합계");

  const getAddResult = () => {
    let sum = 0;
    list.forEach((i) => (sum = sum + i));
    console.log(sum);
    return sum;
  };

  const addResult = useMemo(() => getAddResult(), [list]);

  const [abc, setAbc] = useState(10);

  return (
    <div>
      <button
        onClick={() => {
          setStr("hellow");
        }}
      >
        문자변경
      </button>
      <button
        onClick={() => {
          setList([...list, abc]);
          setAbc(abc + 10);
        }}
      >
        리스트값 추가
      </button>
      <div>
        {list.map((i) => (
          <h1 key={i}>{i}</h1>
        ))}
      </div>
      <div>
        {str} : {addResult}
      </div>
    </div>
  );
}

export default App;
