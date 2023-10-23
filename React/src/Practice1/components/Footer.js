import React from "react";
import styled from "styled-components";

//하나의 컴포넌트 생성 (재사용)

//styled-components > js 와 css 파일 관리 편함

const StyledFooterDiv = styled.div`
  border: 1px solid black;
  height: 300px;
`;

function Footer() {
  return (
    <>
      <StyledFooterDiv>
        <ul>
          <li>오시는길 : 서울 종로구 .. 123123</li>
          <li>전화번호 : 010 123123</li>
        </ul>
      </StyledFooterDiv>
    </>
  );
}

export default Footer;
