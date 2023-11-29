import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';

function LoadingSpinner2() {
  return (
    <StyleSpinner animation="border" role="status" variant="danger">
      <span className="visually-hidden">Loading...</span>
    </StyleSpinner>
  );
}

const StyleSpinner = styled(Spinner)`
  width: 3rem !important;
  height: 3rem !important;
  border-color: #816bff !important;
  border-right-color: white !important;
`;

export default LoadingSpinner2;
