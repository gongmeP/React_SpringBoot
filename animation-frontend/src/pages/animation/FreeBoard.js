import React from 'react';
import BookItem from '../../components/BookItem';
import { Row } from 'react-bootstrap';
import { useEffect } from 'react';
import Page from '../../components/Page';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { setBookEA, setBooks, setPages } from '../../Redux/action';
import store from '../../Redux/store';

function FreeBoard() {
  const books = useSelector((state) => state.books);
  const Pages = useSelector((state) => state.pages);

  useEffect(() => {
    fetch(`http://localhost:8080/book?page=${Pages}`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);

        store.dispatch(setBooks(res.content));
        store.dispatch(setBookEA(res.content.length));
      });
  }, [Pages]);

  return (
    <>
      <Row className="justify-content-evenly" style={{ margin: '0 auto' }}>
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </Row>
      <Page></Page>
    </>
  );
}

export default FreeBoard;
