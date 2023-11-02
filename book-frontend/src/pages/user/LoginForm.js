import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const Logingo = (e) => {
    e.preventDefault();
    const data = { mid: id, mpass: password };
    fetch('http://localhost:8080/Member/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        if (res.loginID != null) {
          window.sessionStorage.setItem('loginID', res.loginID);
          window.sessionStorage.setItem('loginUsername', res.loginUsername);

          alert('로그인 되셨습니다');
          // navigate('/');
        } else {
          alert('아이디 및 패스워드 를 다시 확인해주세요');
          navigate('/loginForm');
        }
      });
  };

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center">
        <Form style={{ width: '80%' }} onSubmit={Logingo}>
          <h2 className="text-center mb-4">회원 로그인</h2>
          <Form.Group controlId="text" className="mb-4">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="text"
              placeholder="아이디를 입력하세요"
              value={id}
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
            <Button variant="primary" type="submit" style={{ width: '80%' }}>
              로그인
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
