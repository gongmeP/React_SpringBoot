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
  const [id, setId] = useState<string>('Alladmin');
  const [password, setPassword] = useState<string>('Alladmin');

  const Logingo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { adminid: id, adminpass: password };

    const res = await axiosAPI.post('/Admin/login', data);

    if (res.data.loginID != null && res.data.AdminApproval === 'n') {
      store.dispatch(loginSuccess(res.data.loginID, res.data.loginUsername));
      window.sessionStorage.setItem('loginID', res.data.loginID);
      window.sessionStorage.setItem('loginUsername', res.data.loginUsername);

      alert('로그인 되셨습니다');
      window.location.href = '/allList';
    } else if (res.data.AdminApproval === 'y') {
      alert('관리자 승인 대기 상태입니다. 승인 완료 후 다시 로그인해주세요.');
    } else {
      alert('아이디 및 패스워드 를 다시 확인해주세요');
    }
  };

  return (
    <Container>
      <LogingBox>
        <Form style={{ width: '80%' }} onSubmit={Logingo}>
          <h2 className="text-center mb-4">관리자 로그인</h2>
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
            <Button variant="primary" type="submit" style={{ width: '80%' }}>
              로그인
            </Button>
          </LogingButtonBox>
        </Form>
      </LogingBox>
    </Container>
  );
};

export default Login;
