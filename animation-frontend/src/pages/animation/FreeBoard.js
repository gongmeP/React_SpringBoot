import { useEffect } from 'react';
import store from '../../Redux/store';
import { setFreeBoards } from '../../Redux/action';
import Board from '../../components/Board';

function FreeBoard() {
  useEffect(() => {
    fetch(`http://localhost:8080/FreeBoard`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        store.dispatch(setFreeBoards(res));
      });
  }, []);

  return (
    <>
      <Board></Board>
    </>
  );
}

export default FreeBoard;
