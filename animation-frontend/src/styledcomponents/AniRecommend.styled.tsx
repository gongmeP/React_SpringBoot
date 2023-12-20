import { Button, ButtonProps, ColProps, RowProps } from 'react-bootstrap';
import styled from 'styled-components';

interface StyledButtonProps extends ButtonProps {}
interface StyledColProps extends ColProps {}
interface StyledRowProps extends RowProps {}

export const RecomDiv = styled.div`
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const ReComButton = styled(Button)<StyledButtonProps>`
  background-color: #816bff !important;
  border-color: #816bff !important;
  color: #f0edff !important;
  border-radius: 20px !important;
  margin: 10px;
`;

export const ReComButton2 = styled(Button)<StyledButtonProps>`
  background-color: lightcoral !important;
  border-color: lightcoral !important;
  color: #f0edff !important;
  border-radius: 20px !important;
  margin: 10px;
  cursor: pointer;
  input {
    width: 100%;
    background-color: lightcoral;
    border: none;
    color: #f0edff;
    border-radius: 20px;
    outline: none;
  }
`;

export const RecomButtonBox = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
`;

export const GptNoDiv = styled.div`
  font-size: 1.4rem;
  text-align: center;
  font-weight: 500;
  width: 100%;
  margin-top: 50px;
`;
