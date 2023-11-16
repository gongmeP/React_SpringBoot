import React from 'react';
import { Button } from 'react-bootstrap';
function ResetButton({ genreArray, checkfilter, setCheckFiler }) {
  const ResetButton = () => {
    setCheckFiler([]);
    genreArray.genre.forEach((genre) => {
      const checkbox = document.getElementById(genre);
      checkbox.checked = false;
    });
  };
  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={ResetButton}
        className="mb-3 Buttoncolor2"
      >
        초기화
      </Button>
    </>
  );
}

export default ResetButton;
