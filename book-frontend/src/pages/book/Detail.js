import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail(props) {
  const propsParam = useParams();
  const id = propsParam.id;

  const [books, setBooks] = useState({
    id: '',
    title: '',
    author: '',
  });

  useEffect(() => {
    fetch(`http://localhost:8080/book/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setBooks(res);
      });
  }, []);

  return (
    <>
      <h1>상세보기</h1>
      <hr></hr>
      <h2>{books.author}</h2>
      <h3>{books.title}</h3>
    </>
  );
}

export default Detail;
