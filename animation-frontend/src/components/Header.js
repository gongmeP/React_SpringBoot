import React from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            홈
          </Link>
          <Nav className="me-auto">
            <Link to="/daily" className="nav-link">
              요일별 신작
            </Link>
            <Link to="/savaForm" className="nav-link">
              글쓰기
            </Link>
            <Link to="/board" className="nav-link">
              자유게시판
            </Link>
          </Nav>
          <Form inline>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
          <Nav className="">
            <Link to="/joinForm" className="nav-link" style={{ font: '12px' }}>
              회원가입
            </Link>
            <Link to="/loginForm" className="nav-link" style={{ font: '12px' }}>
              로그인
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Header;
