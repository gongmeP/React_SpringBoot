import { Spinner, SpinnerProps } from 'react-bootstrap';
import styled from 'styled-components';
interface StyledSpinnerProps extends SpinnerProps {}

export const StyleSpinner = styled(Spinner)<StyledSpinnerProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3rem !important;
  height: 3rem !important;
  border-color: #816bff !important;
  border-right-color: white !important;
`;

export const StyleSpinner2 = styled(Spinner)<StyledSpinnerProps>`
  width: 3rem !important;
  height: 3rem !important;
  border-color: #816bff !important;
  border-right-color: white !important;
`;
