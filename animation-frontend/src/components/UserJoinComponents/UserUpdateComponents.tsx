import React from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';
import {
  AgreeCheckSpan1,
  AgreeMainStyled,
  Agree_check,
} from 'src/styledcomponents/JoinForm.styled';
import {
  UserColStyled,
  UserRowStyled,
} from 'src/styledcomponents/UserUpdateForm.styled';
import UserPasswordChange from '../MyPageComponents/UserPasswordChange';
import { UserdataTs } from 'src/model/User';

interface UserUpdateComponentsProps {
  member: UserdataTs;
  datain: (e: React.ChangeEvent<HTMLInputElement>) => void;
  PasswordChange: () => void;
  show: boolean;
  setShow: (showadd: boolean) => void;
  EmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  thisEmail: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  Postgo: () => void;
  zipcode: string;
  address: string;
  lastaddress: string;
  setLastaddes1: (e: React.ChangeEvent<HTMLInputElement>) => void;
  backback: () => void;
  UpdateMember: () => void;
}

const UserUpdateComponents = ({
  member,
  datain,
  PasswordChange,
  show,
  setShow,
  EmailChange,
  thisEmail,
  Postgo,
  zipcode,
  address,
  lastaddress,
  setLastaddes1,
  backback,
  UpdateMember,
}: UserUpdateComponentsProps) => {
  return (
    <>
      <AgreeMainStyled>
        <Agree_check>
          <AgreeCheckSpan1>회원 정보 수정</AgreeCheckSpan1>
          <Container className="panel" style={{ marginTop: '10px' }}>
            <Form>
              <UserRowStyled>
                <UserColStyled md={2} sm={3} xs={3}>
                  아이디
                </UserColStyled>
                <Col>
                  <Form.Control
                    value={member.mid}
                    onChange={datain}
                    name="mid"
                    placeholder="아이디"
                    readOnly
                  />
                </Col>
              </UserRowStyled>

              <UserRowStyled>
                <UserColStyled md={2} sm={3} xs={3}>
                  비밀번호
                </UserColStyled>
                <Col md={6} sm={5} xs={4}>
                  <Form.Control
                    placeholder="비밀번호"
                    type="password"
                    value={member.mpass}
                    onChange={datain}
                    name="mpass"
                    readOnly
                  />
                </Col>
                <Col>
                  <Button
                    onClick={PasswordChange}
                    variant="secondary"
                    className="mb-0 PupleColorButton1"
                    style={{
                      fontSize: '14px',
                      verticalAlign: '6px',
                    }}
                  >
                    비밀번호 변경
                  </Button>
                  <UserPasswordChange
                    show={show}
                    setShow={setShow}
                  ></UserPasswordChange>
                </Col>
              </UserRowStyled>

              <UserRowStyled>
                <UserColStyled md={2} sm={3} xs={3}>
                  이름
                </UserColStyled>
                <Col>
                  <Form.Control
                    placeholder="이름"
                    value={member.mname}
                    onChange={datain}
                    name="mname"
                  />
                </Col>
              </UserRowStyled>
              <UserRowStyled>
                <UserColStyled md={2} sm={3} xs={3}>
                  이메일
                </UserColStyled>
                <Col
                  className="d-flex align-items-center"
                  controlId="formPlaintextemail"
                >
                  <Form.Control
                    style={{ marginRight: '10px' }}
                    placeholder="이메일"
                    value={member.memail}
                    onChange={EmailChange}
                    name="memail"
                  />
                  <Form.Select onChange={thisEmail} style={{ width: '50%' }}>
                    <option>직접입력</option>
                    <option>google.com</option>
                    <option>naver.com</option>
                    <option>daum.net</option>
                    <option>nate.com</option>
                    <option>hanmail.net</option>
                  </Form.Select>
                </Col>
              </UserRowStyled>

              <UserRowStyled>
                <UserColStyled md={2} sm={3} xs={3}>
                  전화번호
                </UserColStyled>
                <Col>
                  <Form.Control
                    placeholder="휴대폰 번호"
                    value={member.mnumber}
                    onChange={datain}
                    name="mnumber"
                  />
                </Col>
              </UserRowStyled>

              <UserRowStyled>
                <UserColStyled md={2} sm={3} xs={3}>
                  주소
                </UserColStyled>
                <Col md={6} sm={5} xs={4}>
                  <Form.Control
                    placeholder="우편번호"
                    value={zipcode}
                    readOnly
                  />
                </Col>
                <Col>
                  <Button
                    onClick={Postgo}
                    variant="secondary"
                    className="mb-0 PupleColorButton1"
                    style={{
                      fontSize: '14px',
                      verticalAlign: '6px',
                    }}
                  >
                    우편번호 변경
                  </Button>
                </Col>
              </UserRowStyled>
              <UserRowStyled>
                <UserColStyled md={2} sm={3} xs={3}></UserColStyled>
                <Col>
                  <Form.Control placeholder="주소" value={address} readOnly />
                </Col>
              </UserRowStyled>
              <UserRowStyled>
                <UserColStyled md={2} sm={3} xs={3}></UserColStyled>
                <Col>
                  <Form.Control
                    placeholder="상세주소"
                    onChange={setLastaddes1}
                    name="maddress"
                    value={lastaddress}
                  />
                </Col>
              </UserRowStyled>
              <Col style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  style={{
                    width: '30%',
                    marginTop: '20px',
                    marginRight: '10px',
                  }}
                  variant="primary"
                  className="PupleColorButton1"
                  onClick={UpdateMember}
                >
                  회원수정
                </Button>
                <Button
                  style={{ width: '30%', marginTop: '20px' }}
                  variant="warning"
                  onClick={backback}
                >
                  취소
                </Button>
              </Col>
            </Form>
          </Container>
        </Agree_check>
      </AgreeMainStyled>
    </>
  );
};

export default UserUpdateComponents;
