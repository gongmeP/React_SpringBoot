import React from 'react';
import { StyleSpinner } from '../../styledcomponents/LodingSpinner.styled';

const LoadingSpinner = () => {
  return (
    <StyleSpinner animation="border" role="status" variant="danger">
      <span className="visually-hidden">Loading...</span>
    </StyleSpinner>
  );
};

export default LoadingSpinner;
