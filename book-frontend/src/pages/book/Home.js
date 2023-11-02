import React, { useEffect, useState } from 'react';
import BookItem from '../../components/BookItem';
import { Row } from 'react-bootstrap';
import Page from '../../components/Page';
import Banner from '../../components/Banner';

function Home() {
  const [books, setBooks] = useState([]);
  const [bookEA, setBookEA] = useState(1);
  const [Pages, setPages] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/book?page=${Pages}`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);

        setBooks(res.content);
        setBookEA(res.content.length);
      });
  }, [Pages]);

  // const reBooks = () => {
  //   const eaBooks = Math.max(12 - books.length, 0);
  //   const reEaBooks = books.concat(Array(eaBooks).fill({}));

  //   return reEaBooks.map((book) => <BookItem key={book.id} book={book} />);
  // };

  return (
    <>
      <Banner></Banner>
      <Row className="justify-content-evenly" style={{ margin: '0 auto' }}>
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </Row>
      <Page bookEA={bookEA} setPages={setPages} Pages={Pages}></Page>
    </>
  );
}

export default Home;
