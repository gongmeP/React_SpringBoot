import styled from 'styled-components';

export const CustomTable = styled.table`
  border-collapse: separate;
  width: 100%;
`;

export const Tr1 = styled.th`
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  line-height: 35px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  height: 35px;
  text-align: center;
  display: flex;
  border-top: none;
  font-size: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  @media (max-width: 767px) {
    font-size: 14px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 15px;
  }

  @media (min-width: 992px) {
    font-size: 16px;
  }
`;

export const Tr2 = styled.th`
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  line-height: 35px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  height: 35px;
  text-align: center;
  display: flex;
  border-top: none;
  font-size: 13px;
  font-family: 'Noto Sans KR', sans-serif;
  @media (max-width: 767px) {
    font-size: 11px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 12px;
  }

  @media (min-width: 992px) {
    font-size: 13px;
  }
`;

export const Th1 = styled.th`
  width: 3%;
`;

export const Th2 = styled.th`
  width: 60%;
`;

export const Th3 = styled.th`
  width: 15%;
`;

export const Th4 = styled.th`
  width: 23%;
`;

export const Th5 = styled.th`
  width: 10%;
`;
