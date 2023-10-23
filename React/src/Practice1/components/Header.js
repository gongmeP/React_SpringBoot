import React from "react";
import {
  Button,
  Form,
  FormControl,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

//하나의 컴포넌트 생성 (재사용)

//styled-components > js 와 css 파일 관리 편함
const StyledHeaderDiv = styled.div`
  border: 1px solid black;
  height: 300px;
  background-color: ${(props) => props.backgroundColor};
`;

const StyleHeadLink = styled(Link)`
  color: red;
`;

function Header() {
  return (
    <>
      {/* <StyledHeaderDiv backgroundColor={"blue"}>
        <ul>
          <li>
            <StyleHeadLink to="/">홈</StyleHeadLink>
          </li>
          <li>
            <StyleHeadLink to="/login/10">로그인</StyleHeadLink>
          </li>
        </ul>
      </StyledHeaderDiv> */}
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="nav-link">
                홈
              </Link>
              <Link to="/login/bootlogin" className="nav-link">
                로그인
              </Link>
              {/* <Nav.Link href="/">홈</Nav.Link>
              <Nav.Link href="/login">로그인</Nav.Link> */}
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </>
    </>
  );
}

export default Header;
