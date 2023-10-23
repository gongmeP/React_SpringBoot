import React, { createRef, useRef, useState } from "react";

function App() {
  const myRef = useRef(null);

  const [list, setList] = useState([
    { id: 1, name: "배열1" },
    { id: 2, name: "배열2" },
  ]);

  const myRefs = list.map(() => createRef());

  return (
    <div>
      <button
        onClick={() => {
          console.log(myRef);
          console.log(myRef.current);
          // myRef의 경우
          myRef.current.style.backgroundColor = "red";

          // myRefs 배열을 순회하면서 DOM 요소에 접근
          myRefs.forEach((ref) => {
            console.log(ref);
            console.log(ref.current);
            if (ref.current) {
              ref.current.style.backgroundColor = "red";
            }
          });
        }}
      >
        색변경
      </button>
      <div ref={myRef}>박스</div>
      {list.map((user, index) => (
        <h1 ref={myRefs[index]} key={user.id}>
          {user.name}
        </h1>
      ))}
    </div>
  );
}

export default App;
