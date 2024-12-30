import React from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { UserdataTs } from 'src/model/User';
import {
  AgreeCheckSpan1,
  AgreeMainStyled,
  AgreeStyled,
  Agree_check,
} from 'src/styledcomponents/JoinForm.styled';

interface Join2ComponentsProps {
  member: UserdataTs;
  datain: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setLastaddes1: (e: React.ChangeEvent<HTMLInputElement>) => void;
  idcheckok: boolean;
  idcheck: (mid: string) => void;
  EmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  thisEmail: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  Postgo: () => void;
  zipcode: string;
  address: string;
  handleCloseCompleteModal: () => void;
  memberadd1: () => void;
  memberadd2: () => void;
  noadd1: () => void;
  noadd2: () => void;
  gohome: () => void;
  showadd: boolean;
  setShowadd: (showadd: boolean) => void;
  shownoadd: boolean;
  setShownoadd: (showadd: boolean) => void;
  showCompleteModal: boolean;
}

const Join2Components = ({
  member,
  datain,
  setLastaddes1,
  idcheckok,
  idcheck,
  EmailChange,
  thisEmail,
  Postgo,
  zipcode,
  address,
  handleCloseCompleteModal,
  memberadd1,
  memberadd2,
  noadd1,
  noadd2,
  gohome,
  showadd,
  setShowadd,
  shownoadd,
  setShownoadd,
  showCompleteModal,
}: Join2ComponentsProps) => {
  return (
    <>
      <AgreeMainStyled>
        <AgreeStyled>회원가입</AgreeStyled>

        <Agree_check>
          <AgreeCheckSpan1>기본정보 입력</AgreeCheckSpan1>

          <Container className="panel" style={{ marginTop: '10px' }}>
            <Form>
              <Row className="justify-content-center">
                <Col md={7} sm={7} xs={7} className="mb-3">
                  <Form.Control
                    placeholder="아이디"
                    value={member.mid}
                    onChange={datain}
                    name="mid"
                    readOnly={idcheckok}
                  />
                </Col>
                <Col style={{ position: 'relative' }}>
                  <Button
                    variant="secondary"
                    className="mb-0 PupleColorButton1"
                    style={{ top: '0px', position: 'absolute' }}
                    onClick={() => idcheck(member.mid)}
                  >
                    중복체크
                  </Button>
                </Col>
              </Row>

              <Col className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="비밀번호"
                  value={member.mpass}
                  onChange={datain}
                  name="mpass"
                />
              </Col>

              <Col className="mb-3">
                <Form.Control type="password" placeholder="비밀번호 확인" />
              </Col>

              <Col className="mb-3">
                <Form.Control
                  placeholder="이름"
                  value={member.mname}
                  onChange={datain}
                  name="mname"
                />
              </Col>

              <Col
                className="mb-3 d-flex align-items-center"
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

              <Col className="mb-3">
                <Form.Control
                  placeholder="휴대폰 번호"
                  value={member.mnumber}
                  onChange={datain}
                  name="mnumber"
                />
              </Col>

              <Row className="justify-content-center">
                <Col md={7} sm={7} xs={7} className="mb-3">
                  <Form.Control
                    placeholder="우편번호"
                    value={zipcode}
                    readOnly
                  />
                </Col>
                <Col style={{ position: 'relative' }}>
                  <Button
                    onClick={Postgo}
                    variant="secondary"
                    className="mb-0 PupleColorButton1"
                    style={{
                      fontSize: '14px',
                      top: '0px',
                      position: 'absolute',
                    }}
                  >
                    우편번호 찾기
                  </Button>
                </Col>
                <Form.Group>
                  <Col>
                    <Form.Control
                      className="mb-3"
                      placeholder="주소"
                      value={address}
                      readOnly
                    />
                  </Col>
                </Form.Group>
                <Form.Group>
                  <Col>
                    <Form.Control
                      className="mb-3"
                      placeholder="상세주소"
                      onChange={setLastaddes1}
                      name="maddress"
                    />
                  </Col>
                </Form.Group>
                <Col style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    onClick={() => setShowadd(true)}
                    style={{
                      width: '30%',
                      marginTop: '20px',
                      marginRight: '10px',
                    }}
                    variant="primary"
                    className="PupleColorButton1"
                  >
                    회원가입
                  </Button>

                  <Button
                    onClick={() => setShownoadd(true)}
                    style={{ width: '30%', marginTop: '20px' }}
                    variant="warning"
                  >
                    취소
                  </Button>

                  <Modal show={showadd} onHide={() => setShowadd(false)}>
                    <Modal.Body>
                      입력하신 정보로 회원가입 하시겠습니까?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={memberadd1}>
                        네
                      </Button>
                      <Button variant="secondary" onClick={memberadd2}>
                        아니오
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal
                    show={showCompleteModal}
                    onHide={handleCloseCompleteModal}
                  >
                    <Modal.Body>가입이 완료되셨습니다</Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={gohome}>
                        확인
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal show={shownoadd} onHide={() => setShowadd(false)}>
                    <Modal.Body>회원가입 을 취소하시겠습니까?</Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={noadd1}>
                        네
                      </Button>
                      <Button variant="secondary" onClick={noadd2}>
                        아니오
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
              </Row>
            </Form>
          </Container>
        </Agree_check>
      </AgreeMainStyled>
    </>
  );
};

export default Join2Components;
