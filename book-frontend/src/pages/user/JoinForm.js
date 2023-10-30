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
function JoinForm() {
  const [agreementText1, setAgreementText1] = useState('');
  const [agreementText2, setAgreementText2] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    async function fetchAgreementText(url) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const text = await response.text();
          return text;
        } else {
          throw new Error('Failed to fetch data.');
        }
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

  const agg_allck = (isChecked) => {
    setIsAgreed(isChecked);
    document.getElementById('ag_ck1').checked = isChecked;
    document.getElementById('ag_ck2').checked = isChecked;
  };

  function agg_btn1() {
    if (
      !document.getElementById('ag_ck1').checked ||
      !document.getElementById('ag_ck2').checked
    ) {
      alert('이용약관 및 개인정보 수집에 동의해야만 회원가입이 가능합니다.');
    } else {
      window.location.href = '/Joinform2';
    }
  }
  return (
    <AgreeMainStyled>
      <AgreeStyled>회원가입</AgreeStyled>

      <Agree_check>
        <AgreeCheckSpan1>1. 약관동의</AgreeCheckSpan1>
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
            variant="secondary"
          >
            다음단계
          </Button>
        </div>
      </Agree_check>
    </AgreeMainStyled>
  );
}

export default JoinForm;
