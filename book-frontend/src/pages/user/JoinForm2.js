import React, { useEffect, useState } from 'react';
import {
  AgreeCheckSpan1,
  AgreeMainStyled,
  AgreeStyled,
  Agree_check,
} from '../../styledcomponents/JoinForm.styled';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

function JoinForm2() {
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [emailvalue, setEmailvalue] = useState('');
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

  const memberadd = (e) => {
    // if (member.mid == '') {
    //   alert('아이디를 입력해주세요.');
    //   return;
    // }
    // if (member.mpass == '') {
    //   alert('패스워드를 입력해주세요.');
    //   return;
    // }
    // if (member.mid == '') {
    //   alert('아이디를 입력해주세요.');
    //   return;
    // }
    // if (member.mname == '') {
    //   alert('이름을 입력해주세요.');
    //   return;
    // }
    // if (member.memail == '') {
    //   alert('이메일을 입력해주세요.');
    //   return;
    // }
    // if (member.mnumber == '') {
    //   alert('전화번호를 입력해주세요.');
    //   return;
    // }
    // if (member.maddress == '') {
    //   alert('주소를 입력해주세요.');
    //   return;
    // }

    e.preventDefault();
    fetch('http://localhost:8080/addMember', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(member),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        console.log(2, res);
      });
  };

  return (
    <AgreeMainStyled>
      <AgreeStyled>회원가입</AgreeStyled>

      <Agree_check>
        <AgreeCheckSpan1>2. 기본정보</AgreeCheckSpan1>

        <Container className="panel" style={{ marginTop: '10px' }}>
          <Form>
            <Row className="justify-content-center">
              <Col md={8}>
                <Form.Control
                  placeholder="아이디"
                  value={member.mid}
                  onChange={datain}
                  name="mid"
                />
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  className="mb-0"
                  style={{ verticalAlign: '15px' }}
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
                className="mb-2 d-flex align-items-center"
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
              <Col md={8}>
                <Form.Control placeholder="우편번호" value={zipcode} readOnly />
              </Col>
              <Col>
                <Button
                  onClick={Postgo}
                  variant="secondary"
                  className="mb-0"
                  style={{ verticalAlign: '15px' }}
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
                onClick={memberadd}
                style={{ width: '30%', marginTop: '20px', marginRight: '10px' }}
                variant="warning"
              >
                회원가입
              </Button>
              <Button
                onClick={''}
                style={{ width: '30%', marginTop: '20px' }}
                variant="primary"
              >
                취소
              </Button>
            </div>
          </Form>
        </Container>
      </Agree_check>
    </AgreeMainStyled>
  );
}

export default JoinForm2;
