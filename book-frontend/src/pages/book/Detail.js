import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Detail(props) {
  const propsParam = useParams();
  const id = propsParam.id;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/book/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setBooks(res);
      });
  }, []);

  const [books, setBooks] = useState({
    id: '',
    title: '',
    author: '',
  });

  const deleteBook = () => {
    fetch(`http://localhost:8080/book/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === 'ok') {
          navigate('/');
        } else {
          alert('삭제실패');
        }
      });
  };

  return (
    <>
      <h1>상세보기</h1>
      <Link to={`./updageForm/${id}`}>
        <a className="btn btn-warning">수정</a>
      </Link>
      <Button variant="danger" onClick={deleteBook}>
        삭제
      </Button>
      <hr></hr>
      <h2>{books.author}</h2>
      <h3>{books.title}</h3>
    </>
  );
}

export default Detail;
