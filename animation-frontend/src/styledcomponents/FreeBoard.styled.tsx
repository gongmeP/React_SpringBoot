import { Button, ButtonProps } from 'react-bootstrap';
import styled from 'styled-components';
interface StyledButtonProps extends ButtonProps {}
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
    font-size: 13px;
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
  width: 57%;
`;

export const Th3 = styled.th`
  width: 15%;
`;

export const Th4 = styled.th`
  width: 18%;
`;

export const Th5 = styled.th`
  width: 13%;
`;

export const PostContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(204, 204, 204, 0.6);
  padding: 10px;
  border-radius: 10px;
`;

export const DetailButtonDivBox = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 40px;
  margin-bottom: 100px;
  border-bottom: 2px dotted black;
  padding-bottom: 40px;
`;

export const BoardButtonBox = styled.div`
  display: flex;
  justify-content: end;
`;

export const BoardButtonWirte = styled(Button)<StyledButtonProps>`
  display: flex;
  justify-content: end;
  background-color: #816bff !important;
  color: #f0edff !important;
  border: none !important;
  margin-right: 20px;
  margin-top: 10px;
`;
