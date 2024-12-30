import React, { useEffect, useState } from 'react';
import Join1Components from 'src/components/UserJoinComponents/Join1Components';
const JoinForm = () => {
  const [agreementText1, setAgreementText1] = useState<string>('');
  const [agreementText2, setAgreementText2] = useState<string>('');

  useEffect(() => {
    async function fetchAgreementText(url: string) {
      try {
        const res = await fetch(url);
        const text = await res.text();
        return text;
      } catch (error) {
        console.error(error);
        return '';
      }
    }

    fetchAgreementText('./agreement/agree1.txt').then((text) =>
      setAgreementText1(text),
    );
    fetchAgreementText('./agreement/agree2.txt').then((text) =>
      setAgreementText2(text),
    );
  }, []);

  const agg_allck = (isChecked: boolean) => {
    const agCk1 = document.querySelector<HTMLInputElement>('#ag_ck1');
    const agCk2 = document.querySelector<HTMLInputElement>('#ag_ck2');
    if (agCk1) {
      agCk1.checked = isChecked;
    }
    if (agCk2) {
      agCk2.checked = isChecked;
    }
  };

  function agg_btn1() {
    const agCk1 = document.querySelector<HTMLInputElement>('#ag_ck1');
    const agCk2 = document.querySelector<HTMLInputElement>('#ag_ck2');
    if (!agCk1?.checked || !agCk2?.checked) {
      alert('이용약관 및 개인정보 수집에 동의해야만 회원가입이 가능합니다.');
    } else {
      window.location.href = '/Joinform2';
    }
  }
  return (
    <Join1Components
      agg_btn1={agg_btn1}
      agg_allck={agg_allck}
      agreementText1={agreementText1}
      agreementText2={agreementText2}
    ></Join1Components>
  );
};

export default JoinForm;
