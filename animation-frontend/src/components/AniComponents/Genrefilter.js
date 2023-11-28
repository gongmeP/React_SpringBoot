import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import store from '../../Redux/store';
import { setAni, setReuseEffect } from '../../Redux/AniAction';
import { useSelector } from 'react-redux';
import ResetButton from './ResetButton';
import axiosAPI from '../../axiosAPI';

function Genrefilter({ setAnidata }) {
  const genreArray = useSelector((state) => state.AniState.genreArray);
  const ReuseEffect = useSelector((state) => state.AniState.ReuseEffect);

  const [checkfilter, setCheckFiler] = useState([]);
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
  const Filter = async (e) => {
    if (e.target.checked === true && !checkfilter.includes(e.target.id)) {
      setCheckFiler((prevFilter) => [...prevFilter, e.target.id]);
    } else if (e.target.checked === false) {
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
        checkfilter={checkfilter}
        setCheckFiler={setCheckFiler}
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
}

export default Genrefilter;
