import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosAPI from '../../axiosAPI';
import { AdmindataTs } from 'src/model/User';
import Join2Components from 'src/components/UserJoinComponents/Join2Components';

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
    <Join2Components
      Adminmember={Adminmember}
      datain={datain}
      idcheckok={idcheckok}
      idcheck={idcheck}
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
      adminrank={adminrank}
    />
  );
};

export default JoinForm2;
