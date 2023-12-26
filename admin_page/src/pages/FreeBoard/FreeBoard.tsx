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
import axiosAPI from '../../axiosAPI';
import BoardDeleteButton from 'src/components/BoardComponents/BoardDeleteButton';

function FreeBoard() {
  const { pages, freeBoardsEA } = useSelector(
    (state: RootState) => state.BoardState,
  );

  const [reuseEffect, SetReuseEffect] = useState(0);

  useEffect(() => {
    const PagesFetch = async () => {
      const res = await axiosAPI.post(`/FreeBoard/Page?page=${pages}`);
      store.dispatch(setFreeBoards(res.data));
      store.dispatch(setSearchTF('NotSearch')); // 검색인지 구분
    };
    PagesFetch();
  }, [pages, reuseEffect]);

  useEffect(() => {
    const TotalPage = async () => {
      const res = await axiosAPI.get(`/FreeBoard/TotalPage`);
      store.dispatch(setFreeBoardsEA(res.data));
      store.dispatch(setPages(0));
    };
    TotalPage();
  }, []);

  return (
    <>
      <Board></Board>
      <BoardDeleteButton SetReuseEffect={SetReuseEffect}></BoardDeleteButton>
      {/* 글삭제 버튼 컴포넌트 */}
      <Page EA={freeBoardsEA} Pages={pages}></Page>
      <BoradSerch></BoradSerch>
    </>
  );
}

export default FreeBoard;
