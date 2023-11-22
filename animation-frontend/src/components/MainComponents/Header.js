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
  const sessionUsername = window.sessionStorage.getItem('loginUsername');

  const logoutgo = () => {
    sessionStorage.clear();
    alert('로그아웃 되었습니다.');
    window.location.href = '/';
  };

  return (
    <>
      <Navbar expand="md" className="MainNavber" data-bs-theme="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            홈
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/allList" className="nav-link">
                장르검색
              </Link>
              <Link to="/dailyAniList" className="nav-link">
                요일별 신작
              </Link>
              <Link to="/freeBoard" className="nav-link">
                자유게시판
              </Link>
            </Nav>

            <Nav className="">
              {sessionID ? (
                <>
                  <Link
                    to="/mypage"
                    className="nav-link"
                    style={{ font: '12px' }}
                  >
                    마이페이지
                  </Link>
                </>
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
