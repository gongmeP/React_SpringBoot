import React, { useState } from 'react';
import store from '../../Redux/store';
import { loginSuccess } from '../../Redux/LoginAction';
import axiosAPI from '../../axiosAPI';
import LoginComponenets from 'src/components/UserJoinComponents/LoginComponenets';

const Login = () => {
  const [id, setId] = useState<string>('test1');
  const [password, setPassword] = useState<string>('testtest1');

  const Logingo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { mid: id, mpass: password };
    const res = await axiosAPI.post('/Member/login', data);
    if (res.data.loginID != null) {
      store.dispatch(loginSuccess(res.data.loginID, res.data.loginUsername));
      window.sessionStorage.setItem('loginID', res.data.loginID);
      window.sessionStorage.setItem('loginUsername', res.data.loginUsername);

      alert('어서오세요! 로그인이 완료되었습니다.');
      window.location.href = '/';
    } else {
      alert('아이디 또는 비밀번호를 잘못 입력했습니다.');
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
