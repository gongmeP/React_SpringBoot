import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(0);
  const [search, setSearch] = useState(0);

  const download = () => {
    let downloadData = 5;
    setData(downloadData);
  };

  //실행시점 :
  //(1) : app 함수가 최초 마운트 될때
  //(2) : 상태 변수가 변경 될 때 (dependencyList 에 등록되어있을경우.) < search
  useEffect(() => {
    console.log("useEffect 실행됨");
    download();
  }, [search]);
  return (
    <div>
      <button
        onClick={() => {
          setSearch(2);
        }}
      >
        검색하기
      </button>
      <h1>데이터 : {data}</h1>
      <button
        onClick={() => {
          setData(data + 1);
        }}
      >
        더하기
      </button>
    </div>
  );
}

export default App;
