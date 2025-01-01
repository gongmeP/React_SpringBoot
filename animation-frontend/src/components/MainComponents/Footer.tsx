import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/Redux/store';

const Footer: React.FC = () => {
  const gitgo = () => {
    window.location.href = 'https://github.com/gongmeP';
  };

  const instago = () => {
    window.location.href = 'https://www.instagram.com/jae_kyun.p/';
  };

  const kakaogo = () => {
    window.location.href = 'https://open.kakao.com/o/sGCtfITf';
  };
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const dispatch = useDispatch();
  const darkTF = useSelector((state: RootState) => state.DailyState.dark);

  const toggleDarkMode = () => {
    dispatch({ type: 'setDark', payload: !darkTF }); // 다크 모드 상태를 Redux에 디스패치
  };
  return (
    <Container fluid className="shadow" style={{ marginTop: '40px' }}>
      <Row
        style={{ width: '80%', margin: '0 auto' }}
        className="justify-content-center align-items-center p-4"
      >
        <Col className="d-flex align-items-center p-0 text-dark">
          <span
            className="ms-5 h5 mb-0 font-weight-bold"
            style={{ color: darkTF ? 'white' : 'black' }}
          >
            Park Jae Kyun Portfolio
          </span>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="light" className="p-2">
            <i className="fab fa-github" onClick={gitgo}></i>
          </Button>
          <Button variant="light" className="mx-3 p-2">
            <i className="fa-solid fa-comments" onClick={kakaogo}></i>
          </Button>
          <Button variant="light" className="p-2">
            <i className="fab fa-instagram" onClick={instago}></i>
          </Button>
        </Col>
        <Col className="d-flex justify-content-end">
          <button
            onClick={toggleDarkMode}
            className={`btn btn-outline-${darkTF ? 'light' : 'dark'} ms-3`}
          >
            {darkTF ? '라이트 모드' : '다크 모드'}
          </button>
        </Col>

        <small className="ms-5">
          &copy; Portfolio, 2025. All rights reserved.
        </small>
      </Row>
    </Container>
  );
};

export default Footer;
