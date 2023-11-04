import React, { useEffect, useState } from 'react';
import BookItem from '../../components/BookItem';
import { Row } from 'react-bootstrap';
import Page from '../../components/Page';
import Banner from '../../components/Banner';
import MainDaily from '../../components/MainDaily';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { setBookEA, setBooks, setPages } from '../../Redux/action';
import store from '../../Redux/store';

function Home() {
  const books = useSelector((state) => state.books);
  const Pages = useSelector((state) => state.pages);
  const bookEA = useSelector((stage) => stage.bookEA);

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
      <Banner></Banner>
      <MainDaily></MainDaily>
      <Row className="justify-content-evenly" style={{ margin: '0 auto' }}>
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </Row>
      <Page EA={bookEA} Pages={Pages}></Page>
    </>
  );
}

export default Home;
