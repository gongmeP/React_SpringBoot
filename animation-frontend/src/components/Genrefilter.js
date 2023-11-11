import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import store from '../Redux/store';
import axios from 'axios';
import { setAni } from '../Redux/action';

function Genrefilter() {
  const [genreArray, setGenreArray] = useState({
    genre: [
      '판타지',
      '액션',
      '개그',
      '미스터리',
      '로맨스',
      '모험',
      'SF',
      '스포츠',
      '아이돌',
      '드라마',
    ],
  });

  const ResetButton = () => {
    setCheckFiler([]);
    genreArray.genre.forEach((genre) => {
      const checkbox = document.getElementById(genre);
      checkbox.checked = false;
    });
  };
  const [checkfilter, setCheckFiler] = useState([]);
  const [updatecheckbox, setUpdatecheckbox] = useState(false);
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

  const Filter = async (e) => {
    const updatecheckbox = e.target.checked;

    if (e.target.checked === true && !checkfilter.includes(e.target.id)) {
      setCheckFiler((prevFilter) => [...prevFilter, e.target.id]);
    } else if (e.target.checked === false) {
      setCheckFiler((prevFilter) =>
        prevFilter.filter((id) => id !== e.target.id),
      );
    }

    setUpdatecheckbox(updatecheckbox);
  };
  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={ResetButton}
        className="mb-3"
      >
        초기화
      </Button>
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
