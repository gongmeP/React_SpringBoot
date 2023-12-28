import React, { useState } from 'react';
import store from '../../Redux/store';
import { loginSuccess } from '../../Redux/LoginAction';
import axiosAPI from '../../axiosAPI';
import LoginComponenets from 'src/components/UserJoinComponents/LoginComponenets';

const Login = () => {
  const [id, setId] = useState<string>('Alladmin');
  const [password, setPassword] = useState<string>('Alladmin');

  const Logingo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { adminid: id, adminpass: password };

    const res = await axiosAPI.post('/Admin/login', data);

    if (res.data.loginID != null && res.data.AdminApproval === 'n') {
      store.dispatch(loginSuccess(res.data.loginID, res.data.loginUsername));
      window.sessionStorage.setItem('loginID', res.data.loginID);
      window.sessionStorage.setItem('loginUsername', res.data.loginUsername);

      alert('로그인 되셨습니다');
      window.location.href = '/allList';
    } else if (res.data.AdminApproval === 'y') {
      alert('관리자 승인 대기 상태입니다. 승인 완료 후 다시 로그인해주세요.');
    } else {
      alert('아이디 및 패스워드 를 다시 확인해주세요');
    }
  };

  return (
    <LoginComponenets
      id={id}
      password={password}
      setId={setId}
      setPassword={setPassword}
      Logingo={Logingo}
    />
  );
};

export default Login;
