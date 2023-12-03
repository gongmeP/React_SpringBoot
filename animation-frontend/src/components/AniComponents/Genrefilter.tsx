import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import store, { RootState } from '../../Redux/store';
import { setAni, setFilterTF, setReuseEffect } from '../../Redux/AniAction';
import { useSelector } from 'react-redux';
import ResetButton from './ResetButton';
import axiosAPI from '../../axiosAPI';
import { AnidataTs, GenreArray } from 'src/model/Animation';

interface Ownprop {
  setAnidata: (Anidata: AnidataTs[]) => void;
  setPage: (page: number) => void;
}

const Genrefilter = ({ setAnidata, setPage }: Ownprop) => {
  const genreArray: GenreArray = useSelector(
    (state: RootState) => state.AniState.genreArray,
  );
  const ReuseEffect = useSelector(
    (state: RootState) => state.AniState.ReuseEffect,
  );

  const [checkfilter, setCheckFiler] = useState<string[]>([]);
  useEffect(() => {
    const Genre = async () => {
      if (checkfilter.length !== 0) {
        try {
          const res = await axiosAPI.post(`/Ani/GenreFilter`, checkfilter);
          setAnidata(res.data);
        } catch (error) {
          console.error('Genre axios Error');
        }
      } else if (checkfilter.length === 0) {
        store.dispatch(setReuseEffect(ReuseEffect + 1));
      }
    };
    Genre();
  }, [checkfilter]);

  //체크될때 장르데이터 배열화 시키는 부분
  const Filter = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === true) {
      store.dispatch(setFilterTF(true));
      setPage(0);
    }
    if (e.target.checked === true && !checkfilter.includes(e.target.id)) {
      setCheckFiler((prevFilter) => [...prevFilter, e.target.id]);
      store.dispatch(setFilterTF(true));
    } else if (e.target.checked === false) {
      setPage(0);

      if (checkfilter.length === 1) {
        store.dispatch(setFilterTF(false));
      }
      setCheckFiler((prevFilter) =>
        prevFilter.filter((id) => id !== e.target.id),
      );
    }
  };
  return (
    <>
      {/* 리셋시키는 버튼 컴포넌트*/}
      <ResetButton
        genreArray={genreArray}
        setCheckFiler={setCheckFiler}
        setPage={setPage}
      ></ResetButton>
      {genreArray.genre.map((genre) => (
        <Form.Check
          key={genre}
          type="checkbox"
          id={genre}
          label={genre}
          onChange={Filter}
          style={{ minHeight: '2.2rem', fontSize: '1rem' }}
        />
      ))}
    </>
  );
};

export default Genrefilter;
