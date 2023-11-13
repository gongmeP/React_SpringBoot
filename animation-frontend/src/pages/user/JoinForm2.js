import React, { useEffect, useState } from 'react';
import {
  AgreeCheckSpan1,
  AgreeMainStyled,
  AgreeStyled,
  Agree_check,
} from '../../styledcomponents/JoinForm.styled';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function JoinForm2() {
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [member, setMember] = useState({
    mid: '',
    mpass: '',
    mname: '',
    memail: '',
    mnumber: '',
    maddress: '',
  });
  const [lastaddes, setLastaddes] = useState('');
  const setLastaddes1 = (e) => {
    const value = e.target.value;
    const fullAddress = `${address} ${value}`;
    setLastaddes(fullAddress);

    setMember({
      ...member,
      maddress: fullAddress,
    });
  };
  const datain = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
    console.log(member);
  };

  const EmailChange = (e) => {
    const value = e.target.value;
    setMember({
      ...member,
      memail: value,
    });
  };

  const thisEmail = (e) => {
    const emailvalue = e.target.value;
    setMember({
      ...member,
      memail: `${member.memail}@${emailvalue}`,
    });
  };

  const Postgo = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setZipcode(data.zonecode);
        setAddress(data.address);
        setMember({
          ...member,
          maddress: `${data.zonecode} ${data.address}`,
        });
      },
    }).open();
  };

  const memberadd = async () => {
    if (member.mid === '') {
      alert('아이디를 입력해주세요.');
      return;
    }
    // if (idcheckok === false) {
    //   alert('아이디 중복을 체크 하셔야합니다.');
    //   return;
    // }
    if (member.mpass === '') {
      alert('패스워드를 입력해주세요.');
      return;
    }
    if (member.mname === '') {
      alert('이름을 입력해주세요.');
      return;
    }
    if (member.memail === '') {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (member.mnumber === '') {
      alert('전화번호를 입력해주세요.');
      return;
    }
    if (member.maddress === '') {
      alert('주소를 입력해주세요.');
      return;
    }

    const res = await axios.post('http://localhost:8080/addMember', member);

    console.log(res.status);
    setShowCompleteModal(true);
  };

  const navigate = useNavigate();

  const [showadd, setShowadd] = useState(false);
  const [shownoadd, setShownoadd] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

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
  const idcheck = async (mid) => {
    if (mid === '') {
      alert('아이디를 입력해주세요');
      return;
    }
    const res = await axios.post('http://localhost:8080/Member/idcheck', mid, {
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
      <AgreeStyled>회원가입</AgreeStyled>

      <Agree_check>
        <AgreeCheckSpan1>기본정보 입력</AgreeCheckSpan1>

        <Container className="panel" style={{ marginTop: '10px' }}>
          <Form>
            <Row className="justify-content-center">
              <Col sm={7}>
                <Form.Control
                  placeholder="아이디"
                  value={member.mid}
                  onChange={datain}
                  name="mid"
                  readOnly={idcheckok}
                />
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  className="mb-0"
                  style={{ verticalAlign: '15px' }}
                  onClick={() => idcheck(member.mid)}
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
                  value={member.mpass}
                  onChange={datain}
                  name="mpass"
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
                  value={member.mname}
                  onChange={datain}
                  name="mname"
                />
              </Col>
            </Form.Group>

            <Row>
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
            </Row>

            <Form.Group className="mb-3">
              <Col>
                <Form.Control
                  placeholder="휴대폰 번호"
                  value={member.mnumber}
                  onChange={datain}
                  name="mnumber"
                />
              </Col>
            </Form.Group>

            <Row className="justify-content-center">
              <Col sm={7}>
                <Form.Control placeholder="우편번호" value={zipcode} readOnly />
              </Col>
              <Col sm={5}>
                <Button
                  onClick={Postgo}
                  variant="secondary"
                  className="mb-0"
                  style={{ verticalAlign: '15px', fontSize: '14px' }}
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
            </Row>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={() => setShowadd(true)}
                style={{ width: '30%', marginTop: '20px', marginRight: '10px' }}
                variant="primary"
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

              <Modal show={showadd} onHide={setShowadd}>
                <Modal.Body>입력하신 정보로 회원가입 하시겠습니까?</Modal.Body>
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
                <Modal.Body>가입이 완료되셨습니다</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={gohome}>
                    확인
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal show={shownoadd} onHide={setShownoadd}>
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
            </div>
          </Form>
        </Container>
      </Agree_check>
    </AgreeMainStyled>
  );
}

export default JoinForm2;
