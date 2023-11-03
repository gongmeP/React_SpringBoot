import React, { useEffect, useState } from 'react';
import BookItem from '../../components/BookItem';
import { Row } from 'react-bootstrap';
import Page from '../../components/Page';
import Banner from '../../components/Banner';
import MainDaily from '../../components/MainDaily';

function Home() {
  return (
    <>
      <Banner></Banner>
      <MainDaily></MainDaily>
    </>
  );
}

export default Home;
