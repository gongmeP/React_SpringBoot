import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosAPI from '../../axiosAPI';
import { UserdataTs } from 'src/model/User';
import Join2Components from 'src/components/UserJoinComponents/Join2Components';

const JoinForm2 = () => {
  const [idcheckok, setIdcheckok] = useState(false);
  const navigate = useNavigate();
  const [showadd, setShowadd] = useState<boolean>(false);
  const [shownoadd, setShownoadd] = useState<boolean>(false);
  const [showCompleteModal, setShowCompleteModal] = useState<boolean>(false);
  const [zipcode, setZipcode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [lastaddes, setLastaddes] = useState<string>('');
  const [member, setMember] = useState<UserdataTs>({
    mid: '',
    mpass: '',
    mname: '',
    memail: '',
    mnumber: '',
    maddress: '',
  });
  const setLastaddes1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const fullAddress = `${zipcode}/${address}/${value}`;
    setLastaddes(fullAddress);

    setMember({
      ...member,
      maddress: fullAddress,
    });
  };
  const datain = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const EmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMember({
      ...member,
      memail: value,
    });
  };

  const thisEmail = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const emailvalue = e.target.value;
    setMember({
      ...member,
      memail: `${member.memail}@${emailvalue}`,
    });
  };

  const Postgo = () => {
    if (member !== null) {
      //@ts-ignore
      new window.daum.Postcode({
        oncomplete: function (data: { zonecode: string; address: string }) {
          setZipcode(data.zonecode);
          setAddress(data.address);
          setMember({
            ...member,
            maddress: `${data.zonecode} ${data.address}`,
          });
        },
      }).open();
    }
  };

  const memberadd = async () => {
    if (member.mid === '') {
      alert('아이디를 입력해주세요.');
      return;
    }
    if (idcheckok === false) {
      alert('아이디 중복을 체크 하셔야합니다.');
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
    setShowCompleteModal(true);
  };

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
  const idcheck = async (mid: string) => {
    if (mid === '') {
      alert('아이디를 입력해주세요');
      return;
    }
    const res = await axiosAPI.post('/Member/idcheck', mid, {
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
    <Join2Components
      member={member}
      datain={datain}
      setLastaddes1={setLastaddes1}
      idcheckok={idcheckok}
      idcheck={idcheck}
      EmailChange={EmailChange}
      thisEmail={thisEmail}
      Postgo={Postgo}
      zipcode={zipcode}
      address={address}
      handleCloseCompleteModal={handleCloseCompleteModal}
      memberadd1={memberadd1}
      memberadd2={memberadd2}
      noadd1={noadd1}
      noadd2={noadd2}
      gohome={gohome}
      showadd={showadd}
      setShowadd={setShowadd}
      shownoadd={shownoadd}
      setShownoadd={setShownoadd}
      showCompleteModal={showCompleteModal}
    />
  );
};

export default JoinForm2;
