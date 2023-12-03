import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const sessionID: string | null = window.sessionStorage.getItem('loginID');

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
                <div
                  onClick={logoutgo}
                  className="nav-link"
                  style={{ font: '12px', cursor: 'pointer' }}
                >
                  로그아웃
                </div>
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
};

export default Header;
