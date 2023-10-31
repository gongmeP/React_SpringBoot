import React, { useEffect, useState } from 'react';
import BookItem from '../../components/BookItem';
import { Row } from 'react-bootstrap';

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/book', { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);
        setBooks(res);
      });
  }, []);

  return (
    <Row className="justify-content-evenly" style={{ margin: '0 auto' }}>
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </Row>
  );
}

export default Home;
