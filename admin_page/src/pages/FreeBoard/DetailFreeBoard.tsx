import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Board from '../../components/BoardComponents/Board';
import { useSelector } from 'react-redux';
import Page from '../../components/BoardComponents/Page';
import store, { RootState } from '../../Redux/store';
import {
  setFormData,
  setFreeBoards,
  setFreeBoardsEA,
  setSearchTF,
} from '../../Redux/BoardAction';
import BoradSerch from '../../components/BoardComponents/BoardSerch';
import axiosAPI, { API_URL } from '../../axiosAPI';
import BoardDetailButton from 'src/components/BoardComponents/BoardDetailButton';
import BoardContentOutput from 'src/components/BoardComponents/BoardContentOutput';

const DetailFreeBoard = () => {
  const { pages, freeBoardsEA, formData } = useSelector(
    (state: RootState) => state.BoardState,
  );

  useEffect(() => {
    const PagesFetch = async () => {
      const res = await axiosAPI.post(`/FreeBoard/Page?page=${pages}`);
      store.dispatch(setFreeBoards(res.data));
      store.dispatch(setSearchTF('NotSearch')); // 검색인지 구분
    };
    PagesFetch();
  }, [pages]);
  useEffect(() => {
    const TotalPage = async () => {
      const res = await axiosAPI.get(`/FreeBoard/TotalPage`);
      store.dispatch(setFreeBoardsEA(res.data));
    };
    TotalPage();
  }, []);

  const { fbNum } = useParams();

  // 디테일에서 밑에 게시판 클릭시 다시 재로드 시키는 부분임 !!
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axiosAPI.get(`/FreeBoard/Detail/${fbNum}`);
      store.dispatch(setFormData(res.data[0]));
    };
    fetchdata();
  }, [fbNum]);

  return (
    <div className="container">
      <BoardContentOutput formData={formData}></BoardContentOutput>
      {/* Board 내용 출력 컴포넌트 */}
      <BoardDetailButton
        fbNum={fbNum}
        userid={formData.userid}
      ></BoardDetailButton>
      {/* Board 버튼 컴포넌트 */}
      <Board></Board>
      {/* BoardList 컴포넌트 */}
      <br></br>
      <Page EA={freeBoardsEA} Pages={pages}></Page>
      {/* pageing 컴포넌트 */}
      <BoradSerch></BoradSerch>
      {/* 검색부분 컴포넌트 */}
    </div>
  );
};

export default DetailFreeBoard;
