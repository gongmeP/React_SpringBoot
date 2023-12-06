import React from 'react';
import { useEffect, useState } from 'react';
import store, { RootState } from '../../Redux/store';
import {
  setFreeBoards,
  setFreeBoardsEA,
  setPages,
  setSearchTF,
} from '../../Redux/BoardAction';
import Board from '../../components/BoardComponents/Board';
import Page from '../../components/BoardComponents/Page';
import { useSelector } from 'react-redux';
import BoradSerch from '../../components/BoardComponents/BoardSerch';
import { Button } from 'react-bootstrap';
import axiosAPI from '../../axiosAPI';

function FreeBoard() {
  const Pages = useSelector((state: RootState) => state.BoardState.pages);
  const freeBoardsEA = useSelector(
    (stage: RootState) => stage.BoardState.freeBoardsEA,
  );
  const SelectBoardArray = useSelector(
    (state: RootState) => state.BoardState.SelectBoardArray,
  );
  const [reuseEffect, SetReuseEffect] = useState(0);

  useEffect(() => {
    const PagesFetch = async () => {
      const res = await axiosAPI.post(`/FreeBoard/Page?page=${Pages}`);
      store.dispatch(setFreeBoards(res.data));
      store.dispatch(setSearchTF('NotSearch')); // 검색인지 구분
    };
    PagesFetch();
  }, [Pages, reuseEffect]);

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

  const selectBoardDelete = async () => {
    if (window.confirm('선택된 게시글을 전체 삭제합니다.')) {
      if (SelectBoardArray <= 0) {
        alert('삭제할 게시글을 선택해주세요.');
        return;
      }
      const res = await axiosAPI.put(
        `/FreeBoardList/SelectDelete/${SelectBoardArray}`,
      );
      if (res.data === '삭제완료') {
        alert('게시글이 삭제되었습니다.');
        SetReuseEffect(reuseEffect + 1);
      } else {
        alert('삭제오류');
      }
    } else {
      alert('게시글 삭제를 취소했습니다.');
    }
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
        <Button
          onClick={selectBoardDelete}
          variant="danger"
          className="mb-1"
          style={{ marginRight: '20px', marginTop: '10px' }}
        >
          선택 게시글 전체삭제
        </Button>
      </div>
      <Page EA={freeBoardsEA} Pages={Pages}></Page>
      <BoradSerch></BoradSerch>
    </>
  );
}

export default FreeBoard;