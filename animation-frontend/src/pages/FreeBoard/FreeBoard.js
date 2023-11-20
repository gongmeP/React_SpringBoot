import { useEffect, useState } from 'react';
import store from '../../Redux/store';
import {
  setFreeBoards,
  setFreeBoardsEA,
  setPages,
  setSearchTF,
} from '../../Redux/BoardAction';
import Board from '../../components/BoardComponents/Board';
import Page from '../../components/BoardComponents/Page';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import BoardSearch from '../../components/BoardComponents/BoardSearch';
import axiosAPI from '../../axiosAPI';

function FreeBoard() {
  const Pages = useSelector((state) => state.BoardState.pages);
  const freeBoardsEA = useSelector((stage) => stage.BoardState.freeBoardsEA);
  const searchTF = useSelector((state) => state.BoardState.searchTF);

  const navigate = useNavigate();

  useEffect(() => {
    const PagesFetch = async () => {
      const res = await axiosAPI.post(`/FreeBoard/Page?page=${Pages}`);
      store.dispatch(setFreeBoards(res.data));
      store.dispatch(setSearchTF('NotSearch')); // 검색인지 구분
    };
    PagesFetch();
  }, [Pages]);

  useEffect(() => {
    const TotalPage = async () => {
      const res = await axiosAPI.get(`/FreeBoard/TotalPage`);
      store.dispatch(setFreeBoardsEA(res.data));
      store.dispatch(setPages(0));
    };
    TotalPage();
  }, []);

  const boardlistgo = () => {
    window.location.href = '/freeBoard';
  };

  const SaveFreeBoardGo = () => {
    if (sessionStorage.getItem('loginID') === null) {
      alert('로그인 후 게시글 작성이 가능해요.');
      navigate('/loginForm');
      return;
    }
    navigate('/saveFreeBoard');
  };

  return (
    <>
      <Board></Board>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          onClick={boardlistgo}
          className="btn-primary mb-1 PupleColorButton1"
          style={{ marginRight: '20px', marginTop: '10px' }}
        >
          전체글
        </Button>
        <Button
          onClick={SaveFreeBoardGo}
          className="btn btn-primary mb-1 PupleColorButton1"
          style={{ marginRight: '20px', marginTop: '10px' }}
        >
          글쓰기
        </Button>
      </div>
      <Page EA={freeBoardsEA} Pages={Pages}></Page>
      <BoardSearch></BoardSearch>
    </>
  );
}

export default FreeBoard;
