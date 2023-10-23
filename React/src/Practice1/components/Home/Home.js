import { Button } from "react-bootstrap";
import React from "react";
import styled from "styled-components";

const StyledDeleteButton = styled.button`
  color: ${(props) => (props.user.username === "ssar" ? "blue" : "red")};
`;

//스타일 확장 , 위에 코드 상속 받은 후 배경색 추가
const StyledAddButton = styled(StyledDeleteButton)`
  background-color: green;
`;

//props 받음
function Home(props) {
  //구조분할 할당
  const { boards, setBoards, number, setNumber, user } = props;

  return (
    <>
      <Button variant="primary">Primary</Button>
      <h1>홈 : {number} </h1>
      <StyledAddButton user={user}>더하기</StyledAddButton>
      <button onClick={() => setNumber(number + 1)}>번호증가</button>
      <StyledDeleteButton user={user} onClick={() => setBoards([])}>
        전체삭제
      </StyledDeleteButton>
      {boards.map((boards) => (
        <h3>
          제목 : {boards.title} 내용 : {boards.contents};
        </h3>
      ))}
    </>
  );
}

export default Home;
