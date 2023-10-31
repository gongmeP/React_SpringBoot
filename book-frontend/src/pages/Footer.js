import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container fluid className="shadow" style={{ marginTop: '40px' }}>
      <Row
        style={{ width: '80%', margin: '0 auto' }}
        className="justify-content-center align-items-center p-4"
      >
        <Col className="d-flex align-items-center p-0 text-dark">
          <span className="ms-4 h5 mb-0 font-weight-bold">Footer</span>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="light" className="p-2">
            <i className="fab fa-facebook-f"></i>
          </Button>
          <Button variant="light" className="mx-3 p-2">
            <i className="fab fa-twitter"></i>
          </Button>
          <Button variant="light" className="p-2">
            <i className="fab fa-instagram"></i>
          </Button>
        </Col>
        <small className="ms-2">
          &copy; Footer, 2023. All rights reserved.
        </small>
      </Row>
    </Container>
  );
};

export default Footer;
