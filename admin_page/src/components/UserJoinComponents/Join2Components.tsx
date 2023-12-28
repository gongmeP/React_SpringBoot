import React from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { AdmindataTs } from 'src/model/User';
import {
  AgreeCheckSpan1,
  AgreeMainStyled,
  AgreeStyled,
  Agree_check,
} from 'src/styledcomponents/JoinForm.styled';

interface Join2ComponentsProps {
  datain: (e: React.ChangeEvent<HTMLInputElement>) => void;
  idcheckok: boolean;
  idcheck: (mid: string) => void;
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
  Adminmember: AdmindataTs;
  adminrank: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Join2Components = ({
  datain,
  idcheckok,
  idcheck,
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
  Adminmember,
  adminrank,
}: Join2ComponentsProps) => {
  return (
    <>
      <AgreeMainStyled>
        <AgreeStyled>관리자 신청</AgreeStyled>

        <Agree_check>
          <AgreeCheckSpan1>기본정보 입력</AgreeCheckSpan1>

          <Container className="panel" style={{ marginTop: '10px' }}>
            <Form>
              <Row className="justify-content-center">
                <Col sm={7}>
                  <Form.Control
                    placeholder="아이디"
                    value={Adminmember.adminid}
                    onChange={datain}
                    name="adminid"
                    readOnly={idcheckok}
                  />
                </Col>
                <Col>
                  <Button
                    variant="secondary"
                    className="mb-0"
                    style={{ verticalAlign: '15px' }}
                    onClick={() => idcheck(Adminmember.adminid)}
                  >
                    중복체크
                  </Button>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formPlaintextPassword">
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="비밀번호"
                    value={Adminmember.adminpass}
                    onChange={datain}
                    name="adminpass"
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formPlaintextPasswordConfirm"
              >
                <Col>
                  <Form.Control type="password" placeholder="비밀번호 확인" />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3">
                <Col>
                  <Form.Control
                    placeholder="이름"
                    value={Adminmember.adminname}
                    onChange={datain}
                    name="adminname"
                  />
                </Col>
              </Form.Group>

              <Col className="mb-3 " controlId="formPlaintextemail">
                <Form.Control
                  style={{ marginRight: '10px' }}
                  placeholder="사내 이메일주소"
                  value={Adminmember.adminemail}
                  onChange={datain}
                  name="adminemail"
                />
              </Col>

              <Row>
                <Col
                  className="mb-3 d-flex align-items-center"
                  controlId="formPlaintextemail"
                >
                  <Form.Control
                    style={{ marginRight: '10px' }}
                    placeholder="소속 (ex: IT 개발실 )"
                    value={Adminmember.admindepartment}
                    onChange={datain}
                    name="admindepartment"
                  />

                  <Form.Select style={{ width: '50%' }} onChange={adminrank}>
                    <option>직급을 선택하세요</option>
                    <option>매니저</option>
                    <option>팀장</option>
                    <option>실장</option>
                    <option>임원</option>
                    <option>외부관리자</option>
                  </Form.Select>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Col>
                  <Form.Control
                    placeholder="휴대폰 번호"
                    value={Adminmember.adminnumber}
                    onChange={datain}
                    name="adminnumber"
                  />
                </Col>
              </Form.Group>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  onClick={() => setShowadd(true)}
                  style={{
                    width: '30%',
                    marginTop: '20px',
                    marginRight: '10px',
                  }}
                  variant="primary"
                >
                  관리자 신청
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
                    입력하신 정보로 관리자 신청 하시겠습니까?
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
                  <Modal.Body>신청이 완료되셨습니다</Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={gohome}>
                      확인
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal show={shownoadd} onHide={() => setShowadd(false)}>
                  <Modal.Body>관리자 신청 을 취소하시겠습니까?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={noadd1}>
                      네
                    </Button>
                    <Button variant="secondary" onClick={noadd2}>
                      아니오
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Form>
          </Container>
        </Agree_check>
      </AgreeMainStyled>
    </>
  );
};

export default Join2Components;
