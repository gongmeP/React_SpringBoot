import React from 'react';
import { Button } from 'react-bootstrap';
import store from '../../Redux/store';
import { setFilterTF } from '../../Redux/AniAction';
function ResetButton({ genreArray, checkfilter, setCheckFiler, setPage }) {
  const ResetButton = () => {
    setCheckFiler([]);
    genreArray.genre.forEach((genre) => {
      const checkbox = document.getElementById(genre);
      checkbox.checked = false;
    });
    setPage(0);
    store.dispatch(setFilterTF(false));
  };
  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={ResetButton}
        className="mb-3 PupleColorButton1"
      >
        초기화
      </Button>
    </>
  );
}

export default ResetButton;
