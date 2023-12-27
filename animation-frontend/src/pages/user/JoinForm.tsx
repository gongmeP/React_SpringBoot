import React, { useEffect, useState } from 'react';

import {
  AgreeCheckEm,
  AgreeCheckInput,
  AgreeCheckSpan1,
  AgreeChecklabel1,
  AgreeMainStyled,
  AgreeStyled,
  Agree_check,
  Agtext,
} from '../../styledcomponents/JoinForm.styled';
import { Button } from 'react-bootstrap';
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
    <AgreeMainStyled>
      <AgreeStyled>회원가입</AgreeStyled>
      <Agree_check>
        <AgreeCheckSpan1>약관동의</AgreeCheckSpan1>
        <AgreeChecklabel1>
          <AgreeCheckInput
            type="checkbox"
            onChange={(e) => agg_allck(e.target.checked)}
          />
          <AgreeCheckEm>모든 약관을 확인하고 전체 동의합니다.</AgreeCheckEm>
        </AgreeChecklabel1>
        <AgreeChecklabel1>
          <AgreeCheckInput type="checkbox" id="ag_ck1" />
          <AgreeCheckEm style={{ color: 'red' }}>(필수)</AgreeCheckEm>
          이용약관
        </AgreeChecklabel1>
        <Agtext id="agtext1">{agreementText1}</Agtext>
        <AgreeChecklabel1 className="ag_chk1">
          <AgreeCheckInput type="checkbox" id="ag_ck2" />
          <AgreeCheckEm style={{ color: 'red' }}>(필수)</AgreeCheckEm>
          개인정보 수집 및 이용
        </AgreeChecklabel1>
        <Agtext id="agtext2">{agreementText2}</Agtext>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={agg_btn1}
            style={{ width: '50%', marginTop: '20px' }}
            variant="primary"
            className="PupleColorButton1"
          >
            다음단계
          </Button>
        </div>
      </Agree_check>
    </AgreeMainStyled>
  );
};

export default JoinForm;
