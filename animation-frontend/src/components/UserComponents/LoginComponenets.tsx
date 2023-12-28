import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import {
  LogingBox,
  LogingButtonBox,
} from 'src/styledcomponents/JoinForm.styled';

interface LoginProps {
  id: string;
  password: string;
  setId: (Id: string) => void;
  setPassword: (Password: string) => void;
  Logingo: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginComponenets = ({
  id,
  password,
  setId,
  setPassword,
  Logingo,
}: LoginProps) => {
  return (
    <>
      <Container>
        <LogingBox>
          <Form style={{ width: '70%' }} onSubmit={Logingo}>
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
                style={{ width: '70%' }}
                className="PupleColorButton1"
              >
                로그인
              </Button>
            </LogingButtonBox>
          </Form>
        </LogingBox>
      </Container>
    </>
  );
};

export default LoginComponenets;
