import React from 'react';
import { useEffect, useState } from 'react';
import axiosAPI from '../../axiosAPI';
import { useNavigate } from 'react-router-dom';
import { UserdataTs } from 'src/model/User';
import UserUpdateComponents from 'src/components/UserJoinComponents/UserUpdateComponents';

const UserUpdateForm = () => {
  const [zipcode, setZipcode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [lastaddress, setLastaddress] = useState<string>('');
  const [Relastaddes, setReLastaddes] = useState<string>('');
  const loginID: string | null = window.sessionStorage.getItem('loginID');
  const [member, setReMember] = useState<UserdataTs | null>(null);
  const [show, setShow] = useState<boolean>(false);
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

  const setLastaddes1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (member !== null) {
      const value = e.target.value;
      setLastaddress(value);
      const fullAddress = `${zipcode}/${address}/${value}`;
      setReLastaddes(fullAddress);
      setReMember({
        ...member,
        maddress: fullAddress,
      });
    }
  };
  const datain = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (member !== null) {
      setReMember({ ...member, [e.target.name]: e.target.value });
    }
  };

  const EmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (member !== null) {
      const value = e.target.value;
      setReMember({
        ...member,
        memail: value,
      });
    }
  };

  const thisEmail = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (member !== null) {
      const emailvalue = e.target.value;
      setReMember({
        ...member,
        memail: `${member.memail}@${emailvalue}`,
      });
    }
  };

  const Postgo = () => {
    if (member !== null) {
      //@ts-ignore
      new window.daum.Postcode({
        oncomplete: function (data: { zonecode: string; address: string }) {
          setZipcode(data.zonecode);
          setAddress(data.address);
          setReMember({
            ...member,
            maddress: `${data.zonecode} ${data.address}`,
          });
        },
      }).open();
    }
  };

  const UpdateMember = async () => {
    if (member !== null) {
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
      if (window.confirm('입력하신 회원정보를 수정하시겠습니까?')) {
        if (res.data === '회원수정 완료') {
          alert('회원 정보가 수정되었습니다.');
          window.sessionStorage.setItem('loginUsername', member.mname);
          navigate('/mypage');
        }
      } else {
      }
    }
  };
  const backback = () => {
    navigate('/mypage');
  };

  const PasswordChange = () => {
    setShow(true);
  };

  return (
    <>
      {member !== null && (
        <>
          <UserUpdateComponents
            member={member}
            datain={datain}
            PasswordChange={PasswordChange}
            show={show}
            setShow={setShow}
            EmailChange={EmailChange}
            thisEmail={thisEmail}
            Postgo={Postgo}
            zipcode={zipcode}
            address={address}
            lastaddress={lastaddress}
            setLastaddes1={setLastaddes1}
            backback={backback}
            UpdateMember={UpdateMember}
          ></UserUpdateComponents>
        </>
      )}
    </>
  );
};

export default UserUpdateForm;
