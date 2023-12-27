import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import store from '../../Redux/store';
import { loginSuccess } from '../../Redux/LoginAction';
import axiosAPI from '../../axiosAPI';
import {
  LogingBox,
  LogingButtonBox,
} from 'src/styledcomponents/JoinForm.styled';

const Login = () => {
  const [id, setId] = useState<string>('test1');
  const [password, setPassword] = useState<string>('testtest1');

  const Logingo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { mid: id, mpass: password };
    const res = await axiosAPI.post('/Member/login', data);
    if (res.data.loginID != null) {
      store.dispatch(loginSuccess(res.data.loginID, res.data.loginUsername));
      window.sessionStorage.setItem('loginID', res.data.loginID);
      window.sessionStorage.setItem('loginUsername', res.data.loginUsername);

      alert('어서오세요! 로그인이 완료되었습니다.');
      window.location.href = '/';
    } else {
      alert('아이디 또는 비밀번호를 잘못 입력했습니다.');
    }
  };

  return (
    <Container>
      <LogingBox>
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
          <LogingButtonBox>
            <Button
              variant="primary"
              type="submit"
              style={{ width: '80%' }}
              className="PupleColorButton1"
            >
              로그인
            </Button>
          </LogingButtonBox>
        </Form>
      </LogingBox>
    </Container>
  );
};

export default Login;
