import { useEffect, useState } from 'react';
import store from '../../Redux/store';
import { setFreeBoards, setFreeBoardsEA } from '../../Redux/action';
import Board from '../../components/Board';
import Page from '../../components/Page';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function FreeBoard() {
  const Pages = useSelector((state) => state.pages);
  const freeBoardsEA = useSelector((stage) => stage.freeBoardsEA);

  useEffect(() => {
    fetch(`http://localhost:8080/FreeBoard/Page?page=${Pages}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((res) => {
        store.dispatch(setFreeBoards(res));
      });
  }, [Pages]);

  useEffect(() => {
    fetch(`http://localhost:8080/FreeBoard/TotalPage`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        store.dispatch(setFreeBoardsEA(res));
      });
  }, []);

  return (
    <>
      <Board></Board>
      <Page EA={freeBoardsEA} Pages={Pages}></Page>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Link
          to="/saveFreeBoard"
          className="btn btn-primary"
          style={{ marginRight: '20px', marginTop: '-10px' }}
        >
          글쓰기
        </Link>
      </div>
    </>
  );
}

export default FreeBoard;
