import { useEffect, useState } from 'react';
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
import UserPasswordChange from '../../components/MyPageComponents/UserPasswordChange';
import { useNavigate } from 'react-router-dom';

function UserUpdateForm() {
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [lastaddress, setLastaddress] = useState('');
  const [Relastaddes, setReLastaddes] = useState('');
  const loginID = window.sessionStorage.getItem('loginID');
  const navigate = useNavigate();

  useEffect(() => {
    const UserData = async () => {
      const res = await axiosAPI.post('/getMemberData', loginID, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      setReMember(res.data[0]);
      //주소 다시 분할
      const address333 = res.data[0].maddress.split('/');
      setZipcode(address333[0]);
      setAddress(address333[1]);
      setLastaddress(address333[2]);
    };
    UserData();
  }, [loginID]);

  const [member, setReMember] = useState({});

  const setLastaddes1 = (e) => {
    const value = e.target.value;
    setLastaddress(value);
    const fullAddress = `${zipcode}/${address}/${value}`;
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

  const UpdateMember = async (e) => {
    e.preventDefault();
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
      alert('상세 주소를 입력해주세요.');
      return;
    }

    const res = await axiosAPI.post('/Member/Update', member);
    if (res.data === '회원수정 완료') {
      alert('회원 정보가 수정되었습니다.');
      window.sessionStorage.setItem('loginUsername', member.mname);
      navigate('/mypage');
    }
  };

  const [show, setShow] = useState(false);

  const PasswordChange = () => {
    setShow(true);
  };

  return (
    <AgreeMainStyled>
      <Agree_check>
        <AgreeCheckSpan1>회원 정보 수정</AgreeCheckSpan1>
        <Container className="panel" style={{ marginTop: '10px' }}>
          <Form onSubmit={UpdateMember}>
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
                  value={lastaddress}
                />
              </Col>
            </UserRowStyled>
            <Col style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={UpdateMember}
                type="submit"
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
