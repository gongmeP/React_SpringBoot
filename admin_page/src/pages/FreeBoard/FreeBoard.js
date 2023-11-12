import { useEffect, useState } from 'react';
import store from '../../Redux/store';
import {
  setFreeBoards,
  setFreeBoardsEA,
  setSearchTF,
} from '../../Redux/action';
import Board from '../../components/BoardComponents/Board';
import Page from '../../components/BoardComponents/Page';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoradSerch from '../../components/BoardComponents/BoardSerch';
import { Button } from 'react-bootstrap';

function FreeBoard() {
  const Pages = useSelector((state) => state.pages);
  const freeBoardsEA = useSelector((stage) => stage.freeBoardsEA);
  const searchTF = useSelector((store) => store.searchTF);

  useEffect(() => {
    const PagesFetch = async () => {
      const res = await axios.post(
        `http://localhost:8080/FreeBoard/Page?page=${Pages}`,
      );
      store.dispatch(setFreeBoards(res.data));
      store.dispatch(setSearchTF('NotSearch')); // 검색인지 구분
    };
    PagesFetch();
  }, [Pages]);

  useEffect(() => {
    const TotalPage = async () => {
      const res = await axios.get(`http://localhost:8080/FreeBoard/TotalPage`);
      store.dispatch(setFreeBoardsEA(res.data));
    };
    TotalPage();
  }, []);

  const boardlistgo = () => {
    window.location.href = '/freeBoard';
  };

  return (
    <>
      <Board></Board>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          onClick={boardlistgo}
          className="btn-primary mb-1"
          style={{ marginRight: '20px', marginTop: '10px' }}
        >
          전체글
        </Button>
        <Link
          to="/saveFreeBoard"
          className="btn btn-primary mb-1"
          style={{ marginRight: '20px', marginTop: '10px' }}
        >
          글쓰기
        </Link>
      </div>
      <Page EA={freeBoardsEA} Pages={Pages}></Page>
      <BoradSerch></BoradSerch>
    </>
  );
}

export default FreeBoard;
