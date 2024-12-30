import React from 'react';
import { StyleSpinner2 } from '../../styledcomponents/LodingSpinner.styled';

const LoadingSpinner2 = () => {
  return (
    <StyleSpinner2 animation="border" role="status" variant="danger">
      <span className="visually-hidden">Loading...</span>
    </StyleSpinner2>
  );
};

export default LoadingSpinner2;
