import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
  const [Id, setId] = useState('');
  const [password, setPassword] = useState('');

  const Logingo = () => {};

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center">
        <Form style={{ width: '80%' }}>
          <h2 className="text-center mb-4">회원 로그인</h2>
          <Form.Group controlId="email" className="mb-4">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="email"
              placeholder="아이디를 입력하세요"
              value={Id}
              onChange={(e) => setId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-5">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              type="button"
              onClick={Logingo}
              style={{ width: '80%' }}
            >
              로그인
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
