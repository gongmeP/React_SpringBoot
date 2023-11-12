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
      <Navbar expand="md" className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            관리자 로그인
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/allList" className="nav-link">
                전체목록
              </Link>
              <Link to="/savaForm" className="nav-link">
                애니메이션추가
              </Link>
              <Link to="/freeBoard" className="nav-link">
                배너추가
              </Link>
              <Link to="/freeBoard" className="nav-link">
                게시판관리
              </Link>
            </Nav>

            <Nav className="">
              {sessionID ? null : (
                <Link
                  to="/joinForm"
                  className="nav-link"
                  style={{ font: '12px' }}
                >
                  관리자 신청
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
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Header;
