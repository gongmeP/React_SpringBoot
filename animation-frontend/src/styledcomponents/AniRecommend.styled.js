import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const RecomDiv = styled.div`
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const ReComButton = styled(Button)`
  background-color: #816bff !important;
  border-color: #816bff !important;
  color: #f0edff !important;
  border-radius: 20px !important;
  margin: 10px;
`;

export const ReComButton2 = styled(Button)`
  background-color: lightcoral !important;
  border-color: lightcoral !important;
  color: #f0edff !important;
  border-radius: 20px !important;
  margin: 10px;
`;

export const RecomButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
