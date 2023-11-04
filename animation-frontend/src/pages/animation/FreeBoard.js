import { useEffect, useState } from 'react';
import store from '../../Redux/store';
import { setFreeBoards, setFreeBoardsEA } from '../../Redux/action';
import Board from '../../components/Board';
import Page from '../../components/Page';
import { useSelector } from 'react-redux';

function FreeBoard() {
  // const [page, setPageSize] = useState(1);

  const Pages = useSelector((state) => state.pages);
  const freeBoardsEA = useSelector((stage) => stage.freeBoardsEA);

  useEffect(() => {
    fetch(`http://localhost:8080/FreeBoard/Page?page=${Pages}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
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
    </>
  );
}

export default FreeBoard;
