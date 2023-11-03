import React, { useState } from 'react';
import { Button, Row, Table } from 'react-bootstrap';
import { useEffect } from 'react';
import Page from '../../components/Page';
import store from '../../Redux/store';
import { setFreeBoards } from '../../Redux/action';
import { useSelector } from 'react-redux';

function FreeBoard() {
  const freeBoards = useSelector((state) => state.freeBoards);

  useEffect(() => {
    fetch(`http://localhost:8080/FreeBoard`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        store.dispatch(setFreeBoards(res));
      });
  }, []);

  console.log(freeBoards);

  return (
    <>
      <Table striped bordered hover></Table>
      <Page></Page>
    </>
  );
}

export default FreeBoard;
