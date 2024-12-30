import React from 'react';
import { Button } from 'react-bootstrap';
import store from '../../Redux/store';
import { setFilterTF } from '../../Redux/AniAction';
import { AnidataTs, GenreArray } from 'src/model/Animation';

interface Ownprop {
  genreArray: GenreArray;
  setCheckFiler: (CheckFiler: string[]) => void;
  setPage: (Page: number) => void;
}
const ResetButton = ({ genreArray, setCheckFiler, setPage }: Ownprop) => {
  const ResetButton = () => {
    setCheckFiler([]);
    genreArray.genre.forEach((genre) => {
      const checkbox = document.querySelector<HTMLInputElement>(`#${genre}`);
      if (checkbox) {
        checkbox.checked = false;
      }
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
};

export default ResetButton;
