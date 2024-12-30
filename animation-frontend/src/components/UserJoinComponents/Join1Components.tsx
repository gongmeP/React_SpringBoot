import React from 'react';
import { Button } from 'react-bootstrap';
import {
  AgreeCheckEm,
  AgreeCheckInput,
  AgreeCheckSpan1,
  AgreeChecklabel1,
  AgreeMainStyled,
  AgreeStyled,
  Agree_check,
  Agtext,
} from 'src/styledcomponents/JoinForm.styled';

interface Join1Components {
  agg_allck: (isChecked: boolean) => void;
  agreementText1: string;
  agreementText2: string;
  agg_btn1: () => void;
}

const Join1Components = ({
  agg_allck,
  agreementText1,
  agreementText2,
  agg_btn1,
}: Join1Components) => {
  return (
    <>
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
    </>
  );
};

export default Join1Components;
