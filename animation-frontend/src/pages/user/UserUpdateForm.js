import { useState } from 'react';
import {
  AgreeCheckSpan1,
  AgreeMainStyled,
  Agree_check,
} from '../../styledcomponents/JoinForm.styled';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axiosAPI from '../../axiosAPI';
import {
  UserColStyled,
  UserRowStyled,
} from '../../styledcomponents/UserUpdateForm.styled';

function UserUpdateForm() {
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [Relastaddes, setReLastaddes] = useState('');
  const [member, setReMember] = useState({
    mid: '',
    mpass: '',
    mname: '',
    memail: '',
    mnumber: '',
    maddress: '',
  });

  const setLastaddes1 = (e) => {
    const value = e.target.value;
    const fullAddress = `${address} ${value}`;
    setReLastaddes(fullAddress);

    setReMember({
      ...member,
      maddress: fullAddress,
    });
  };
  const datain = (e) => {
    setReMember({ ...member, [e.target.name]: e.target.value });
  };

  const EmailChange = (e) => {
    const value = e.target.value;
    setReMember({
      ...member,
      memail: value,
    });
  };

  const thisEmail = (e) => {
    const emailvalue = e.target.value;
    setReMember({
      ...member,
      memail: `${member.memail}@${emailvalue}`,
    });
  };

  const Postgo = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setZipcode(data.zonecode);
        setAddress(data.address);
        setReMember({
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

    const res = await axiosAPI.post('/addMember', member);
  };

  return (
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
                />
              </Col>
            </UserRowStyled>

            <UserRowStyled>
              <UserColStyled md={2} sm={3} xs={3}>
                비밀번호
              </UserColStyled>
              <Col>
                <Form.Control
                  placeholder="비밀번호"
                  type="password"
                  value={member.mpass}
                  onChange={datain}
                  name="mpass"
                />
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
              <UserColStyled md={2} sm={3} xs={4}>
                휴대폰 번호
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
                <Form.Control placeholder="우편번호" value={zipcode} readOnly />
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
              >
                회원수정
              </Button>
              <Button
                style={{ width: '30%', marginTop: '20px' }}
                variant="warning"
              >
                취소
              </Button>
            </Col>
          </Form>
        </Container>
      </Agree_check>
    </AgreeMainStyled>
  );
}

export default UserUpdateForm;
