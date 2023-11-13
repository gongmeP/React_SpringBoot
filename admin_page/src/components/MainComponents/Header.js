import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  const sessionID = window.sessionStorage.getItem('loginID');

  const logoutgo = () => {
    sessionStorage.clear();
    alert('로그아웃 되었습니다.');
    window.location.href = '/';
  };

  console.log(sessionID);

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          {sessionID ? (
            <Link
              onClick={logoutgo}
              className="navbar-brand"
              style={{ font: '12px' }}
            >
              로그아웃
            </Link>
          ) : (
            <Link to="/" className="navbar-brand">
              관리자 로그인
            </Link>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {sessionID ? (
              <Nav className="me-auto">
                <Link to="/allList" className="nav-link">
                  전체목록
                </Link>
                <Link to="/savaForm" className="nav-link">
                  애니메이션추가
                </Link>
                <Link to="/userlist" className="nav-link">
                  회원관리
                </Link>
                <Link to="/freeBoard" className="nav-link">
                  게시판관리
                </Link>
              </Nav>
            ) : null}
            <Nav className="">
              <Link
                to="/joinForm"
                className="nav-link"
                style={{ font: '12px' }}
              >
                관리자 신청
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Header;