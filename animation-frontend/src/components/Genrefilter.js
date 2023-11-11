import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import store from '../Redux/store';

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
  };
  const [checkfilter, setCheckFiler] = useState([]);
  const Filter = async (e) => {
    if (e.target.checked === true && !checkfilter.includes(e.target.id)) {
      setCheckFiler((prevFilter) => [...prevFilter, e.target.id]);
    } else if (e.target.checked === false) {
      setCheckFiler((prevFilter) =>
        prevFilter.filter((id) => id !== e.target.id),
      );
      console.log(checkfilter);
    }

    // const res2 = await axios.get(
    //   `http://localhost:8080/Ani/search?title=${searchText}`,
    // );

    // stores.dispatch(setAni(res2.data));
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
