import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const gitgo = () => {
  window.location.href = 'https://github.com/gongmeP';
};

const instago = () => {
  window.location.href = 'https://www.instagram.com/jae_kyun.p/';
};

const kakaogo = () => {
  window.location.href = 'https://open.kakao.com/o/sGCtfITf';
};
const Footer: React.FC = () => {
  return (
    <Container fluid className="shadow" style={{ marginTop: '40px' }}>
      <Row
        style={{ width: '80%', margin: '0 auto' }}
        className="justify-content-center align-items-center p-4"
      >
        <Col className="d-flex align-items-center p-0 text-dark">
          <span className="ms-4 h5 mb-0 font-weight-bold">
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
        <small className="ms-4">
          &copy; Portfolio, 2023. All rights reserved.
        </small>
      </Row>
    </Container>
  );
};

export default Footer;
