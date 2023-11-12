import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import store from '../../Redux/store';
import axios from 'axios';
import { setAni } from '../../Redux/action';
import { useSelector } from 'react-redux';
import ResetButton from './ResetButton';

function Genrefilter() {
  const genreArray = useSelector((store) => store.genreArray);

  const [checkfilter, setCheckFiler] = useState([]);
  useEffect(() => {
    const Genre = async () => {
      if (checkfilter.length !== 0) {
        try {
          const res = await axios.post(
            `http://localhost:8080/Ani/GenreFilter`,
            checkfilter,
          );
          store.dispatch(setAni(res.data));
        } catch (error) {
          console.error('Genre axios Error');
        }
      } else if (checkfilter.length === 0) {
        const fetchData = async () => {
          const res = await axios.get(`http://localhost:8080/Ani/ALL`);
          store.dispatch(setAni(res.data));
        };
        fetchData();
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
        />
      ))}
    </>
  );
}

export default Genrefilter;
