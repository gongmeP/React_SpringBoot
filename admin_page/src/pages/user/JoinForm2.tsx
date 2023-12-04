import React, { useEffect, useState } from 'react';
import {
  AgreeCheckSpan1,
  AgreeMainStyled,
  AgreeStyled,
  Agree_check,
} from '../../styledcomponents/JoinForm.styled';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosAPI from '../../axiosAPI';
import { AdmindataTs } from 'src/model/User';

const JoinForm2 = () => {
  const [Adminmember, setAdminMember] = useState<AdmindataTs>({
    adminid: '',
    adminpass: '',
    adminname: '',
    adminemail: '',
    adminnumber: '',
    admindepartment: '',
    adminrank: '',
    approval: 'n',
    iddelete: 'n',
  });

  const datain = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminMember({ ...Adminmember, [e.target.name]: e.target.value });
  };

  const adminrank = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setAdminMember({
      ...Adminmember,
      adminrank: value,
    });
  };

  const memberadd = async () => {
    if (Adminmember.adminid === '') {
      alert('아이디를 입력해주세요.');
      return;
    }
    if (idcheckok === false) {
      alert('아이디 중복을 체크 하셔야합니다.');
      return;
    }
    if (Adminmember.adminpass === '') {
      alert('패스워드를 입력해주세요.');
      return;
    }
    if (Adminmember.adminname === '') {
      alert('이름을 입력해주세요.');
      return;
    }
    if (Adminmember.adminemail === '') {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (Adminmember.adminnumber === '') {
      alert('전화번호를 입력해주세요.');
      return;
    }
    if (Adminmember.admindepartment === '') {
      alert('소속을 입력해주세요.');
      return;
    }

    if (Adminmember.adminrank === '') {
      alert('직급을 선택 해주세요.');
      return;
    }

    const res = await axiosAPI.post('/addAdmin', Adminmember);

    setShowCompleteModal(true);
  };

  const navigate = useNavigate();

  const [showadd, setShowadd] = useState<boolean>(false);
  const [shownoadd, setShownoadd] = useState<boolean>(false);
  const [showCompleteModal, setShowCompleteModal] = useState<boolean>(false);

  const handleCloseCompleteModal = () => {
    setShowCompleteModal(false);
  };
  const memberadd1 = () => {
    setShowadd(false);
    memberadd();
  };

  const memberadd2 = () => {
    setShowadd(false);
  };

  const noadd1 = () => {
    navigate('/');
  };

  const noadd2 = () => {
    setShownoadd(false);
  };

  const gohome = () => {
    navigate('/');
  };
  const [idcheckok, setIdcheckok] = useState(false);
  const idcheck = async (adminid: string) => {
    if (adminid === '') {
      alert('아이디를 입력해주세요');
      return;
    }
    const res = await axiosAPI.post('/Admin/idcheck', adminid, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });

    if (res.data === '아이디를 사용할 수 있습니다.') {
      alert(res.data);
      setIdcheckok(true);
    } else {
      setIdcheckok(false);
      alert(res.data);
    }
  };

  return (
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
                style={{ width: '30%', marginTop: '20px', marginRight: '10px' }}
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

              <Modal show={showCompleteModal} onHide={handleCloseCompleteModal}>
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
  );
};

export default JoinForm2;
