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
  const sessionID = window.sessionStorage.getItem('loginID');

  const logoutgo = () => {
    sessionStorage.clear();
    alert('로그아웃 되었습니다.');
    window.location.href = '/';
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            홈
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/daily" className="nav-link">
                요일별 신작
              </Link>
              <Link to="/savaForm" className="nav-link">
                글쓰기
              </Link>
              <Link to="/freeBoard" className="nav-link">
                자유게시판
              </Link>
            </Nav>
            <Form inline>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="검색어를 입력하세요."
                    className=" mr-sm-2"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">검색</Button>
                </Col>
              </Row>
            </Form>
            <Nav className="">
              {sessionID ? (
                <Link className="nav-link" style={{ font: '12px' }}>
                  {sessionID}님
                </Link>
              ) : (
                <Link
                  to="/joinForm"
                  className="nav-link"
                  style={{ font: '12px' }}
                >
                  회원가입
                </Link>
              )}
              {sessionID ? (
                <Link
                  onClick={logoutgo}
                  className="nav-link"
                  style={{ font: '12px' }}
                >
                  로그아웃
                </Link>
              ) : (
                <Link
                  to="/loginForm"
                  className="nav-link"
                  style={{ font: '12px' }}
                >
                  로그인
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Header;
