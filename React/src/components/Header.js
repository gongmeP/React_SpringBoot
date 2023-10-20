import React from "react";
import styled from "styled-components";

//하나의 컴포넌트 생성 (재사용)

//styled-components > js 와 css 파일 관리 편함
const StyledHeaderDiv = styled.div`
  border: 1px solid black;
  height: 300px;
`;

function Header() {
  return (
    <>
      <StyledHeaderDiv>
        <ul>
          <li>메뉴1</li>
          <li>메뉴2</li>
        </ul>
      </StyledHeaderDiv>
    </>
  );
}

export default Header;
