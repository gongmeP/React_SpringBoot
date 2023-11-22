import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import {
  UserColStyled,
  UserRowStyled,
} from '../../styledcomponents/UserUpdateForm.styled';
import axiosAPI from '../../axiosAPI';

function UserPasswordChange({ show, setShow, password }) {
  const mid = window.sessionStorage.getItem('loginID');
  const Close = () => {
    alert('비밀번호 변경을 취소하셨습니다.');
    setShow(false);
    setRePassword({
      mpass: '',
      newpass: '',
      newpass2: '',
    });
  };
  const Show = () => setShow(true);
  const [RePassword, setRePassword] = useState({
    mpass: '',
    newpass: '',
    newpass2: '',
  });

  const passin = (e) => {
    setRePassword({ ...RePassword, [e.target.name]: e.target.value });
  };

  const Changego = async (e) => {
    e.preventDefault();
    const res = await axiosAPI.post('/Member/PasswordCheck', {
      mid: mid,
      mpass: RePassword.mpass,
    });
    if (
      RePassword.mpass === '' ||
      RePassword.newpass === '' ||
      RePassword.newpass2 === ''
    ) {
      alert('현재 비밀번호 혹은 새 비밀번호를 입력해주세요.');
      return;
    }

    if (res.data === '현재 비번 불일치') {
      alert('현재 비밀번호가 일치 하지 않습니다.');
      return;
    } else if (RePassword.newpass !== RePassword.newpass2) {
      alert('새 비밀번호가 서로 일치하지 않습니다.');
      return;
    }
    const res2 = await axiosAPI.post('/Member/PasswordChange', {
      mid: mid,
      mpass: RePassword.newpass,
    });

    if (res2.data === '비밀번호 변경 성공') {
      alert('비밀번호가 변경되었습니다.');
      setShow(false);
    }
  };
  return (
    <>
      <Modal show={show} onHide={Show}>
        <Form onSubmit={Changego}>
          <Modal.Header>
            <Modal.Title>비밀번호 변경</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserRowStyled>
              <UserColStyled xs={4}>현재 비밀번호 입력</UserColStyled>
              <Col>
                <Form.Control
                  onChange={passin}
                  name="mpass"
                  type="password"
                ></Form.Control>
              </Col>
            </UserRowStyled>
            <UserRowStyled>
              <Col xs={4}>새 비밀번호 입력</Col>
              <Col>
                <Form.Control
                  onChange={passin}
                  name="newpass"
                  type="password"
                ></Form.Control>
              </Col>
            </UserRowStyled>
            <UserRowStyled>
              <Col xs={4}>새 비밀번호 확인</Col>
              <Col>
                <Form.Control
                  onChange={passin}
                  name="newpass2"
                  type="password"
                ></Form.Control>
              </Col>
            </UserRowStyled>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn_close"
              variant="secondary"
              onClick={Changego}
              type="submit"
            >
              확인
            </Button>
            <Button className="btn_close" variant="secondary" onClick={Close}>
              닫기
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default UserPasswordChange;
