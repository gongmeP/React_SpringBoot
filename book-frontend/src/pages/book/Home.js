import React, { useEffect, useState } from 'react';
import BookItem from '../../components/BookItem';
import { Row } from 'react-bootstrap';
import Page from '../../components/Page';

function Home() {
  const [books, setBooks] = useState([]);
  const [bookEA, setBookEA] = useState(1);

  useEffect(() => {
    fetch('http://localhost:8080/book', { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res.content);

        setBooks(res.content);
        setBookEA(res.content.length);
      });
  }, []);

  return (
    <>
      <Row className="justify-content-evenly" style={{ margin: '0 auto' }}>
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </Row>
      <Page bookEA={bookEA}></Page>
    </>
  );
}

export default Home;
