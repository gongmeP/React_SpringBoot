import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotAdmin() {
  const navigate = useNavigate();
  useEffect(() => {
    const LoginGo = async () => {
      alert('비정상 접근이 감지되었습니다. 관리자 로그인 해주세요.');
      navigate('/');
    };
    LoginGo();
  }, []);
  return <></>;
}

export default NotAdmin;
